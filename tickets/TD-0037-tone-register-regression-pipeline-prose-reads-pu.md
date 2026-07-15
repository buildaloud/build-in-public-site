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

- [ ] A draft written in the rejected register trips the gate — seed a fixture
      from tonight's 52-post queue output if any post exhibits it.
- [ ] Existing clean posts (and Chad's own writing in the human corpus) do not
      trip the new signals after recalibration.
- [ ] tone-grader.ts scores all three new signals with corpus-calibrated
      weights, covered by tone-grader.test.ts cases.
- [ ] formulaic-reviewer and voice-reviewer name the performative /
      bad-movie-dialogue crutch and flag it quote-and-fix, gated at density.
- [ ] The hand-curated `docs/blog-drafter-pitfalls.md` entries for these tells
      are committed and reference the calibrated thresholds.
- [ ] The human-tone SKILL tell-table lists the three new tells with fix
      patterns.

## Notes

Related, not duplicated: [[TD-0012]] (done) only tightened the gate threshold;
[[TD-0035]] automates the pitfalls ledger later — this ticket lands the
detectors and the hand-curated entries it would build on.
