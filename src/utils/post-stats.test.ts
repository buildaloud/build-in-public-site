import { describe, expect, it } from 'vitest';
import { getPostStats, getStatsAsOf, getRollup, STALE_AFTER_DAYS, type StatsSnapshot } from './post-stats';
import type { PostStat } from '../../scripts/stats/post-stats';

const measuredHit: PostStat = {
  clicks: 5,
  impressions: 50,
  ctr: 0.1,
  position: 7.2,
  pageviews: 80,
  scorecard: {
    status: 'measured',
    targetKeyword: 'build in the open',
    rankedForTarget: true,
    targetPosition: 7.2,
    targetImpressions: 50,
    targetClicks: 5,
    secondaryHits: 0,
  },
};

const measuredMiss: PostStat = {
  clicks: 0,
  impressions: 0,
  ctr: 0,
  position: 0,
  pageviews: 3,
  scorecard: {
    status: 'measured',
    targetKeyword: 'nothing yet',
    rankedForTarget: false,
    targetPosition: null,
    targetImpressions: 0,
    targetClicks: 0,
    secondaryHits: 0,
  },
};

const insufficientData: PostStat = {
  clicks: 0,
  impressions: 0,
  ctr: 0,
  position: 0,
  pageviews: 0,
  scorecard: { status: 'insufficient-data', reason: 'no-target-keyword' },
};

function snapshot(generatedAt: string, byPost: Record<string, PostStat> = {}): StatsSnapshot {
  return {
    generatedAt,
    postStats: {
      available: true,
      window: { startDate: '2020-01-01', endDate: '2020-01-28' },
      meta: { unmatchedRows: { gsc: 0, ga4: 0 }, totalRows: 0 },
      byPost,
    },
  };
}

describe('getPostStats', () => {
  it('returns null when the post is absent from byPost', () => {
    const snap = snapshot('2020-01-01T00:00:00.000Z', { 'hello-world': measuredHit });
    expect(getPostStats('never-tracked-post', snap)).toBeNull();
  });

  it('returns the PostStat when the post is present', () => {
    const snap = snapshot('2020-01-01T00:00:00.000Z', { 'hello-world': measuredHit });
    expect(getPostStats('hello-world', snap)).toEqual(measuredHit);
  });

  it('returns null when postStats is entirely absent (pre-Run-B stats.json)', () => {
    const snap: StatsSnapshot = { generatedAt: '2020-01-01T00:00:00.000Z' };
    expect(getPostStats('hello-world', snap)).toBeNull();
  });
});

describe('getStatsAsOf', () => {
  const DAY_MS = 86_400_000;

  it('is not stale at ageDays <= STALE_AFTER_DAYS', () => {
    const now = Date.parse('2020-02-01T00:00:00.000Z');
    const snap = snapshot(new Date(now - 29 * DAY_MS).toISOString());
    const result = getStatsAsOf(snap, now);
    expect(result.stale).toBe(false);
    expect(result.ageDays).toBe(29);
  });

  it('is not stale at exactly the STALE_AFTER_DAYS boundary', () => {
    const now = Date.parse('2020-02-01T00:00:00.000Z');
    const snap = snapshot(new Date(now - STALE_AFTER_DAYS * DAY_MS).toISOString());
    const result = getStatsAsOf(snap, now);
    expect(result.ageDays).toBe(STALE_AFTER_DAYS);
    expect(result.stale).toBe(false);
  });

  it('is stale just past the boundary', () => {
    const now = Date.parse('2020-02-01T00:00:00.000Z');
    const snap = snapshot(new Date(now - (STALE_AFTER_DAYS + 1) * DAY_MS).toISOString());
    const result = getStatsAsOf(snap, now);
    expect(result.ageDays).toBe(STALE_AFTER_DAYS + 1);
    expect(result.stale).toBe(true);
  });
});

describe('getRollup', () => {
  it('computes site totals + measured/ranking counts from byPost', () => {
    const snap = snapshot('2020-01-01T00:00:00.000Z', {
      'hello-world': measuredHit,
      'zero-clicks-post': measuredMiss,
      'no-seo-fields-post': insufficientData,
    });
    expect(getRollup(snap)).toEqual({
      totalClicks: 5,
      totalImpressions: 50,
      postsRankingForTarget: 1,
      postsMeasured: 2,
    });
  });

  it('is all-zero when postStats is absent (current empty stats.json)', () => {
    const snap: StatsSnapshot = { generatedAt: '2020-01-01T00:00:00.000Z' };
    expect(getRollup(snap)).toEqual({
      totalClicks: 0,
      totalImpressions: 0,
      postsRankingForTarget: 0,
      postsMeasured: 0,
    });
  });
});
