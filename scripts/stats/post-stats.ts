export type Scorecard =
  | { status: 'insufficient-data'; reason: 'no-target-keyword' | 'no-gsc-rows' }
  | {
      status: 'measured';
      targetKeyword: string;
      rankedForTarget: boolean;
      targetPosition: number | null;
      targetImpressions: number;
      targetClicks: number;
      secondaryHits: number;
    };

export type PostStat = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  pageviews: number;
  // Optional (not just zero-safe) because older stats.json snapshots
  // written before this field existed genuinely omit it — shapePostStats
  // always sets a real number when it builds an entry; only a stale,
  // not-yet-repulled snapshot on disk would lack the key entirely.
  likes?: number;
  scorecard: Scorecard;
};

export type PostFrontmatter = {
  slug: string;
  targetKeyword?: string;
  secondaryKeywords?: string[];
};

export type GscPageRow = { page: string; clicks: number; impressions: number; ctr: number; position: number };
export type GscQueryRow = { page: string; query: string; clicks: number; impressions: number; position: number };
export type Ga4Row = { path: string; pageviews: number };
export type LikeRow = { post_slug: string };

function pathSegments(pathOrUrl: string): string[] {
  const withoutHost = pathOrUrl.trim().replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '');
  return withoutHost.split('/').filter(Boolean);
}

/** Must match Astro's content-collection post.id (basename without .md). */
export function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

/** GSC returns full URLs, GA4 returns bare paths — normalize both to the bare slug. */
export function normalizeToSlug(pathOrUrl: string): string {
  const segments = pathSegments(pathOrUrl);
  if (segments[0] === 'blog') segments.shift();
  return segments.join('/');
}

/**
 * Every other site route (/, /privacy, /stats, /projects/*, /todo) never maps to a
 * post slug — it's not a join failure, it's just not a post. Only /blog/* rows are
 * eligible to count toward the matched/unmatched ratio at all.
 */
export function isBlogPath(pathOrUrl: string): boolean {
  return pathSegments(pathOrUrl)[0] === 'blog';
}

export function computeScorecard(
  post: { targetKeyword?: string; secondaryKeywords?: string[] },
  gscQueryRows: { query: string; clicks: number; impressions: number; position: number }[],
): Scorecard {
  if (!post.targetKeyword) return { status: 'insufficient-data', reason: 'no-target-keyword' };
  if (gscQueryRows.length === 0) return { status: 'insufficient-data', reason: 'no-gsc-rows' };

  const targetLower = post.targetKeyword.toLowerCase();
  const targetRows = gscQueryRows.filter((r) => r.query.toLowerCase() === targetLower);
  const rankedForTarget = targetRows.length > 0;
  const targetImpressions = targetRows.reduce((sum, r) => sum + r.impressions, 0);
  const targetClicks = targetRows.reduce((sum, r) => sum + r.clicks, 0);
  const targetPosition = rankedForTarget
    ? targetRows.reduce((sum, r) => sum + r.position, 0) / targetRows.length
    : null;

  const secondaryLower = new Set((post.secondaryKeywords ?? []).map((k) => k.toLowerCase()));
  const secondaryHits = gscQueryRows.filter((r) => secondaryLower.has(r.query.toLowerCase())).length;

  return {
    status: 'measured',
    targetKeyword: post.targetKeyword,
    rankedForTarget,
    targetPosition,
    targetImpressions,
    targetClicks,
    secondaryHits,
  };
}

export function shapePostStats(
  posts: PostFrontmatter[],
  gscPageRows: GscPageRow[],
  gscQueryRows: GscQueryRow[],
  ga4Rows: Ga4Row[],
  likeRows: LikeRow[] = [],
): { byPost: Record<string, PostStat>; unmatched: { gsc: number; ga4: number }; totalRows: number } {
  const postBySlug = new Map(posts.map((p) => [p.slug, p]));

  const blogGscPageRows = gscPageRows.filter((r) => isBlogPath(r.page));
  const blogGscQueryRows = gscQueryRows.filter((r) => isBlogPath(r.page));
  const blogGa4Rows = ga4Rows.filter((r) => isBlogPath(r.path));

  let unmatchedGsc = 0;
  let unmatchedGa4 = 0;

  const gscBySlug = new Map<string, GscPageRow>();
  for (const row of blogGscPageRows) {
    const slug = normalizeToSlug(row.page);
    if (!postBySlug.has(slug)) {
      unmatchedGsc++;
      continue;
    }
    gscBySlug.set(slug, row);
  }

  const queryRowsBySlug = new Map<string, GscQueryRow[]>();
  for (const row of blogGscQueryRows) {
    const slug = normalizeToSlug(row.page);
    const rows = queryRowsBySlug.get(slug) ?? [];
    rows.push(row);
    queryRowsBySlug.set(slug, rows);
  }

  const ga4BySlug = new Map<string, number>();
  for (const row of blogGa4Rows) {
    const slug = normalizeToSlug(row.path);
    if (!postBySlug.has(slug)) {
      unmatchedGa4++;
      continue;
    }
    ga4BySlug.set(slug, row.pageviews);
  }

  // Likes are a separate engagement signal, not an SEO join — a like row for an
  // unknown/deleted slug is silently dropped, never counted toward unmatchedGsc/Ga4.
  const likesBySlug = new Map<string, number>();
  for (const row of likeRows) {
    likesBySlug.set(row.post_slug, (likesBySlug.get(row.post_slug) ?? 0) + 1);
  }

  // byPost membership is page/ga4-derived only — a query-only row for a slug
  // (known or unknown) never creates an entry on its own.
  const matchedSlugs = new Set<string>([...gscBySlug.keys(), ...ga4BySlug.keys()]);
  const byPost: Record<string, PostStat> = {};
  for (const slug of matchedSlugs) {
    const post = postBySlug.get(slug)!;
    const pageRow = gscBySlug.get(slug);
    const queryRows = queryRowsBySlug.get(slug) ?? [];
    byPost[slug] = {
      clicks: pageRow?.clicks ?? 0,
      impressions: pageRow?.impressions ?? 0,
      ctr: pageRow?.ctr ?? 0,
      position: pageRow?.position ?? 0,
      pageviews: ga4BySlug.get(slug) ?? 0,
      likes: likesBySlug.get(slug) ?? 0,
      scorecard: computeScorecard(post, queryRows),
    };
  }

  return {
    byPost,
    unmatched: { gsc: unmatchedGsc, ga4: unmatchedGa4 },
    totalRows: blogGscPageRows.length + blogGa4Rows.length,
  };
}

export const UNMATCHED_FAIL_RATIO = 0.1;

/**
 * Fail loud when too many GSC/GA4 rows match no known slug — that pattern means
 * normalization broke, not that the posts genuinely have zero traffic. A real
 * join with zero clicks is fine; a row that matches nothing is a bug signal.
 */
export function assertJoinHealth(unmatched: { gsc: number; ga4: number }, totalRows: number): void {
  if (totalRows === 0) return;
  const ratio = (unmatched.gsc + unmatched.ga4) / totalRows;
  if (ratio > UNMATCHED_FAIL_RATIO) {
    throw new Error(
      `stats:pull join-miss ratio ${(ratio * 100).toFixed(1)}% exceeds ${UNMATCHED_FAIL_RATIO * 100}% ` +
        `threshold (unmatched gsc=${unmatched.gsc} ga4=${unmatched.ga4} of ${totalRows} rows) — ` +
        'normalization likely broken, refusing to write a misleading snapshot',
    );
  }
}
