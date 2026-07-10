import statsJson from '../data/stats.json';
import type { PostStat } from '../../scripts/stats/post-stats';

export type StatsSnapshot = {
  generatedAt: string;
  ga4?: {
    available: boolean;
    reason?: string;
    window?: { startDate: string; endDate: string };
    metrics?: {
      sessions: number;
      totalUsers: number;
      activeUsers: number;
      screenPageViews: number;
      engagementRate: number;
      averageSessionDuration: number;
    };
  };
  searchConsole?: {
    available: boolean;
    reason?: string;
    clicks?: number;
    impressions?: number;
    ctr?: number;
    position?: number;
  };
  postStats?: {
    available: boolean;
    reason?: string;
    window: { startDate: string; endDate: string };
    meta: { unmatchedRows: { gsc: number; ga4: number }; totalRows: number };
    byPost: Record<string, PostStat>;
  };
};

/** Manual `stats:pull` cadence — a badge older than this reads as stale, not current. */
export const STALE_AFTER_DAYS = 30;

const defaultSnapshot = statsJson as StatsSnapshot;

export function getPostStats(slug: string, snapshot: StatsSnapshot = defaultSnapshot): PostStat | null {
  return snapshot.postStats?.byPost[slug] ?? null;
}

export function getStatsAsOf(
  snapshot: StatsSnapshot = defaultSnapshot,
  now: number = Date.now(),
): { date: Date; stale: boolean; ageDays: number } {
  const date = new Date(snapshot.generatedAt);
  const ageDays = Math.floor((now - date.valueOf()) / 86_400_000);
  return { date, stale: ageDays > STALE_AFTER_DAYS, ageDays };
}

export type Rollup = {
  totalPageviews: number;
  totalClicks: number;
  totalImpressions: number;
  postsRankingForTarget: number;
  postsMeasured: number;
  avgPosition: number | null;
};

function rollup(posts: PostStat[]): Rollup {
  const measured = posts.filter((p) => p.scorecard.status === 'measured');
  const ranked = posts.filter((p) => p.position > 0);
  return {
    totalPageviews: posts.reduce((sum, p) => sum + p.pageviews, 0),
    totalClicks: posts.reduce((sum, p) => sum + p.clicks, 0),
    totalImpressions: posts.reduce((sum, p) => sum + p.impressions, 0),
    postsRankingForTarget: measured.filter((p) => p.scorecard.status === 'measured' && p.scorecard.rankedForTarget).length,
    postsMeasured: measured.length,
    avgPosition: ranked.length ? ranked.reduce((sum, p) => sum + p.position, 0) / ranked.length : null,
  };
}

export function getRollup(snapshot: StatsSnapshot = defaultSnapshot): Rollup {
  return rollup(Object.values(snapshot.postStats?.byPost ?? {}));
}

export type SiteMetrics = {
  pageviews: number | null;
  visitors: number | null;
  sessions: number | null;
  engagementRate: number | null;
  avgSessionSeconds: number | null;
  searchCtr: number | null;
  searchPosition: number | null;
};

/** Site-wide GA4 + Search Console vitals; null per field when a source didn't pull. */
export function getSiteMetrics(snapshot: StatsSnapshot = defaultSnapshot): SiteMetrics {
  const ga = snapshot.ga4?.available ? snapshot.ga4.metrics : undefined;
  const sc = snapshot.searchConsole?.available ? snapshot.searchConsole : undefined;
  return {
    pageviews: ga?.screenPageViews ?? null,
    visitors: ga?.totalUsers ?? null,
    sessions: ga?.sessions ?? null,
    engagementRate: ga?.engagementRate ?? null,
    avgSessionSeconds: ga?.averageSessionDuration ?? null,
    searchCtr: sc?.ctr ?? null,
    searchPosition: sc?.position ?? null,
  };
}

/** Rollup scoped to a set of post slugs — powers per-project telemetry. */
export function getProjectRollup(slugs: string[], snapshot: StatsSnapshot = defaultSnapshot): Rollup {
  const byPost = snapshot.postStats?.byPost ?? {};
  return rollup(slugs.map((s) => byPost[s]).filter((p): p is PostStat => Boolean(p)));
}
