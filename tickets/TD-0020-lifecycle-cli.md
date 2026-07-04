---
id: TD-0020
title: 'lifecycle CLI: product up/down/status at the push of a button'
status: in-progress
priority: P1
rank: 15
area: build
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0020 · lifecycle CLI: product up/down/status at the push of a button

## Why

Cycle 1 proved the machine works but took an evening of dashboard driving.
Products must go up and down effortlessly (Chad: "as capable of flushing a
project as adding it"). Every blocker hit in cycle 1 has an API answer once
tokens exist.

## What

tools/lifecycle in micro-blueprint: doctor (one-time token ceremony with
exact provider pages), up (Stripe products/prices/webhook via API, Supabase
seed + auth URLs via Management API, CF Pages + domain + DNS via API/wrangler,
Playwright-light verification), down (flush checklist in code, typed-confirm
gate), status (drift audit). Secrets only ever land in .env by Chad's hand.

## Acceptance

- [ ] `npm run lifecycle -- doctor` lists ceremony; all tokens present
- [ ] `lifecycle down demo` then `lifecycle up demo` completes with only
      the typed confirm + zero dashboard visits (webhook secret note aside)
- [ ] Verification steps prove live splash/app/checkout smoke after up
