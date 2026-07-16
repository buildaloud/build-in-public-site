# A byte-identical elevation resubmitted next round, unchanged, is not new signal

Distinct from well-worn-span-repeat-rewrites.md (which covers a span drawing
DIFFERENT competing rewrites round over round, often via a multi-reviewer
collision). This pattern is narrower: a SINGLE reviewer resubmits the exact
same quote + replacement text, word-for-word, on a span the editor never
touched, because the editor treated the prior round's advisory-tier
suggestion as optional and didn't apply it — and the reviewer, re-reviewing
unchanged text, naturally reproduces its own prior finding.

Confirmed 2026-07-15/16, "automate-blog-publishing-schedule" outline round
3→4, four instances in one round:
- outline-structure's order-7 bridge-opener elevation (quote "Ground the
  annoyance in external numbers.") — byte-identical to round 3's proposal,
  never landed.
- outline-structure's order-5 payoff-first restructure elevation — byte-
  identical to round 3's proposal, never landed.
- factual-accuracy's Beat-3 direct-Astro-quote insert elevation — byte-
  identical to round 3's proposal, never landed.
- AI-structural-crutches' order-8 tricolon-trim elevation (drops the "and"
  before "scheduling," which reads as grammatically worse, not better) —
  byte-identical to round 3's proposal, never landed.

Confirmed again 2026-07-16 on a SECOND, unrelated post,
"claude-code-subagents-instead-of-one-prompt" outline round 1→2, two
simultaneous instances — the pattern generalizes across posts, not just
within one post's own rounds:
- link-opportunity's Beat-9 links+gateGuidance elevation (add the
  which-claude-model-to-use backlink) — byte-identical replacement text to
  round 1's proposal, never landed.
- technical-honesty's Beat-9 facts "floor" reword elevation ("Anthropic puts
  a rough floor under that" → "Anthropic gives a comparable data point") —
  byte-identical to round 1's proposal, never landed.

**Third consecutive occurrence, confirmed 2026-07-16, same post
("claude-code-subagents-instead-of-one-prompt"), round 2→3**:
link-opportunity resubmitted the identical Beat-9 which-claude-model-to-use
backlink a THIRD time, same quote + replacement as rounds 1 and 2, zero new
rationale. This one axis/span pair has now hit exactly the "3+ rounds
unmodified, zero adoption" threshold this entry's own guidance names below —
treat it as confirmed-never-adopted going forward: keep dropping on sight,
don't even re-mention it in "for your consideration" unless link-opportunity
changes the target or the rationale. The technical-honesty "floor" reword did
NOT recur in round 3 (dropped cleanly after one resubmission), so the
per-elevation threshold for "stop resurfacing" isn't uniform — track each
elevation's own resubmission count, not a blanket rule for the whole axis.

None of these are gate findings (all self-placed in `elevations[]`), so none
block convergence any round. Treat a byte-identical resubmission with zero
new rationale the same as churn: don't re-forward it as if it were fresh
signal worth the editor's attention again — note "already surfaced round N-1,
not adopted, dropping repeat" and move on. If the SAME elevation survives 3+
rounds unmodified with zero adoption, that's a signal the suggestion just
isn't compelling enough to force (it's advisory for a reason) — stop
resurfacing it every round; a single mention in "for your consideration" the
first time it appears is enough. This is the byte-identical-resubmission
sibling of factual-accuracy-recurring-date-stamp.md (which covers the same
mechanism but reworded slightly each time rather than identical text) — both
are variants of "editor declined it, reviewer proposes it again unprompted
because the underlying text didn't change."
