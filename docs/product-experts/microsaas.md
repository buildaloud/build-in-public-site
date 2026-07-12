# Micro-SaaS / the panel — product expert ledger

The `microsaas-expert` agent's memory. Canonical facts about the **micro-blueprint**
product factory and its **control panel**, kept current by checking the source repo
for drift. Read this FIRST, update it LAST. When a fact here disagrees with a blog
post, the post is wrong — fix the post.

## What it is

**micro-blueprint** is a product factory: one Astro template plus a lifecycle CLI
that spawns, deploys, and tears down validation-stage micro-products at ~$0/month.
`up <id>` provisions everything for one product (Cloudflare Pages project, env
secrets pushed machine-to-machine, build+deploy, custom domain + DNS, Stripe
products/prices/webhook); `down <id> --confirm=<id>` removes all of it. The
**control panel** (`panel`) is a factory-native product that shows every product's
phase/status plus an operator task board.

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Factory repo | `github.com/buildaloud/micro-blueprint` | private, `buildaloud` org; local: `~/projects/micro-blueprint` |
| Control panel | `https://panel.buildaloud.ai` | product_id `panel`; Astro static on Cloudflare Pages; CF project name `panel-buildaloud` |
| Panel app paths | `/panel`, `/panel/tasks`, `/panel/tokens` | `PANEL_PATH = '/panel'` in `src/lib/panel-routes.ts`; injected as Astro routes |
| Demo product | `https://demo.buildaloud.ai` | product_id `demo`; the blueprint wearing a demo badge; marketing splash at `/`, app at `/app` |
| Lifecycle CLI | `npm run lifecycle <verb>` | `tsx tools/lifecycle/cli.ts`; verbs below |
| Setup console | `http://localhost:4818` | `npm run lifecycle setup` — human key-paste ceremony (chmod-600 `.env`) |
| Spawned-product repos | `buildaloud/<id>`, cloned to `~/projects/<id>` | always private, `buildaloud` org |

### Lifecycle CLI verbs (from `tools/lifecycle/cli.ts`)

`up <id>`, `down <id> --confirm=<id>` (only destructive verb), `status <id>`,
`diagnose <id>` (`--json` for machine output), `doctor` (token audit),
`setup` (localhost console), `snapshot <id>` (push panel status), `task-add
--title=<text>` (author a panel task card), `token-health`, `register`, `adopt`.
All verbs are non-interactive / headless-safe except the `down` type-to-confirm and
the setup console.

### Panel wiring (drift-prone)

- The panel is **fed from the factory machine**, via `npm run lifecycle snapshot
  <id>` and `task-add` — NOT from a deployed ingest/API endpoint. Don't describe a
  public "panel ingest API"; there isn't one.
- Deployed panel Functions (`functions/api/panel-*.ts`: `panel-status`,
  `panel-tasks`, `panel-token-health`) and `src/lib/panel-*` modules DO ship into
  every spawned product (like `stripe-webhook`), but stay **inert** without
  `PANEL_ALLOWED_EMAILS` set. Access is gated by a Supabase session plus that email
  allow-list; no provider tokens live on that surface.
- `src/panel/` (the panel's pages) is the only tree excluded from scaffold copies
  (`TEMPLATE_EXCLUDE`); it only builds when `PRODUCT_ID=panel`.

### Retired / do NOT reference

- **No deployed panel ingest endpoint.** Earlier framing imagined the panel
  ingesting status over HTTP; the live design pushes snapshots from the factory
  machine (`lifecycle snapshot`). Any post describing a deployed ingest/report
  endpoint for the panel is drifted — fix it.
- (No retired domains known yet. `panel.buildaloud.ai` and `demo.buildaloud.ai`
  are the live hosts.)

## Other durable facts

- **Stack:** Astro (`output: 'static'`) on Cloudflare Pages + Pages Functions
  (`functions/api/`), one shared free Supabase project (every table carries a
  `product_id` column, RLS on), Stripe (test mode until launch), Buttondown (one
  list, tag per product), GA4 + PostHog keyed by product config. Total infra:
  ~$0/month.
- **Metadata stamping is the teardown trick:** every Stripe object is stamped with
  `product_id` in metadata; `down` queries for its own stamp and removes exactly
  those. Same `product_id` isolation on the DB side.
- **Product registry:** `src/config/products.ts` — the factory holds all entries;
  spawned repos get a single-entry copy. Two entries today: `demo`, `panel`.
- **Email:** magic-link auth sends from `auth@send.buildaloud.ai` (Resend
  `RESEND_FROM`), not a product host — don't treat `send.buildaloud.ai` as a
  product URL.
- **Env vars:** `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (client-safe,
  RLS-fenced), `SUPABASE_SERVICE_ROLE_KEY` (server-only, Pages Functions),
  `PANEL_ALLOWED_EMAILS` (panel gate). Unset Supabase vars degrade gracefully
  (`/app` shows a "not configured" notice).
- **Verification:** `npm test` (vitest), `npm run verify` (build + assert real
  `dist/`), `npm run test:live` (smoke the deployed active product). TDD is the
  workflow; `tsc --noEmit` must stay clean.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/micro-blueprint log --oneline -15` — scan for domain,
   route, CLI-verb, product-id, or CF-project-name changes since this ledger's
   last update.
2. Grep the repo for the live values: `grep -rn "buildaloud.ai" src config functions`
   (domains), `PANEL_PATH` in `src/lib/panel-routes.ts` (panel routes),
   `command === '` in `tools/lifecycle/cli.ts` (verb list), and the `products`
   map in `src/config/products.ts` (ids + domains + `projectName`).
3. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. The
2026-07-29 post `one-command-saas-up-and-down` describes `up`/`down`,
metadata-stamped teardown, the DNS negative-cache war story, and the rebuilt
instance live at `demo.buildaloud.ai` — all true as of this ledger; leave the
narrative alone. Only fix things that are **wrong as of now**: dead links, retired
domains, wrong repo pointers, CLI commands or routes that no longer work. To
reflect a change, add a dated forward-note ("Update: ...") — never edit the past
into the present.

## Drift log

- 2026-07-11 — ledger created. Canonical facts captured from `~/projects/micro-blueprint`
  (README, CLAUDE.md, `src/config/products.ts`, `src/lib/panel-routes.ts`,
  `tools/lifecycle/cli.ts`, `functions/api/`). Live hosts: `panel.buildaloud.ai`
  (control panel, CF project `panel-buildaloud`) and `demo.buildaloud.ai` (demo
  product). No blog drift fixed on this pass (audit-only). Verified the 07-29 post's
  `demo.buildaloud.ai` reference against the live `demo` registry entry — matches,
  left intact.
