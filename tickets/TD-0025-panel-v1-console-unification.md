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
spot as portfolio + tasks.

## What

**DIRECTION REVERSED (Chad, 2026-07-11): consolidate into ONE LOCAL cockpit;
RETIRE the deployed panel.** Not a cloud control surface driving a local
executor — just fold the portfolio / task-board / token-health VIEWS into the
existing localhost :4818 console (which already owns up/down/add/token-paste).
panel.buildaloud.ai + its OAuth/allow-list/Functions go away. Rationale (Chad):
local is simpler and cheaper; the deployed panel earned its keep only as proof,
and the local-vs-cloud lesson is itself blog material. The ONLY future reason to
host anything is end-to-end automation (AI spins up projects, runs experiments,
blogs about it) — and that needs the "claude routine" set up first, which is not
this ticket. Superseded: the mutations-as-intents / `panel_intents` design below
is now moot; keep it only as a record of the abandoned cloud-driven approach.

**Migration note:** the deployed-panel work already shipped (portfolio, task
board, token ceremony, Google OAuth, cockpit redesign — micro-blueprint commits
through 241406d). Consolidating means porting those three views into
setup-server.ts and decommissioning the `panel-buildaloud` Pages project + the
Google client + panel Supabase tables. Do this deliberately, not in a rush.

_Superseded cloud-executor plan (kept for the record):_

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
- [x] Token health visible in the panel with zero secret values server- or client-side — `/panel/tokens` live (commit e3d49f8, micro-blueprint); `lifecycle token-health` pushes names+booleans only; migration 0005 applied
- [ ] Google sign-in works on the panel; non-allow-listed accounts see the restricted notice — code wired; blocked on the Google client ceremony (see notes)
