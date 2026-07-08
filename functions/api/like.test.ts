import { describe, expect, it, vi, afterEach } from 'vitest';
import { onRequestGet, onRequestPost } from './like';
import knownSlugs from './_slugs.json';

const SLUG = (knownSlugs as string[])[0];
const ORIGIN = 'https://buildaloud.ai';
const ENV = { SUPABASE_URL: 'https://x.supabase.co', SUPABASE_SECRET_KEY: 'service-key', LIKE_SALT: 'salt-value' };

function getReq(slug: string, extraHeaders: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}/api/like?slug=${encodeURIComponent(slug)}`, {
    headers: { 'CF-Connecting-IP': '1.2.3.4', ...extraHeaders },
  });
}

function postReq(slug: string, extraHeaders: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}/api/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': '1.2.3.4', ...extraHeaders },
    body: JSON.stringify({ slug }),
  });
}

function extractCookieValue(res: Response, name: string): string | undefined {
  const raw = res.headers.get('set-cookie') ?? '';
  return new RegExp(`${name}=([^;]+)`).exec(raw)?.[1];
}

function countResponse(total: number, rows: unknown[] = []): Response {
  return new Response(JSON.stringify(rows), { status: 200, headers: { 'content-range': `0-0/${total}` } });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('onRequestGet', () => {
  it('returns 503 when env is not configured (inert until activation)', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq(SLUG), env: {} });
    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an unknown slug without calling Supabase', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq('not-a-real-post'), env: ENV });
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns likes + hasLiked with a no-store cache header (personalized per-IP response)', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (String(url).includes('voter_hash=eq.')) return countResponse(0, []);
      return countResponse(3);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq(SLUG), env: ENV });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ likes: 3, hasLiked: false });
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns a generic error and never forwards the Supabase body on upstream failure', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ code: '23505', message: 'internal detail' }), { status: 500 }));
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq(SLUG), env: ENV });
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body).toEqual({ error: 'like service unavailable' });
    expect(JSON.stringify(body)).not.toContain('23505');
  });
});

describe('onRequestPost', () => {
  it('rejects an unknown slug without calling Supabase', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq('not-a-real-post'), env: ENV });
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a cross-origin POST without calling Supabase', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG, { Origin: 'https://evil.example' }), env: ENV });
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('dedupes the same voter across two POSTs — count stays put, cookie set once', async () => {
    // Models the real conflict: first insert creates a row (representation → 1 row);
    // the second hits the (post_slug, voter_hash) unique constraint and is
    // ignore-duplicates'd (200 with an empty representation, NOT an error).
    let inserts = 0;
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        inserts += 1;
        const rows = inserts === 1 ? [{ id: 'row-1' }] : [];
        return new Response(JSON.stringify(rows), { status: 201 });
      }
      const u = String(url);
      // slug total reflects the row inserted by the first POST; other counts (voter, global) stay 0.
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('voter_hash')) {
        return countResponse(inserts >= 1 ? 1 : 0);
      }
      return countResponse(0);
    });
    vi.stubGlobal('fetch', fetchMock);

    const res1 = await onRequestPost({ request: postReq(SLUG), env: ENV });
    const body1 = await res1.json();
    const token = extractCookieValue(res1, 'like_voter');
    expect(token).toBeTruthy();

    const res2 = await onRequestPost({ request: postReq(SLUG, { Cookie: `like_voter=${token}` }), env: ENV });
    const body2 = await res2.json();

    // Fresh like → 1; duplicate → stays 1 (not 2), and no 502.
    expect(body1).toEqual({ likes: 1, hasLiked: true });
    expect(body2).toEqual({ likes: 1, hasLiked: true });
    expect(res2.status).toBe(200);
    expect(res2.headers.get('set-cookie')).toBeNull();
    // The duplicate insert really was attempted (proves on_conflict handles it, not a pre-check skip).
    expect(inserts).toBe(2);
  });

  it('targets the (post_slug, voter_hash) unique constraint on insert', async () => {
    let insertUrl = '';
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        insertUrl = String(url);
        return new Response(JSON.stringify([{ id: 'row-1' }]), { status: 201 });
      }
      return countResponse(0);
    });
    vi.stubGlobal('fetch', fetchMock);
    await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(insertUrl).toContain('on_conflict=post_slug,voter_hash');
  });

  it('rate-limits a voter at >=50 posts in the last hour, without inserting', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      const u = String(url);
      if (u.includes('voter_hash=eq.') && u.includes('created_at=gte.')) return countResponse(50);
      return countResponse(1);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(429);
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit | undefined)?.method === 'POST')).toBe(false);
  });

  it('rejects at the per-slug ceiling without inserting', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      const u = String(url);
      if (u.includes('voter_hash=eq.') && u.includes('created_at=gte.')) return countResponse(0);
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('voter_hash')) return countResponse(100_000);
      return countResponse(1);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(429);
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit | undefined)?.method === 'POST')).toBe(false);
  });

  it('returns a generic error and never forwards the Supabase body on upstream failure', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ code: '23505', message: 'internal detail' }), { status: 500 }));
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body).toEqual({ error: 'like service unavailable' });
    expect(JSON.stringify(body)).not.toContain('23505');
  });

  it('returns a generic 502 and never leaks the upstream body when the INSERT itself fails (all count checks succeeded)', async () => {
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        return new Response(JSON.stringify({ code: '23505', message: 'constraint violation detail' }), { status: 500 });
      }
      return countResponse(1);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body).toEqual({ error: 'like service unavailable' });
    expect(JSON.stringify(body)).not.toContain('23505');
  });

  it('rejects at the global-per-minute ceiling even when the per-slug total is under cap, without inserting', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      const u = String(url);
      if (u.includes('voter_hash=eq.') && u.includes('created_at=gte.')) return countResponse(0);
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('voter_hash')) return countResponse(10);
      return countResponse(300);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(429);
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit | undefined)?.method === 'POST')).toBe(false);
  });
});
