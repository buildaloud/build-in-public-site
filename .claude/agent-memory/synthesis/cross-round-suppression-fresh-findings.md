# §1.5 cross-round suppression fires on fresh, not just re-litigated, findings

2nd instance, 2026-07-13 outline round #3. The rule keys off whether the
SPAN was gated/touched last round, not whether the specific finding is a
literal repeat.

Round 5 corollary: when a prior round's gate edit never LANDED (see
auto-apply-fix-landing-gap.md), the span did not "pass" last round — an
un-landed gate item is re-issued as priority even if the current round's
reviewers don't re-flag it themselves.

**New pattern, confirmed 2026-07-14, "automate-blog-writing-with-ai-agents"
outline round #5**: a span that received a GATE-tier fix TWO OR MORE rounds
ago, confirmed landed and stable ever since, is a recurring magnet for
ADVISORY/elevation-tier reviewers to propose yet another rewrite of it —
even though no gate reviewer has re-flagged it. Round 5 saw FOUR separate
elevation-tier proposals to rewrite THREE different round-3 gate-fixed spans
that had been stable through rounds 4 and 5: order-1 ourTake's closing clause
(hook, emotion_impact, AND flatness each independently proposed a different,
mutually incompatible rewrite — a same-span 3-way collision on top of it),
order-14 ourTake (flatness), and order-11 ourTake (factual-accuracy). None of
these four proposals were literal repeats of each other or of anything
previously dropped — each was a fresh angle on stable text.

§1.5's letter only binds GATE reviewers re-opening a passed span; it doesn't
technically cover an elevation-tier reviewer proposing a *fresh* rewrite of
already-gate-stabilized text. Extend the spirit of the rule to elevations
too: once a span has a confirmed-landed GATE fix that has survived 2+ rounds
untouched, treat new elevation-tier rewrite proposals against it with a much
higher bar than a proposal on never-gated text — the gate fix already
represents the resolution of a real conflict; re-opening it invites the exact
multi-axis collision seen here. Default to dropping unless the new proposal
identifies a genuine NEW defect (e.g., a factual error) rather than a stylistic
preference already litigated once at the gate tier.

**New pattern, confirmed 2026-07-15, "/stats/ dashboard" draft round #4**: the
rule also suppresses a gate finding that is genuinely NOVEL in content (never
raised by any reviewer before, about a span with no edit history at all), as
long as the span itself sat unflagged and untouched through the prior round's
full-document gate review. Round 4's `flatness` axis flagged "Words on a page
can only make this case so far." (Go-look-at-it-yourself opener) as
throat-clearing for the first time ever — not a re-litigation of anything
previously dropped. But that exact sentence existed unchanged through round 3,
where `flatness` reviewed the whole document (verdict needs-work, 2 unrelated
gate findings) and didn't flag it — an implicit pass, since flatness-type
throat-clearing is squarely that reviewer's own wheelhouse and would have
caught it then if present. Dropped per the literal §1.5 text ("no gate
reviewer flagged it" last round + editor didn't touch the span this round),
even though "novel finding" and "re-litigated finding" read as different
things colloquially. Confirms: §1.5's suppression key is span-history
(untouched + previously passed), not finding-novelty — a first-time flag on
stable, previously-passed prose is still suppressed. This bounds thrash from
reviewers finding a "new" nitpick each round on text nobody is touching, which
would otherwise never let a round converge purely on gate-finding volume.

**New pattern, confirmed 2026-07-15, "automate-blog-writing-with-ai-agents"
outline round #2**: §1.5 also governs a GATE-tier axis re-litigating its OWN
prior-round finding at a higher tier, not just a different axis re-opening
someone else's passed span. `voice-reviewer` proposed a rewrite of order-10's
`ourTake` ("Swap the task and the same four boxes apply...") as an
`elevations` entry in round 1 — synthesis correctly routed it to "for your
consideration," not GATE, since the reviewer itself didn't submit it as a
`gateFindings` entry. In round 2, `voice-reviewer` resubmitted the identical
quote/rewrite verbatim, this time inside `gateFindings`, with no new
rationale and no editor touch on the span in between. Treated as suppressed
under §1.5: the reviewer's own round-1 choice not to gate it is the
operative "passed" state, and self-escalating severity round over round
without new information is exactly the thrash §1.5 exists to bound. Drop on
sight; require the reviewer to point at something the editor actually
changed before re-gating a span it previously let pass as advisory-only.

**New pattern, confirmed 2026-07-15, "css-variables-design-system" outline
round #2, a SECOND post — generalizes the self-escalation-thrash pattern
beyond a same-span rewrite to a same-GAP structural proposal.** Round 1's
`outline-structure` axis proposed inserting a dedicated "honest-limit" beat
(the how-i-built-x formula's missing "what bit you" moment) as an
`elevations` entry; round 1's synthesis correctly routed it to "for your
consideration," not GATE. Round 2 saw `outline-structure` resubmit the
identical proposal (same beat topic, same rationale about the formula's
"what bit you" requirement, same insertion point) verbatim, this time inside
`gateFindings` — with no new rationale, and nothing to "touch" since the
proposal targets an absence (a gap between beats) rather than an editable
span. Dropped under the same reasoning as the automate-blog-writing instance:
the axis's own round-1 choice not to gate it is the operative "passed" state.
Confirms the pattern isn't specific to same-span text rewrites — it also
covers a reviewer re-proposing its own previously-elevation-only structural
addition at gate tier with zero new evidence. Pre-empt: when a GATE-tier axis
resubmits ANY finding (span rewrite or structural insertion) that it itself
filed as an elevation last round, drop it again at gate tier and re-route to
elevations-for-consideration, unless the resubmission cites something the
editor actually changed in between.

**New sub-case, confirmed 2026-07-15, "ai-automation-stack" DRAFT round #2**:
this time it wasn't an elevation escalated to gate — `formulaic`
(AI-structural-crutches) re-flagged, as a fresh round-2 GATE finding, the
LITERAL, unmodified text of its OWN round-1 GATE fix on two separate spans
("That hand-off is the actual AI agent workflow automation happening
here..." and "This is what solopreneur automation with AI looks like at the
reporting layer...") — both spans the editor never touched again after
landing the round-1 fix correctly. No new rationale was offered beyond the
same density-count logic that justified round 1's fix. Dropped both as
self-escalation thrash under the same §1.5 spirit as the elevation case
above: a GATE axis doesn't get to keep re-opening its own already-landed fix
on an untouched span just by re-running its own detection heuristic — it
needs a reason the fix didn't actually work (e.g., a landing-gap, see
auto-apply-fix-landing-gap.md) or a genuinely new defect, not a repeat count.
Substantively confirmed too: after this round's OTHER new fixes landed, the
piece's reveal-cadence density dropped below the axis's own stated 3+
threshold, so the two re-flagged spans weren't even still gate-worthy by the
axis's own criterion.

**New pattern, confirmed 2026-07-16, "rate-limiting-an-llm..." draft
round #2→3 — a same-round SWEEP from one axis, mostly stale.** `flatness`
filed 5 gate findings in one round, all the same shape (an "empty
announcement sentence" that should colon-splice into the sentence right
after it), scattered across 5 different beats. Checked each span's
individual touch-history against round 2: only ONE of the five (the "$82,000
bill" narrower-cousin sentence) had actually been touched by round 2's edits
(an auto-apply fix landed on its second half). The other four (Beat 2's "An
LLM breaks that model," Beat 4's "the math behind this box looks almost
quaint" — the well-worn Haiku span, see well-worn-span-repeat-rewrites.md's
4th instance — Beat 6's "One honest asterisk," and Beat 8's "removes a whole
class of failure") sat unflagged and untouched through round 2's full-
document gate review, exactly the "/stats/ dashboard" round #4 pattern above:
first-time flags on stable, previously-passed prose, suppressed regardless of
novelty. **Refined rule**: a same-round MULTI-SPAN sweep from a single gate
axis is not one bulk finding to accept-or-reject together — check each span
in the sweep independently against §1.5. A reviewer running one detection
heuristic across the whole document will catch both genuinely fresh
violations (spans the editor's own recent edit introduced or exposed) and
long-stale ones (spans nobody has touched in 2+ rounds) in the same pass;
only the former survive synthesis, and volume/uniformity of the sweep itself
carries no extra weight either way.
