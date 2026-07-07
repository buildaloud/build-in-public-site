import { load as loadYaml } from 'js-yaml';
import { z } from 'zod/v4';
import { SEARCH_INTENT_VALUES } from '../../src/schema/seo-fields';
import { isPublishedAt } from '../../src/utils/posts';
import type { PostFrontmatter } from './post-stats';

export type RawPostFile = { slug: string; raw: string };

const SeoFieldsSchema = z.object({
  targetKeyword: z.string().optional(),
  secondaryKeywords: z.array(z.string()).optional(),
  searchIntent: z.enum(SEARCH_INTENT_VALUES).optional(),
});

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

// src/utils/posts.ts::isPublished has a dev-mode override that reads
// import.meta.env.DEV — under bare tsx (how pull.ts runs) that throws instead
// of evaluating falsy (confirmed empirically), so isPublished() itself isn't
// importable here. isPublishedAt has no such access and is safe to import
// directly (verified: importing it under tsx does not throw).
export function scanFrontmatter(files: RawPostFile[]): PostFrontmatter[] {
  const eligible: PostFrontmatter[] = [];
  for (const file of files) {
    const match = FRONTMATTER_RE.exec(file.raw);
    if (!match) continue;
    const data = (loadYaml(match[1]) ?? {}) as Record<string, unknown>;
    const seo = SeoFieldsSchema.parse(data);
    const draft = Boolean(data.draft);
    const pubDate = new Date(String(data.pubDate));
    if (!isPublishedAt(draft, pubDate)) continue;
    eligible.push({ slug: file.slug, targetKeyword: seo.targetKeyword, secondaryKeywords: seo.secondaryKeywords });
  }
  return eligible;
}
