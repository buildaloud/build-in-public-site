---
id: TD-0014
title: 'Consolidate Vercel deployments onto Cloudflare'
status: open
priority: P2
rank: 65
area: operations
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0014 · Consolidate Vercel deployments onto Cloudflare

## Why

Deployments are split: buildaloud.ai on Cloudflare Pages, but td.buildaloud.ai, safe-oss-forever.com, and marketplace.buildaloud.ai sit on Vercel Hobby. Hobby prohibits commercial use, which becomes a real problem the moment any of them takes payment; and split hosting splits DNS, analytics wiring, and spend visibility.

## What

Inventory the Vercel projects (frameworks, functions, env vars, domains), assess CF Pages/Workers compatibility per app, migrate what fits, keep DNS centralized on Cloudflare. Anything genuinely Next.js-Vercel-dependent stays and gets budgeted deliberately instead of by default.

## Acceptance

- [ ] Inventory doc of Vercel projects + migration verdict each
- [ ] Migrated apps live on CF with green deploys + DNS
- [ ] Anything remaining on Vercel has an explicit reason + budget line
