import { describe, expect, it, vi } from 'vitest';
import { createSession, publishPost } from '../scripts/social/bluesky';
import {
  detectLinkFacets,
  dueItems,
  parseQueueFile,
  serializeQueueItem,
  validatePost,
} from '../scripts/social/queue';

const raw = `---
platform: bluesky
status: approved
scheduled: 2026-07-05
utm: bluesky
---

Day 1: an AI runs the queue now. https://buildaloud.ai/?utm_source=bluesky
`;

describe('social queue: posts are repo files with an approval gate', () => {
  it('parses frontmatter + body', () => {
    const item = parseQueueFile('001-day-one.md', raw);
    expect(item.platform).toBe('bluesky');
    expect(item.status).toBe('approved');
    expect(item.scheduled).toBe('2026-07-05');
    expect(item.text).toContain('Day 1');
  });

  it('round-trips through serialize', () => {
    const item = parseQueueFile('001.md', raw);
    expect(parseQueueFile('001.md', serializeQueueItem(item))).toEqual(item);
  });

  it('only approved, unposted, due items publish', () => {
    const mk = (over: Partial<ReturnType<typeof parseQueueFile>>) => ({
      ...parseQueueFile('x.md', raw),
      ...over,
    });
    const items = [
      mk({ file: 'draft.md', status: 'draft' as const }),
      mk({ file: 'due.md', status: 'approved' as const, scheduled: '2026-07-01' }),
      mk({ file: 'future.md', status: 'approved' as const, scheduled: '2027-01-01' }),
      mk({ file: 'done.md', status: 'posted' as const, postedUri: 'at://x' }),
      mk({ file: 'undated.md', status: 'approved' as const, scheduled: undefined }),
    ];
    expect(dueItems(items, '2026-07-04').map((i) => i.file)).toEqual(['due.md', 'undated.md']);
  });

  it('rejects bad status and missing frontmatter', () => {
    expect(() => parseQueueFile('x.md', 'no frontmatter')).toThrow(/frontmatter/);
    expect(() => parseQueueFile('x.md', '---\nstatus: yolo\n---\nhi')).toThrow(/bad status/);
  });

  it('validates the 300-grapheme Bluesky cap', () => {
    expect(validatePost('fine')).toEqual([]);
    expect(validatePost('x'.repeat(301))[0]).toMatch(/too long/);
    expect(validatePost('  ')).toContain('empty post');
  });
});

describe('bluesky links: facets carry byte-accurate ranges', () => {
  it('detects a URL with correct byte offsets past multibyte chars', () => {
    const text = 'Scout 🤖 ships: https://buildaloud.ai/?utm_source=bluesky done.';
    const [facet] = detectLinkFacets(text);
    expect(facet.features[0].uri).toBe('https://buildaloud.ai/?utm_source=bluesky');
    const enc = new TextEncoder();
    const bytes = enc.encode(text);
    const slice = bytes.slice(facet.index.byteStart, facet.index.byteEnd);
    expect(new TextDecoder().decode(slice)).toBe('https://buildaloud.ai/?utm_source=bluesky');
  });

  it('strips trailing punctuation and handles multiple links', () => {
    const facets = detectLinkFacets('see https://a.example/x, then https://b.example/y.');
    expect(facets.map((f) => f.features[0].uri)).toEqual(['https://a.example/x', 'https://b.example/y']);
  });

  it('no facets for plain text', () => {
    expect(detectLinkFacets('no links here')).toEqual([]);
  });
});

describe('bluesky client', () => {
  it('logs in and posts with facets attached', async () => {
    const fetchFn = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ did: 'did:plc:x', accessJwt: 'jwt' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ uri: 'at://did:plc:x/app.bsky.feed.post/1' }), { status: 200 }));
    const session = await createSession('buildaloud.ai', 'app-pass', fetchFn as never);
    const uri = await publishPost(session, 'hi https://buildaloud.ai', '2026-07-04T00:00:00Z', fetchFn as never);
    expect(uri).toContain('at://');
    const postBody = JSON.parse(fetchFn.mock.calls[1][1].body as string);
    expect(postBody.record.facets).toHaveLength(1);
    expect(postBody.collection).toBe('app.bsky.feed.post');
  });

  it('surfaces login failures', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response('nope', { status: 401 }));
    await expect(createSession('x', 'bad', fetchFn as never)).rejects.toThrow(/401/);
  });
});
