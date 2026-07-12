// Static link auditor for the blog. Extracts every URL from src/content/blog/*.md,
// writes an index (docs/blog-link-index.json), then checks each: external URLs by
// HTTP request, internal /blog/<slug>/ paths against the post files. Dedupes, so
// a URL shared by ten posts is fetched once. Exits non-zero if anything is dead,
// so it can gate CI or run as a background job.
//
//   npx tsx scripts/check-links.ts            # check + write index + report
//   npx tsx scripts/check-links.ts --index    # only rebuild the index, no fetch
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const BLOG = 'src/content/blog';
const INDEX = 'docs/blog-link-index.json';
const CONCURRENCY = 8;
const TIMEOUT_MS = 12_000;
const UA = 'Mozilla/5.0 (compatible; BuildAloudLinkCheck/1.0)';

// Live endpoints that legitimately don't answer a plain HEAD/GET (e.g. an MCP
// streamable-HTTP endpoint needs a POST handshake). Treated as ok.
const ALLOWLIST = new Set(['https://mcp.marketplace.buildaloud.ai/mcp']);

// A URL with a glob/template token is example/config text, not a real link.
const isPattern = (url: string) => /[*{}]/.test(url);

type Ref = { url: string; posts: string[]; internal: boolean };

function extract(): Map<string, Ref> {
  const refs = new Map<string, Ref>();
  const add = (url: string, post: string, internal: boolean) => {
    if (isPattern(url)) return; // example/config text, not a real link
    const r = refs.get(url) ?? { url, posts: [], internal };
    if (!r.posts.includes(post)) r.posts.push(post);
    refs.set(url, r);
  };
  for (const f of readdirSync(BLOG).filter((n) => n.endsWith('.md'))) {
    const body = readFileSync(join(BLOG, f), 'utf8');
    // markdown links [text](url) and bare https URLs
    for (const m of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) add(m[1], f, false);
    for (const m of body.matchAll(/(?<![("])\bhttps?:\/\/[^\s)<>"']+/g)) add(m[0].replace(/[.,;]+$/, ''), f, false);
    for (const m of body.matchAll(/\]\((\/blog\/[^)\s]+)\)/g)) add(m[1], f, true);
  }
  return refs;
}

function checkInternal(path: string): boolean {
  const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
  return existsSync(join(BLOG, `${slug}.md`));
}

async function checkExternal(url: string): Promise<number | string> {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA }, signal: ctrl.signal });
      clearTimeout(t);
      if (method === 'HEAD' && (res.status === 405 || res.status === 403 || res.status === 501)) continue;
      return res.status;
    } catch (e) {
      if (method === 'GET') return e instanceof Error && e.name === 'AbortError' ? 'timeout' : 'error';
    }
  }
  return 'error';
}

async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>): Promise<void> {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(n, queue.length) }, async () => {
      while (queue.length) await fn(queue.shift()!);
    }),
  );
}

async function main() {
  const indexOnly = process.argv.includes('--index');
  const refs = [...extract().values()].sort((a, b) => a.url.localeCompare(b.url));
  console.log(`found ${refs.length} unique links across ${readdirSync(BLOG).filter((n) => n.endsWith('.md')).length} posts`);

  const results: Record<string, { status: number | string; posts: string[] }> = {};
  const dead: { url: string; status: number | string; posts: string[] }[] = [];

  const check = async (r: Ref) => {
    const status = r.internal
      ? checkInternal(r.url)
        ? 200
        : 404
      : ALLOWLIST.has(r.url)
        ? 200
        : indexOnly
          ? 'unchecked'
          : await checkExternal(r.url);
    results[r.url] = { status, posts: r.posts };
    const bad = typeof status === 'string' ? status !== 'unchecked' : status >= 400;
    if (bad) dead.push({ url: r.url, status, posts: r.posts });
  };

  if (indexOnly) refs.forEach((r) => check(r));
  else await pool(refs, CONCURRENCY, check);

  writeFileSync(INDEX, JSON.stringify(results, null, 2) + '\n');
  console.log(`wrote ${INDEX}`);

  if (indexOnly) return;
  if (!dead.length) {
    console.log('✓ all links resolve');
    return;
  }
  console.log(`\n✗ ${dead.length} dead link(s):`);
  for (const d of dead.sort((a, b) => String(a.status).localeCompare(String(b.status)))) {
    console.log(`  [${d.status}] ${d.url}`);
    console.log(`         in: ${d.posts.join(', ')}`);
  }
  process.exitCode = 1;
}

main();
