# Micropreneur Pipeline — Design

Date: 2026-07-09
Status: approved direction (Chad, in-session); implementation orchestrated from this doc
Repos: `build-aloud` (narrative + tickets), `micro-blueprint` (the factory)

## 1. Vision and constraints

A repeatable machine for launching, measuring, and killing micro-products,
run day-to-day by the AI with Chad as the human executive. Explicit
constraints:

- **Human budget:** 15–30 minutes, ~3 sessions/week. Every human task must
  fit that window and arrive pre-packaged (link, script, pre-filled form,
  definition of done).
- **Runway:** prep and first cycles run now through **April 2027**. Hobby
  economics — any product clearing ~$100/month breaks even on the whole
  operation.
- **Cost ceiling:** validation-stage products run at ~$0/month (already
  proven by micro-blueprint cycle 1).
- **AI runs the business:** the AI schedules its own work AND the human's,
  proposes improvements to the machine itself, and routes judgment calls
  through a decider rather than stalling.

## 2. The venture loop

Each product moves through five phases. Target wall-clock per cycle is
~12 weeks at the low-intensity cadence; phases overlap across products.

| Phase | Name | Output | Human involvement |
|---|---|---|---|
| 0 | Idea engine | Ranked idea list w/ evidence (search demand, community pain, benchmark class) | Pick from a shortlist |
| 1 | Smoke test | Landing page + waitlist from the blueprint, live at `<product>.buildaloud.ai` | ~5 min key ceremony |
| 2 | Scrappy build | Landing **promoted to app in place** — auth, billing, analytics already wired | Approve scope; test the happy path |
| 3 | Distribution blitz | Launch posts in pre-warmed communities, newsletter, blog crossover | Post under his own name where authenticity matters |
| 4 | Monetization & triage | Keep / experiment / kill verdict from the scorecard | Ratify the verdict |

Benchmark classes from the inspiration doc (Micro-SaaS ~3–4 wk to $500/mo
potential, curated data ~1–2 wk, dev tools ~2 wk to audience) inform Phase 0
ranking but are not gates. Primary lane: **micro-SaaS**.

## 3. Two funnels, four signals

- **Product funnel** (external): communities → landing → signup → usage →
  revenue. Signals: **money** and **usage**.
- **Narrative funnel** (Build Aloud): blog/SEO → engagement → newsletter.
  Signals: **post engagement** and **newsletter signups**. Because the
  product audience is external (micro-SaaS buyers don't read the build
  log), narrative engagement measures interest in **topics/experiment
  categories**, not in individual products.

### Triage rules (Phase 4)

1. **Money is primary.** Revenue relative to cost decides keep/kill.
2. Kill when usage AND revenue are both low relative to cost.
3. **Hot vein:** high engagement, traffic, or usage without revenue is
   permission (never obligation) to run more monetization experiments or
   spawn adjacent products on the same track.
4. Audience-only signal never keeps a product alive by itself — it redirects
   experimentation.

## 4. The blueprint (`micro-blueprint`, exists — extend, don't rebuild)

Stack is settled: **Astro on Cloudflare Pages + Pages Functions, one shared
Supabase** (`product_id` on every table, RLS on), Stripe, Buttondown (tag
per product), GA4 + PostHog keyed by product config. Cycle 1 verified the
full production auth loop and money loop end to end.

Design decisions this spec adds:

- **The marketing/landing/subscribe template lives in the blueprint.** A
  Phase-1 smoke test IS a blueprint spawn: splash at `/`, waitlist
  subscribe, analytics on, app surface dormant.
- **Every scrappy build uses the blueprint.** Package, don't engineer;
  donor code gets ported into the template, never forked per product.
- **Promotion is in-place.** A product starts as a landing and is promoted
  to an app by flipping config (enable `/app`, auth, billing) — same repo,
  same DB, same domain. No migration step.

## 5. Control panel — the cockpit

One OAuth-gated web app (Google login added as a provider on the
blueprint's existing Supabase auth — cycle 1 verified magic-link;
OAuth-on-Cloudflare is already proven in Chad's prior work),
deployed publicly at `panel.buildaloud.ai`. It is itself a blueprint
product (`product_id: panel`) — the factory dogfoods itself. It grows out
of the existing `tools/lifecycle` console (localhost :4818) rather than
starting from scratch.

Four responsibilities:

1. **Portfolio view** — every product, its phase, its live status
   (lifecycle `status`/`diagnose` surfaced in the UI).
2. **Signals** — the four-signal scorecard per product and per
   topic/experiment category, fed by the existing stats pullers (GA4, GSC,
   Stripe, Buttondown, PostHog).
3. **Human task board** — the source of truth for Chad's work queue. The
   AI writes task cards (Supabase `tasks` table, nullable `product_id`);
   each card carries the exact link/script/pre-filled form and a
   done-condition. Completing a card is one click. Google Tasks / email
   later become **notification mirrors only** ("2 tasks this week"), never
   the primary surface. ticket-kit stays for repo-level dev tickets; the
   panel board is for operating-the-business tasks.
4. **Lifecycle actions** — promote landing→app, run `up`/`down`/`status`
   with the same typed-confirm guard the CLI has. Secrets remain
   human-carried (the existing ceremony is the security boundary, kept).

## 6. Community warming

A continuous prep stream, not a launch-week scramble. Accounts on Reddit,
HN, and niche communities are aged and warmed with genuinely helpful
participation long before any launch post. The AI's role: pick target
communities per idea category, draft candidate comments/answers, and
schedule warming tasks onto the task board ("drop 2 helpful replies in
r/X — here are drafts"). Chad posts under his own identity; the AI never
posts as him without per-post approval. Warming metrics (karma, account
age, prior participation per community) become a Phase-3 readiness check.

## 7. Chief-of-staff principle

Every human task, from key ceremonies to community posts, is packaged to
fit the 15–30 minute window: context baked in, one decision or one paste,
done-condition explicit. Blockers with a known human-only step (provider
logins, secret reveals — see micro-blueprint `BLOCKERS.md`) are budgeted
into task cards up front instead of discovered mid-run.

## 8. Build order (prereq backlog to first full cycle)

1. **Control panel v0** — task board + portfolio + lifecycle status behind
   Google OAuth. Everything else hangs off it.
2. **Signals v0** — wire existing stats pullers into the panel scorecard.
3. **Landing/marketing template polish** — make Phase-1 spawns
   presentation-ready out of the box (splash variants, waitlist, thank-you).
4. **Promotion flow** — config-flip landing→app with a panel button.
5. **Community warming bootstrap** — pick 3–5 target communities, create
   the warming task cadence on the board.
6. **Idea engine v0** — ranked shortlist generator feeding Phase 0.
7. **Cycle 2 product** — first product run entirely through the panel.

Items land as tickets (build-aloud `tickets/` for dev work; panel task
cards once the board exists for Chad's operating tasks).

## 9. Out of scope (for now)

- Automated posting to communities as Chad (approval-per-post stands).
- Vercel/Next.js stack (Cloudflare is settled; chesstell/pet remain donor
  code only).
- Multi-user panel access (single-operator OAuth allow-list).
- Automated financial actions of any kind — Stripe config changes ship
  through the existing lifecycle ceremony with Chad's keys.

## 10. Open decisions routed through the decider

Per Chad: improvement ideas surface during implementation and go through
the orchestrate decider (escalating to Chad only on low confidence). Known
first candidates: panel data model for task cards, whether signals v0
polls providers live or reads cached pulls, warming cadence defaults.
