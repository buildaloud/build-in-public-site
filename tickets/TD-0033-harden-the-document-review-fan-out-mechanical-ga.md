---
id: TD-0033
title: Harden the document-review fan-out: mechanical gates + loop tests
status: open
priority: P2
rank: 55
area: content
pillars: []
blocked-by: []
created: 2026-07-12
---

# TD-0033 · Harden the document-review fan-out: mechanical gates + loop tests

## Why

The document-review fan-out (spec:
`docs/specs/2026-07-12-document-review-fanout-design.md`) is an LLM-followed
protocol encoded as content-pipeline SKILL prose, not a code engine — a
deliberate simplicity choice architecture review agreed with. The Step-9
ship-gate review + verify pass fixed the 4 criticals; these are the accepted
residuals. They're the three soundness gaps that only a thin orchestration layer
would close: work the loop currently trusts a subagent to do, and loop behavior
we don't yet test. Tracked debt, not a bug.

## What

- **Precompute the meta-content cold-start count mechanically.** Today
  `meta-content-reviewer.md` runs its own count (posts with `impressions>0 AND
  likes>0` vs threshold 8; live at N=0). Move that count up into the
  SKILL/synthesis layer so it's precomputed and passed in — symmetric with how
  the deterministic tone gate is precomputed — instead of trusting the subagent
  to count.
- **Add a real multi-round loop-integration test.** Only the `isConverged`
  predicate + `classifyDisposition` are unit-tested today
  (`lib/review-disposition.test.ts`). Nothing drives the actual
  round-cap/convergence loop end-to-end. Add a test that runs a deliberately-flat
  draft through the loop and asserts it converges within the round cap.
- **Wire a CI runner for the fixture harness.** The golden + banned-phrase +
  gate-reviewer fixtures at
  `.claude/skills/content-pipeline/eval/review-fixtures/` exist and are diffable,
  but drift-checking is manual (README says "run by hand"). Add an automated
  runner so reviewer-prompt drift is caught in CI.

Lower priority, note only: the Gemini judge half (`runJudgePass`) is inert unless
`GEMINI_API_KEY` is set. It now warns when the key is absent, but the key isn't
configured in the repo — so the judge signal is usually absent and only the
deterministic `scoreText` gate is live.

## Acceptance

- [ ] The meta-content cold-start count is computed in the SKILL/synthesis layer
      and passed into `meta-content-reviewer` (subagent no longer counts itself)
- [ ] A loop-integration test drives a flat draft through the real
      round-cap/convergence loop and asserts convergence within the cap
- [ ] A CI job runs the `review-fixtures/` harness and fails on reviewer-prompt
      drift (no longer "run by hand")
- [ ] Gemini-judge absence is documented as a known gap (key unset → judge signal
      absent, deterministic gate still live)

## Notes

Sibling of the content-pipeline review work: TD-0028 (section-impact reviewer),
TD-0030 (bullshit-detection agent), TD-0031 (build→learn→refactor loop). Spec:
`docs/specs/2026-07-12-document-review-fanout-design.md`.
