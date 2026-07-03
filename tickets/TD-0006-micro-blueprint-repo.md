---
id: TD-0006
title: micro-blueprint: multi-product launchpad repo
status: open
priority: P1
rank: 50
area: build
pillars: []
blocked-by: [TD-0005]
created: 2026-07-03
---

# TD-0006 · micro-blueprint: multi-product launchpad repo

## Why

The core micropreneur asset: one codebase serving many validation-stage products at ~$0/month, so each new idea costs days not weeks.

## What

New repo on the hybrid stack: Cloudflare Pages/Functions hosting, Supabase (auth + one shared DB, product_id on every table), Stripe ported from chesstell src/billing (tested checkout + webhook), Resend magic-link patterns from pet packages/auth as fallback/transactional, PostHog + GA via a single AnalyticsProvider keyed by product. Package, do not rewrite: copy working donor code. Break into subtasks when started.

Blueprint floor per Chad (2026-07-03): Supabase auth (login), splash page with
tagged Buttondown subscribe, Stripe payments AND subscriptions both wired
(checkout, webhook, billing portal, test mode), GA4 + GSC + stats pullers,
PostHog tagged per product. URL/DNS/repo conventions per setup/CLAUDE.md
(splash at <product>.buildaloud.ai, app at /app, one repo per product).

## Acceptance

- [ ] Repo boots locally with one demo product wired end-to-end
- [ ] A second product is spawnable via config (no schema fork)
- [ ] Monthly cost at validation scale: $0
