---
id: TD-0002
title: finish stats credentials (GA4 + GSC + Buttondown)
status: open
priority: P0
rank: 10
area: measurement
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0002 · finish stats credentials (GA4 + GSC + Buttondown)

## Why

The stats pullers are built and dry-run clean, but all three sources skip without creds. Every measurement feature downstream (experiment metrics, project rollups) is blocked on this.

## What

Chad-hands steps, ~5 min total: download the buildaloud-stats service-account JSON key to secrets/ga-sa.json and uncomment GOOGLE_SERVICE_ACCOUNT_KEY in .env; grant the SA email Viewer on GA4 property 525612269; add the SA email as a user on the Search Console property; copy the Buttondown API key into .env.

## Acceptance

- [ ] npm run stats:pull prints ga4: ok, searchConsole: ok, buttondown: ok
- [ ] src/data/stats.json has real numbers
