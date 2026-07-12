// Pure logic for the like endpoint — no fetch, no context.env. Isolated here
// so it's testable without mocking Supabase. functions/api/like.ts is a thin
// wrapper that wires this to the request/response and the Supabase REST call.
import { jsonResponse } from './_shared';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateSlug(slug: string, known: Set<string>): boolean {
  return SLUG_RE.test(slug) && known.has(slug);
}

export function getCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get('Cookie') ?? '';
  return header
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

// Dedup keys on a per-device identity, NOT the IP — an IP is shared across a
// household/office/CGNAT, so IP-dedup blocks everyone behind one address after
// the first like. The identity is a client-computed layered id (localStorage +
// cookie, seeded by device signals; see src/utils/device-id.ts); when the client
// sends none, the server mints a fallback cookie token. Either way the identity
// is HMAC'd via voterHash before storage — we never keep the raw signals. The IP
// hash (also voterHash) is used ONLY for abuse rate-limiting, never for dedup.
// See TD-0032 / privacy.astro.
const IDENTITY_RE = /^[A-Za-z0-9_-]{16,128}$/;

// The identity arrives from the client (header or cookie), so it's shape-checked
// before it's HMAC'd — a malformed value is treated as "no identity" and the
// caller mints a fresh token. Covers uuids, hex hashes, and the d_<hash> id.
export function validIdentity(value: string | undefined | null): value is string {
  return typeof value === 'string' && IDENTITY_RE.test(value);
}

export async function voterHash(ip: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(salt), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const PER_VOTER_WINDOW_MS = 3_600_000;
export const GLOBAL_WINDOW_MS = 60_000;

const PER_VOTER_HOURLY_CAP = 50;
const PER_SLUG_CAP = 100_000;
const GLOBAL_PER_MINUTE_CAP = 300;

export function isRateLimited(voterCountLastHour: number): boolean {
  return voterCountLastHour >= PER_VOTER_HOURLY_CAP;
}

export function isOverCeiling(slugTotal: number, globalInsertsLastMinute: number): boolean {
  return slugTotal >= PER_SLUG_CAP || globalInsertsLastMinute >= GLOBAL_PER_MINUTE_CAP;
}

export function sanitizeError(status: number): Response {
  return jsonResponse({ error: 'like service unavailable' }, status);
}

export function shapeResponse(likes: number, hasLiked: boolean): Response {
  return jsonResponse({ likes, hasLiked });
}
