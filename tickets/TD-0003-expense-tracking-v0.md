---
id: TD-0003
title: expense tracking v0 (private ledger + monthly ritual)
status: in-progress
priority: P0
rank: 20
area: operations
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0003 · expense tracking v0 (private ledger + monthly ritual)

## Why

Real expenses exist and are untracked. Cost is a core public metric of the project and matters for the co-founder arrangement; untracked spend compounds into an April problem.

## What

Create a PRIVATE ledger (not this public repo): expenses.csv (date, payee, category, amount, product, notes) in a private repo or sheet. Seed it with known recurring costs (domains, hosting, AI subscriptions, API usage). Add a 15-minute monthly ritual: Claude grooms the ledger, flags anomalies, produces a one-line total for the blog digest.

## Acceptance

- [ ] Ledger exists somewhere private with all known recurring expenses seeded
- [x] One monthly recurring reminder/ritual is set up
- [x] Public site only ever shows aggregate totals
