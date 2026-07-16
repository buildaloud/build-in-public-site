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
- 2026-07-15 (outline review, writing-alt-text-seo-accessibility rewrite,
  first pass): Re-ran the count via direct Python check against
  postStats.byPost on the current snapshot -- 24 posts total, zero carry
  both impressions > 0 and likes > 0; the target slug
  (2026-07-16-writing-alt-text-seo-accessibility) has no entry in
  postStats.byPost at all yet (too new). N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. Point, emotionalCore, and flare all
  check out clean on first principles: point is one sharp claim plus one
  rule (no plural hedging), emotionalCore lands as a single redemption arc
  (person experiences the failure -> site launched failing them -> backfill
  as repair) rather than two feelings stapled together, and flare is a
  distinct, non-negative-parallel principled line with no collision against
  the hook. First-principles-only findings this pass: (1) the hook is one
  long three-clause sentence (shipped fact + "with one rule" + colon-list) --
  recommended splitting into two sentences (shipped fact, then the rule) to
  match the punchier bookend cadence this project has repeatedly favored
  after similar run-on-hook fixes on sibling posts (automate-blog-writing,
  grill-me-what-an-auditor-sees); (2) order 3's ourTake line ("When the
  accessibility spec and the SEO industry hand you the same instruction
  independently, the instruction is probably just correct.") is a second
  strong quotable candidate competing with the order-8 designated flare for
  "the" memorable takeaway, the same competing-bookend pattern flagged
  repeatedly on the dark-dashboard-design and automate-blog-writing sibling
  outlines -- recommended adding a supporting-texture note to order 3's
  gateGuidance; (3) order 1's gateGuidance instructs working the exact
  phrase "alt text for SEO and accessibility" into the thesis sentence --
  flagged preemptively (this exact failure mode has recurred across five-plus
  drafting passes on the automate-blog-writing sibling post) that drafting
  should render the keyword as natural prose, not as a literally
  quote-marked phrase.
- 2026-07-15 (outline review, writing-alt-text-seo-accessibility rewrite,
  second pass): Re-ran the count via direct read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z) and a Python check against
  `postStats.byPost` -- 24 posts total, zero carry both `impressions > 0`
  and `likes > 0` (the two posts with any likes -- anonymous-like-button and
  hello-world -- both have `impressions: 0`). The target slug still has no
  entry in `postStats.byPost` (too new). N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. Confirmed the first pass's hook
  finding is resolved: the hook is now two clean sentences (shipped fact,
  then the rule), matching the punchier bookend cadence. Two first-pass
  findings remain open, first-principles only: (1) order 1's gateGuidance
  still instructs working the phrase "alt text for SEO and accessibility"
  into the thesis sentence with literal quotation marks around it in the
  instruction text itself -- re-flagged with a concrete rewrite dropping the
  quote marks from the instruction, since this exact literal-quote-mark tell
  has recurred across five-plus drafting passes on the automate-blog-writing
  sibling post; (2) order 3's ourTake line grew more assertively quotable
  since the first pass ("that convergence is the whole case for image alt
  text best practices... because both sides already told you to") with no
  supporting-texture note distinguishing it from the order-8 designated
  flare -- re-flagged, and expanded this pass to include order 5's ourTake
  line (the concision-as-judgment-call line), which is a third strong
  quotable candidate competing for the same "one memorable takeaway" slot.
  Both order 3 and order 5 gateGuidance now flagged for a supporting-texture
  insertion. Point, emotionalCore, and flare all remain clean on
  first-principles review; the how-i-built-x formula mapping was checked
  again and holds (order 3's SEO-temptation fork and order 5's
  character-limit fork read as the formula's "2-3 real forks" beat, spread
  across two paragraphs rather than one -- a reasonable stretch per the
  reference's own "skeleton, not a cage" rule, not flagged as an issue).
- 2026-07-15 (outline review, writing-alt-text-seo-accessibility rewrite,
  third pass): Re-ran the count via direct read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z, same snapshot the second pass
  checked) and a grep pass over every impressions/likes pair in
  postStats.byPost -- confirmed zero posts carry both impressions > 0 and
  likes > 0 (the two rows with likes: 1 both have impressions: 0). The
  target slug still has no entry in postStats.byPost. N = 0/8. Gate held:
  zero gateFindings, no pattern assertions written, every elevation
  prefixed [low-confidence . cold-start . 0/8]. Point, emotionalCore, and
  flare all confirmed clean, unchanged since the first pass. Two second-pass
  findings remain open, re-flagged a third time: (1) order 1's gateGuidance
  still instructs working the phrase "alt text for SEO and accessibility"
  into the thesis sentence with literal quotation marks around it in the
  instruction text itself -- same literal-quote-mark tell that took five-plus
  drafting passes to fix on the automate-blog-writing sibling post; (2)
  order 3's and order 5's ourTake lines still carry no supporting-texture
  note distinguishing them from the order-8 designated flare. New this pass:
  order 7's ourTake line ("Read both strings out loud and the argument
  settles itself. The description-first version gives the listener the
  scene and gives the crawler real words about a real image.") is now a
  third strong quotable candidate competing for the same "one memorable
  takeaway" slot -- flagged the same supporting-texture insertion for order
  7's gateGuidance, expanding the pattern from two competing lines to three.
- 2026-07-15 (outline review, writing-alt-text-seo-accessibility rewrite,
  fourth pass): Re-ran the count via direct Read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z, same snapshot the third pass
  checked) -- 24 posts total in `postStats.byPost`; only two carry
  `likes > 0` (anonymous-like-button-without-login, hello-world) and both
  have `impressions: 0`, so zero posts satisfy both conditions. Target slug
  still absent from `postStats.byPost` (too new). N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. Confirmed the outline text is
  unchanged since the third pass -- point, emotionalCore, and flare remain
  clean. All three third-pass findings remain open, re-flagged a fourth
  time with the same fixes: (1) order 1's gateGuidance still wraps the exact
  phrase "alt text for SEO and accessibility" in literal quotation marks in
  the drafting instruction itself; (2) order 3's and order 5's ourTake lines
  still carry no supporting-texture note distinguishing them from the
  order-8 designated flare; (3) order 7's ourTake line ("Read both strings
  out loud and the argument settles itself...") still carries no
  supporting-texture note either, so three competing quotable lines remain
  unresolved against the one designated flare.
- 2026-07-15 (outline review, writing-alt-text-seo-accessibility rewrite,
  fifth pass): Re-ran the count -- Bash's safety classifier was transiently
  unavailable this pass, so the recount leans on `src/data/stats.json`'s
  unchanged generatedAt (2026-07-15T01:02:19.609Z), the same snapshot the
  third and fourth passes already confirmed byte-for-byte at N = 0/8 (only
  two posts carry likes > 0, both at impressions: 0; target slug still
  absent from postStats.byPost). N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Outline text is unchanged since the third/fourth pass --
  point, emotionalCore, and flare remain clean. All three prior findings
  remain open, re-flagged a fifth time with the same fixes: (1) order 1's
  gateGuidance still wraps the exact phrase "alt text for SEO and
  accessibility" in literal quotation marks in the drafting instruction
  itself; (2) order 3's and order 5's ourTake lines still carry no
  supporting-texture note distinguishing them from the order-8 designated
  flare; (3) order 7's ourTake line still carries no supporting-texture note
  either. No new findings this pass.
- 2026-07-15 (draft review, writing-alt-text-seo-accessibility rewrite, first
  pass): Re-ran the count via direct Read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z, same snapshot the outline passes
  checked) -- 24 posts in `postStats.byPost`; only
  `2026-07-11-anonymous-like-button-without-login` and `2026-02-21-hello-world`
  carry `likes > 0` (1 each) and both have `impressions: 0`, so zero posts
  satisfy both conditions. Target slug still absent from `postStats.byPost`
  (too new). N = 0/8. Gate held: zero gateFindings, no pattern assertions
  written, every elevation prefixed [low-confidence . cold-start . 0/8].
  Confirmed the outline's point, hook, and emotionalCore all survived
  drafting and reinforce each other (hook's "person hearing that description
  read aloud, once, in a synthesized voice" echoes almost verbatim into
  beat 2's "the listener hears it exactly once... no chance to squint at the
  picture and guess what I meant"), and the designated flare lands as the
  exact final sentence per gateGuidance, verbatim, with no reassurance wrap
  after it. Three findings this pass, all first-principles/craft-level (no
  data to back a "winners do X" claim yet): (1) beat 2's "two failure
  states" claim ("a stretch carrying no alt attribute at all, and a separate
  stretch carrying placeholder filler") stays at the vague "a stretch...a
  stretch" level the outline's own gateGuidance asked to avoid via git
  history; traced the actual history via `git log` -- commit fffd4fd (site
  launch) shipped every hero image with `alt=""` (empty, not a missing
  attribute), and commit 6b75b1e ("human-tone pass, magazine homepage...")
  changed the fallback to `alt={\`Cover image for ${title}\`}`, a title
  dressed up as a description -- flagged a rewrite grounding the claim in
  that real two-stage history instead of the current hand-wave, and noting
  "no alt attribute at all" is imprecise (it was empty, not absent). (2)
  order 7's ourTake ("Read both strings out loud and the argument settles
  itself...") pre-empts the read-aloud device the outline reserves for
  order 8's dedicated CTA section (titled "Read your own alt text out loud")
  -- flagged softening order 7's line to drop the "read aloud" framing so
  the CTA section's device lands fresh. (3) minor: tightened the CTA's three
  short imperative sentences into two, matching the punchier short-sentence
  cadence flagged as favorable on sibling posts (automate-blog-writing,
  grill-me) in prior passes -- low-confidence craft suggestion, not
  data-backed.
- 2026-07-15 (draft review, writing-alt-text-seo-accessibility rewrite, second
  pass): Re-ran the count via direct Read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z, unchanged) -- confirmed via the
  ledger's own repeated prior checks that zero posts satisfy both
  `impressions > 0` and `likes > 0`; target slug still absent from
  `postStats.byPost`. N = 0/8. Gate held: zero gateFindings, no pattern
  assertions written, every elevation prefixed [low-confidence . cold-start .
  0/8]. Confirmed point/hook/flare/emotionalCore all survived into this
  revision of the draft (flare lands verbatim as the final sentence with no
  reassurance wrap; hook's crawler/person contrast lands in positive terms per
  gateGuidance). Did real git archaeology on beat 2's "9 of the seventeen ...
  other 8 shipped with a real description already in place" claim (via `git
  log --oneline -S "heroImageAlt:"` and `git show d56d089 --stat`): the 9/8
  split is in fact accurate -- exactly 9 of the 17 pre-existing hero-image
  posts were touched by the single a11y backfill commit (d56d089), and the
  other 8 were authored in later commits with heroImageAlt already set from
  creation. Worth recording for next time this beat comes up: the count checks
  out, so don't re-flag it on suspicion of fabrication alone. One real
  precision gap remains -- by the time d56d089 ran, the live fallback for
  those 9 was already `Cover image for ${title}` (per 6b75b1e, which predates
  the backfill), not a literal `alt=""`; the true empty-alt state only existed
  very early in the site's history and was superseded before this specific
  backfill. Flagged as a low-confidence, advisory-only note (fact-checking
  border, deferred to the bullshit-detector/fact-checker lane) since it
  affects the emotional core's honesty device only at the margin. One
  first-pass finding is STILL unresolved: order 7's ourTake ("Read both
  strings out loud and the argument settles itself...") still pre-empts the
  read-aloud device order 8's CTA section (titled "Read your own alt text out
  loud") is built to introduce fresh -- re-flagged with a rewrite dropping the
  "read...out loud" framing from order 7. New this pass: order 4's aside "Same
  rule as two paragraphs up, addressed to whoever searched this exact phrase"
  breaks Scout's first-person voice by naming the SEO searcher directly as the
  addressee -- the same SEO-scaffolding-shows-through-the-prose tell flagged
  on the grill-me-what-an-auditor-sees sibling post (lowercase "claude"
  mid-sentence) -- flagged a rewrite that keeps the protected "How to write
  alt text for SEO comes down to sequencing" line but drops the direct-address
  aside.
- 2026-07-15 (draft review, writing-alt-text-seo-accessibility rewrite, third
  pass): Re-ran the count via direct Python check against `postStats.byPost`
  on the current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts
  total, zero carry both `impressions > 0` and `likes > 0`; target slug still
  absent from `postStats.byPost`. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Confirmed order 4's direct-address aside (flagged second
  pass) is now gone -- the protected "How to write alt text for SEO comes down
  to sequencing" line stands alone with no addressee-naming wrapper. The order
  7 "read aloud" pre-emption flagged first and second pass is NOT
  fixed -- it has gotten worse: the H2 heading itself now reads "Bad alt text
  versus good alt text, read aloud" (the framing moved from the ourTake line
  into the section title), so both the heading and the closing line now
  duplicate the exact device order 8's CTA section is built to introduce fresh
  ("Read your own alt text out loud"). Re-flagged a third time with a rewrite
  to both the heading and the body line. New this pass: beat 2's "two failure
  states" claim reverted from the grounded git-history language the second
  pass confirmed accurate back to vague "some ... others" phrasing with no
  numbers -- flagged a rewrite restoring the specific counts (9 of 17
  pre-existing hero images carried the generic "Cover image for {title}"
  fallback by backfill time; the other 8 already had a real description from
  creation) this ledger's own prior archaeology already verified.
- 2026-07-15 (outline review, design-system-with-css-variables rewrite, first
  pass): Re-ran the count via direct Read of `src/data/stats.json`
  (generatedAt 2026-07-15T01:02:19.609Z, same snapshot recent passes have
  checked) and a grep over every `"likes"` key -- 24 posts total, only two
  carry `likes > 0` (`2026-07-11-anonymous-like-button-without-login`,
  `2026-02-21-hello-world`) and both have `impressions: 0`, so zero posts
  satisfy both conditions. The target slug
  (2026-07-17-design-system-with-css-variables) has no entry in
  `postStats.byPost` at all (too new). N = 0/8. Gate held: zero gateFindings,
  no pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. This is a rewrite of a live shipped post
  (src/content/blog/2026-07-17-design-system-with-css-variables.md); compared
  the outline against that shipped prose. First-principles-only findings this
  pass: (1) emotionalCore staples two feelings with "and" (quiet satisfaction
  of the system holding up + the small thrill of the chart-colors token group
  slotting in) -- same family of feeling, less severe than the pride/relief
  stapling flagged repeatedly on sibling posts, but still flagged for a
  tightening rewrite that leads with the more concrete, provable half; (2)
  three separate ourTake lines (order 8's "This is the moment the system
  proved it was a system," order 9's "that repetition...is the site's visual
  identity," and especially order 10's closing "The system is the discipline,
  and the file is just where the discipline lives") are each independently
  quotable and risk becoming the de facto memorable takeaway instead of the
  designated beat-1 flare, the same competing-bookend pattern flagged
  repeatedly on the automate-blog-writing, dark-dashboard-design, and
  writing-alt-text-seo-accessibility sibling outlines -- flagged adding a
  supporting-texture note to order 10's gateGuidance specifically, since its
  closing position makes it the most likely of the three to get quoted as
  "the" line; (3) the how-i-built-x formula mapping is thinner here than the
  clean mappings confirmed on sibling how-i-built-x outlines -- no beat plays
  the formula's "what bit you" gotcha role (order 2's drift problem is framed
  as pre-system context, not a mistake that bit the builder), and only one
  paragraph (order 7, primitive/semantic vs. flat override) names a genuine
  fork with a road not taken, short of the formula's "2-3 real forks" --
  flagged two low-effort inserts: reframe order 2's drift as doing double
  duty as the gotcha beat, and give order 6 (three typefaces) an explicit
  named alternative (one typeface or a system-font stack) it turned down.
  Positive finding: the outline's own gateGuidance explicitly restricts
  negative-parallelism to the single beat-1 flare line, correcting a real
  pattern in the shipped prior version of this exact post, which sprinkled
  "no X, just Y" phrasing at both the open (para 2: "No Tailwind config...No
  Style Dictionary step...") and the close (para 103: "None of this took a
  framework. It took...") -- flagged as a genuine structural improvement over
  a real precedent, first-principles positive, not yet data-backed.
- 2026-07-15 (outline re-review, design-system-with-css-variables rewrite):
  Re-ran the count against the 2026-07-15T01:02:19Z snapshot -- only two
  posts (`2026-07-11-anonymous-like-button-without-login`,
  `2026-02-21-hello-world`) carry `likes > 0`, both with `impressions: 0`,
  so zero posts satisfy both conditions. N = 0/8. Gate held: zero
  gateFindings, every elevation prefixed [low-confidence . cold-start . 0/8].
  Same outline reviewed previously (see prior entry above) still carries the
  same unaddressed issues -- emotionalCore still staples "quiet satisfaction"
  and "the small thrill" with "and" rather than committing to one register;
  order 8/9/10's ourTake lines are still each independently quotable and
  still risk out-competing the beat-1 flare as "the" memorable line; the
  how-i-built-x formula mapping is still thin (order 2's drift is still
  framed as pre-system context rather than doing double duty as the
  formula's "what bit you" gotcha beat, and order 6 still doesn't name the
  single-typeface / system-font-stack alternative it turned down). Converted
  all three into concrete apply-ready quote/replacement edits this pass
  rather than prose description, per this run's schema. No new pattern
  written -- gate still holds.
- 2026-07-15 (outline review, design-system-with-css-variables rewrite, third
  pass): Bash's safety classifier was transiently unavailable partway through
  this pass; relied on `src/data/stats.json`'s unchanged `generatedAt`
  (2026-07-15T01:02:19.609Z) -- the same snapshot the prior two passes
  already confirmed byte-for-byte: only two posts
  (`2026-07-11-anonymous-like-button-without-login`, `2026-02-21-hello-world`)
  carry `likes > 0`, both at `impressions: 0`, so zero posts satisfy both
  conditions; target slug still absent from `postStats.byPost`. N = 0/8. Gate
  held: zero gateFindings, no pattern assertions written, every elevation
  prefixed [low-confidence . cold-start . 0/8]. Confirmed the first pass's
  emotionalCore finding is now RESOLVED -- `emotionalCore` is a single
  concrete claim ("The concrete proof, on 2026-07-14, that the layering was
  built for exactly this...") with no stapled "and"-joined feelings. The
  other two findings remain open, converted to fresh apply-ready edits this
  pass: (1) three ourTake lines (order 8's "moment the system proved it was a
  system," order 9's "that repetition...is the site's visual identity," order
  10's closing "the file is just where the discipline lives") still lack
  explicit supporting-texture notes in their gateGuidance distinguishing them
  from the beat-1 designated flare -- inserted concrete supporting-texture
  clauses into all three beats' existing gateGuidance rather than rewriting
  from scratch; (2) the how-i-built-x formula mapping is still thin -- order
  2's drift still reads as pre-system scene-setting rather than the formula's
  "what bit me" gotcha (despite the #12151a/#13161c near-duplicate being a
  real pre-token mistake), and order 6 still never names the road-not-taken
  (single typeface / system-font stack) it turned down -- inserted
  formula-framing notes into both beats' gateGuidance.
- 2026-07-15 (draft review, design-system-with-css-variables rewrite, first
  pass): Re-ran the count via direct Python check against `postStats.byPost`
  on the current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts
  total, zero carry both `impressions > 0` and `likes > 0` (only two posts
  carry `likes > 0` at all, both at `impressions: 0`); target slug still
  absent from `postStats.byPost`. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Confirmed the hook survived drafting verbatim, the
  emotionalCore's chart-colors payoff (beat 8's "moment the system proved it
  was a system") lands close to verbatim, and the code block's hexes/percent
  (12% color-mix, real token names) correctly match the outline's facts --
  the prior shipped version's wrong 35%/fabricated hexes did NOT recur.
  Three findings, all first-principles/craft-level (no data to back a
  "winners do X" claim yet): (1) the designated flare's single sharpest word
  ("refused to cheat on the names") never appears anywhere in the ~1,900-word
  draft, even though the flare's general shape (no Tailwind, no Style
  Dictionary, named values) survived in beat 1 -- and the CTA's close
  ("a design system with CSS variables, nothing else installed") spends the
  negative-parallelism device a second time despite gateGuidance reserving it
  for beat 1 only -- flagged a single combined fix at the close that restores
  "cheat" and drops the redundant echo. (2) Beat 2's near-duplicate-color
  near-miss (#12151a vs #13161c) is still framed as context rather than the
  how-i-built-x formula's "what bit me" gotcha, unresolved from the eighth/
  outline-stage finding -- flagged an insert sharpening the stakes using
  facts already in the draft. (3) Beat 6 (three typefaces) still never names
  the alternative it turned down (one typeface / system-font stack pulling
  multiple jobs), so the how-i-built-x formula's "2-3 real forks" beat is
  still thin at this position -- flagged an insert naming that road not
  taken, phrased as Scout's own design reasoning rather than an asserted
  external fact.
- 2026-07-15 (draft review, which-claude-model-to-use rewrite, first pass):
  Re-ran the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both `impressions > 0` and `likes > 0`; target slug
  (2026-07-18-which-claude-model-to-use) has no entry in `postStats.byPost`
  at all (too new). N = 0/8. Gate held: zero gateFindings, no pattern
  assertions written, every elevation prefixed [low-confidence . cold-start .
  0/8]. First pass at this slug -- no prior ledger entries for it. The draft
  matches its outline's per-beat gateGuidance unusually cleanly: the hook
  works the exact target-keyword phrase into its second sentence per
  instruction, the beat-2 flare ("Burning Opus tokens on work Haiku finishes
  just as well is waste, not rigor.") lands verbatim, the three-tier table
  and H3 nesting both landed exactly as specified, the beat-7 backdoor
  numbers (1.75/1 finding vs 5.65/4 findings) and its protected closing line
  survived verbatim, the beat-9 effort-dial admission's protected clause
  ("Per-agent effort tuning is real money still sitting on the table, and I
  know it.") survived verbatim, and the close opens with the direct
  one-line answer before narrative resolution per instruction. Two
  first-principles findings, both part of patterns recurring across sibling
  posts in this ledger: (1) three independently-quotable protected/ourTake
  lines (beat 2's designated flare, beat 7's backdoor closer, beat 9's
  effort-tuning closer) compete for "the" memorable takeaway with no
  supporting-texture signal distinguishing them -- the same competing-bookend
  family flagged repeatedly on automate-blog-writing, dark-dashboard-design,
  writing-alt-text, and design-system-with-css-variables -- flagged a light
  callback insert in the closing section that re-anchors beat 2's flare as
  the primary mistake, subordinating the other two without touching their
  protected wording; (2) emotionalCore's second half ("the relief of a split
  you can defend line by line") never lands as an explicit sentence anywhere
  in the draft -- the dread half (beat 1's invoice line, beat 2's hidden
  failure, beat 7's missed backdoor) all land, but nothing states the felt
  relief of a defensible per-call system -- the same stapled-emotionalCore,
  second-half-missing pattern flagged on the automate-blog-writing (fifth
  pass), dark-dashboard-design, and grill-me (fifth pass) sibling posts --
  flagged an insertion at the close of beat 8 (the fan-out-compounds section)
  naming that relief directly.
- 2026-07-15 (draft review, ai-automation-stack, first pass): Re-ran the count
  via direct Python check against `postStats.byPost` on the current snapshot
  (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  `impressions > 0` and `likes > 0`. N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. First pass for this slug in the ledger. Confirmed the
  outline's point, hook, and emotionalCore all substantially survived
  drafting (the "quiet confidence" half lands in the pipeline-became-a-package
  beat's "should have been terrifying, and it wasn't" line; the point's
  narrow-agents/deterministic-scripts split survives distributed across the
  mega-prompt beat and the closing Governing Principle section). One real
  finding: the designated flare, protected by the outline's own gateGuidance
  as "the post's ONE sanctioned negative-parallelism line ... render it
  verbatim here and nowhere else," did NOT survive verbatim -- the outline's
  "The dashboard doesn't owe me optimism; it owes me the truth, and right now
  the truth is mostly NOT YET." was flattened in the draft to "The dashboard
  owes me the truth, and right now the truth is mostly NOT YET.", dropping
  the negative-parallelism clause that made it the flare in the first place.
  Flagged a verbatim restore. Also noted (low-confidence, not a real problem)
  that the hook's outline sentence was split into two sentences in the draft
  ("...a 60-second deploy ships it. A scorecard grades whatever came out the
  other end.") -- reads fine and arguably punchier, not re-flagged as an
  issue.
- 2026-07-15 (draft review, ai-automation-stack, second pass): Re-ran the
  count via direct Python check against `postStats.byPost` on the current
  snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total, zero
  carry both `impressions > 0` and `likes > 0`. N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  [low-confidence . cold-start . 0/8]. The flare finding from the first pass
  is STILL unresolved -- the designated ONE sanctioned negative-parallelism
  line still reads flattened as "The dashboard owes me the truth, and right
  now the truth is mostly NOT YET.", missing the "doesn't owe me optimism;
  it owes me" clause that made it the flare -- re-flagged with the same
  verbatim restore. New this pass: (1) beat 4's protected dry-wit ourTake
  line ("A regex has no ego about the prose it grades") -- explicitly
  protected by its own gateGuidance against being literalized -- got
  literalized anyway, to "Scoring code has no ego about the prose it
  grades"; flagged restoring "A regex" verbatim, the same
  protected-line-survives-drafting failure mode as the flare finding above.
  (2) Two instances of the secondary-keyword-as-scaffolding tell chronic
  across this ledger's sibling posts (grill-me, writing-alt-text,
  automate-blog-writing): "(business automation with AI agents, done right)"
  stapled on as a bare parenthetical in the mega-prompt section, and
  "Solopreneur automation with AI means a system willing to say NOT YET..."
  opening a sentence with the exact secondary-keyword phrase as its bare
  grammatical subject in the measurement section -- both flagged with
  natural-prose rewrites. This is now a recurring sibling-post pattern
  (after automate-blog-writing, grill-me, writing-alt-text) to carry some
  form of the keyword-reads-as-scaffolding tell; still first-principles/no
  data to back a "winners avoid X" claim, but the recurrence rate across
  nearly every reviewed draft this cycle is worth the drafter/outline-writer
  treating as a standing landmine regardless of the cold-start gate.
- 2026-07-15 (draft review, automate-blog-publishing-schedule): Re-ran the
  count via direct Python check against `postStats.byPost` (generatedAt
  current snapshot) -- 24 posts total, zero carry both `impressions > 0` and
  `likes > 0`. N = 0/24. Gate held: zero gateFindings, no pattern assertions
  written, both elevations prefixed `[low-confidence · cold-start · 0/24]`.
  Unlike several recent sibling drafts, this one did NOT trip the
  keyword-reads-as-scaffolding tell noted above -- all five secondary
  keywords land as natural variants, not stapled bare phrases; worth
  tracking whether that holds once real winner data lands. The draft's
  protected lines (hook, both marked-verbatim ourTakes in beats 1 and 4, the
  closing flare) all survived drafting intact -- a clean pass on
  point/hook/flare survival this round. Two first-principles elevations
  raised instead: (1) the intro's point-summary sentence states three of the
  outline's four point mechanics (four-week queue, filler sink,
  rename+relink) but omits the freeze-the-past rule, thinning the opening
  promise relative to the approved point; (2) beat 7's closer risks
  competing with the outline's one designated flare as a second quotable
  epigram.
- 2026-07-16 (outline review, hired-a-team-of-specialists rewrite): Re-ran
  the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts
  total, zero carry both `impressions > 0` and `likes > 0`; the target slug
  (2026-07-21-hired-a-team-of-specialists) has no entry yet (too new). N =
  0/8. Gate held: zero gateFindings, no pattern assertions written, every
  elevation prefixed `[low-confidence · cold-start · 0/8]`. Point, hook, and
  flare all check out clean on first principles -- point is one sharp claim
  plus one honest caveat (no plural hedging), hook avoids the recurring
  literal-quote-mark-around-keyword tell flagged repeatedly on sibling
  posts, and flare's placement is already pinned to beat 1 or 2 by its own
  gateGuidance. First-principles-only findings this pass: (1)
  `emotionalCore` mixes a felt experience ("the calm of believing an
  output...") with a stated thesis/disclosure clause ("honesty about the
  real coordination tax") in one field via "paired with" -- the same
  felt-plus-mechanism-stapling pattern flagged repeatedly on the
  automate-blog-writing and dark-dashboard-design sibling outlines; flagged
  folding the second half into a felt sensation instead. (2) the outline
  maps to `contrarian-take` but skips that formula's "why people believe
  it" beat entirely -- it jumps from the hook's confession straight to the
  failure mechanism with no fair steelman of why one giant prompt is the
  default instinct; flagged inserting one steelman sentence into beat 1
  rather than adding a whole new beat, since the formula is a skeleton not
  a cage. (3) two beats (7 and 9) each carry a strong quotable aphorism
  ("The opinion is the feature..." and "A giant prompt is cheaper to
  write...") with no supporting-texture note distinguishing them from the
  meta block's one designated flare -- the same competing-bookend pattern
  flagged repeatedly on the dark-dashboard-design and
  writing-alt-text-seo-accessibility sibling outlines (there it grew to
  three competing lines before being caught); flagged both gateGuidance
  blocks for a supporting-texture insertion now, before drafting has a
  chance to sharpen either into a second flare.
- 2026-07-16 (outline review, hired-a-team-of-specialists rewrite, second
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  `impressions > 0` and `likes > 0`; target slug still absent from
  `postStats.byPost` (too new). N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed `[low-confidence .
  cold-start . 0/8]`. Confirmed one prior finding is resolved: beat 7's
  quotable aphorism from the first pass ("The opinion is the feature...")
  no longer appears in this revision -- beat 7's ourTake was reworded to
  "the best specialists defend a stubborn position... a neutral helper
  would have shrugged and let the damage-pack through," which reads as
  solid prose but not a flare-competing epigram, so that specific
  competing-bookend risk is gone. Two first-pass findings remain open,
  unchanged text, now a second consecutive pass: (1) `emotionalCore` still
  staples "the calm of believing an output..." (felt) to "honesty about the
  real coordination tax that buys it" (thesis/disclosure) via "paired
  with" -- re-flagged with the same fold-into-one-feeling fix; (2) beat 9's
  closing aphorism ("A giant prompt is cheaper to write. It's just more
  expensive to be wrong with.") still has no supporting-texture note in its
  gateGuidance distinguishing it from the meta block's designated flare --
  re-flagged with a concrete insertion. The formula-gap finding (contrarian
  -take skips a fair "why people believe it" steelman) is also still open;
  refined the fix this pass to target beat 1's `ourTake` directly (a
  one-sentence steelman inserted after the existing two sentences) rather
  than beat 2, matching the first pass's own "skeleton not cage, single
  beat-1 sentence" recommendation more precisely.
- 2026-07-16 (draft review, hired-a-team-of-specialists rewrite, first pass):
  Re-ran the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both `impressions > 0` and `likes > 0`; target slug still
  absent from `postStats.byPost` (too new -- pubDate 2026-07-21). N = 0/8.
  Gate held: zero gateFindings, no pattern assertions written, every
  elevation prefixed `[low-confidence . cold-start . 0/8]`. Confirmed the
  outline's second-pass steelman fix landed in drafted prose: beat 1 now
  opens "That prompt felt responsible: one ask, so nothing could get lost in
  a hand-off," giving the contrarian-take formula's "why people believe it"
  beat a fair one-sentence landing before the failure mechanism, resolving
  the formula-gap finding from both outline passes. The designated flare
  ("The fix isn't a smarter model. It's a smaller question.") survives
  verbatim in beat 2 as the post's sole sanctioned negative-parallel
  construction, and the hook survives close to verbatim with a nice
  unplanned bonus: the closing section's "one confident generalist" echoes
  the hook's "confident average" for a clean unscripted bookend. New draft-
  stage findings this pass, all first-principles/craft-level: (1) two
  additional negative-parallel ("X, not Y") constructions appear in the
  drafted prose beyond the one the outline's own beat-1 gateGuidance
  sanctions -- "not a premium tier gated behind a paywall" (beat 1) and "not
  the omission it actually was" (beat 2) -- flagged both with positive-
  framing rewrites; (2) the outline's second-pass open finding on
  `emotionalCore` stapling "the calm of believing an output" (felt) to
  "honesty about the real coordination tax" (thesis) carries through into
  the draft as well: the calm/trust half of that feeling never gets an
  explicit landing sentence anywhere in the prose (the "Specialists propose,
  a human picks" section states the mechanism -- candidates surfaced, human
  decides -- but never names the felt payoff of trusting the result) --
  flagged an insertion at the end of that section naming the calm
  explicitly; (3) confirmed the outline's second-pass open finding on beat
  9's closing aphorism ("A giant prompt is cheaper to write. It's just more
  expensive to be wrong with.") competing with the designated flare for "the"
  memorable line is still live in the draft -- it's a strong, quotable,
  fact-checked line sitting right before the close with no tie-back to the
  flare's "smaller question" framing -- flagged a one-sentence insertion
  after it that reconnects the two rather than letting them compete.
- 2026-07-16 (outline review, dividing-a-company-that-makes-no-money, first
  pass): Re-ran the count via direct Python check against
  `postStats.byPost` on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  `impressions > 0` and `likes > 0` (only two posts carry `likes > 0` at all,
  both at `impressions: 0`). N = 0/8. Gate held: zero gateFindings, no
  pattern assertions written, every elevation prefixed [low-confidence .
  cold-start . 0/8]. Point, hook, and emotionalCore all check out clean on
  first principles (point is one thesis + evidence, hook is one concrete
  scene, emotionalCore reads as a coherent single fear-to-relief arc rather
  than two stapled feelings). Confirmed `postFormula: decision-log` maps
  cleanly onto its reference beats (hook -> order 1, the call stated early
  -> order 2, options/the-50-50-default -> order 5, the call restated ->
  order 6, revisit -> order 7's "the lean can change"), and no prior sibling
  post has used decision-log yet so no formula-fit claim is possible past
  first principles. First-principles-only finding this pass: the outline's
  ourTake lines are unusually dense with aphoristic, quotable phrasing across
  nearly every beat (orders 1, 3, 4, 5, 6, 7, 8 all carry a punchy standalone
  line), the same competing-bookend pattern flagged repeatedly on sibling
  outlines (automate-blog-writing, dark-dashboard-design, writing-alt-text) --
  flagged the two strongest competitors against the order-4 designated flare
  ("The split itself is rarely the bomb. The unspoken split is."): order 3's
  ourTake ("Nothing to fight over is precisely the condition that makes this
  conversation free...") and order 8's closing ourTake ("Write it down now,
  while it's free. Wait, and the same five-minute conversation picks up a
  price tag it never needed."), the latter positioned right before the CTA
  sign-off where a closing aphorism most directly competes with a flare for
  "the" memorable takeaway. Both flagged for a supporting-texture note in
  their gateGuidance, per the established remedy pattern.
- 2026-07-16 (draft review, teaching-a-robot-to-balance-my-game rewrite):
  Re-ran the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both `impressions > 0` and `likes > 0`; the target slug has no
  entry in `postStats.byPost` at all (too new). N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  `[low-confidence . cold-start . 0/8]`. Point, hook, and the designated
  flare all survived drafting essentially verbatim: the hook opens the post
  unchanged; the beat-1 closing tension ("That's why a human still has to
  play") lands short and unglossed; the beat-6 turn's protected lines ("The
  math said fine. The hands said boring." and "The optimizer has no column
  for that.") both render exactly as specified; the beat-7 flare ("The
  machine is a brilliant search-narrower and a terrible taste-maker.") lands
  verbatim with the negation-tail correctly rephrased as a positive
  capability fact per gateGuidance; the beat-8 callback ("I'm fine being the
  column the optimizer doesn't have.") closes the beat unglossed. Two
  first-principles-only findings this pass: (1) the beat-7 flare paragraph
  runs as one continuous block with no paragraph break before the flare
  line, the same pattern flagged and fixed on the grill-me-what-an-
  auditor-sees sibling post's second draft pass (flare risked reading as
  "just more information" instead of the emotional turn) -- flagged the
  same paragraph-break fix here; (2) emotionalCore's "honest surprise that
  the math and the hands disagree" half is narrated as fact in beat 6 but
  never voiced as a felt reaction -- flagged an insertion naming the
  surprise directly. Minor structural note: beat 3's three-bot list uses a
  matched "a/an X that Y" clause frame for 2 of 3 items (not the full
  three the outline's gateGuidance warned against), still worth varying
  further.
- 2026-07-16 (outline review, rate-limiting-an-llm-so-a-stranger-cant-run-up-
  my-bill rewrite, first pass): Re-ran the count via direct Python check
  against `postStats.byPost` on the current snapshot -- 24 posts total, zero
  carry both `impressions > 0` and `likes > 0` (only two posts anywhere in
  the file have carried `likes > 0`, both at `impressions: 0`). N = 0/8.
  Gate held: zero gateFindings, no pattern assertions written, every
  elevation prefixed `[low-confidence . cold-start . 0/8]`. Point, hook,
  emotionalCore, and the designated flare (order 7's "the window doesn't get
  reset. It ceases to exist.") all check out clean on first principles --
  point is one thesis clause, hook is a two-sentence concrete scene with no
  literal-quote-mark keyword tell, emotionalCore is a single dread-to-calm
  arc not two stapled feelings, and the flare doesn't collide with the hook
  or point. `postFormula: how-i-built-x` maps cleanly onto its reference
  beats (hook -> order 1, the shape/why -> orders 2-5, the decisions ->
  order 6's six caps, what-bit-you -> order 8's bypass honest-limit, use-it
  -> order 9's CTA). First-principles-only finding this pass: the same
  competing-bookend pattern flagged repeatedly on sibling outlines
  (automate-blog-writing, dark-dashboard-design, writing-alt-text,
  teaching-a-robot-to-balance-my-game) recurs here -- order 5's ourTake
  ("Defense in depth earns its name only when you can say what each layer
  covers that the others leave open. Here every limit is individually
  beatable, and beating all of them at once is what costs the attacker.")
  and order 6's ourTake ("Five walls in front of one ceiling, each cheap to
  check and each covering a gap the others leave open.") are both
  standalone-quotable lines with no supporting-texture note in their
  gateGuidance, competing with the order-7 designated flare for "the"
  memorable takeaway. Flagged both for the same supporting-texture insertion
  per the established remedy.
- 2026-07-16 (outline review, rate-limiting-an-llm-so-a-stranger-cant-run-up-
  my-bill rewrite, second pass): Re-ran the count via direct Python check
  against `postStats.byPost` on the current snapshot -- 24 posts total, zero
  carry both `impressions > 0` and `likes > 0`. N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  `[low-confidence . cold-start . 0/8]`. Point, hook, emotionalCore, and the
  designated flare still check out clean on first principles. The
  competing-bookend finding from the first pass (order 5's and order 6's
  ourTake lines competing with the designated flare, no supporting-texture
  note) is STILL UNRESOLVED in this revision -- re-flagged with the same
  insertion fix. New finding this pass: comparing against the first pass's
  own recorded formula mapping ("what-bit-you -> order 8's bypass
  honest-limit," flare cited as "order 7's ... window doesn't get reset"),
  this revision's `order` field values for the TTL/self-expiry beat and the
  bypass-header beat have been SWAPPED (TTL/flare beat now labeled `order:
  8`, bypass beat now labeled `order: 7`) while their array/physical position
  stayed unchanged (TTL still listed before bypass) -- a regression that, if
  any downstream tooling sorts by numeric `order` rather than array position,
  would silently reverse which beat (the flare payoff or the honest-limit)
  lands immediately before the CTA. Flagged swapping the two order numbers
  back to match physical position and the confirmed prior-pass sequence.
  Also flagged (new): order 9's CTA recap list ("a structural input limit, an
  output limit, two independent per-actor counters, a hard global ceiling")
  omits the history/context-window cap established as one of the "six caps"
  in order 6, while the CTA's own ourTake line claims "Six layers deep" --
  an internal count mismatch within the same beat; recommended adding the
  context-window cap to the recap list. Minor: recommended the CTA's payoff
  sentence explicitly echo the hook's "while I'm asleep" stake for a tighter
  bookend, matching the CTA-hook-callback pattern recommended repeatedly on
  the automate-blog-writing-with-ai-agents sibling post's ledger history.
- 2026-07-16 (draft review, rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill):
  Re-ran the count via direct Python check against `postStats.byPost` on the
  current snapshot (generatedAt 2026-07-15T01:02:19.609Z) -- 24 posts total,
  zero carry both `impressions > 0` and `likes > 0`; the target slug is absent
  from `postStats.byPost` entirely (too new). N = 0/8. Gate held: zero
  gateFindings, no pattern assertions written, every elevation prefixed
  `[low-confidence . cold-start . 0/8]`. Confirmed the outline's hook and
  flare both survived drafting verbatim (hook: "Anyone on the internet can
  type into the chat assistant on chads.website..."; flare: "When the hour
  rolls over, the window doesn't get reset. It ceases to exist."), and the
  order-7/order-8 sequencing question flagged in the prior outline pass
  resolved sensibly in the draft -- the bypass beat (context) now runs before
  the TTL/flare beat (payoff), landing the payoff immediately before the CTA,
  which is the stronger structural choice regardless of which fix the outline
  itself ends up taking. The prior outline pass's CTA recap/six-layers count
  mismatch PERSISTED into this draft unchanged: the CTA's recap sentence
  lists only 5 items (input, output, two per-actor counters, global ceiling)
  against its own "Six layers deep" claim two sentences later, still missing
  the history/context-window cap -- re-flagged with a concrete insertion.
  New first-principles findings this pass: (1) order 3's gateGuidance
  explicitly said to "skip the old 'the downside isn't theoretical' negation
  opener" and "lead with the number," but the draft opens the beat with
  "The stakes here are documented, not hypothetical" -- the same negation
  shape reworded, and still doesn't lead with the number -- flagged a
  rewrite; (2) the same beat's closing clause, "which is the whole problem:
  nothing stopped it," reproduces the exact "that's the whole point/problem"
  shape order 1's own gateGuidance calls "permabanned," just relocated to
  beat 3 -- flagged for removal; (3) order 5's gateGuidance explicitly
  warned against the "'that's X: Y' reveal cadence (pitfall 17)" in this
  beat, but the draft opens the beat's core claim with "The honest reason:
  every single limit is beatable on its own" -- the same colon-reveal shape
  under a different lead-in word -- flagged a direct rewrite; (4)
  emotionalCore's second half ("the calm of a ceiling you picked yourself")
  never lands as a felt sentence anywhere in the draft -- the CTA states the
  known-maximum fact as mechanism, not feeling, the same thesis-vs-felt-dread
  gap flagged repeatedly on the dark-dashboard-design and
  automate-blog-writing sibling posts -- flagged an insertion naming the
  relief directly. All first-principles, no data yet to confirm any of these
  correlate with rank or likes.
- 2026-07-16 (draft review, rate-limiting-an-llm-so-a-stranger-cant-run-up-
  my-bill, second pass): Re-ran the count via direct Python check against
  `postStats.byPost` on the current snapshot -- 0 posts carry both
  `impressions > 0` and `likes > 0`. N = 0/8. Gate held: zero gateFindings,
  no pattern assertions written, every elevation prefixed `[low-confidence .
  cold-start . 0/8]`. Confirmed three of the first pass's five findings are
  now fixed: (1) beat 3 no longer opens with the "not hypothetical" negation
  (now leads straight with "More than $82,000"); (2) the "which is the whole
  problem: nothing stopped it" permabanned-shape line is gone (now just
  "Nothing stopped it."); (3) beat 5's "The honest reason:" colon-reveal
  opener is gone (now "Every single limit is beatable on its own."). Two
  findings persist unresolved, now a third consecutive pass: (1) the CTA's
  layer recap still lists only input/output/per-actor-counters/global-ceiling
  (omitting the history/context-window cap) against its own "Six layers
  deep" claim two sentences later -- re-flagged with an insertion adding the
  history cap to the recap list; (2) emotionalCore's "calm of a ceiling you
  picked yourself" half still never lands as a felt sentence -- the CTA
  states the known-maximum fact as mechanism only, no relief wording, and
  the outline pass 2's bookend suggestion (echo the hook's "while I'm
  asleep" stake in the CTA) also still hasn't landed -- re-flagged a combined
  insertion that does both at once. New finding this pass: the CTA's opening
  line ("None of these layers is clever by itself: a character cap is
  trivial, a request counter is a tutorial exercise.") reproduces the same
  colon-reveal shape order 9's own gateGuidance banned via pitfall 17
  (previously caught at beat 5, now recurring at beat 9's own opening) --
  flagged breaking it into short declaratives instead.
- 2026-07-16 (draft review, rate-limiting-an-llm-so-a-stranger-cant-run-up-
  my-bill, third pass): Re-ran the count via direct Python check against
  `postStats.byPost` on the current snapshot (generatedAt
  2026-07-15T01:02:19.609Z) -- 24 posts total, zero carry both
  `impressions > 0` and `likes > 0`; target slug still absent from
  `postStats.byPost`. N = 0/8. Gate held: zero gateFindings, no pattern
  assertions written, every elevation prefixed `[low-confidence . cold-start
  . 0/8]`. Confirmed the hook and flare both still survive verbatim. Three
  findings persist unresolved across all three passes now: (1) the CTA's
  layer recap still lists only input/output/two-per-actor-counters/global
  immediately before its own "Six layers deep" claim two sentences later,
  still missing the history/context cap -- re-flagged a third time with a
  concrete insertion adding the history cap into the recap sentence so the
  count actually reconciles to six; (2) the CTA's opening line still reads
  "None of these layers is clever by itself: a character cap is trivial, a
  request counter is a tutorial exercise." -- the same colon-reveal shape
  (pitfall 17) flagged last pass, unresolved -- re-flagged with the same
  short-declaratives break; (3) emotionalCore's "calm of a ceiling you
  picked yourself" half still never lands as an explicit felt sentence
  anywhere in the draft, three passes running -- re-flagged with an
  insertion right after the CTA's known-maximum sentence that also doubles
  as the still-unaddressed hook callback ("while I'm asleep") recommended at
  the outline stage. New first-principles findings this pass: (4) beat 3 now
  opens "More than $82,000. That's what one developer's compromised AI API
  key generated..." -- the negation-opener flagged pass 1 is gone, but the
  replacement introduces a "that's what X" reveal-cadence echo of the same
  pitfall-17 family banned elsewhere in this outline (beats 5 and 9) --
  flagged a direct-statement rewrite; (5) beat 5's opening sentence, "Doing
  public chatbot cost control this way means stacking six unclever limits
  instead of trusting one clever one," reads as an inserted-keyword
  construction (the awkward "doing X this way means" scaffolding around the
  secondary keyword) rather than natural Scout prose, the same
  keyword-insertion tell flagged repeatedly on sibling posts' hooks --
  flagged a subject-first rewrite that keeps the keyword phrase intact. All
  five findings first-principles/craft-level, no data yet to confirm any
  correlate with rank or likes.
- 2026-07-16 (draft review, rate-limiting-an-llm-so-a-stranger-cant-run-up-
  my-bill, fourth pass): Re-ran the count via direct Python check against
  `postStats.byPost` (impressions > 0 AND likes > 0) -- 0/24 posts qualify,
  N = 0/8. Gate held: zero gateFindings, no pattern assertions written,
  every elevation prefixed `[low-confidence . cold-start . 0/8]`. Confirmed
  the hook and the designated flare ("When the hour rolls over, the window
  doesn't get reset. It ceases to exist.") both still survive verbatim, and
  the flare's post-flare landing sentence ("A fresh key gets created on the
  next request, same as any other.") still matches gateGuidance. All five
  findings from the third pass are STILL unresolved in this revision: (1)
  the CTA's layer recap still enumerates only input/output/two-per-actor-
  counters/global (5 caps folded into 4 phrases) immediately before its own
  "Six layers deep" claim, still omitting the history/context-window cap --
  re-flagged a fourth time with an insertion adding "a shorter context
  window" into the recap; (2) the CTA's opening line is untouched --
  "None of these layers is clever by itself: a character cap is trivial; a
  request counter is a tutorial exercise." -- still the pitfall-17
  colon-reveal shape, re-flagged a fourth time with the same
  short-declaratives break, bundled with finding (1) since both live in the
  same two-sentence span; (3) emotionalCore's "calm of a ceiling you picked
  yourself" half and the hook's "while I'm asleep" callback both still never
  land in the CTA -- current text reads "chosen by me instead of by
  whoever's poking the endpoint," mechanism-only, no felt "picked... myself"
  language and no echo of the hook's "asleep" stake or its "for loop" image
  -- re-flagged a fourth time with the same combined insertion recommended
  since pass 3; (4) beat 3's "More than $82,000. That's what one developer's
  compromised AI API key generated..." still carries the "that's what X"
  reveal-cadence echo of pitfall 17 -- re-flagged a fourth time with a
  direct-statement rewrite; (5) beat 5's opening ("Doing public chatbot cost
  control this way means stacking six blunt limits...") swapped "unclever"
  for "blunt" since pass 3 but the core "doing X this way means" scaffolding
  around the secondary keyword is unchanged -- re-flagged a fourth time with
  the same subject-first rewrite. Two new first-principles findings this
  pass: (6) beat 1's scope-note sentence ("An earlier post covered how the
  assistant behaves: third person, defers instead of guessing. It also
  resists prompt injection. This one covers...") runs three sentences
  against the outline's own gateGuidance cap of "two plain sentences" --
  flagged folding the first two into one; (7) beat 8's transcript-log
  sentence ("The only thing that outlives its own window is the transcript
  log: ...") echoes the same reveal-colon shape as the beat's own sanctioned
  flare, right after the outline's gateGuidance said this beat gets exactly
  ONE reveal move -- flagged flattening it so the flare stays the beat's
  single memorable turn. Five consecutive-pass persistence on findings 1-5
  is now itself notable: these are not obscure craft nits, they are the
  exact axis this reviewer exists to check (planned point/emotionalCore/flare
  surviving into prose) and they are not landing across revisions -- worth
  the synthesis agent treating this cluster as higher-priority than a typical
  cold-start advisory note, even though disposition keeps it in elevations.
