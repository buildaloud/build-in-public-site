import type { CollectionEntry } from 'astro:content';

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
  return data.pubDate.valueOf() <= Date.now();
}
