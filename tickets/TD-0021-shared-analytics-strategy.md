---
id: TD-0021
title: 'Shared analytics: one GA4/GSC/PostHog, filtered per product'
status: open
priority: P1
rank: 18
area: measurement
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0021 · Shared analytics: one GA4/GSC/PostHog, filtered per product

## Why

Per-product analytics properties would add ceremony to every spawn/flush.
The multi-product pattern says share the property, tag the traffic: gtag
config already stamps product_id on blueprint products; PostHog registers
a product property; a single sc-domain Search Console property covers every
buildaloud.ai subdomain after ONE DNS TXT verification.

## What

1. One-time: verify sc-domain:buildaloud.ai (DNS TXT in the CF zone), grant
   the stats service account on it; decide shared GA4 property (reuse Build
   Aloud's or a dedicated "products" property) and set every blueprint
   product's ga4MeasurementId to it.
2. scripts/stats/pull.ts (buildaloud repo): add per-product breakdown — GA4
   report dimension-filtered by product_id/hostname, GSC filtered by page
   host, Buttondown filtered by tag. stats.json grows a products{} map.
3. lifecycle up/down needs NO analytics steps beyond config; flush = the
   product's traffic simply stops (history retained in shared property).

## Acceptance

- [ ] demo product traffic visible, filterable, in shared GA4
- [ ] stats.json carries per-product numbers (feeds TD-0009 rollup)
- [ ] Spawning a product requires zero analytics-dashboard visits
