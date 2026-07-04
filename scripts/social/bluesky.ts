import { detectLinkFacets } from './queue';

const PDS = 'https://bsky.social';

export interface BskySession {
  did: string;
  accessJwt: string;
}

export async function createSession(
  identifier: string,
  appPassword: string,
  fetchImpl: typeof fetch = fetch,
): Promise<BskySession> {
  const res = await fetchImpl(`${PDS}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password: appPassword }),
  });
  if (!res.ok) throw new Error(`Bluesky login failed (${res.status})`);
  const body = (await res.json()) as BskySession;
  return { did: body.did, accessJwt: body.accessJwt };
}

export async function publishPost(
  session: BskySession,
  text: string,
  createdAt: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const facets = detectLinkFacets(text);
  const res = await fetchImpl(`${PDS}/xrpc/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessJwt}` },
    body: JSON.stringify({
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text,
        createdAt,
        ...(facets.length ? { facets } : {}),
      },
    }),
  });
  if (!res.ok) throw new Error(`Bluesky post failed (${res.status}): ${await res.text()}`);
  const body = (await res.json()) as { uri: string };
  return body.uri;
}
