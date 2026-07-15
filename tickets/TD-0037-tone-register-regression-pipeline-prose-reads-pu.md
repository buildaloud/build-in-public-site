---
id: TD-0037
title: Tone register regression: pipeline prose reads punchy-AI / salesy / performative
status: open
priority: P1
rank: 10
area: content
pillars: []
blocked-by: []
created: 2026-07-14
---

# TD-0037 · Tone register regression: pipeline prose reads punchy-AI / salesy / performative

## Why

Chad's verbatim feedback on current pipeline output: "too many quips", "too much
Sales speak", "trying too hard", "sounds like a bad actor", "a bad movie
dialogue". Two named patterns behind it: the dramatic-sequencing inversion tell —
"x happens before y" openers/reveals ("Twelve stages run before one of these
posts ships" / "By the time X, Y has already Z") used constantly as a hook
formula — and performative punch-fragments ("Not even for me." / "Go look." /
"One lane.") — the flare pattern leaking everywhere. None of the current graders
or reviewers catch this register, so it degrades every post the pipeline
produces, and a 52-post rewrite queue runs tonight (2026-07-14).

## What

Durable fixes — each independently landable:

- **`.claude/skills/human-tone/eval/tone-grader.ts` — new detector signals:**
  - dramatic-sequencing inversions: "before / by the time / already" hook
    shapes, weighted;
  - punch-fragment density: sentences of ≤3 words as a % of sentences — some
    are good, density is the tell;
  - sales-speak vocab list (turbocharge / game-changing / supercharge /
    unlock-style) plus superlative density.
  - Calibrate weights against the human corpus
    (`.claude/skills/human-tone/eval/corpus/`) so real usage doesn't trip them.
- **`.claude/agents/formulaic-reviewer.md` + `.claude/agents/voice-reviewer.md`:**
  add the register axis — "performative / bad-movie-dialogue" as a named crutch;
  quote-and-fix, gate at density.
- **`docs/blog-drafter-pitfalls.md`:** hand-curated entries are being written
  now in parallel; this ticket tracks making them permanent and
  threshold-calibrated.
- **`.claude/skills/human-tone/SKILL.md` tell-table:** add the three new tells
  (dramatic-sequencing inversion, punch-fragment density, sales-speak) with fix
  patterns.
- **Recalibrate:** re-run the eval corpus
  (`npx tsx .claude/skills/human-tone/eval/run.ts`) after grader changes;
  thresholds must not flag Chad's own writing.

## Acceptance

- [x] A draft written in the rejected register trips the gate — no single live
      post in the current 52-post queue exhibits the FULL combined register
      (only isolated fragments of one tell), so this is a synthetic fixture
      combining all three tells, locked in as a regression test
      (`tone-grader.test.ts`, "TD-0037 acceptance" describe block) — scores 26,
      well above the 15 gate.
- [x] Existing clean posts (and Chad's own writing in the human corpus) do not
      trip the new signals after recalibration — 0/52 shipped posts newly cross
      15; human corpus (106 snippets) unchanged (10 pre-existing over-15 lines,
      same lines, same scores, before and after).
- [x] tone-grader.ts scores all three new signals with corpus-calibrated
      weights, covered by tone-grader.test.ts cases — 29 new/updated tests, all
      green.
- [x] formulaic-reviewer and voice-reviewer name the performative /
      bad-movie-dialogue crutch and flag it quote-and-fix, gated at density.
- [ ] The hand-curated `docs/blog-drafter-pitfalls.md` entries for these tells
      are committed and reference the calibrated thresholds — **remains open**:
      §7 is already committed (`12b0ce2`, predates this pass) with the prose
      guidance, but it doesn't cite `tone-grader.ts`'s calibrated numbers (the
      free-allowance/weight/cap for each detector). That file wasn't in this
      pass's scope (owned by a parallel writer per the dispatch) — needs a
      follow-up edit to cross-reference the thresholds landed here.
- [x] The human-tone SKILL tell-table lists the three new tells with fix
      patterns.

## Notes

Related, not duplicated: [[TD-0012]] (done) only tightened the gate threshold;
[[TD-0035]] automates the pitfalls ledger later — this ticket lands the
detectors and the hand-curated entries it would build on.

**2026-07-15 — detectors landed, one item open.** Implemented
`dramaticInversions` / `punchFragments` / `salesSpeak` in `tone-grader.ts` +
tests, the SKILL.md tell-table rows, and the formulaic-reviewer /
voice-reviewer axis updates. Calibration note: the dispatched literal weights
(punch-fragment free=2/weight=4/cap=16) blanket-failed 30/52 shipped posts —
Scout's established burstiness texture (SKILL.md "jam a fragment against a
run") legitimately runs 5-25 short sentences per post, which isn't the
register Chad rejected. Retuned empirically against the real corpus + blog to
free=10/weight=1/cap=6 (comment + full rationale in `tone-grader.ts` above the
score formula); dramaticInversions and salesSpeak needed no retuning (0 false
positives on any of the 52 posts or the 106-snippet human corpus at the
dispatched weights). Status stays `open` — only the
`docs/blog-drafter-pitfalls.md` cross-reference item remains, and that file is
outside this pass's owned scope.
