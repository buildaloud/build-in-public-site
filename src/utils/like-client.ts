// The like feature's core degrade guarantee: on any off-path (non-2xx,
// non-JSON body, or network throw) these NEVER throw and NEVER
// console.error — they resolve to {available:false} so LikeButton.astro can
// render nothing/disabled with no console noise while the endpoint is inert
// (pre-activation) or down.
import { getDeviceId } from './device-id';

export type LikeState = { available: false } | { available: true; likes: number; hasLiked: boolean };

async function safeCall(input: RequestInfo, init?: RequestInit): Promise<LikeState> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) return { available: false };
    const body = (await res.json().catch(() => null)) as { likes?: number; hasLiked?: boolean } | null;
    if (!body || typeof body.likes !== 'number' || typeof body.hasLiked !== 'boolean') return { available: false };
    return { available: true, likes: body.likes, hasLiked: body.hasLiked };
  } catch {
    return { available: false };
  }
}

// Resolved once, reused for both calls. Sent in a header (not a query string) so
// the device id never lands in a URL or an access log. credentials: same-origin
// also lets the server-minted fallback cookie flow when JS storage is blocked.
let idPromise: Promise<string> | undefined;
async function idHeaders(): Promise<Record<string, string>> {
  idPromise ??= getDeviceId();
  return { 'X-Like-ID': await idPromise };
}

export async function fetchLikes(slug: string): Promise<LikeState> {
  return safeCall(`/api/like?slug=${encodeURIComponent(slug)}`, {
    cache: 'no-store',
    credentials: 'same-origin',
    headers: await idHeaders(),
  });
}

export async function postLike(slug: string): Promise<LikeState> {
  return safeCall('/api/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await idHeaders()) },
    body: JSON.stringify({ slug }),
    credentials: 'same-origin',
  });
}
