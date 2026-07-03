---
id: TD-0010
title: weekly stats digest automation
status: open
priority: P2
rank: 90
area: measurement
pillars: []
blocked-by: [TD-0002]
created: 2026-07-03
---

# TD-0010 · weekly stats digest automation

## Why

Metrics only matter if reviewed. A weekly automated pull + summary makes the 15-min review ritual possible without Chad remembering to run anything.

## What

GitHub Action (or local cron): weekly stats:pull, commit the snapshot, generate a short Scout-voice delta summary (subs, traffic, search clicks vs last week). Surface it to Chad (email via Buttondown draft, or a digest entry).

## Acceptance

- [ ] Runs weekly without manual trigger
- [ ] Chad reads one short summary instead of three dashboards
