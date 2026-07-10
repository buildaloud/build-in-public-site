---
id: TD-0025
title: 'panel v1: absorb the localhost console — one dash for everything'
status: open
priority: P1
rank: 14
area: build
pillars: []
blocked-by: []
created: 2026-07-10
---

# TD-0025 · panel v1: absorb the localhost console — one dash for everything

## Why

Chad (2026-07-10): the deployed panel and the localhost :4818 console are two
different dashes; deployment/teardown/token-ceremony should live in the same
spot as portfolio + tasks. The v0 split was deliberate (deployed surface holds
no provider tokens) — v1 keeps that boundary but unifies the UI.

## What

In micro-blueprint:

1. **Mutations as intents**: panel enqueues `up`/`down`/`redeploy`/`snapshot`
   intents (new `panel_intents` table, allow-list-gated Function writes); a
   local executor (`lifecycle daemon` or on-demand `lifecycle drain`) polls,
   runs the existing verbs with local tokens, and writes results back as
   status rows. `down` keeps typed-confirm in the panel UI AND the executor.
2. **Token ceremony**: panel shows token HEALTH (which of the doctor's keys
   are set/missing — names only, never values) and deep-links each to its
   provider page; the paste itself stays on the factory machine (localhost
   console page or CLI prompt). Secrets never transit the deployed surface.
3. **Google OAuth gate**: once Chad creates the Google OAuth client
   (client id + secret ceremony), enable the provider and prefer it on the
   panel sign-in; magic-link stays as fallback. Allow-list remains the
   authorization gate either way.
4. Retire the console's product-cards UI once parity lands (keep the
   localhost secret-paste page).

## Acceptance

- [ ] Deploy/teardown/redeploy triggered from panel.buildaloud.ai, executed locally, status visible in the panel
- [ ] Typed-confirm on down in both layers
- [ ] Token health visible in the panel with zero secret values server- or client-side
- [ ] Google sign-in works on the panel; non-allow-listed accounts see the restricted notice
