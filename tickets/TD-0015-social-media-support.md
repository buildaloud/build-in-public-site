---
id: TD-0015
title: 'Social media: posting support + metrics ingestion'
status: open
priority: P2
rank: 72
area: marketing
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0015 · Social media: posting support + metrics ingestion

## Why

Marketing stage has no social leg: posts ship with social blurbs nobody
posts, and engagement (the metric Chad wants per experiment) isn't measured
anywhere.

## What

Two halves. POSTING: pick channels (likely X + LinkedIn + Reddit to start),
decide automation level (draft-for-approval vs auto-post via APIs/buffer
tooling), wire the content pipeline's social blurbs into it. METRICS: pull
per-post engagement (impressions, likes, clicks) into scripts/stats/ as a
fourth source feeding stats.json and the experiment rollup (TD-0009). Needs
research first: API access/cost per platform (X API pricing!), what's
scriptable vs manual.

## Acceptance

- [ ] Channel + automation decision documented (Chad approves)
- [ ] Publishing a post produces queued/posted social content
- [ ] Social engagement lands in stats.json per product
