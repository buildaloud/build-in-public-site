---
id: TD-0013
title: 'Supabase back to free tier on the shared-DB plan'
status: open
priority: P1
rank: 25
area: operations
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0013 · Supabase back to free tier on the shared-DB plan

## Why

The Supabase project serving the TD game got upgraded to a paid plan in June without the usual joint sign-off. The micro-blueprint strategy already calls for one shared free-tier project with product_id separation; paying for a dedicated instance contradicts it.

## What

Audit what on the paid plan is actually used (storage, MAU, any Pro-only feature), migrate the TD game's tables into the shared-project model (product_id columns, RLS), downgrade to free. Coordinate with the tower-defense session for the game-side connection-string/env change.

## Acceptance

- [ ] TD game runs on the free-tier shared project
- [ ] Paid plan cancelled; no Pro-only features left in use
- [ ] Ledger row updated
