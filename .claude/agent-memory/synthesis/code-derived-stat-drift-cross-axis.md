---
title: Code-derived numeric stats drift and duplicate across factual-accuracy + technical-honesty
date: 2026-07-15
---

On "automate-blog-publishing-schedule" round 1, `factual-accuracy` and
`technical-honesty` independently converged on the identical defect: an
outline's line-count claim for `schedule.ts` ("about 150 lines") was stale —
a direct read of the file showed 219 lines, because the script grew
(folder-post support, `--status` flag) after the figure was first computed
for an earlier, already-published post. The stale figure had been copied
forward into 8+ locations across the outline (hook, point, and four separate
paragraph nodes' facts/intendedBeat/ourTake fields) with zero re-verification.

**Pre-emptable pattern:** any outline/draft citing a concrete metric about
this project's OWN code (line counts, stage counts, agent counts, script
counts) is citing a number that was true when some EARLIER post was
fact-checked, not necessarily true now — the code keeps moving. Expect
factual-accuracy and technical-honesty to both independently flag the same
stale figure across every location it was copied to; dedup them into one
merged gate edit per location rather than treating them as separate findings.
When synthesizing the fix, grep the actual current source file yourself if a
reviewer's replacement number seems assumption-driven rather than freshly
verified.

This is the same root pattern as `docs/content-pipeline/facts.md`'s
per-post-verified sections (see `reviewer-reverification-vs-facts-md.md`) —
pipeline-stage-count drift is already guarded there. This entry extends the
same caution to ad-hoc code metrics (like a scheduler script's line count)
that have no dedicated facts.md section and so get no automatic staleness
check at all.
