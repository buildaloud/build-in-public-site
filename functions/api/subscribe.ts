// Progressive-profiling subscribe proxy. The client never sees the
// Buttondown key; tags are restricted to the fixed vocabulary below
// (research/social/CONTENT.md audience segments + category interests).

import type { PagesFunction } from './_shared';
import { jsonResponse } from './_shared';

type Env = { BUTTONDOWN_API_KEY?: string };

const API = 'https://api.buttondown.com/v1/subscribers';

export const ROLE_TAGS = ['role-developer', 'role-founder', 'role-building-with-ai', 'role-marketing', 'role-watching'] as const;
export const INTEREST_TAGS = ['int-how-to', 'int-war-stories', 'int-ai-meta', 'int-launches', 'int-numbers'] as const;
const ALLOWED = new Set<string>([...ROLE_TAGS, ...INTEREST_TAGS]);

interface Body {
  email?: string;
  tags?: string[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const key = context.env.BUTTONDOWN_API_KEY;
  if (!key) return jsonResponse({ error: 'not configured' }, 503);

  const body = (await context.request.json().catch(() => null)) as Body | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jsonResponse({ error: 'invalid email' }, 400);

  const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json' };
  const wanted = (body?.tags ?? []).filter((t) => ALLOWED.has(t));
  // The visitor's real IP so Buttondown's firewall judges the subscriber, not
  // this proxy's datacenter IP (which its firewall blocks by default).
  const clientIp = context.request.headers.get('CF-Connecting-IP') ?? undefined;

  if (!wanted.length) {
    const res = await fetch(API, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, tags: ['web-signup'], ip_address: clientIp }),
    });
    if (res.status === 201) return jsonResponse({ ok: true, created: true });
    const detail = await res.text();
    if (res.status === 400 && detail.includes('already')) return jsonResponse({ ok: true, created: false });
    if (res.status === 400 && detail.includes('blocked')) return jsonResponse({ error: 'blocked by spam filter' }, 422);
    return jsonResponse({ error: 'subscribe failed' }, 502);
  }

  const existing = await fetch(`${API}/${encodeURIComponent(email)}`, { headers });
  if (!existing.ok) return jsonResponse({ error: 'unknown subscriber' }, 404);
  const sub = (await existing.json()) as { tags?: string[] };
  const merged = Array.from(new Set([...(sub.tags ?? []), ...wanted]));
  const patch = await fetch(`${API}/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ tags: merged }),
  });
  if (!patch.ok) return jsonResponse({ error: 'profile update failed' }, 502);
  return jsonResponse({ ok: true, tags: merged.length });
};
