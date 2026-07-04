---
id: TD-0018
title: 'blueprint: port chesstell Stripe billing'
status: done
priority: P1
rank: 53
area: build
pillars: []
blocked-by: [TD-0016]
parent: TD-0006
created: 2026-07-03
---

# TD-0018 · blueprint: port chesstell Stripe billing

## Why

Chunk 3 of the micro-blueprint (TD-0006), per its blueprint floor.

## What

Port src/billing + functions/api (checkout, webhook, portal) product-aware via config; specs ported and green.

## Acceptance

- [x] Committed with tests green
