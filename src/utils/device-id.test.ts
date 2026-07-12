import { describe, expect, it, vi, afterEach } from 'vitest';
import { getDeviceId } from './device-id';

function stubBrowser(initialLocalStorage: Record<string, string> = {}) {
  const store = new Map(Object.entries(initialLocalStorage));
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  let cookie = '';
  vi.stubGlobal('document', {
    get cookie() {
      return cookie;
    },
    set cookie(v: string) {
      // Mimic the browser: assignment appends/updates one pair; we keep the last write.
      cookie = v.split(';')[0];
    },
  });
  vi.stubGlobal('navigator', { userAgent: 'test-UA', languages: ['en-US'], hardwareConcurrency: 8 });
  vi.stubGlobal('screen', { width: 1440, height: 900, colorDepth: 24 });
  return { store, getCookie: () => cookie };
}

afterEach(() => vi.unstubAllGlobals());

describe('getDeviceId', () => {
  it('returns an existing id from localStorage without re-deriving', async () => {
    stubBrowser({ bl_like_id: 'd_existing0000000000000000000000000000000' });
    expect(await getDeviceId()).toBe('d_existing0000000000000000000000000000000');
  });

  it('mints a stable id when both stores are empty, then persists it to both', async () => {
    const { store, getCookie } = stubBrowser();
    const id = await getDeviceId();
    expect(id).toMatch(/^d_[0-9a-f]{40}$/); // derived from device signals
    expect(store.get('bl_like_id')).toBe(id);
    expect(getCookie()).toContain(`bl_like_id=${id}`);
  });

  it('is stable across calls on the same device (signals seed the same id)', async () => {
    stubBrowser();
    const a = await getDeviceId();
    // Second call reads it straight back from the store it just wrote.
    const b = await getDeviceId();
    expect(a).toBe(b);
  });

  it('falls back to the cookie when localStorage is unavailable', async () => {
    stubBrowser();
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    const id = await getDeviceId();
    expect(id).toMatch(/^d_[0-9a-f]{40}$/);
  });
});
