// Progressive-profiling subscribe proxy. The client never sees the
// Buttondown key; tags are restricted to the fixed vocabulary below
// (research/social/CONTENT.md audience segments + category interests).

type Env = { BUTTONDOWN_API_KEY?: string };

type PagesFunction<E> = (context: { request: Request; env: E }) => Promise<Response>;

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
  if (!key) return json({ error: 'not configured' }, 503);

  const body = (await context.request.json().catch(() => null)) as Body | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'invalid email' }, 400);

  const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json' };
  const wanted = (body?.tags ?? []).filter((t) => ALLOWED.has(t));

  if (!wanted.length) {
    const res = await fetch(API, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, tags: ['web-signup'] }),
    });
    if (res.status === 201) return json({ ok: true, created: true });
    const detail = await res.text();
    if (res.status === 400 && detail.includes('already')) return json({ ok: true, created: false });
    return json({ error: 'subscribe failed' }, 502);
  }

  const existing = await fetch(`${API}/${encodeURIComponent(email)}`, { headers });
  if (!existing.ok) return json({ error: 'unknown subscriber' }, 404);
  const sub = (await existing.json()) as { tags?: string[] };
  const merged = [...new Set([...(sub.tags ?? []), ...wanted])];
  const patch = await fetch(`${API}/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ tags: merged }),
  });
  if (!patch.ok) return json({ error: 'profile update failed' }, 502);
  return json({ ok: true, tags: merged.length });
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
