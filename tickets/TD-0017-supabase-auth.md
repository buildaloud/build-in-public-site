---
id: TD-0017
title: 'blueprint: shared Supabase schema + login'
status: done
priority: P1
rank: 52
area: build
pillars: []
blocked-by: [TD-0016]
parent: TD-0006
created: 2026-07-03
---

# TD-0017 · blueprint: shared Supabase schema + login

## Why

Chunk 2 of the micro-blueprint (TD-0006), per its blueprint floor.

## What

Migration: products/users/orders/events tables with product_id + RLS; Supabase auth (magic link + Google) at /app.

## Acceptance

- [x] Committed with tests green
