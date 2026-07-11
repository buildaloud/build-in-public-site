---
id: TD-0012
title: tighten pipeline tone gate to <=2
status: done
priority: P3
rank: 99
area: build
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0012 · tighten pipeline tone gate to <=2

## Why

The corpus now scores <= 2 everywhere but the content-pipeline gate still allows < 15; new posts could regress the bar.

## What

Change the gate threshold in .claude/skills/content-pipeline/SKILL.md to <= 2 and note the humanizer-loop pattern (scripts/score-post.ts) as the fix path.

## Acceptance

- [ ] SKILL.md gate reads <= 2 and references score-post.ts
