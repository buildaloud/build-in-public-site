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

// IP-only: dedup and rate-limiting must key on the IP alone, never on a
// client-supplied token — otherwise clearing cookies (or incognito) lets
// the same IP re-like freely, contradicting privacy.astro's IP-based dedup
// claim. The like_voter cookie is a client-side UX hint only (see like.ts).
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
