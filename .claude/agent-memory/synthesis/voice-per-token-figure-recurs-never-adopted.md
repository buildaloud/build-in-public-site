# voice-fidelity's per-token dollar-figure ask recurs, never adopted

Confirmed 2026-07-16, "rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill"
OUTLINE rounds 1 through 3. `voice-fidelity` keeps asking to swap order 4's
"Cost is pennies per exchange" for a real per-token dollar figure pulled off
the Vercel AI Gateway pricing page. Reasonable ask, but never apply-ready at
synthesis time — synthesis has no live pricing-page access, and the
reviewer's own phrasing concedes "pennies" is an acceptable fallback if no
clean source is on hand. Same disposition three rounds running: not
apply-ready, surfaced only, not applied.

Keep dropping/surfacing-only by default unless a concrete number shows up in
`docs/content-pipeline/facts.md` (i.e. someone actually looked the rate up),
same shape as `technical-honesty-footer-mitigations-declined.md` and
`technical-honesty-slug-migration-never-adopted.md`.

**Cross-axis migration, confirmed 2026-07-16, same post, DRAFT round 4**: the
identical ask resurfaced at draft stage, but this time from `factual-accuracy`
(a GATE-tier axis) rather than `voice-fidelity` (advisory), on the same
"pennies per exchange" Haiku-class-model sentence — proposing to insert
"(as of this writing, roughly $1 in / $5 out per million tokens)". Disposition
tier changed (gate-elevation vs advisory-elevation) but the underlying defect
is identical: still no live-pricing-page access at synthesis time, so the
figure remains unverifiable and non-apply-ready regardless of which axis
carries it. Dropped again, surfaced only. This sentence is ALSO the
well-worn-span-repeat-rewrites.md "Haiku-class model... pennies per exchange"
span (locked since outline r1, "maximally settled" per round-3 synthesis) —
so this round stacked two independent standing-drop patterns on one sentence:
the unverifiable-figure ask (this file) and the well-worn-span churn (that
file), both from different axes (factual-accuracy and structure
respectively), both declined for their own separate reasons. Lesson: track
this ask by SPAN + CLAIM SHAPE ("give me the real per-token rate"), not by
which axis is asking — a gate-tier axis carrying a non-apply-ready ask is
still not apply-ready.
