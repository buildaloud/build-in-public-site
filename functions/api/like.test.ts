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

  it('returns likes + hasLiked=false with no-store when the browser has no device cookie (skips the existence check)', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (String(url).includes('device_hash=eq.')) throw new Error('must not query existence without a device token');
      return countResponse(3);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq(SLUG), env: ENV });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ likes: 3, hasLiked: false });
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  it('reports hasLiked=true when the device token already has a row (personalized per device)', async () => {
    const token = '3f2504e0-4f89-41d3-9a0c-0305e82c3301';
    const fetchMock = vi.fn(async (url: string) => {
      if (String(url).includes('device_hash=eq.')) return countResponse(1, [{ id: 'row-1' }]);
      return countResponse(3);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestGet({ request: getReq(SLUG, { Cookie: `like_voter=${token}` }), env: ENV });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ likes: 3, hasLiked: true });
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

  it('dedupes the same device across two POSTs — count stays put, cookie set once', async () => {
    // Models the real conflict: first insert creates a row (representation → 1 row);
    // the second hits the (post_slug, device_hash) unique constraint and is
    // ignore-duplicates'd (200 with an empty representation, NOT an error).
    let inserts = 0;
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        inserts += 1;
        const rows = inserts === 1 ? [{ id: 'row-1' }] : [];
        return new Response(JSON.stringify(rows), { status: 201 });
      }
      const u = String(url);
      // slug total reflects the row inserted by the first POST; other counts (ip rate-limit, global) stay 0.
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('ip_hash')) {
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

  it('targets the (post_slug, device_hash) unique constraint on insert', async () => {
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
    expect(insertUrl).toContain('on_conflict=post_slug,device_hash');
  });

  it('uses the client device-id header as the dedup identity, stores its HMAC (not the raw id), and sets no cookie', async () => {
    const id = 'd_' + 'a'.repeat(40);
    let insertBody: { device_hash?: string } = {};
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        insertBody = JSON.parse(String(init.body));
        return new Response(JSON.stringify([{ id: 'row-1' }]), { status: 201 });
      }
      return countResponse(0);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG, { 'X-Like-ID': id }), env: ENV });
    expect(res.status).toBe(200);
    // Client sent an id → no fallback cookie is minted.
    expect(res.headers.get('set-cookie')).toBeNull();
    // Stored as an HMAC, never the raw fingerprint.
    expect(insertBody.device_hash).toBeTruthy();
    expect(insertBody.device_hash).not.toBe(id);
  });

  it('two different device ids behind one IP each get their own like (the shared-IP fix)', async () => {
    const hashes = new Set<string>();
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        hashes.add((JSON.parse(String(init.body)) as { device_hash: string }).device_hash);
        return new Response(JSON.stringify([{ id: 'row-1' }]), { status: 201 });
      }
      return countResponse(0);
    });
    vi.stubGlobal('fetch', fetchMock);
    // Same CF-Connecting-IP (1.2.3.4 from postReq), different device ids.
    await onRequestPost({ request: postReq(SLUG, { 'X-Like-ID': 'd_' + 'a'.repeat(40) }), env: ENV });
    await onRequestPost({ request: postReq(SLUG, { 'X-Like-ID': 'd_' + 'b'.repeat(40) }), env: ENV });
    expect(hashes.size).toBe(2);
  });

  it('rate-limits by IP at >=50 posts in the last hour, without inserting', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      const u = String(url);
      if (u.includes('ip_hash=eq.') && u.includes('created_at=gte.')) return countResponse(50);
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
      if (u.includes('ip_hash=eq.') && u.includes('created_at=gte.')) return countResponse(0);
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('ip_hash')) return countResponse(100_000);
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
      if (u.includes('ip_hash=eq.') && u.includes('created_at=gte.')) return countResponse(0);
      if (u.includes(`post_slug=eq.${encodeURIComponent(SLUG)}`) && !u.includes('ip_hash')) return countResponse(10);
      return countResponse(300);
    });
    vi.stubGlobal('fetch', fetchMock);
    const res = await onRequestPost({ request: postReq(SLUG), env: ENV });
    expect(res.status).toBe(429);
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit | undefined)?.method === 'POST')).toBe(false);
  });
});
