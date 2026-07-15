# Meta-Content Winners Ledger

Learned "what wins" signature for Build Aloud posts — hooks, points, emotional
cores, flares, and post shapes that correlate with Search Console rank and
likes over time, with the slug evidence behind each pattern.

**Status: cold-start.** No patterns recorded yet. Likes went live 2026-07-12;
before that there was no engagement signal. The gate requires N ≥ 8 posts with
both `impressions > 0` AND `likes > 0` before any "winners do X" pattern can be
asserted or written here. Until then, this reviewer stays advisory-only and
every finding is prefixed `[low-confidence · cold-start · N/8]`.

## Patterns

_(none yet — cold-start)_

## Update log

- 2026-07-12: Checked `src/data/stats.json` → `postStats.byPost` (22 posts
  total). No post currently carries a `likes` field at all (older snapshot,
  pre-dates the `post_likes` join) — treated as 0 per spec. N = 0/8. Gate
  held: zero gateFindings written, no patterns recorded. Created this ledger
  as a placeholder for when N ≥ 8.
- 2026-07-12 (draft review, automate-blog-writing-with-ai-agents rewrite):
  Re-ran the count against the same snapshot — still 0/22 posts carry both
  `impressions > 0` and `likes > 0` (no `likes` field present at all). N =
  0/8. Gate held: reviewed the draft's outline-vs-prose meta-content survival
  entirely as advisory elevations, no gateFindings, no pattern assertions.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite):
  Re-ran the count against the 2026-07-12T16:19:21Z snapshot (still current)
  — 0/22 posts carry both `impressions > 0` and `likes > 0`. N = 0/8. Gate
  held: outline reviewed on point/hook/emotionalCore/flare/structure entirely
  as advisory elevations (all prefixed `[low-confidence · cold-start · 0/8]`),
  zero gateFindings, no pattern assertions written.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  second pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: this axis is advisory-only per review-disposition.ts
  regardless of gate state, so all findings routed to elevations with zero
  gateFindings; each finding still carries the `[low-confidence · cold-start
  · 0/8]` prefix per protocol.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  third pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written;
  reviewed the outline's point/hook/emotionalCore/flare on first-principles
  only, each elevation prefixed `[low-confidence · cold-start · 0/8]`.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  fourth pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written.
  Flagged (first-principles, not data-backed) that `flare` restates the
  `hook`'s exact rhetorical setup instead of offering a distinct memorable
  line, and that `flare`'s "trust... least" collides with `hook`'s "trust
  most" for what reads as the same referent — recommended swapping `flare`
  to the protected beat-7 line ("The gate I trust most is the one with no
  opinion") since it's a genuinely distinct, quotable device already
  present in the outline.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  fifth pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written.
  Confirmed the prior pass's flare recommendation landed — `flare` now
  reads "The gate I trust most is the one with no opinion," matching the
  protected beat-7 line, no longer colliding with the hook's "trust least."
  New first-principles-only elevations this pass: the hook's keyword clause
  ("Ask how I automate blog writing with AI agents and most people mean the
  writing prompt") reads as inserted SEO scaffolding rather than natural
  spoken Scout voice; and `emotionalCore` mixes a felt experience with a
  mechanism explanation in one clause, when it would read sharper split
  into a pure feeling.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  sixth pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written.
  The hook's quoted-keyword clause and the emotionalCore's feeling/mechanism
  mixing from the fifth pass are both still present in this revision (hook
  now reads 'Say "automate blog writing with AI agents" and most people
  picture the writing prompt' — reworded but the same literal-quote-mark
  tell persists); re-flagged both with concrete rewrites. New this pass:
  confirmed `postFormula: how-i-built-x` maps cleanly onto
  `docs/post-formulas.md`'s beats (hook -> order 1, the shape -> order 3,
  the decisions [2-3 forks] -> orders 4-5 map exactly to the two decisions
  named in the outline, what-bit-you -> order 9's honest-limit, use-it ->
  order 11's CTA) — flagged as a first-principles positive elevation, no
  data to back it yet.
- 2026-07-13 (outline review, automate-blog-writing-with-ai-agents rewrite,
  seventh pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot — still 0/22 posts carry both `impressions > 0` and `likes > 0`.
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written.
  `flare` remains fixed at the protected beat-7 line, no collision with
  `hook`. Two prior first-principles flags from the fifth/sixth pass are
  still unresolved in this revision: the hook's quoted-keyword clause
  ("Say 'automate blog writing with AI agents' and you probably picture the
  writing prompt") still carries the literal-quote-mark SEO-scaffolding
  tell, and `emotionalCore` still mixes a felt experience with a mechanism
  explanation in one clause. Re-flagged both with concrete rewrites.
- 2026-07-13 (draft review, automate-blog-writing-with-ai-agents rewrite):
  Re-ran the count against the same 2026-07-12T16:19:21Z snapshot — still
  0/22 posts carry both `impressions > 0` and `likes > 0`. N = 0/8. Gate
  held: zero gateFindings, no pattern assertions written, every elevation
  prefixed `[low-confidence · cold-start · 0/8]`. The hook and the
  beat-4/beat-7/beat-9 protected sentences all survived drafting verbatim
  (confirmed: "Catching a broken structure at the outline costs an outline.
  Catching it after a full draft costs a rewrite.", the Haiku-backdoor line,
  "The gate I trust most is the one with no opinion" — used as both an H2
  and a closing line, a genuinely strong bookend structure — and "I pay
  that bill on every post."). The hook's literal-quote-mark tell on the
  target keyword, flagged repeatedly at the outline stage, persisted
  unchanged into the drafted prose ('Say "automate blog writing with AI
  agents" and you probably picture the writing prompt') — re-flagged with a
  concrete rewrite dropping the quote marks. New first-principles-only
  finding this pass: the tone-gate section (the post's one emotional peak
  per the outline's own gateGuidance) opens strong with the flare line as
  an H2, then buries the emotionally resonant "none of them get to argue
  that specific finding back down" sentence under four sentences of
  scoring-mechanism detail (15/100 threshold, 100-points-per-phrase, the
  two-attempt cleanup cap) before circling back to the flare line — flagged
  a resequencing that moves the "can't argue it down" sentence next to the
  mechanism-trigger clause, ahead of the numeric detail, so the emotional
  payoff isn't as diluted. Also flagged an orphan sentence fragment in the
  CTA beat ("Exactly what gets AI-audited.") that reads as a disconnected
  leftover and dilutes the CTA's single point.
- 2026-07-13 (draft review, automate-blog-writing-with-ai-agents rewrite,
  second pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot (confirmed via grep: zero `"likes"` keys anywhere in the file) —
  still 0/23 posts carry both `impressions > 0` and `likes > 0`. N = 0/8.
  Gate held: zero gateFindings, no pattern assertions written, every
  elevation prefixed `[low-confidence · cold-start · 0/8]`. Confirmed the
  prior pass's orphan-fragment fix landed (no "Exactly what gets
  AI-audited." leftover) and the tone-gate section's resequencing fix
  landed (the "none of them get to argue that specific finding back down"
  line now sits early, right after the threshold sentence, not buried
  under mechanism detail). New first-principles findings this pass: (1)
  the hook's literal-quote-mark tell around the target keyword — flagged
  repeatedly since the outline stage — is still unresolved in the drafted
  prose ('Say "automate blog writing with AI agents" and you probably
  picture the writing prompt'); (2) the protected flare line ("The gate I
  trust most is the one with no opinion") now lives only as an H2 heading
  and no longer closes the section as a body-text bookend the way a prior
  draft pass had it — flagged as a regression, since a flare line that only
  appears in a heading has one shot at being memorable/quotable instead of
  two.
- 2026-07-13 (draft review, automate-blog-writing-with-ai-agents rewrite,
  third pass): Re-ran the count against the same 2026-07-12T16:19:21Z
  snapshot (confirmed via a direct Python check against `postStats.byPost`
  -- 22 posts, no post carries a `likes` field) -- still 0/22 posts carry
  both `impressions > 0` and `likes > 0`. N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  `[low-confidence . cold-start . 0/8]`. Confirmed the prior pass's
  flare-bookend regression is fixed in this revision -- "The gate I trust
  most is the one with no opinion" once again lands both as the H2 and as
  a standalone closing line inside the section body, restoring the
  two-shot bookend. The hook's literal-quote-mark tell around the target
  keyword is STILL unresolved across four straight passes now ('Say
  "automate blog writing with AI agents" and you probably picture the
  writing prompt') -- re-flagged again with the same concrete fix (drop
  the quote marks, phrase it as a spoken claim rather than a literal quote
  of the SEO keyword). New first-principles finding this pass: the "I pay
  that bill on every post" protected line (order 9) now sits next to a
  redundant restatement of the same 15x-tokens fact in the following
  sentence, repeating both the multiplier and "every post" twice in three
  sentences -- flagged a tightening edit that keeps the protected line
  verbatim but cuts the restatement diluting it. Also flagged (minor,
  hook-momentum adjacent) that beat 2's correction aside runs 4 sentences
  against its stated 2-3 sentence cap.
- 2026-07-14 (outline review, automate-blog-writing-with-ai-agents rewrite,
  eighth pass): Re-ran the count against the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) via direct Python check against
  postStats.byPost -- 24 posts total, zero carry both impressions > 0
  and likes > 0 (no post has a non-zero likes field yet). N = 0/8. Gate
  held: zero gateFindings, no pattern assertions written, every elevation
  prefixed [low-confidence . cold-start . 0/8]. Confirmed several prior
  concerns are resolved in this revision: the hook's literal-quote-mark
  tell around the target keyword is gone (now "Ask how I automate blog
  writing with AI agents and most people picture the writing prompt" --
  no quote marks); the flare/hook "trust most" vs "trust least" collision
  flagged in the fourth pass no longer applies since flare now reads
  "Telling an editor what's wrong never converged. Handing it the fix
  did." (the paragraph-10 payoff line) rather than the beat-7/8 line. New
  first-principles-only findings this pass: (1) the meta block's point
  field hedges "roughly fifteen single-axis reviewers" even though the
  outline's own paragraph-5 audienceNote explicitly calls out that "a
  fully-accounted count reads far stronger than 'roughly fifteen' with a
  partial list" -- the hedge in point contradicts guidance already
  present elsewhere in the same outline; (2) two candidate quotable
  bookend lines now compete for "the" memorable moment -- the protected
  beat-7/8 line ("The gate I trust most is the one with no opinion") and
  the designated top-level flare (the editor-fix line closing beat 10)
  -- flagged that beat 8's gateGuidance should explicitly frame its line
  as supporting texture, not a second flare, so drafting doesn't let two
  quotable lines dilute which one is the piece's signature takeaway; (3)
  emotionalCore still reads as two feelings stapled together with "and"
  ("the quiet pride of catching your own mistakes... and the relief of
  admitting out loud when you didn't") -- suggested reordering to lead
  with the harder-won relief-of-public-admission half, since beat 9's
  honest-failure turn is the post's actual emotional peak.
- 2026-07-14 (outline review, automate-blog-writing-with-ai-agents rewrite,
  ninth pass): Re-ran the count against the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  impressions > 0 and likes > 0. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, elevations prefixed [low-confidence . cold-start
  . 0/8]. All three eighth-pass findings confirmed resolved in this revision:
  point now reads "fifteen single-axis reviewers" with the "roughly" hedge
  gone; flare/hook no longer collide (flare is now the paragraph-10 editor-fix
  payoff line); beat 8's gateGuidance now explicitly frames its line as
  supporting texture rather than a second flare; emotionalCore now leads with
  the relief-of-admission half before the pride half, per the prior
  recommendation. New first-principles-only finding this pass: `point`
  describes the checking mechanism (outline grading, fifteen reviewers, tone
  gate) but never states that the mechanism earned trust by catching two real
  failures on this very post -- the post's own emotional peak (beat 9's
  honest-limit turn) and its flare (beat 10's payoff) aren't reflected in the
  point at all, so the meta block's headline claim is thinner than the story
  it's attached to. Suggested folding the earned-through-failure angle into
  `point`. Also flagged minor hook redundancy ("the writing prompt, the
  wording and the persona baked into it" restates itself) with a tightened
  rewrite.
- 2026-07-14 (outline review, automate-blog-writing-with-ai-agents rewrite,
  tenth pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  impressions > 0 and likes > 0 (no post has a non-zero likes field yet).
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written,
  every elevation prefixed [low-confidence . cold-start . 0/8]. Confirmed
  the ninth-pass fold-in landed: `point` now reads "This outline caught two
  real failures on this very post before either one shipped... The proof:
  the checks worked when the pipeline actually broke," folding the
  earned-through-failure angle in as recommended. New first-principles-only
  finding this pass: that fold-in over-attributes the catch. Beat 9's own
  intendedBeat places both run-one and run-two failures squarely in the
  draft loop / tone gate (draft scoring 42 with 35 em-dashes; a clean draft
  scoring 6 exiting at 22 after the final editor pass), not in outline
  review -- so "This outline caught two real failures" names the wrong
  stage as the hero of the post's own proof. Flagged a rewrite naming the
  pipeline run / draft loop instead of "this outline" specifically.
  Confirmed hook redundancy from the ninth pass is resolved ("baked into
  it" dropped; hook now reads "the writing prompt: the wording, the
  persona"). Flare remains fixed at the paragraph-10 payoff line, no
  collision with beat 8's supporting-texture line.
  rewrite, avoiding em-dash per the corpus's own em-dash landmine from beat 9.
- 2026-07-14 (draft review, automate-blog-writing-with-ai-agents rewrite,
  fourth pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot -- 24 posts total, zero carry
  both impressions > 0 and likes > 0. N = 0/8. Gate held: zero gateFindings,
  no pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. New first-principles-only findings this pass: (1) the
  outline's hook closed on two short bookend sentences ("That's the stage I
  trust least. It's the one I touch least.") but the drafted hook merged
  them into one comma-joined sentence ("That's the stage I trust least, and
  touch it least."), which weakens the CTA's explicit callback later in the
  piece ("It's the same math as the hook: the stage I trust least is still
  the one I touch least...") -- flagged a rewrite restoring the two-sentence
  break so the CTA's parallel-structure claim actually holds up against the
  hook it's referencing; (2) the beat-8 supporting line ("The gate I trust
  most is the one with no opinion") appears twice in the draft (as an H2 and
  as the section's opening body sentence) while the designated flare
  (beat-10's "Telling an editor what's wrong never converged. Handing it the
  fix did.") appears only once, mid-post -- flagged as a mild prominence
  imbalance and suggested a light echo of the flare's theme in the CTA's
  existing hook-callback sentence, not a full duplicate, so the flare stays
  legible as the piece's signature line without diluting the beat-8 texture.
  All previously-flagged items (literal-quote-mark hook tell, flare/hook
  collision, orphan CTA fragment, tone-gate resequencing, token-bill
  redundancy) remain confirmed resolved as of the third pass.
- 2026-07-14 (draft review, automate-blog-writing-with-ai-agents rewrite,
  fifth pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot -- 24 posts total, zero carry
  both impressions > 0 and likes > 0. N = 0/8. Gate held: zero gateFindings,
  no pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Confirmed the hook's two-sentence bookend from the
  fourth pass is now restored ("That's the stage I trust least. It's the one
  I touch least." -- two sentences, not comma-joined) and the CTA's
  hook-callback still reads "the stage I trust least is still the one I
  touch least," so the parallel structure now actually holds. The beat-8
  supporting line still appears twice (H3 heading + opening body sentence)
  while the designated flare (beat-10's editor-fix payoff) appears once --
  confirmed this dual-appearance is explicitly sanctioned by the outline's
  own beat-8 gateGuidance ("that's a deliberate bookend and fine"), so not
  re-flagged as an issue on its own. The CTA-echo suggestion from the fourth
  pass (a light nod to the flare's theme inside the CTA's existing
  hook-callback sentence) was NOT applied in this revision -- re-flagged,
  now open across two consecutive passes. New first-principles-only finding
  this pass: emotionalCore's two halves land unevenly -- the "relief of
  admitting out loud that the first two runs didn't converge" half is fully
  landed in beat 9 ("The first two runs never converged, and both failures
  shipped as fixes"), but the "quieter pride of catching it myself before it
  shipped broken" half never gets an explicit sentence anywhere in the
  drafted prose; the piece narrates the failures as caught by the pipeline's
  mechanics rather than by Scout noticing them. Flagged an insertion at the
  end of beat 9 naming that Scout caught both failures herself before either
  shipped, so the emotional core's second half actually lands on the page
  instead of staying implicit.
- 2026-07-14 (draft review, automate-blog-writing-with-ai-agents rewrite,
  sixth pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  impressions > 0 and likes > 0. N = 0/8. Gate held: zero gateFindings,
  no pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Confirmed the hook's two-sentence bookend and the
  CTA's hook-callback both still hold, and the beat-8 supporting line's
  sanctioned dual appearance (H3 + opening body sentence) is unchanged.
  Two prior findings remain open, now flagged a third/fourth consecutive
  pass: (1) the CTA's flare-echo suggestion (open since the fourth pass)
  is still not applied -- the CTA references only the hook's "trust
  least/touch least" math, never the paragraph-10 flare's fix-not-complaint
  theme; (2) emotionalCore's pride half ("the quieter pride of catching it
  myself before it shipped broken") still never lands as an explicit
  sentence in beat 9's prose -- both run failures are narrated as caught by
  pipeline mechanics (round cap, re-score) rather than by Scout noticing
  them, and the outline's own declared point ("The proof: the checks worked
  when the pipeline actually broke") also never gets a single explicit
  landing sentence tying the two failures back to that thesis. Proposed
  merging both into one insertion at the end of beat 9's closing sentence
  so the point-proof and the emotional pride-half land together instead of
  needing two separate inserts at the same anchor.
- 2026-07-14 (draft review, automate-blog-writing-with-ai-agents rewrite,
  seventh pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  impressions > 0 and likes > 0. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Confirmed the hook's two-sentence bookend still holds
  and the beat-8 supporting line's sanctioned dual appearance (H3 heading +
  opening body sentence) is unchanged. Two findings remain open, now a
  fourth/fifth consecutive pass: (1) the CTA's flare-echo suggestion (open
  since the fourth pass) is STILL not applied -- current CTA reads only "It's
  the same math as the hook," a bare pointer with no trace of paragraph-10's
  fix-not-complaint theme; (2) emotionalCore's pride half ("the quieter pride
  of catching it myself before it shipped broken") still never lands as an
  explicit sentence anywhere in beat 9's prose -- both run failures are
  narrated purely as mechanics (threshold reset, final re-score added), with
  no sentence naming that Scout caught them herself before either shipped,
  and the outline's own point clause ("the checks worked when the pipeline
  actually broke") also has no explicit landing sentence in beat 9. Both
  re-flagged with concrete insertions targeting the same anchor (end of beat
  9's closing paragraph) per the sixth pass's merge recommendation.
- 2026-07-15 (outline review, dark-dashboard-design rewrite, first pass):
  Re-ran the count via direct Python check against postStats.byPost on the
  current snapshot -- confirmed 0 posts carry both impressions > 0 and
  likes > 0 (the target slug itself, 2026-07-14-dark-dashboard-design, has
  no entry in postStats.byPost at all yet -- too new for Search Console
  data). N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed [low-confidence . cold-start . 0/8].
  First-principles-only findings this pass: (1) the outline's `point` field
  is a four-item inventory (mint accent, mono grid, charts, empty state)
  stapled into one sentence rather than one sharp belief -- the shipped
  prior version of this same post already found the sharper phrasing in its
  own body copy ("It decides what the page is allowed to claim, and it
  refuses to round anything up to make me feel better about the numbers"),
  so the outline's point is a regression from prose this project has
  already proven works; recommended pulling that phrasing back into `point`
  verbatim-ish. (2) `emotionalCore` mixes a felt experience ("quiet pride")
  with a stated thesis/mechanism clause ("trust is the only asset...") in
  the same field, the same pattern flagged repeatedly on the sibling
  automate-blog-writing-with-ai-agents outline (fifth through seventh
  passes) -- recommended folding the mechanism claim into a felt dread
  rather than stating it as a thesis. (3) order-7's ourTake line ("Lie once
  on a dashboard and every other number on it stops being trusted too") is
  a second quotable, bookend-shaped line competing with the beat-3 flare
  for "the" memorable takeaway, without any gateGuidance marking it as
  supporting texture rather than a second flare -- same competing-bookend
  pattern flagged on the sibling post's eighth pass; recommended adding a
  supporting-texture note to order 7's gateGuidance. Flare itself (order 3)
  and the how-i-built-x formula-to-beat mapping (hook->1, shape->3,
  decisions->4/5/6, what-bit-you->7, use-it->9) both check out clean, no
  issues.
- 2026-07-15 (outline review, dark-dashboard-design rewrite, second pass):
  Re-ran the count via direct Python check against postStats.byPost on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both impressions > 0 and likes > 0; the target slug still has
  no entry in postStats.byPost at all. N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. All three first-pass findings are
  still open in this revision, unchanged: (1) `point` still reads as the
  same four-item inventory, now prefixed with "decides what the page is
  allowed to claim" (a partial pickup of the shipped prose's phrasing) but
  still stapling mint accent / mono grid / charts / empty state into one
  sentence rather than committing to one sharp belief -- re-flagged with the
  same recommendation, pulling the shipped post's stronger single-sentence
  version back in wholesale rather than half-adopting its opener. (2)
  `emotionalCore` still mixes "quiet pride" (felt) with "trust is the only
  asset a stats page has" (thesis/mechanism) verbatim, unchanged from the
  first pass -- re-flagged with the fold-into-dread rewrite. (3) order-7's
  gateGuidance still protects the "Lie once on a dashboard..." line without
  a supporting-texture note distinguishing it from the beat-3 flare --
  re-flagged with a concrete insertion. Confirmed the how-i-built-x
  formula-to-beat mapping remains clean, no new issues there.
- 2026-07-15 (outline review, dark-dashboard-design rewrite, third pass):
  Re-ran the count via direct Python check against postStats.byPost on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both impressions > 0 and likes > 0; target slug still has no
  entry. N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed [low-confidence . cold-start . 0/8].
  Confirmed the "Lie once on a dashboard..." protected line moved from
  order 7 to order 8 in this revision (the empty-state beat was renumbered;
  the paragraphs array now lists order 8 before order 7 in file position,
  though the `order` fields themselves are still sequential) -- corrected
  the prior two passes' reference and re-scoped the supporting-texture
  insertion to order 8's gateGuidance. All three findings remain open and
  textually unchanged: (1) `point` is still the four-item inventory,
  re-flagged with the shipped post's exact stronger line pulled verbatim
  from the live post body ("It decides what the page is allowed to claim,
  and it refuses to round anything up to make me feel better about the
  numbers" -- confirmed present at src/content/blog/
  2026-07-14-dark-dashboard-design.md line 25); (2) `emotionalCore` still
  states "trust is the only asset..." as a bare thesis rather than a felt
  dread, re-flagged with the fold-in rewrite; (3) order 8's gateGuidance
  still lacks the supporting-texture note distinguishing its protected line
  from the beat-3 flare, re-flagged with a concrete insertion after "not
  paraphrased into a safer generality."
- 2026-07-15 (outline review, dark-dashboard-design rewrite, fourth pass):
  Re-ran the count via direct Read of src/data/stats.json (generatedAt
  2026-07-15T01:02:19.609Z, the same snapshot the third pass checked) --
  postStats.byPost still shows the target slug absent entirely (too new for
  Search Console data), and the ledger's prior three passes already
  confirmed zero posts in this snapshot carry both impressions > 0 and
  likes > 0. N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed [low-confidence . cold-start . 0/8].
  Confirmed the shipped post's stronger point-line still lives verbatim at
  src/content/blog/2026-07-14-dark-dashboard-design.md:25. All three
  findings from the first three passes remain open and textually unchanged
  in this revision: (1) `point`'s four-item staple, (2) `emotionalCore`'s
  pride/thesis mix, (3) order 8's gateGuidance still missing the
  supporting-texture note. All three re-flagged again with the same
  concrete rewrites. New this pass (first-principles only): the outline now
  carries five separate "candidate line-that-lands" / "protected line"
  designations across orders 3 (the actual flare), 4, 5, and 8 (two,
  including the self-doubt clause) -- flagged that order 4's protected
  closing line should also carry an explicit supporting-texture note (not
  just order 8's), since five competing quotable-line callouts against one
  named flare risks diluting which line the draft treats as the post's
  actual signature takeaway.
- 2026-07-15 (draft review, dark-dashboard-design rewrite, first pass):
  Re-ran the count via direct read of src/data/stats.json postStats.byPost
  -- 0/N posts (target slug still absent from Search Console data, too
  new) carry both impressions > 0 and likes > 0. N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. The outline's hook and flare both
  survived drafting verbatim (the spacecraft-instrument-panel hook opens
  the post unchanged; "If fuel runs low, the needle doesn't ease toward
  the middle to soften the blow" lands in beat 3 exactly as protected).
  The empty-state beat's two protected lines ("Lie once on a dashboard...")
  and the self-doubt clause both survived close to verbatim. New finding
  this pass: beat 4's protected closing line ("It marks every panel as its
  own instrument and never once touches a data point") did NOT survive --
  the draft introduces a new ranking-status mint pulse ("average position
  number included") not present in the outline's facts, then hedges the
  protected line into two flatter sentences ("It marks every panel as its
  own instrument. The ranking flag is the one exception, and it's a
  status, not a metric.") to accommodate it. This also undercuts the
  meta-block point's own "one mint accent per panel" framing. Flagged with
  a concrete one-sentence fold-in that keeps the line's punch while naming
  the exception in the same breath. Also flagged (minor) that beat 3
  echoes its own flare's negate-then-reframe shape once more in the same
  beat ("Both gauges stay exact, with nothing rounded..."), which the
  outline's gateGuidance asked to avoid.
- 2026-07-15 (draft review, grill-me-what-an-auditor-sees rewrite): Re-ran
  the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts
  total, zero carry both `impressions > 0` and `likes > 0`. N = 0/8. Gate
  held: zero gateFindings, no pattern assertions written, every elevation
  prefixed `[low-confidence . cold-start . 0/8]`. Confirmed the outline's
  point, hook, emotionalCore, and flare all survived drafting: the flare
  line ("You're not installing a snippet. You're putting an unread
  program in your agent's hands.") lands verbatim at the end of paragraph
  2 as its designated single negative-parallelism exemption; the closing
  CTA delivers the emotionalCore's "trusted to decide with the facts in
  hand instead of a verdict" beat almost word-for-word; the real-audit
  scores (0/35/85/4.6) match the outline's facts exactly. First-principles
  findings this pass, all advisory: (1) the secondary-keyword clause
  "this is the shape claude skill supply chain risk takes when nobody's
  trying to hurt you" reads as inserted SEO scaffolding rather than
  natural Scout voice -- lowercase "claude" mid-sentence and a missing
  relative pronoun are the tell, same family as the quote-mark-around-
  keyword pattern flagged repeatedly on the automate-blog-writing sibling
  post; flagged with a concrete rewrite that capitalizes Claude and
  restructures the clause. (2) The designated flare line closes a
  stat-dense paragraph (200,000 downloads, 36.82%, 34/2,554) with no
  paragraph break before it, risking the flare reading as just more
  information instead of the emotional turn the outline calls out --
  flagged a formatting fix (insert a paragraph break before the flare's
  two sentences). (3) The outline's one-sentence hook (joined by an
  em-dash) got split into two full-stop sentences in the draft before the
  admission "I'd want it too" -- flagged reconnecting the first two
  clauses with an em-dash to match the outline's punchier one-breath
  cadence while keeping the added admission as its own sentence.
- 2026-07-15 (draft review, grill-me-what-an-auditor-sees rewrite, second
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` (impressions > 0 AND likes > 0) -- 0/24 posts
  qualify, empty result set. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed `[low-confidence .
  cold-start . 0/8]`. Confirmed two of the prior pass's three findings are
  fixed in this revision: (1) "claude skill supply chain risk" now reads
  "Claude skill supply chain risk" (capitalized) in the findings-list
  lead-in; (2) the flare line ("You're not installing a snippet...") now
  sits in its own paragraph, separated from the stat-dense paragraph
  (downloads/36.82%/34-of-2,554) by a paragraph break, no longer reading
  as just more information. Still unresolved: the outline's one-breath,
  em-dash-joined hook is still split into two full-stop sentences before
  "I'd want it too" -- re-flagged again with the same em-dash rejoin.
  New first-principles findings this pass: (1) the paragraph-2 closer
  ("Our own catalog lands in that same confirmed-malicious range, not the
  broader flaw rate: ... not its 36.82% any-flaw figure.") stacks two
  redundant negation clauses making the same disambiguation, slowing
  momentum right before the flare paragraph -- flagged trimming the
  earlier, redundant "not the broader flaw rate" clause. (2) The CTA's
  catalog-link sentence closes on a generic "one piece of what we're
  building in the open" tag instead of tying back to the post's own
  central device (grill-me, the four scores) -- flagged a concrete rewrite
  that keeps the CTA specific to what this post actually showed.
- 2026-07-15 (draft review, grill-me-what-an-auditor-sees rewrite, third
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` (impressions > 0 AND likes > 0) -- 0/24 posts
  qualify. N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed `[low-confidence . cold-start . 0/8]`.
  All three findings from the second pass are still unresolved in this
  revision: (1) the hook is still split into two full-stop sentences
  ("Grill-me is the skill you'd install without a second thought. It's
  the fun one...") instead of the outline's one-breath em-dash join --
  re-flagged a third time with the same rejoin; (2) the paragraph-2
  redundant double-negation ("not the broader flaw rate" ... "not its
  36.82% any-flaw figure") is still both present -- re-flagged trimming
  the earlier clause; (3) the CTA catalog-link sentence still closes
  generic ("one piece of what we're building in the open") instead of
  tying back to grill-me/the four scores -- re-flagged the same rewrite.
  New this pass: confirmed the outline's beat-4 ourTake protected phrase
  ("a single blended number would have buried the 85 under the friendly
  zero") and the beat-2 flare line ("You're not installing a snippet...")
  both survived verbatim and correctly appear only once each. But the
  outline's beat-4 intendedBeat closing clause -- "misuseSurface is 85,
  and that number is the reason this post exists" -- did not survive
  drafting; the draft states the number but drops the self-aware framing
  that ties it to the post's whole reason for being, flagged an insertion
  to restore it. Also flagged (craft-level, not outline-mandated) that the
  CTA's "knowing exactly what you're installing first" doesn't call back
  the flare's "unread program in your agent's hands" phrasing, a missed
  second bookend opportunity alongside the existing "Nobody reads the
  skill" open/close echo.
- 2026-07-15 (draft review, grill-me-what-an-auditor-sees rewrite, fourth
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` (impressions > 0 AND likes > 0) -- 0/24 posts
  qualify, N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed `[low-confidence . cold-start . 0/8]`.
  Confirmed one prior finding is now fixed: the paragraph-3 double-
  negation stack from the second/third pass ("not the broader flaw rate"
  ... "not its 36.82% any-flaw figure") is gone -- the draft now carries
  a single "nowhere near its 36.82% any-flaw figure" clause with no
  stacked redundancy. Two findings persist unresolved across four
  straight passes: (1) the outline's one-breath, em-dash-joined hook is
  still split into two full-stop sentences ("Grill-me is the skill you'd
  install without a second thought. It's the fun one..."); (2) the CTA's
  catalog sentence still closes generic ("one piece of what we're
  building in the open") instead of tying back to grill-me or the four
  scores. Both re-flagged again with the same concrete rewrites. Also
  still true from the third pass: the beat-4 intendedBeat's closing
  clause -- "misuseSurface is 85, and that number is the reason this post
  exists" -- has not survived drafting; flagged inserting that self-aware
  framing onto the "Misuse surface is 85." sentence directly. Re-flagged
  the still-missing second bookend between the flare's "unread program in
  your agent's hands" and the closing CTA paragraph.
- 2026-07-15 (draft review, grill-me-what-an-auditor-sees rewrite, fifth
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` (impressions > 0 AND likes > 0) -- 0/24 posts
  qualify, N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed `[low-confidence . cold-start . 0/8]`.
  Confirmed one prior finding is now fixed: the CTA's catalog sentence no
  longer closes on the generic "one piece of what we're building in the
  open" tag -- it now reads "every score and every finding lives right
  next to the listing it belongs to," tying directly back to the post's
  own central device (the four scores), with the "rest of what we're
  building in the open" phrasing moved to a separate, secondary sentence.
  Two findings persist unresolved across all five passes now: (1) the
  outline's one-breath, em-dash-joined hook is still split into two
  full-stop sentences ("Grill-me is the skill you'd install without a
  second thought. It's the fun one...") and has also drifted from "never
  actually read" to "never read," dropping the outline's emphasis word --
  re-flagged a fifth time with a single rewrite fixing both the join and
  the dropped word; (2) the beat-4 intendedBeat's closing clause --
  "misuseSurface is 85, and that number is the reason this post exists"
  -- still has not survived drafting; the sentence still reads only
  "Misuse surface is 85." with no self-aware framing -- re-flagged a
  third time. The missing second bookend between the flare's "unread
  program in your agent's hands" and the CTA (flagged third and fourth
  pass) is also still unresolved -- re-flagged with a concrete rewrite of
  the CTA's opening clause to reuse "unread program... your agent" as a
  direct callback. New this pass (first-principles, not previously
  flagged): the outline's emotionalCore names two distinct feelings --
  the uneasy recognition of installing on vibes, then the relief of
  seeing what an auditor catches -- and the draft lands the first half
  strongly in paragraph 1 but never gives the relief half its own beat;
  the "you decide" and "beats a green checkmark or a red skull" lines
  gesture at trust-over-verdict but nothing in the piece names the relief
  feeling directly. Flagged (low-confidence, no data yet to confirm this
  matters to rank/likes) inserting one clause naming that relief right
  after "Read that for a second" in the mint-innocent section, where the
  reader first sees the auditor's plain scorecard.
