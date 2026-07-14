# Stats page — expert ledger

Owned by `stats-page-expert`. Read first, update last.

## Data flow (verify against code before trusting)
- `scripts/stats/pull.ts` pulls GA4 + Search Console + Buttondown + Supabase
  `post_likes` (joined per slug into `postStats.byPost[].likes`; 10k-row
  truncation warning exists) → writes `src/data/stats.json` (COMMITTED file).
- Full source list (12, each wrapped in `safe()` so one failure doesn't kill
  the run): ga4, searchConsole, buttondown, supabase, stripe, spend,
  agentUsage, timeSpent, gscPage, gscPageQuery, ga4PerPath, postLikes.
- `src/pages/stats.astro` renders it at build time. No runtime fetch anywhere.
- Freshness chain: pull ran → committed → pushed → deploy succeeded. Any broken
  link in that chain = stale "as of" on the live page. There is NO scheduled
  cron for stats:pull as of 2026-07-14 — pulls are manual/session-driven, and
  **cannot be cleanly moved into GitHub Actions** — see "Why pull isn't a CI
  cron" below.
- GA4 only tracks blog paths; "per product" views blend GA4 blog + Supabase
  signups (known limitation, noted 2026-07-12).

## Why pull isn't a CI cron
Checked 2026-07-14: 10 of the 12 sources take normal env-var creds and
*could* run in GitHub Actions if their secrets were added
(`GOOGLE_SERVICE_ACCOUNT_KEY`, `GA4_PROPERTY_ID`, `SEARCH_CONSOLE_SITE`,
`BUTTONDOWN_API_KEY`, `STRIPE_SECRET_KEY`, `SUPABASE_URL`,
`SUPABASE_SECRET_KEY`) — names only, values live in the local `.env`/factory
secrets, never print them. But two sources are structurally local-machine-only
and would just degrade to `unavailable` in CI, not error the whole pull:
- `agentUsage` shells out to `npx ccusage@latest monthly --json`, which reads
  Claude Code's local session-usage logs on *this* machine. No CI equivalent.
- `timeSpent` reads `RIZE_API_TOKEN` from `~/projects/rize-data/.env` — a
  sibling local repo, not something a CI checkout has.
Net: a CI cron could refresh ga4/searchConsole/buttondown/supabase/stripe/spend
daily, but agentUsage and timeSpent would silently go stale/unavailable in
that path, which is its own honesty problem if unflagged. Decision (pending
Chad): either accept that split (document it on `/stats`) or keep the pull
manual/session-driven so all 12 sources refresh together. Not implemented
either way as of 2026-07-14 — this expert only ran the pull manually.

## Gotchas
- Two-deploy race (2026-07-13): concurrent pushes once shipped a production
  deployment missing hashed CSS; deploys are now serialized via a GitHub
  Actions concurrency group. If live page ≠ repo, suspect deploy, then cache.
- The daily 16:00Z rebuild republishes whatever is on main — a stale
  stats.json stays stale through rebuilds; only a new pull changes it.

## OPEN SYMPTOMS — resolved 2026-07-14

1. **Staleness (RESOLVED, uncommitted).** Root cause: pull-not-run — no cron
   exists (confirmed by reading `.github/workflows/deploy.yml`: it only builds
   + deploys, never runs `stats:pull`). Committed `stats.json` `generatedAt`
   was `2026-07-12T16:19:21Z`; last commit touching the file was `06e360c`.
   Ran `npx tsx scripts/stats/pull.ts` locally using the creds already in the
   repo's `.env` — all 12 sources returned `ok`, new `generatedAt`:
   `2026-07-14T16:42:23Z`. Left uncommitted in the working tree per mission
   instructions (`git status` shows `M src/data/stats.json`) — orchestrator to
   commit. See "Why pull isn't a CI cron" above for why this wasn't turned
   into an Actions step instead — for now the fix is: **run
   `npx tsx scripts/stats/pull.ts` manually each time before pushing content
   that references current stats**, and commit the resulting `stats.json`
   diff alongside.

2. **"Where's the instrument panel?" (RESOLVED — no drift, false alarm).**
   Fetched `https://buildaloud.ai/stats/` live and it already shows the full
   dark-instrument-panel design: "// telemetry" label, "Signal across every
   post" h1, "gathering signal — not enough search data yet" empty state
   (`src/components/PostStats.astro:15`), matte charcoal `#0c0e12` /
   `#13161c` panels, single mint `#a3f7bf` accent, Instrument Serif hero
   numbers, JetBrains Mono grids — all confirmed live in
   `src/styles/global.css:12-41` and rendered exactly as
   `src/pages/stats.astro` + `PostStats.astro` define. The drip post
   `src/content/blog/2026-07-14-dark-dashboard-design.md` (pubDate
   2026-07-14T15:00:00Z) is itself live at
   `/blog/2026-07-14-dark-dashboard-design/` (confirmed via fetch) and every
   design claim it makes (colors, fonts, "gathering signal" wording) matches
   the live page. This design was deployed before today's investigation —
   Chad's "isn't live" worry was unfounded this time; nothing to flag to
   digest-expert on this axis.

## Drift log
- 2026-07-14 — ledger created; symptoms above seeded from Chad's report.
- 2026-07-14 — staleness symptom fixed by manual pull (uncommitted, see
  above); instrument-panel-design symptom closed as false alarm (design was
  already live and matches the drip post's claims exactly); documented why
  stats:pull can't cleanly become a CI cron (2 of 12 sources are
  local-machine-only: ccusage agent-usage logs, Rize token from a sibling
  local repo).
