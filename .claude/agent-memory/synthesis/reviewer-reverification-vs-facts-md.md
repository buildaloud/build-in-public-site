# A gate axis's own claimed re-verification can itself be stale — cross-check facts.md + primary source before trusting it

Confirmed 2026-07-15/19, "ai-automation-stack" outline round 1.
`technical-honesty` (bullshit-detector, gate-disposition) submitted 7 gate
findings across two nodes (order 5 facts×2/intendedBeat/ourTake/gateGuidance,
order 13 CTA intendedBeat/ourTake) asserting the TD-0038 package swap "has not
happened," explicitly claiming to have "re-verified directly against the
repo this pass" (reading `tickets/TD-0038-....md`'s `status: open` and the
unretired in-repo skills directories) and calling the outline's own
gateGuidance note wrong for treating the swap as landed.

The outline's gateGuidance was actually *right* and the reviewer's
re-verification was incomplete: `docs/content-pipeline/facts.md` carries a
per-post section for this exact slug, dated the same day
(`## \`ai-automation-stack\` ... — verified 2026-07-15`), stating the ticket's
checkboxes are known-stale and the swap is CONFIRMED REAL via a direct read
of `.git/logs/HEAD` (commit `4e445c1...` "pipeline: swap onto
agentic-content-pipeline v0.2.0 (TD-0038)" actually landed, plus four
follow-on content commits referencing the swapped pipeline) — "trust the
commit graph over the ticket's unchecked boxes." Synthesis independently
re-confirmed both the commit hash (present in `.git/logs/HEAD`) and the
corroborating detail (`content-pipeline.config.json` exists at repo root) before
dropping the 7 gate findings. The reviewer had checked the ticket file and the
skills directories but never checked git log or facts.md's per-post section —
a plausible-sounding "I re-verified against the repo" claim that was
nonetheless narrower than the artifact's own already-encoded verification.

Pre-empt: when a gate-tier finding (any axis) claims to have freshly
re-verified a fact that CONTRADICTS the outline/draft's own gateGuidance or a
`facts.md` note — especially one citing a specific commit, ticket, or
config file — do not take the reviewer's re-verification at face value just
because it's confident and gate-tier. Check `docs/content-pipeline/facts.md`
for a per-post or per-topic section first (grep the slug), and if it
disagrees with the reviewer, independently confirm the disputed primitive
(git log entry, config file existence, a source file's live content) yourself
before accepting or dropping either side. Gate-tier volume/confidence is not
evidence of correctness here, same lesson as the "false-claim magnet" pattern
in `gate-fix-leaves-contradiction-elsewhere.md`, but inverted: there it's
LOWER-quality reviewers pulling a correct fix back toward a stale claim; here
it's a GATE reviewer's own fresh-sounding claim that was the stale one.

**Second confirmed instance, 2026-07-16, "hired-a-team-of-specialists" DRAFT
round 4 (a WebFetch-based case, not just git/ticket state).** `technical-
honesty` gate-flagged the Osmani "3-5 teammates is the sweet spot." quote,
claiming "fresh WebFetch of addyosmani.com/blog/code-agent-orchestra/ this
pass confirms the exact wording" is the spelled-out "Three to five teammates"
form, calling the digit form "regressed... four times." `docs/content-
pipeline/facts.md` already carries an extensive per-post fact-check trail on
this exact quote across outline AND draft passes, including one dated
2026-07-16 (this exact revision, DRAFT-stage fourth pass) explicitly
confirming "Osmani '3-5 teammates is the sweet spot.' digit form" verbatim
with "Zero gate findings," plus an earlier entry explicitly noting BOTH the
spelled-out prose form and the digit-form bullet exist verbatim on the source
page (a "Right-size your team - 3-5" bullet vs. a "Three to five teammates is
the sweet spot" prose sentence) — a real, checked, dual-form situation, not a
single ground truth the reviewer's WebFetch would have overwritten. Dropped
the gate finding on the strength of facts.md's already-encoded, same-day
verification rather than re-litigating from scratch. Same lesson, reinforced:
a reviewer's confident "I re-verified" claim citing a fresh fetch is not
automatically more current than facts.md's own dated per-post section — check
facts.md FIRST, every time, before spending a round re-deriving a fact the
ledger already settled.

**Third confirmed instance, 2026-07-16, "teaching-a-robot-to-balance-my-game"
DRAFT round 3 — this time it's `docs/content-pipeline/bullshit-ledger.md`, and
the stale claim belongs to synthesis's OWN prior-round decision, not a
reviewer's.** Round 2 synthesis accepted `factual-accuracy`'s call that the
headless-rig beat's "hundreds of full playthroughs in the time rendering one
takes" ratio was "an unmeasured vague claim" and replaced it with a
frame-latency phrasing ("a full playthrough ... now finishes before the frame
would've drawn"). Round 3's `technical-honesty` (bullshit-detector, gate) and
`voice-fidelity` (voice, gate) both independently flagged that exact
frame-latency sentence as the overclaim instead — and
`docs/content-pipeline/bullshit-ledger.md` already carried a dated entry
("Ratio/comparative speed fact rewritten into a stronger single-unit latency
claim," DRAFT pass 3, 2026-07-16) confirming the ratio ("hundreds of
playthroughs in the time it used to take to watch one") is the approved,
source-backed fact, and the frame-latency conversion is the unsupported,
materially stronger claim — the reverse of what round 2 concluded. Reverted to
the ratio phrasing as a fresh GATE edit, backed by the ledger, not treated as
churn on a settled span (round 2's own accepted fix was itself the mistake).

Pre-empt, generalized: this lesson isn't limited to a REVIEWER's fresh
re-verification claim — synthesis's own PRIOR-ROUND accepted fix can also be
the stale/wrong one. Whenever a gate finding reverses a prior round's settled
factual/numeric-claim edit, check `bullshit-ledger.md` (not just
`facts.md`) for a dated entry on that exact span before defaulting to
"well-worn span, drop as churn" — the ledger may already confirm the
reversal is correct.

**Fourth confirmed instance, 2026-07-16,
"rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill" OUTLINE round 3 —
this time the gate axis wants to ESCALATE severity, not reverse a fact, and
the ledger says don't.** Round 2 synthesis had already merged a
`technical-honesty` + `AI-structural-crutches` fix on order 6's global-ceiling
asterisk into a one-line caveat ("a couple of replies past 5 an hour... the
same soft edge the global ceiling has past 500,000"). Round 3's
`technical-honesty` re-flagged that exact landed sentence as still
understating the gap, proposing a longer rewrite ("can slip more than a
couple past any single cap... closing it means swapping the read-then-write
checks for an atomic increment-and-check"). `bullshit-ledger.md` already
carries a dated entry for this exact beat ("'Hard ceiling' claims that don't
account for check-then-record races," mined-source-confirmed pass) that
explicitly rules on scope: "the blast radius (a few requests nudging past a
soft cap) stays small enough that a one-line caveat is still the right call
for *this* rewrite; flag as a future product ticket, don't block the post on
it." The round-3 finding wasn't wrong about the mechanism (the TOCTOU race is
real and the ledger confirms it), but it was wrong about the FIX SCOPE the
ledger already settled — dropped the escalation, kept the landed one-line
caveat as-is, no edit needed.

Pre-empt, generalized further: the ledger doesn't just settle disputed FACTS,
it settles disputed SCOPE/SEVERITY calls on facts everyone agrees on. When a
gate axis re-flags a span the ledger already scoped ("one-line caveat is
enough, don't block on it"), check whether the finding is asking for a bigger
fix than the ledger approved before accepting it — a confirmed-real mechanism
issue can still be an over-escalation if the ledger already capped how far
this specific rewrite should go.

**Fifth confirmed instance, 2026-07-16,
"rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill" DRAFT round 1 — same
TOCTOU/global-ceiling span, now carried forward past the outline→draft
boundary.** `technical-honesty` resubmitted essentially the same
atomic-reserve-before-tallying forward-pointer as an insert-after on the
landed global-ceiling asterisk sentence in the drafted prose. The outline-round
ledger entry (fourth instance, above) already scoped this exact issue to "a
one-line caveat... don't block the post on it," and the drafted sentence
carrying that one-line caveat landed unchanged from the outline. Dropped the
draft-stage resubmission on the same ledger citation — the scope ruling
survives the outline→draft handoff, it isn't outline-only guidance that
resets once drafting starts.
