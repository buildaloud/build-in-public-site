# A metadata-field flip can get re-flipped back by a different axis next round

Confirmed 2026-07-15, "grill-me" outline, round 2→3. Round 2 changed order-3's
`goal` field from "context" to "proof" per impact's advisory rationale
("context" isn't a named beat job). Round 3, outline-structure proposed
flipping the SAME field back to "context", arguing the opposite: that goal
"proof" repeated four beats in a row (orders 2-5) and "context" would make
the outline's funnel shape legible. Both rationales are locally reasonable in
isolation, which is exactly the trap — a two-value enum field (goal, or any
small fixed-vocabulary metadata field) is cheap for any axis to propose
flipping, and different axes can construct equally-plausible cases for either
value, causing pure back-and-forth churn with no convergence signal.

Pre-empt: when a reviewer proposes changing a metadata field (goal, keyword,
paragraphFormula, etc.) to a value that is the LITERAL OPPOSITE of what a
prior round's synthesis already decided for that exact field, don't treat it
as fresh signal — drop it as oscillation/churn and note the prior round's
rationale, even though it's elevation/advisory tier and technically "new"
this round. Only revisit a settled metadata field if the reviewer's argument
engages with (and rebuts) the reason it was set the way it was, not just
re-argues the reverse case from scratch.

**Generalizes beyond metadata fields to ordinary prose spans an editor
already trimmed.** Confirmed 2026-07-15, "grill-me" DRAFT round 2: round 1's
synthesis applied wordsmith's advisory cut of a filler "actually" ("...never
actually read" → "...never read") and it landed. Round 2, hook proposed
re-adding the exact same word on the exact same span, citing only "the
outline had it" — no rebuttal of wordsmith's filler rationale, just outline
fidelity (which "Tier collision beats outline fidelity" already rules out as
a tiebreaker). Treated as the same oscillation/churn pattern and dropped.
The trigger isn't "is this a metadata field" — it's "does this proposal
literally reverse a prior round's applied edit on the same span without
engaging its rationale." Apply that test to prose reversals too, not just
enum fields.

**Compound case: oscillation as a decoy for a pending two-step reorder.**
Confirmed 2026-07-15, "automate-blog-writing-with-ai-agents" outline round 3
(full detail in full-block-reorder-vs-in-node-gate-fix.md). A header-only
`order:` field swap landed round 2 as step one of a deliberate two-step
physical reorder. Round 3, two reviewers proposed flipping those same
`order:` values back to their pre-round-2 state, each re-describing the raw
field/physical-position mismatch without engaging round 2's SEO
rationale for the swap direction. Recognized as this same literal-reversal
pattern and dropped — but with an added wrinkle: dropping the decoy also
freed the pending step two (the physical block move) to execute that round,
since nothing else touched the nodes. When a settled field sits mid-way
through a multi-step plan, check whether a same-round "reversal" proposal is
just oscillation before treating it as a fresh collision that holds the plan
again.
