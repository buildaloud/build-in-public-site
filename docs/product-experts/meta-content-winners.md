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
