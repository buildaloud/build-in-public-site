import { describe, expect, it, vi, afterEach } from 'vitest';
import { fetchLikes, postLike } from './like-client';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchLikes — off-path degrades', () => {
  it('returns unavailable on a non-2xx status (e.g. 503)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 503 })));
    await expect(fetchLikes('some-slug')).resolves.toEqual({ available: false });
  });

  it('returns unavailable on a 200 HTML body (JSON.parse throws, caught by the safeCall .catch)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<html>not found</html>', { status: 200, headers: { 'Content-Type': 'text/html' } })));
    await expect(fetchLikes('some-slug')).resolves.toEqual({ available: false });
  });

  it('returns unavailable on malformed JSON in a 200 response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{not valid json', { status: 200 })));
    await expect(fetchLikes('some-slug')).resolves.toEqual({ available: false });
  });

  it('returns unavailable on a network throw, never rejects', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down'); }));
    await expect(fetchLikes('some-slug')).resolves.toEqual({ available: false });
  });

  it('never calls console.error on any off-path', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down'); }));
    await fetchLikes('some-slug');
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('returns the available state on a well-formed 200', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ likes: 4, hasLiked: true }), { status: 200 })));
    await expect(fetchLikes('some-slug')).resolves.toEqual({ available: true, likes: 4, hasLiked: true });
  });
});

describe('postLike — off-path degrades', () => {
  it('returns unavailable on a non-2xx status', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 429 })));
    await expect(postLike('some-slug')).resolves.toEqual({ available: false });
  });

  it('returns unavailable on malformed JSON', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('not json', { status: 200 })));
    await expect(postLike('some-slug')).resolves.toEqual({ available: false });
  });

  it('returns unavailable on a network throw, never rejects', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    await expect(postLike('some-slug')).resolves.toEqual({ available: false });
  });

  it('never calls console.error on any off-path', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 500 })));
    await postLike('some-slug');
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('returns the available state on a well-formed 200', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ likes: 5, hasLiked: true }), { status: 200 })));
    await expect(postLike('some-slug')).resolves.toEqual({ available: true, likes: 5, hasLiked: true });
  });
});
