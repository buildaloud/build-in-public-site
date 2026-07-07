import statsJson from '../data/stats.json';
import type { PostStat } from '../../scripts/stats/post-stats';

export type StatsSnapshot = {
  generatedAt: string;
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

export function getRollup(snapshot: StatsSnapshot = defaultSnapshot): {
  totalClicks: number;
  totalImpressions: number;
  postsRankingForTarget: number;
  postsMeasured: number;
} {
  const posts = Object.values(snapshot.postStats?.byPost ?? {});
  const measured = posts.filter((p) => p.scorecard.status === 'measured');
  return {
    totalClicks: posts.reduce((sum, p) => sum + p.clicks, 0),
    totalImpressions: posts.reduce((sum, p) => sum + p.impressions, 0),
    postsRankingForTarget: measured.filter((p) => p.scorecard.status === 'measured' && p.scorecard.rankedForTarget).length,
    postsMeasured: measured.length,
  };
}
