import type { CollectionEntry } from 'astro:content';

/**
 * Pure eligibility check, no dev-mode override — a post is live once it's
 * non-draft and its pubDate has passed. Also imported directly by
 * scripts/stats/frontmatter-scan.ts (bare tsx can't touch import.meta.env,
 * so it can't use isPublished() below, but this primitive has no such access).
 */
export function isPublishedAt(draft: boolean, pubDate: Date): boolean {
  return !draft && pubDate.valueOf() <= Date.now();
}

/**
 * Single source of truth for whether a post is live.
 *
 * Drafts are never live. Future-dated posts go live automatically once their
 * pubDate passes — the daily scheduled build (.github/workflows/deploy.yml)
 * rebuilds the site so they appear without a manual push. In dev, everything
 * shows so future posts can be previewed.
 */
export function isPublished(data: CollectionEntry<'blog'>['data']): boolean {
  if (data.draft) return false;
  if (import.meta.env.DEV) return true;
  return isPublishedAt(data.draft, data.pubDate);
}
