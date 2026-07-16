# A gate-tier axis can self-downgrade a repeat finding to elevation

A gate-tier axis (voice-fidelity, flatness, AI-structural-crutches,
link-integrity, outline-structure, etc.) can place a finding in its OWN
`elevations[]` array instead of `gateFindings[]`. That finding is NOT a gate
finding this round, regardless of the axis's overall tier — axis tier caps
what CAN be gate, but whether a specific finding IS gate depends on which
list the reviewer itself placed it in.

Confirmed on "ai-automation-stack" round 4: voice-fidelity self-downgraded
its own round-3 GATE finding (a parenthetical-keyword defect: "Split the
work into narrow stages... (business automation with AI agents, done
right)...") to an elevation ("not gate-worthy but tightenable") even though
the underlying defect (parens instead of the mandated em-dash) still hadn't
landed — synthesis honored the self-downgrade and moved the fix to ADVISORY
rather than re-escalating it to GATE on its own authority.

Round 5: a DIFFERENT gate-tier axis (flatness) picked the same parenthetical
span back up as a fresh, full GATE finding — the self-downgrade only binds
the axis that made it, not the whole army; a sibling gate axis reopening the
same defect with its own rationale is legitimate, not self-escalation
thrash.

**Confirmed round 1, "automate-blog-publishing-schedule" OUTLINE round**:
outline-structure (a gate-tier axis) placed BOTH of its findings in
`elevations[]`, not `gateFindings[]` — neither counted as gate that round
even though one collided directly with a genuinely-gate technical-honesty
finding on the same span. technical-honesty's narrower gate-tier fix won
that collision outright per tier rules, and outline-structure's broader
elevation was forwarded only as a for-consideration alternative. Reinforces:
always check which array (gateFindings vs elevations) a gate-tier axis
actually used before assuming its tier alone makes a finding mandatory.
