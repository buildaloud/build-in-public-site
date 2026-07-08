// Post-like counter. Follows functions/api/subscribe.ts's shape: thin
// handler, no @cloudflare/workers-types dep, generic errors only — never
// forward upstream error bodies (shields the DB schema from the client).
// Human-gated activation (env vars + CF rate-limit rule): see the
// activation block atop supabase/migrations/0001_post_likes.sql.
import {
  validateSlug,
  voterHash,
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
const TABLE = 'post_likes';

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

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const hash = await voterHash(ip, env.LIKE_SALT);

  const [likes, hasLiked] = await Promise.all([
    supabaseCount(env, `post_slug=eq.${encodeURIComponent(slug)}`),
    supabaseExists(env, `post_slug=eq.${encodeURIComponent(slug)}&voter_hash=eq.${hash}`),
  ]);
  if (likes === null || hasLiked === null) return sanitizeError(502);

  const res = shapeResponse(likes, hasLiked);
  // Personalized (hasLiked varies per IP) — a shared/browser cache must not
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

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const hash = await voterHash(ip, env.LIKE_SALT);

  const hourAgo = new Date(Date.now() - PER_VOTER_WINDOW_MS).toISOString();
  const voterCount = await supabaseCount(env, `voter_hash=eq.${hash}&created_at=gte.${hourAgo}`);
  if (voterCount === null) return sanitizeError(502);
  if (isRateLimited(voterCount)) return errorJson('rate limited', 429);

  const minuteAgo = new Date(Date.now() - GLOBAL_WINDOW_MS).toISOString();
  const [slugTotal, globalMinute] = await Promise.all([
    supabaseCount(env, `post_slug=eq.${encodeURIComponent(slug)}`),
    supabaseCount(env, `created_at=gte.${minuteAgo}`),
  ]);
  if (slugTotal === null || globalMinute === null) return sanitizeError(502);
  if (isOverCeiling(slugTotal, globalMinute)) return errorJson('at capacity', 429);

  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: 'POST',
    headers: restHeaders(env, { 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' }),
    body: JSON.stringify({ post_slug: slug, voter_hash: hash }),
  });
  if (!insertRes.ok) return sanitizeError(502);

  // No post-insert recount round-trip — slugTotal + 1 is a benign off-by-one
  // under concurrency, fine for a decorative counter.
  const res = shapeResponse(slugTotal + 1, true);
  // Cookie is a client-side "you liked this" UX hint only — never part of
  // the dedup/rate-limit key (that's IP-only, see voterHash in _like-core.ts).
  if (!getCookie(request, COOKIE_NAME)) {
    res.headers.set('Set-Cookie', `${COOKIE_NAME}=${crypto.randomUUID()}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=31536000`);
  }
  return res;
};
