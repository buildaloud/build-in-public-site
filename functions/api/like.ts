// Post-like counter. Follows functions/api/subscribe.ts's shape: thin
// handler, no @cloudflare/workers-types dep, generic errors only — never
// forward upstream error bodies (shields the DB schema from the client).
// Human-gated activation (env vars + CF rate-limit rule): see the
// activation block atop supabase/migrations/0001_post_likes.sql.
import {
  validateSlug,
  voterHash,
  validIdentity,
  isRateLimited,
  isOverCeiling,
  sanitizeError,
  shapeResponse,
  getCookie,
  PER_VOTER_WINDOW_MS,
  GLOBAL_WINDOW_MS,
} from './_like-core';
import type { PagesFunction } from './_shared';
import { jsonResponse } from './_shared';
import knownSlugs from './_slugs.json';

type Env = { SUPABASE_URL?: string; SUPABASE_SECRET_KEY?: string; LIKE_SALT?: string };

const KNOWN = new Set<string>(knownSlugs as string[]);
const COOKIE_NAME = 'like_voter';
const ID_HEADER = 'X-Like-ID';
const TABLE = 'post_likes';

// The dedup identity: prefer the client's layered device id (localStorage +
// cookie + signal seed; survives cookie-clears, tells apart devices behind one
// IP); else the server's own fallback cookie; else null (the caller mints one on
// write). null on GET simply means "not liked yet" — nothing to look up.
function deviceIdentity(request: Request): string | null {
  const headerId = request.headers.get(ID_HEADER);
  if (validIdentity(headerId)) return headerId;
  const cookie = getCookie(request, COOKIE_NAME);
  if (validIdentity(cookie)) return cookie;
  return null;
}

type ReadyEnv = { SUPABASE_URL: string; SUPABASE_SECRET_KEY: string; LIKE_SALT: string };

function envReady(env: Env): env is ReadyEnv {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SECRET_KEY && env.LIKE_SALT);
}

function restHeaders(env: ReadyEnv, extra?: Record<string, string>): Record<string, string> {
  return { apikey: env.SUPABASE_SECRET_KEY, Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`, ...extra };
}

async function supabaseCount(env: ReadyEnv, filter: string): Promise<number | null> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${TABLE}?${filter}&select=id&limit=1`, {
    headers: restHeaders(env, { Prefer: 'count=exact' }),
  });
  if (!res.ok) return null;
  return Number(res.headers.get('content-range')?.split('/')[1] ?? 0);
}

async function supabaseExists(env: ReadyEnv, filter: string): Promise<boolean | null> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${TABLE}?${filter}&select=id&limit=1`, { headers: restHeaders(env) });
  if (!res.ok) return null;
  const rows = (await res.json().catch(() => null)) as unknown[] | null;
  return rows ? rows.length > 0 : null;
}

function errorJson(message: string, status: number): Response {
  return jsonResponse({ error: message }, status);
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!envReady(env)) return sanitizeError(503);

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') ?? '';
  // KNOWN is the build-time _slugs.json manifest (scripts/gen-slugs.ts,
  // prebuild) — the real allowlist boundary; SLUG_RE only checks format.
  // A brand-new post isn't likeable until the next deploy regenerates it.
  if (!validateSlug(slug, KNOWN)) return errorJson('unknown slug', 400);

  // hasLiked is per-device: no identity means this browser can't have liked yet,
  // so skip the Supabase existence check entirely.
  const identity = deviceIdentity(request);
  const likes = await supabaseCount(env, `post_slug=eq.${encodeURIComponent(slug)}`);
  if (likes === null) return sanitizeError(502);

  let hasLiked = false;
  if (identity) {
    const deviceHash = await voterHash(identity, env.LIKE_SALT);
    const exists = await supabaseExists(env, `post_slug=eq.${encodeURIComponent(slug)}&device_hash=eq.${deviceHash}`);
    if (exists === null) return sanitizeError(502);
    hasLiked = exists;
  }

  const res = shapeResponse(likes, hasLiked);
  // Personalized (hasLiked varies per device) — a shared/browser cache must not
  // serve one visitor's response to another.
  res.headers.set('Cache-Control', 'no-store');
  return res;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!envReady(env)) return sanitizeError(503);

  const selfOrigin = new URL(request.url).origin;
  if (request.headers.get('Origin') !== selfOrigin) return errorJson('cross-origin request rejected', 403);

  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug ?? '';
  if (!validateSlug(slug, KNOWN)) return errorJson('unknown slug', 400);

  // Dedup identity = the audio fingerprint if present, else the cookie token,
  // else a freshly minted token (persisted so a no-fingerprint browser still
  // dedups next time). The identity is HMAC'd to device_hash — the raw
  // fingerprint is never stored. The IP hash is derived for rate-limiting ONLY.
  const existingCookie = getCookie(request, COOKIE_NAME);
  const identity = deviceIdentity(request);
  const mintedToken = identity === null ? crypto.randomUUID() : null;
  const deviceHash = await voterHash(identity ?? mintedToken!, env.LIKE_SALT);
  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const ipHash = await voterHash(ip, env.LIKE_SALT);

  const hourAgo = new Date(Date.now() - PER_VOTER_WINDOW_MS).toISOString();
  const voterCount = await supabaseCount(env, `ip_hash=eq.${ipHash}&created_at=gte.${hourAgo}`);
  if (voterCount === null) return sanitizeError(502);
  if (isRateLimited(voterCount)) return errorJson('rate limited', 429);

  const minuteAgo = new Date(Date.now() - GLOBAL_WINDOW_MS).toISOString();
  const [slugTotal, globalMinute] = await Promise.all([
    supabaseCount(env, `post_slug=eq.${encodeURIComponent(slug)}`),
    supabaseCount(env, `created_at=gte.${minuteAgo}`),
  ]);
  if (slugTotal === null || globalMinute === null) return sanitizeError(502);
  if (isOverCeiling(slugTotal, globalMinute)) return errorJson('at capacity', 429);

  // on_conflict targets the (post_slug, device_hash) unique constraint — the random
  // uuid PK never collides, so without this ignore-duplicates would let a repeat
  // like from the same device raise a 23505 instead of being silently dropped.
  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/${TABLE}?on_conflict=post_slug,device_hash`, {
    method: 'POST',
    headers: restHeaders(env, { 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=representation' }),
    body: JSON.stringify({ post_slug: slug, device_hash: deviceHash, ip_hash: ipHash }),
  });
  if (!insertRes.ok) return sanitizeError(502);
  const inserted = (await insertRes.json().catch(() => [])) as unknown[];
  const isNewLike = Array.isArray(inserted) && inserted.length > 0;

  // No post-insert recount round-trip: a fresh like is slugTotal + 1; a duplicate
  // inserts nothing, so the count stays at slugTotal (already-liked, not a new vote).
  const res = shapeResponse(isNewLike ? slugTotal + 1 : slugTotal, true);
  // Persist a minted fallback token only when the client sent no id and had no
  // prior cookie — so a storage-blocked browser still dedups on its next like.
  if (mintedToken && !validIdentity(existingCookie)) {
    res.headers.set('Set-Cookie', `${COOKIE_NAME}=${mintedToken}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=31536000`);
  }
  return res;
};
