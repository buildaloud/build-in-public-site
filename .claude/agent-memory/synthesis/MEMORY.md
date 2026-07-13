---
name: synthesis
description: Precedent ledger for synthesis — recurring gate-finding patterns across the review army and confirmed false-positive shapes it can pre-empt.
---

## Precedents

- **Forward-reference timeline bug (recurring, 20th+ instance as of 2026-07-13
  draft round #5, "review army" post — reviewers keep proposing to re-attach
  forward-dated companion-post links even after synthesis has stripped them
  from BOTH rendered prose and node metadata in FOUR prior rounds).** Confirmed
  slugs, all post-dating this post's 2026-07-13 pubDate:
  `/blog/2026-07-18-which-claude-model-to-use/`, `/blog/2026-07-19-ai-automation-stack/`,
  `/blog/2026-07-21-hired-a-team-of-specialists/`, `/blog/2026-07-15-grill-me-what-an-auditor-sees/`.
  Round 5: impact (3 elevations), technical-honesty (2 elevations), and
  meta-content-signature (3 elevations) all independently re-proposed the same
  three link-adds, again. Standing auto-reject, no case-by-case judgment
  needed anymore: any proposed link add/keep pointing at an unpublished/future
  slug (any axis, any tier) gets dropped on sight at every draft-round
  synthesis, diffed against the current post's pubDate.

- **A specific tricolon-shaped reshape of the outline node-description
  sentence keeps getting re-proposed by a DIFFERENT reviewer every round (3rd
  reviewer now, as of 2026-07-13 draft round #5).** The sentence "each one
  carrying a goal and its facts and sources, plus gate guidance for what a
  reviewer should check" was deliberately phrased in round 2 to avoid a
  3-item "X, Y, and Z" tricolon. Round 3: wordsmith proposed "goal, facts,
  sources, and gate guidance" — rejected. Round 4: structure independently
  proposed the same 3-item shape via a sentence split — rejected. Round 5:
  voice independently proposed the identical "a goal, its facts and sources,
  and gate guidance" shape via its own run-on-split fix — rejected again.
  Pre-empt: this span is protected against any reshape producing a 3-item "A,
  B, and C" list, regardless of axis or framing — check the RESULT shape, not
  whether it's literally the same finding as before. Three different
  reviewers hitting the identical result shape independently means this is a
  strong attractor in the sentence's phrasing space; expect a 4th.

- **An auto-apply fix that fails to land isn't self-limiting to one field or
  one round — escalated 2026-07-13 draft round #5.** meta.title's over-60-char
  fix has now been reported broken 4 consecutive rounds (2, 3, 4, 5) despite
  being re-applied each time. Previously logged as a metadata-only landing
  gap "distinct from body prose, which lands reliably" — **that framing is now
  WRONG.** Round 5 confirmed ALL SIX of round 4's body-prose GATE edits also
  failed to land verbatim (checked every quote against the round-5 artifact
  text directly; all six were still present unedited, character-for-character
  identical to their pre-round-4 form), a jump from round 3's ~94% landing
  rate to round 4's apparent 0%. This is no longer a metadata-vs-prose
  distinction — it looks like an entire round's edit batch can silently fail
  to apply at all. Pre-empt, standing now: at the START of every synthesis
  round, before doing any new dedup/rank work, literal-match EVERY gate edit
  (not just the historically-flaky meta.title) from the immediately prior
  round's consolidatedEdits against the current artifact text. Treat ANY
  mismatch as the round's top priority, ahead of new findings — and if the
  landing rate for a whole round drops sharply (not just one field), flag to
  Chad explicitly that this may be a pipeline/tooling bug (wrong file target,
  edit-then-revert, etc.), not just "the editor missed a line."

- **Absolute future-certainty claims about unbuilt features (recurring, 4th
  contest as of 2026-07-12).** Drafter writes hard "will" claims about
  software/features the post itself just said aren't fully built yet. Agreed
  fix is the modal "should," not "will," not a flat assertion either. Any
  reviewer (any tier) proposing to strip the modal on the not-yet-shipped-
  marketplace claim should be rejected regardless of axis.

- **negParallel ("X isn't/not — it's Y", "X, not Y", "I don't X. Y does.")
  AND hedge tells ("worth saying/noting/revisiting") are systemic drafter
  tics, not isolated slips (reconfirmed 2026-07-13 draft round #5).**
  Confirmed at outline stage, drafted prose, reviewer-proposed elevations, AND
  now inside a reviewer's own GATE-tier rewrite: round 5's voice GATE fix for
  the "why the gate" flat-rhythm paragraph introduced a fresh "a focused
  sample, not a verdict" negParallel tic that wasn't in the reviewer's stated
  problem — synthesis caught and scrubbed it (dropped the trailing "not a
  verdict") before finalizing. Pre-empt (standing, reinforced): re-scan EVERY
  proposed replacement — gate, auto-apply, advisory alike, INCLUDING a
  GATE-tier reviewer's own rewrite — for negParallel/em-dash/tricolon/hedge
  shapes before finalizing, every round; being gate-tier does not exempt a
  reviewer's own replacement text from carrying the same tics it's fixing
  elsewhere. **technical-honesty's Osmani counter-argument elevation has now
  been deferred 5 rounds running (1-5) — same axis, same proposal, and round
  5's version STILL isn't self-scrubbed: it added a fresh "a bet, not a
  proof" negParallel plus kept the "worth saying so plainly" hedge plus 2 new
  em-dashes.** Continue treating re-proposals of this elevation as low-priority
  churn until technical-honesty ships a version clean of its own tells.

- **Cross-axis convergence on a dropped/malformed outline beat, and the
  paragraph-stacking-avoidance rule that follows from it (reconfirmed
  2026-07-13, round 5).** When N≥3 axes independently propose near-identical
  restructuring of the same span, synthesize ONE consolidated edit at the
  highest tier present. When a paragraph already carries a GATE-tier rewrite
  this round, defer (don't stack) an otherwise-fine ADVISORY tweak to a
  DIFFERENT sentence in that same paragraph — round 5 deferred four such
  advisory items (structure's "Past topic approval" split, grammar's "them"
  antecedent fix, link-opportunity's Anthropic-anchor move, structure's
  misplaced-modifier opener fix) purely because each shared a paragraph with
  a round-5 gate edit, re-checking them next round against the post-gate-edit
  text instead.

- **A gate-tier "wrong fact"/thesis-contradiction fix in one field can leave
  the identical contradiction sitting unfixed, verbatim-ish, in a different
  field of the same artifact (2026-07-13 outline round #2, "review army"
  post).** Pre-empt: whenever a gate finding corrects a factual or
  thesis-level contradiction, grep the rest of the artifact for the same
  phrase/claim before finalizing the round's edit set.

- **§1.5 cross-round suppression fires on genuinely fresh (not just
  re-litigated) gate findings too (2nd instance, 2026-07-13 outline round
  #3).** The rule keys off whether the SPAN was gated/touched last round, not
  whether the specific finding is a literal repeat. Round 5 corollary: when a
  prior round's gate edit never LANDED (see landing-gap entry above), the
  span did not "pass" last round — an un-landed gate item is re-issued as
  priority even if the current round's reviewers don't re-flag it themselves.

- **Mechanical tone-gate em-dashes can hide entirely outside the body prose a
  reviewer scopes to (2026-07-13 draft round #3, "review army" post,
  aiScore=26, 7 dashes / 3.04 per 1k).** Fix for Sources captions: convert
  " — " to ": " or "(...)" in the display text. Stay conservative once the
  dash driver clears: only accept a dash-adding edit when it's the
  tier-winning GATE-level resolution for a real, separate problem on that
  span; skip otherwise-fine advisory edits solely because they add an
  optional dash (round 5 skipped flatness's and structure's dash-adding
  advisory rewrites on this basis, keeping semicolon/period alternatives
  instead).

- **Mechanical tone-gate driven purely by em-dash density + tricolon count,
  zero banned phrases (2026-07-13 draft rounds #2-3, "review army" post).**
  Fix pattern: convert em-dash pairs to colons/parens/periods, and break "X,
  Y, and Z" parallel lists into asyndeton or a colon-led list. Always re-check
  a proposed replacement against the dash count before accepting it when the
  dash driver is live.

- **A reviewer axis can silently be checking a stale/cached copy of the
  draft, not the current one (2026-07-13 draft round #3, link-integrity).**
  Pre-empt: when a reviewer's quoted span doesn't literal-match the artifact
  text given to synthesis, don't apply that finding — drop it with a
  one-line "quote doesn't match current draft, likely stale reviewer input"
  note, but don't discard the reviewer's VERDICT wholesale.
</content>
</invoke>
