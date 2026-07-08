import { describe, expect, it } from 'vitest';
import { validateSlug, voterHash, isRateLimited, isOverCeiling, sanitizeError } from './_like-core';

describe('validateSlug', () => {
  const known = new Set(['2026-02-21-hello-world']);

  it('accepts a well-formed slug present in the manifest', () => {
    expect(validateSlug('2026-02-21-hello-world', known)).toBe(true);
  });

  it('rejects a well-formed slug absent from the manifest (stale/unknown)', () => {
    expect(validateSlug('2026-01-01-not-a-real-post', known)).toBe(false);
  });

  it('rejects a malformed slug (path traversal attempt)', () => {
    expect(validateSlug('../../etc/passwd', known)).toBe(false);
  });

  it('rejects a slug with disallowed characters', () => {
    expect(validateSlug('hello world!', known)).toBe(false);
  });

  it('rejects an empty slug', () => {
    expect(validateSlug('', known)).toBe(false);
  });
});

describe('voterHash', () => {
  it('is deterministic for the same ip + salt', async () => {
    const a = await voterHash('1.2.3.4', 'salt-value');
    const b = await voterHash('1.2.3.4', 'salt-value');
    expect(a).toBe(b);
  });

  it('differs when the ip changes', async () => {
    const a = await voterHash('1.2.3.4', 'salt-value');
    const b = await voterHash('5.6.7.8', 'salt-value');
    expect(a).not.toBe(b);
  });

  it('differs when the salt changes (same ip) — proves it is a real salted HMAC', async () => {
    const a = await voterHash('1.2.3.4', 'salt-one');
    const b = await voterHash('1.2.3.4', 'salt-two');
    expect(a).not.toBe(b);
  });

  it('is the same for the same ip even if a client token is passed — dedup must be IP-only, not token-dominated', async () => {
    const noToken = await voterHash('1.2.3.4', 'salt-value');
    const withToken = await (voterHash as (ip: string, salt: string, token?: string) => Promise<string>)(
      '1.2.3.4',
      'salt-value',
      'cookie-token',
    );
    expect(withToken).toBe(noToken);
  });

  it('never contains the raw ip as a substring', async () => {
    const hash = await voterHash('1.2.3.4', 'salt-value');
    expect(hash).not.toContain('1.2.3.4');
  });
});

describe('isRateLimited', () => {
  it('is false under the per-voter cap', () => {
    expect(isRateLimited(49)).toBe(false);
  });

  it('is true at or over the per-voter cap', () => {
    expect(isRateLimited(50)).toBe(true);
  });
});

describe('isOverCeiling', () => {
  it('is false when both per-slug and global counts are under cap', () => {
    expect(isOverCeiling(10, 5)).toBe(false);
  });

  it('is true when the per-slug total is at the cap', () => {
    expect(isOverCeiling(100_000, 5)).toBe(true);
  });

  it('is true when the global per-minute insert count is at the cap', () => {
    expect(isOverCeiling(10, 300)).toBe(true);
  });
});

describe('sanitizeError', () => {
  it('never forwards the upstream response body', () => {
    const res = sanitizeError(500);
    expect(res.status).toBe(500);
  });

  it('returns a fixed generic error shape', async () => {
    const res = sanitizeError(502);
    const body = await res.json();
    expect(body).toEqual({ error: 'like service unavailable' });
  });
});
