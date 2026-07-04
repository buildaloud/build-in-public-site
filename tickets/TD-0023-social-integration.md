---
id: TD-0023
title: 'social integration: magnet + Bluesky-first queue+approve'
status: open
priority: P2
rank: 23
area: marketing
pillars: []
blocked-by: []
created: 2026-07-04
---

# TD-0023 · social integration: magnet + Bluesky-first queue+approve

## Why

7-lens research fan-out (2026-07-04) returned CONDITIONAL-GO on social:
Bluesky-first with queue+approve, one lead magnet as the spine, human-only
Reddit/HN, PH deferred to ~400 subs. Devil's-advocate pass amended the plan
(tooling verification gates account creation; kill-switch denominated in
subs-per-human-hour vs the referral baseline). Full docs in
`research/social/` (RESEARCH, STRATEGY, CHECKLIST).

## What

Work `research/social/CHECKLIST.md` in order: Gate 0 (Chad's five open
decisions) → Gate 1 (verify Buffer Free API drafts) → Gate 2 (lead magnet +
landing page with UTM attribution) → Phase 1 Bluesky. Browser automation
never posts; accounts/credentials are [USER] ceremonies.

## Acceptance

- Gate decisions recorded in STRATEGY.md (audience, LinkedIn y/n, kill-switch).
- Magnet landing page live with subs-by-source attribution in stats pullers.
- Scout posting daily to Bluesky through the approval queue; copy versioned
  in `social/queue/`.
- Weekly metrics report includes subs-per-human-hour vs referral baseline.
