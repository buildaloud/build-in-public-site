import { describe, expect, it } from 'vitest';
import { normalizeToSlug, slugFromFilename, computeScorecard, shapePostStats, assertJoinHealth, UNMATCHED_FAIL_RATIO } from './post-stats';

describe('slugFromFilename', () => {
  it('strips the .md extension to match the Astro content-collection post.id', () => {
    expect(slugFromFilename('hello-world.md')).toBe('hello-world');
  });

  it('leaves a filename with no .md extension unchanged', () => {
    expect(slugFromFilename('hello-world')).toBe('hello-world');
  });
});

describe('normalizeToSlug', () => {
  it('strips scheme+host from a GSC full URL', () => {
    expect(normalizeToSlug('https://buildaloud.ai/blog/hello-world/')).toBe('hello-world');
  });

  it('handles a GA4 path with no host', () => {
    expect(normalizeToSlug('/blog/hello-world')).toBe('hello-world');
  });

  it('is trailing-slash tolerant', () => {
    expect(normalizeToSlug('/blog/hello-world/')).toBe(normalizeToSlug('/blog/hello-world'));
  });

  it('maps the homepage to an empty slug', () => {
    expect(normalizeToSlug('https://buildaloud.ai/')).toBe('');
    expect(normalizeToSlug('/')).toBe('');
  });
});

describe('computeScorecard', () => {
  const queryRows = [
    { query: 'build in the open', clicks: 3, impressions: 40, position: 8.5 },
    { query: 'agentic coding', clicks: 1, impressions: 10, position: 15 },
  ];

  it('reports a rank hit for the target keyword', () => {
    const card = computeScorecard({ targetKeyword: 'build in the open' }, queryRows);
    expect(card).toEqual({
      status: 'measured',
      targetKeyword: 'build in the open',
      rankedForTarget: true,
      targetPosition: 8.5,
      targetImpressions: 40,
      targetClicks: 3,
      secondaryHits: 0,
    });
  });

  it('is case-insensitive on the target keyword match', () => {
    const card = computeScorecard({ targetKeyword: 'Build In The Open' }, queryRows);
    expect(card.status).toBe('measured');
    if (card.status === 'measured') expect(card.rankedForTarget).toBe(true);
  });

  it('reports a rank miss when the target keyword has no matching query row', () => {
    const card = computeScorecard({ targetKeyword: 'unrelated keyword' }, queryRows);
    expect(card).toEqual({
      status: 'measured',
      targetKeyword: 'unrelated keyword',
      rankedForTarget: false,
      targetPosition: null,
      targetImpressions: 0,
      targetClicks: 0,
      secondaryHits: 0,
    });
  });

  it('counts secondaryKeywords hits against the query rows', () => {
    const card = computeScorecard(
      { targetKeyword: 'build in the open', secondaryKeywords: ['agentic coding', 'never matched'] },
      queryRows,
    );
    expect(card.status).toBe('measured');
    if (card.status === 'measured') expect(card.secondaryHits).toBe(1);
  });

  it('is honest insufficient-data when there is no targetKeyword', () => {
    expect(computeScorecard({}, queryRows)).toEqual({
      status: 'insufficient-data',
      reason: 'no-target-keyword',
    });
  });

  it('is honest insufficient-data when there are no gsc rows, even with a targetKeyword', () => {
    expect(computeScorecard({ targetKeyword: 'build in the open' }, [])).toEqual({
      status: 'insufficient-data',
      reason: 'no-gsc-rows',
    });
  });
});

describe('shapePostStats', () => {
  const posts = [
    { slug: 'hello-world', targetKeyword: 'build in the open', secondaryKeywords: ['agentic coding'] },
    { slug: 'zero-clicks-post', targetKeyword: 'nothing yet' },
    { slug: 'no-seo-fields-post' },
  ];

  it('emits the declared shape with no url/topQueries leakage', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 5, impressions: 50, ctr: 0.1, position: 7.2 },
    ];
    const gscQueryRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', query: 'build in the open', clicks: 5, impressions: 50, position: 7.2 },
    ];
    const ga4Rows = [{ path: '/blog/hello-world/', pageviews: 80 }];

    const result = shapePostStats(posts, gscPageRows, gscQueryRows, ga4Rows);

    expect(result.byPost['hello-world']).toEqual({
      clicks: 5,
      impressions: 50,
      ctr: 0.1,
      position: 7.2,
      pageviews: 80,
      likes: 0,
      scorecard: {
        status: 'measured',
        targetKeyword: 'build in the open',
        rankedForTarget: true,
        targetPosition: 7.2,
        targetImpressions: 50,
        targetClicks: 5,
        secondaryHits: 0,
      },
    });
    expect(result.byPost['hello-world']).not.toHaveProperty('url');
    expect(result.byPost['hello-world']).not.toHaveProperty('topQueries');
  });

  it('gives a matched post with zero clicks a zeroed entry, not an omission (true-zero)', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/zero-clicks-post/', clicks: 0, impressions: 0, ctr: 0, position: 0 },
    ];
    const result = shapePostStats(posts, gscPageRows, [], []);

    expect(result.byPost['zero-clicks-post']).toEqual({
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
      pageviews: 0,
      likes: 0,
      scorecard: { status: 'insufficient-data', reason: 'no-gsc-rows' },
    });
    expect(result.unmatched).toEqual({ gsc: 0, ga4: 0 });
  });

  it('counts a page-row that matches no known slug as a join-miss, not a post entry', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/some-deleted-or-renamed-post/', clicks: 9, impressions: 90, ctr: 0.1, position: 3 },
    ];
    const ga4Rows = [{ path: '/blog/another-unknown-post/', pageviews: 12 }];

    const result = shapePostStats(posts, gscPageRows, [], ga4Rows);

    expect(result.byPost['some-deleted-or-renamed-post']).toBeUndefined();
    expect(result.byPost['another-unknown-post']).toBeUndefined();
    expect(result.unmatched).toEqual({ gsc: 1, ga4: 1 });
    expect(result.totalRows).toBe(2);
  });

  it('does not create an entry for a post with no data at all', () => {
    const result = shapePostStats(posts, [], [], []);
    expect(result.byPost['no-seo-fields-post']).toBeUndefined();
    expect(Object.keys(result.byPost)).toHaveLength(0);
  });

  it('computes totalRows from gsc page rows + ga4 rows only (not query rows)', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 1, impressions: 1, ctr: 1, position: 1 },
    ];
    const gscQueryRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', query: 'build in the open', clicks: 1, impressions: 1, position: 1 },
      { page: 'https://buildaloud.ai/blog/hello-world/', query: 'agentic coding', clicks: 1, impressions: 1, position: 1 },
    ];
    const ga4Rows = [{ path: '/blog/hello-world/', pageviews: 3 }];

    const result = shapePostStats(posts, gscPageRows, gscQueryRows, ga4Rows);
    expect(result.totalRows).toBe(2);
  });

  it('ignores non-blog site routes entirely — not matched, not unmatched, not counted', () => {
    // A realistic site-wide pull: every route gets crawled/visited, but only
    // /blog/* rows are posts. 10 healthy blog posts + 1 typo'd slug (a genuine
    // join miss) + a handful of non-blog site routes mixed in.
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({ slug: `post-${i}` }));
    const gscPageRows = [
      { page: 'https://buildaloud.ai/', clicks: 40, impressions: 400, ctr: 0.1, position: 3 },
      { page: 'https://buildaloud.ai/privacy', clicks: 2, impressions: 20, ctr: 0.1, position: 5 },
      { page: 'https://buildaloud.ai/stats', clicks: 1, impressions: 10, ctr: 0.1, position: 6 },
      ...manyPosts.map((p, i) => ({
        page: `https://buildaloud.ai/blog/${p.slug}/`, clicks: i, impressions: i * 10, ctr: 0.1, position: 7 + i,
      })),
      { page: 'https://buildaloud.ai/blog/typo-slug/', clicks: 3, impressions: 30, ctr: 0.1, position: 9 },
    ];
    const ga4Rows = [
      { path: '/', pageviews: 200 },
      { path: '/privacy', pageviews: 5 },
      { path: '/blog/post-0/', pageviews: 80 },
    ];

    const result = shapePostStats(manyPosts, gscPageRows, [], ga4Rows);

    // 10 matched gsc + 1 matched ga4 + 1 miss = 12 blog rows; the 3 non-blog
    // routes on each source are excluded entirely (not matched, not unmatched).
    expect(result.totalRows).toBe(12);
    expect(result.unmatched).toEqual({ gsc: 1, ga4: 0 });
    expect(result.byPost['post-0']).toBeTruthy();
    expect(result.byPost['']).toBeUndefined();
    expect(result.byPost['privacy']).toBeUndefined();
    expect(result.byPost['stats']).toBeUndefined();

    // With the old (unscoped) behavior this ratio would be inflated by the
    // non-blog routes; scoped to /blog/ it's a healthy ~8% and must not trip
    // the guard — while the genuine typo-slug miss still counts.
    expect(() => assertJoinHealth(result.unmatched, result.totalRows)).not.toThrow();
  });

  it('a query row for a known post with no page/ga4 data does not create a byPost entry', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 5, impressions: 50, ctr: 0.1, position: 7.2 },
    ];
    const gscQueryRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', query: 'build in the open', clicks: 5, impressions: 50, position: 7.2 },
      { page: 'https://buildaloud.ai/blog/zero-clicks-post/', query: 'orphaned query', clicks: 9, impressions: 90, position: 2 },
    ];

    const result = shapePostStats(posts, gscPageRows, gscQueryRows, []);

    // byPost membership is derived from page/ga4 rows only — 'zero-clicks-post'
    // is a known post but has no page/ga4 row here, so its query-only row must
    // not surface a byPost entry, even though it's a valid slug.
    expect(result.unmatched).toEqual({ gsc: 0, ga4: 0 });
    expect(result.byPost['zero-clicks-post']).toBeUndefined();
    expect(result.byPost['hello-world'].scorecard).toEqual({
      status: 'measured',
      targetKeyword: 'build in the open',
      rankedForTarget: true,
      targetPosition: 7.2,
      targetImpressions: 50,
      targetClicks: 5,
      secondaryHits: 0,
    });
  });
});

describe('shapePostStats — likes join', () => {
  const posts = [
    { slug: 'hello-world', targetKeyword: 'build in the open' },
    { slug: 'zero-clicks-post' },
  ];

  it('counts post_likes rows per matched slug into byPost[slug].likes', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 5, impressions: 50, ctr: 0.1, position: 7.2 },
    ];
    const likeRows = [
      { post_slug: 'hello-world' },
      { post_slug: 'hello-world' },
      { post_slug: 'hello-world' },
    ];

    const result = shapePostStats(posts, gscPageRows, [], [], likeRows);

    expect(result.byPost['hello-world'].likes).toBe(3);
  });

  it('gives a matched post zero likes (true-zero, not omitted) when it has no post_likes rows', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/zero-clicks-post/', clicks: 0, impressions: 0, ctr: 0, position: 0 },
    ];
    const likeRows = [{ post_slug: 'hello-world' }]; // likes exist, but for a different post

    const result = shapePostStats(posts, gscPageRows, [], [], likeRows);

    expect(result.byPost['zero-clicks-post'].likes).toBe(0);
  });

  it('ignores like rows for a slug with no byPost entry — not a join failure, no unmatched bump', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 5, impressions: 50, ctr: 0.1, position: 7.2 },
    ];
    const likeRows = [{ post_slug: 'deleted-post' }, { post_slug: 'deleted-post' }];

    const result = shapePostStats(posts, gscPageRows, [], [], likeRows);

    expect(result.unmatched).toEqual({ gsc: 0, ga4: 0 });
    expect(result.byPost['deleted-post']).toBeUndefined();
  });

  it('defaults likes to an empty join when no likeRows argument is passed at all', () => {
    const gscPageRows = [
      { page: 'https://buildaloud.ai/blog/hello-world/', clicks: 5, impressions: 50, ctr: 0.1, position: 7.2 },
    ];

    const result = shapePostStats(posts, gscPageRows, [], []);

    expect(result.byPost['hello-world'].likes).toBe(0);
  });
});

describe('assertJoinHealth', () => {
  it('throws when the unmatched ratio exceeds the threshold', () => {
    expect(() => assertJoinHealth({ gsc: 2, ga4: 0 }, 10)).toThrow(); // 20% > 10%
  });

  it('passes at exactly the threshold', () => {
    expect(() => assertJoinHealth({ gsc: 1, ga4: 0 }, 10)).not.toThrow(); // exactly 10%
    expect(UNMATCHED_FAIL_RATIO).toBe(0.1);
  });

  it('passes below the threshold', () => {
    expect(() => assertJoinHealth({ gsc: 0, ga4: 0 }, 10)).not.toThrow();
  });

  it('does not divide by zero when there are no rows at all', () => {
    expect(() => assertJoinHealth({ gsc: 0, ga4: 0 }, 0)).not.toThrow();
  });
});
