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
  // Same staleness rationale as likes — attached in pull.ts (via
  // joinDailyViewsBySlug), not inside shapePostStats itself.
  dailyViews?: number[];
  // Same staleness rationale as likes/dailyViews — attached in pull.ts (via
  // joinCommentsBySlug), not inside shapePostStats itself.
  comments?: number;
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

  checkLikesTruncation(likeRows);

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

// Must match the `limit=10000` in pull.ts's post_likes fetch — a raw row count
// landing on the cap means the single-page fetch likely truncated real rows
// past it, not that exactly 10000 likes exist.
export const LIKES_ROW_LIMIT = 10000;

/**
 * post_likes is fetched unpaginated (see pull.ts) — loud like assertJoinHealth's
 * join-miss guard, but a warning, not a throw: low current volume makes a hard
 * fail overkill, and under-counting a few likes shouldn't take down the snapshot.
 */
export function checkLikesTruncation(likeRows: LikeRow[]): void {
  if (likeRows.length >= LIKES_ROW_LIMIT) {
    console.warn(
      `\n!!! post_likes fetch returned ${likeRows.length} rows — likely truncated at the ` +
        `${LIKES_ROW_LIMIT}-row limit; likes counts may under-count until pull.ts paginates this fetch\n`,
    );
  }
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

/** Ascending YYYY-MM-DD dates, the last `n` days ending at (and including) `today`. */
export function lastNDates(n: number, today: Date = new Date()): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

/** GA4's `date` dimension returns YYYYMMDD (no dashes); every other date field here is YYYY-MM-DD. */
export function ga4DateToIso(ga4Date: string): string {
  return `${ga4Date.slice(0, 4)}-${ga4Date.slice(4, 6)}-${ga4Date.slice(6, 8)}`;
}

export type DailySiteRow = { date: string; pageViews: number; sessions: number };

export function shapeDailySite(dates: string[], rows: DailySiteRow[]): DailySiteRow[] {
  const byDate = new Map(rows.map((r) => [r.date, r]));
  return dates.map((date) => ({
    date,
    pageViews: byDate.get(date)?.pageViews ?? 0,
    sessions: byDate.get(date)?.sessions ?? 0,
  }));
}

export type DailySearchRow = { date: string; clicks: number; impressions: number };

export function shapeDailySearch(dates: string[], rows: DailySearchRow[]): DailySearchRow[] {
  const byDate = new Map(rows.map((r) => [r.date, r]));
  return dates.map((date) => ({
    date,
    clicks: byDate.get(date)?.clicks ?? 0,
    impressions: byDate.get(date)?.impressions ?? 0,
  }));
}

export type Ga4DatePathRow = { date: string; path: string; pageviews: number };

/**
 * Per-post daily pageviews aligned to `dates`, zero-filled. Non-blog paths are
 * excluded entirely — same join scoping as shapePostStats's isBlogPath filter.
 */
export function joinDailyViewsBySlug(dates: string[], rows: Ga4DatePathRow[]): Record<string, number[]> {
  const bySlug = new Map<string, Map<string, number>>();
  for (const row of rows) {
    if (!isBlogPath(row.path)) continue;
    const slug = normalizeToSlug(row.path);
    const byDate = bySlug.get(slug) ?? new Map<string, number>();
    byDate.set(row.date, (byDate.get(row.date) ?? 0) + row.pageviews);
    bySlug.set(slug, byDate);
  }
  const result: Record<string, number[]> = {};
  for (const [slug, byDate] of bySlug) {
    result[slug] = dates.map((date) => byDate.get(date) ?? 0);
  }
  return result;
}

/** The Monday (YYYY-MM-DD) of the ISO week containing `dateStr`. */
export function isoWeekStart(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  const day = d.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diffToMonday);
  return d.toISOString().slice(0, 10);
}

/** Ascending Monday week-starts, the last `n` ISO weeks ending with the week containing `today`. */
export function lastNIsoWeekStarts(n: number, today: Date = new Date()): string[] {
  const currentWeekStart = isoWeekStart(today.toISOString().slice(0, 10));
  const weeks: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(`${currentWeekStart}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - i * 7);
    weeks.push(d.toISOString().slice(0, 10));
  }
  return weeks;
}

/**
 * Groups date+path rows into "blog" (/blog/*) and "site" (every other
 * top-level path) products, summed per ISO week. Rows outside `weekStarts`
 * are dropped; a product with no rows in-window is omitted, not zeroed —
 * keeps this GA4 blog-site-only and honest about what's actually present.
 */
export function shapeProductWeekly(
  weekStarts: string[],
  rows: Ga4DatePathRow[],
): { product: string; weeks: { weekStart: string; pageViews: number }[] }[] {
  const weekSet = new Set(weekStarts);
  const byProductWeek = new Map<string, Map<string, number>>();
  for (const row of rows) {
    const weekStart = isoWeekStart(row.date);
    if (!weekSet.has(weekStart)) continue;
    const product = isBlogPath(row.path) ? 'blog' : 'site';
    const byWeek = byProductWeek.get(product) ?? new Map<string, number>();
    byWeek.set(weekStart, (byWeek.get(weekStart) ?? 0) + row.pageviews);
    byProductWeek.set(product, byWeek);
  }
  return Array.from(byProductWeek.keys())
    .sort()
    .map((product) => ({
      product,
      weeks: weekStarts.map((weekStart) => ({
        weekStart,
        pageViews: byProductWeek.get(product)?.get(weekStart) ?? 0,
      })),
    }));
}

export type DiscussionRow = { title: string; comments: number };

/**
 * Giscus (pathname mapping) titles a discussion after the page's pathname,
 * minus the leading slash — verified live against the repo's actual
 * discussions: "blog/2026-02-23-who-pays-to-secure-the-keg/", not
 * "/blog/...". Returns null for a non-blog-post discussion title (e.g. one
 * created by hand rather than by giscus commenting on a post).
 */
export function slugFromGiscusTitle(title: string): string | null {
  const segments = title.trim().replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (segments[0] !== 'blog') return null;
  return segments.slice(1).join('/');
}

/** Sums comment counts per slug — a discussion title that isn't a blog post pathname is dropped, not an error. */
export function joinCommentsBySlug(rows: DiscussionRow[]): Record<string, number> {
  const bySlug: Record<string, number> = {};
  for (const row of rows) {
    const slug = slugFromGiscusTitle(row.title);
    if (slug === null) continue;
    bySlug[slug] = (bySlug[slug] ?? 0) + row.comments;
  }
  return bySlug;
}

export type TrafficSourceRow = { source: string; medium: string; sessions: number };

/**
 * Sorts by sessions desc; top `limit` rows kept individually, the remainder
 * summed into one trailing {source:"other",medium:"",sessions} row — always
 * appended (even at 0) so the UI gets a stable shape regardless of how many
 * distinct source/medium pairs GA4 returned.
 */
export function shapeTrafficSources(rows: TrafficSourceRow[], limit = 15): TrafficSourceRow[] {
  const sorted = [...rows].sort((a, b) => b.sessions - a.sessions);
  const top = sorted.slice(0, limit);
  const restSessions = sorted.slice(limit).reduce((sum, r) => sum + r.sessions, 0);
  return [...top, { source: 'other', medium: '', sessions: restSessions }];
}

export type OrganicSplit = { organic: number; direct: number; referral: number; other: number };

/** Buckets 28d sessions by GA4 sessionMedium: organic search, direct ((none)/direct), referral, everything else. */
export function shapeOrganicSplit(rows: TrafficSourceRow[]): OrganicSplit {
  const split: OrganicSplit = { organic: 0, direct: 0, referral: 0, other: 0 };
  for (const row of rows) {
    const medium = row.medium.toLowerCase();
    if (medium === 'organic') split.organic += row.sessions;
    else if (medium === '(none)' || medium === 'direct') split.direct += row.sessions;
    else if (medium === 'referral') split.referral += row.sessions;
    else split.other += row.sessions;
  }
  return split;
}

export type TopQuery = { query: string; clicks: number; impressions: number; position: number };

/** Sorts by clicks desc and caps at `limit` — a local safety net; the Search Console fetch also caps rowLimit at the API level. */
export function shapeTopQueries(rows: TopQuery[], limit = 10): TopQuery[] {
  return [...rows].sort((a, b) => b.clicks - a.clicks).slice(0, limit);
}
