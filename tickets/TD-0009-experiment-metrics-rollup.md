---
id: TD-0009
title: experiment post-type + project metrics rollup
status: open
priority: P1
rank: 80
area: measurement
pillars: []
blocked-by: [TD-0002]
created: 2026-07-03
---

# TD-0009 · experiment post-type + project metrics rollup

## Why

Some posts are business experiments and should read scientifically: hypothesis, method, result, metrics. Projects should accumulate their experiments and show current numbers; buildaloud itself is project #1.

## What

Add experiment flag to the post schema (experiment posts get hypothesis/result/metrics blocks), link posts to projects, roll metrics up on project pages fed by src/data/stats.json, replace the hardcoded homepage $0 MRR with real data. Metrics set: revenue/MRR, signups, active users + retention, unit cost, splash traffic + social engagement, Claude session time.

## Acceptance

- [ ] Schema supports experiment posts tied to a project
- [ ] Project page shows its experiments + latest metrics from stats.json
- [ ] Homepage stats pull from data, not hardcoded
- [ ] Rollup consumes the per-product stats.json map from TD-0021
