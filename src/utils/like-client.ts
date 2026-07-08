// The like feature's core degrade guarantee: on any off-path (non-2xx,
// non-JSON body, or network throw) these NEVER throw and NEVER
// console.error — they resolve to {available:false} so LikeButton.astro can
// render nothing/disabled with no console noise while the endpoint is inert
// (pre-activation) or down.
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

export function fetchLikes(slug: string): Promise<LikeState> {
  return safeCall(`/api/like?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
}

export function postLike(slug: string): Promise<LikeState> {
  return safeCall('/api/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  });
}
