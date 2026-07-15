---
id: TD-0036
title: agentic-content-pipeline: post-v1 follow-ups from the ship-gate review
status: open
priority: P3
rank: 100
area: content
pillars: []
blocked-by: []
created: 2026-07-14
---

# TD-0036 · agentic-content-pipeline: post-v1 follow-ups from the ship-gate review

## Why

The content pipeline was packaged into a standalone repo
(`~/projects/agentic-content-pipeline`, npx-skills package — private now, public
later). Its Step-9 ship-gate review tiered findings A/B/C: A and B were fixed in
the pre-push wave, C items were deferred. The decider's condition for shipping
was that every C item gets tracked — no silent drops. This ticket is that
tracking, plus one fast-follow discussed with Chad.

## What

Land the deferred C-tier items in `~/projects/agentic-content-pipeline`. Each is
independent — pick any off, in any order:

- [ ] Mock-fetch tests for `gradeSourceUrlsReachable`'s failure paths (404 +
      thrown network error) — tests-reviewer.
- [ ] Add the "dispatched via Agent tool, not a registered subagent" note to the
      9 non-reviewer agent files missing it (drafter, brief-writer,
      seo-researcher, web-researcher, content-judge, fact-checker,
      bullshit-detector, synthesis, content-learner) — prior-art-reviewer.
- [ ] Centralize the 18-line memory protocol duplicated across 14 agent files
      into `references/review-fanout-design.md` with pointers —
      simplicity-reviewer.
- [ ] GraderOpts: either wire from `content-pipeline.config.json` via a helper
      for CI use, or soften the stale comment claiming that wiring exists —
      prior-art-reviewer.
- [ ] Real ledger eviction mechanism (LRU/summarization automation) for the
      docsRoot ledgers; v1 shipped only a manual-trim note — performance-reviewer
      (14b split).
- [ ] Experiment: effort medium (vs high) on the three auto-apply reviewer axes
      (grammar/wordsmith/structure); compare finding quality vs cost —
      performance-reviewer.
- [ ] One-line cross-references between content-judge's weak-hook check and
      hook-reviewer (known overlap, documented in the design doc but not in the
      agent files) — prior-art-reviewer.
- [ ] Dual-ship: add `.claude-plugin/plugin.json` + `agents/` so Claude Code
      plugin users get registered agents while npx-skills users keep prompt-file
      dispatch — discussed with Chad; fast-follow, not v1.

## Acceptance

- [ ] Each checklist item above is independently landable and checked off as it
      ships — no item requires another to land first.
- [ ] All 7 deferred C-tier findings are either landed or explicitly closed with
      a reason (satisfies the decider's no-silent-drops condition).
- [ ] The dual-ship item, if landed, ships as a fast-follow release without
      changing the npx-skills dispatch path for existing users.
