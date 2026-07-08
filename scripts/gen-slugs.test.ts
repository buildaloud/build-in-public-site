import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as loadYaml } from 'js-yaml';
import { buildSlugManifest } from './gen-slugs';
import { isPublishedAt } from '../src/utils/posts';
import { slugFromFilename } from './stats/post-stats';

function post(frontmatter: string): string {
  return `---\n${frontmatter}\n---\n\nSome body content.\n`;
}

describe('buildSlugManifest', () => {
  it('includes a published past-dated non-draft post', () => {
    const files = [{ slug: 'past-post', raw: post(['title: "Past"', 'pubDate: "2020-01-01"'].join('\n')) }];
    expect(buildSlugManifest(files)).toEqual(['past-post']);
  });

  it('excludes a draft post', () => {
    const files = [{ slug: 'draft-post', raw: post(['title: "Draft"', 'pubDate: "2020-01-01"', 'draft: true'].join('\n')) }];
    expect(buildSlugManifest(files)).toEqual([]);
  });

  it('excludes a future-dated post', () => {
    const files = [{ slug: 'future-post', raw: post(['title: "Future"', 'pubDate: "2099-01-01"'].join('\n')) }];
    expect(buildSlugManifest(files)).toEqual([]);
  });

  it('returns slugs sorted', () => {
    const files = [
      { slug: 'zebra', raw: post(['title: "Z"', 'pubDate: "2020-01-01"'].join('\n')) },
      { slug: 'alpha', raw: post(['title: "A"', 'pubDate: "2020-01-01"'].join('\n')) },
    ];
    expect(buildSlugManifest(files)).toEqual(['alpha', 'zebra']);
  });
});

describe('gen-slugs manifest — real content', () => {
  const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/blog');
  const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

  function realPublishedSlugs(): string[] {
    return readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.md'))
      .flatMap((f) => {
        const raw = readFileSync(join(BLOG_DIR, f), 'utf8');
        const match = FRONTMATTER_RE.exec(raw);
        if (!match) return [];
        const data = (loadYaml(match[1]) ?? {}) as Record<string, unknown>;
        const draft = Boolean(data.draft);
        const pubDate = new Date(String(data.pubDate));
        return isPublishedAt(draft, pubDate) ? [slugFromFilename(f)] : [];
      })
      .sort();
  }

  it('matches the current published-slug set (independently computed via isPublishedAt)', () => {
    const files = readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ slug: slugFromFilename(f), raw: readFileSync(join(BLOG_DIR, f), 'utf8') }));
    expect(buildSlugManifest(files)).toEqual(realPublishedSlugs());
  });
});
