import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type QueueStatus = 'draft' | 'approved' | 'posted';

export interface QueueItem {
  file: string;
  platform: string;
  status: QueueStatus;
  scheduled?: string;
  utm?: string;
  postedUri?: string;
  postedAt?: string;
  text: string;
}

export interface LinkFacet {
  index: { byteStart: number; byteEnd: number };
  features: { $type: 'app.bsky.richtext.facet#link'; uri: string }[];
}

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;

export function parseQueueFile(file: string, raw: string): QueueItem {
  const m = raw.match(FRONTMATTER);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  const status = (meta.status ?? 'draft') as QueueStatus;
  if (!['draft', 'approved', 'posted'].includes(status)) throw new Error(`${file}: bad status ${status}`);
  return {
    file,
    platform: meta.platform ?? 'bluesky',
    status,
    scheduled: meta.scheduled || undefined,
    utm: meta.utm || undefined,
    postedUri: meta.posted_uri || undefined,
    postedAt: meta.posted_at || undefined,
    text: raw.slice(m[0].length).trim(),
  };
}

export function serializeQueueItem(item: QueueItem): string {
  const lines = [`platform: ${item.platform}`, `status: ${item.status}`];
  if (item.scheduled) lines.push(`scheduled: ${item.scheduled}`);
  if (item.utm) lines.push(`utm: ${item.utm}`);
  if (item.postedUri) lines.push(`posted_uri: ${item.postedUri}`);
  if (item.postedAt) lines.push(`posted_at: ${item.postedAt}`);
  return `---\n${lines.join('\n')}\n---\n\n${item.text}\n`;
}

export function loadQueue(dir: string): QueueItem[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('README'))
    .sort()
    .map((f) => parseQueueFile(f, readFileSync(join(dir, f), 'utf8')));
}

export function saveQueueItem(dir: string, item: QueueItem): void {
  writeFileSync(join(dir, item.file), serializeQueueItem(item));
}

/** Approved, unposted, and due (no schedule = due now). */
export function dueItems(items: QueueItem[], today: string): QueueItem[] {
  return items.filter(
    (i) => i.status === 'approved' && !i.postedUri && (!i.scheduled || i.scheduled <= today),
  );
}

const URL_RE = /https?:\/\/[^\s)\]>"']+/g;

/** Bluesky needs byte-indexed facets for links to be clickable. */
export function detectLinkFacets(text: string): LinkFacet[] {
  const enc = new TextEncoder();
  const facets: LinkFacet[] = [];
  for (const m of text.matchAll(URL_RE)) {
    const uri = m[0].replace(/[.,;:!?]+$/, '');
    const byteStart = enc.encode(text.slice(0, m.index)).length;
    facets.push({
      index: { byteStart, byteEnd: byteStart + enc.encode(uri).length },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri }],
    });
  }
  return facets;
}

export const BSKY_MAX_GRAPHEMES = 300;

export function validatePost(text: string): string[] {
  const problems: string[] = [];
  const graphemes = [...new Intl.Segmenter().segment(text)].length;
  if (graphemes > BSKY_MAX_GRAPHEMES) problems.push(`too long: ${graphemes}/${BSKY_MAX_GRAPHEMES} graphemes`);
  if (!text.trim()) problems.push('empty post');
  return problems;
}
