# Tier always wins, even against a compelling advisory rationale

Confirmed 2026-07-14, "how-i-automate-blog-writing-with-ai-agents" draft,
rounds 3→4→5. Round 3 faced a direct conflict on the "stages I keep" span:
`factual-accuracy` (GATE tier — fact-checker) said Scout keeps three
non-agent stages per SKILL.md's step count; `impact` (ADVISORY tier) argued
for four (incl. scheduling) citing the outline's own `ourTake` field as
higher authority. Round 3's synthesis picked impact's advisory fix over
factual-accuracy's gate finding, reasoning "outline fidelity" — this was a
synthesis error: the tier-collision rule (gate > auto-apply > advisory, no
exceptions) doesn't carve out an exception for "the advisory reviewer cited
a more authoritative source." Round 4's factual-accuracy re-flagged the same
regression, and synthesis reopened it as a genuine gate fix per §1.5 (the
span never actually passed a gate reviewer in round 3 — it was overridden,
not cleared). Round 5: `impact` tried the identical "four stages" reversion
a THIRD time (plus its downstream sub-steps wording), now with
`factual-accuracy` itself passing clean (no gate finding) on the
already-corrected "three stages" text — i.e. the gate-tier axis has actively
confirmed the fix twice running. Dropped again, no re-litigation needed;
treat any future impact re-proposal of "four stages" on this post as
settled churn, not a live conflict. Lesson holds: when adjudicating a
same-span conflict, tier decides first, full stop; if the losing tier's
evidence still seems compelling, log it as a note in the winning edit's
rationale, but don't let it flip the pick. Also check whether an outline
field (`ourTake`, `point`, etc.) itself is factually wrong before treating it
as the tiebreaker — an outline can be wrong too.
