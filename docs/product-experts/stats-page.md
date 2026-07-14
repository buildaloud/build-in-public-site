# Stats page — expert ledger

Owned by `stats-page-expert`. Read first, update last.

## Data flow (verify against code before trusting)
- `scripts/stats/pull.ts` pulls GA4 + Search Console + Buttondown + Supabase
  `post_likes` (joined per slug into `postStats.byPost[].likes`; 10k-row
  truncation warning exists) → writes `src/data/stats.json` (COMMITTED file).
- `src/pages/stats.astro` renders it at build time. No runtime fetch anywhere.
- Freshness chain: pull ran → committed → pushed → deploy succeeded. Any broken
  link in that chain = stale "as of" on the live page. There is NO scheduled
  cron for stats:pull as of 2026-07-14 — pulls are manual/session-driven.
- GA4 only tracks blog paths; "per product" views blend GA4 blog + Supabase
  signups (known limitation, noted 2026-07-12).

## Gotchas
- Two-deploy race (2026-07-13): concurrent pushes once shipped a production
  deployment missing hashed CSS; deploys are now serialized via a GitHub
  Actions concurrency group. If live page ≠ repo, suspect deploy, then cache.
- The daily 16:00Z rebuild republishes whatever is on main — a stale
  stats.json stays stale through rebuilds; only a new pull changes it.

## OPEN SYMPTOMS (2026-07-14, from Chad's screenshots)
1. Live /stats shows "as of Jul 12, 2026" — two days stale. Expected: diagnose
   which chain link broke (pull never ran since Jul 12 is most likely — no cron
   exists). Decide + propose: scheduled pull (e.g. in the daily rebuild action)
   vs manual cadence.
2. Chad asks "where's the stats page instrument panel thing?" — a blog post
   (drip, ~2026-07-14) describes the /stats redesign as a "spacecraft
   instrument panel" with a 'gathering signal' empty state. Verify the LIVE
   /stats page actually shows that design; if the post describes UI not yet
   deployed, coordinate with digest-expert (the description leaked via the
   digest) and flag the honesty gap.

## Drift log
- 2026-07-14 — ledger created; symptoms above seeded from Chad's report.
