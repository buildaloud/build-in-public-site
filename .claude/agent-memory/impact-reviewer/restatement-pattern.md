# Redundant restatement — recurring drafter tic

Core pattern, confirmed across many posts/passes: the drafter states the same
point twice (or three times) adjacent, in different phrasing, instead of once.
Always re-check the same handful of beat shapes on every pass (turn/payoff/CTA
closers, proof beats sitting next to a protected `ourTake`) — fixing it once
does not mean it stays fixed on the next draft pass, and fresh instances of
the same shape keep appearing in new wording.

## Sub-shapes confirmed

- **Back-to-back restatement before a punchline** (2026-07-15): e.g. "For X
  that's A; for Y it's B" immediately followed by "X is describing A; Y is
  describing B" before a two-sentence flourish. Genuine redundancy, not a
  bookend/callback (those span sections, not adjacent sentences in one
  paragraph). Flag it, cut the weaker restatement(s), keep the strongest
  phrasing attached to the punchline. Confirmed 3x-in-a-row in a dense
  "turn"/thesis beat (analogy, then a concrete recap, then a generic summary)
  — cut the middle, most generic one.

- **intendedBeat vs ourTake say the same thing** (2026-07-15): outline scripts
  the same point via two separate fields in different phrasing (e.g.
  `intendedBeat`'s vivid comparison vs `ourTake`'s flatter restatement) and the
  drafter renders both back-to-back. Pick ONE at draft time — flag the
  flatter/more generic phrasing for deletion regardless of which field it
  traces to. Also seen: `intendedBeat`'s closing clause paraphrased into a
  paragraph's own closer, immediately followed by a second paragraph opening
  with `ourTake`'s protected-verbatim line making the identical point — when
  `gateGuidance` marks one phrasing protected-verbatim, always cut the *other*
  paragraph's closer, even if the protected line comes second.

- **Flat intensifier tacked onto a complete point** (2026-07-15,
  which-claude-model-to-use draft; recurred 2026-07-15 ai-automation-stack
  draft — confirmed general drafter tic, not post-specific): e.g. "...pays
  that multiplier on every call, whether the call needed it or not. No
  exceptions, no matter the task." or "Routing by job instead of by vibes is
  the cheapest optimization in the stack... Match the tool to the job, every
  time." — cut the intensifier fragment; the preceding clause already said it.

- **Abstract statement then concrete illustration of the same idea, same
  paragraph** (2026-07-15, several posts): e.g. "this tier sits in the middle
  on both price and horsepower" pre-echoing "fanning out fourteen copies of it
  per round doesn't blow the budget" a few sentences later — cut the abstract
  clause, keep the concrete one. Also confirmed *within a single field*, no
  ourTake involved, in a payoff-goal beat: an external citation paraphrased
  abstractly, then re-illustrated concretely two sentences later in the same
  `intendedBeat` field (design-system-with-css-variables, Penpot citation) —
  merge citation + illustration into one sentence. This specific Penpot
  instance recurred UNFIXED across at least three consecutive draft passes of
  the same post — don't trust a prior "fixed" note; re-check it every pass.

- **Opening sentence restates a contrast the paragraph delivers again later**
  (2026-07-15): "One near-miss on one call is forgivable... The fan-out is
  where it stops being forgivable" pre-echoing "Get one call's routing
  wrong... Get every call wrong..." later in outline-scripted parallel form —
  merge into one shorter opener.

- **Unscripted setup sentence glued directly in front of a protected/verbatim
  closer** (2026-07-15, confirmed repeatedly across posts and passes): e.g. "X
  shipped a stale description of its own machine" pre-echoing the beat's own
  protected closer nearly word-for-word two sentences later; "That immovability
  is exactly why I trust it more than any of them." glued in front of "The gate
  I trust most is the one with no opinion."; "the same small decisions landing
  in the same place every time..." glued in front of "The tokens made the same
  choice cheap to repeat, and that repetition is the site's visual identity."
  Fix: cut the unscripted setup, let the protected line stand alone. This
  recurs in proof/claim-then-evidence beats too, not just turn/CTA — whenever
  an outline's `ourTake` sits right next to a concrete `intendedBeat` detail
  making the same point, expect this shape and merge rather than flag both
  halves separately.

- **Same short phrase reused once mid-paragraph, once in the protected closer**
  (2026-07-15, design-system-with-css-variables, recurred across multiple
  passes with different exact wording each time — e.g. "primitives... holding
  the raw values" vs the protected "Primitives hold the actual values"; "dodge
  red and green" used both mid-paragraph and verbatim in the protected
  closer). Fix by rewording the earlier, non-protected instance, never the
  protected one. Confirmed a third time (2026-07-15,
  automate-blog-publishing-schedule): "Because the freeze rule leaves today
  untouched..." mid-paragraph echoing the beat's own ourTake closer, "today's
  date is never something the scheduler touches..." two sentences later — same
  fix, reword the mid-paragraph instance only. **Fixed in the 2026-07-16 draft
  pass of the same post** — the mid-paragraph instance now reads "The freeze
  rule was never going to reach forward and grab it," distinct enough from the
  ourTake closer; do not re-flag this specific pair unless the echo returns.

- **Caveat/admission stated three times in one short paragraph** (2026-07-15):
  an unscripted opener, then the outline's phrase A, then the outline's phrase
  B rendered as a separate sentence instead of one combined sentence. Cut the
  unscripted opener and merge the outline's two clauses back into the single
  sentence `intendedBeat` actually specified — "cut the opener" alone is not
  sufficient if the split itself survives.

- **Triple restatement spanning `intendedBeat` + `facts` + `ourTake`**
  (2026-07-15, alt-text post): `intendedBeat` stated a gap once, `facts`
  restated it fuller (but added one genuinely new detail), `ourTake` restated
  it a third time, flattest phrasing. Fix at outline stage: keep `intendedBeat`
  as the primary vehicle, trim `facts` to its unique new detail only, cut
  `ourTake`'s redundant closing sentence entirely. Check `facts` for this too,
  not just `ourTake`.

- **Self-referential meta-aside that shrugs instead of landing a fresh point**
  (2026-07-15): a standalone line like "Same rule as two paragraphs up,
  addressed to whoever searched this exact phrase." Not a legitimate
  cross-section callback — it doesn't restate the point in fresh words for a
  new angle, it just points backward. Flag and cut the pointing-backward
  sentence; keep any keyword-bearing clause next to it (check `gateGuidance`
  for a "keep this exact phrase, it's the only placement of secondary keyword
  X" instruction before deleting the whole paragraph).

- **Protected/verbatim line rendered truncated, not altered or dropped**
  (2026-07-15, ai-automation-stack draft; RECURRED unfixed across at least
  FOUR consecutive draft passes of the same post, same day — reconfirmed on
  this round's full draft, "the numbers, unrounded" section): the outline's
  flare line was a two-clause negative-parallelism sentence ("The dashboard
  doesn't owe me optimism; it owes me the truth, and right now the truth is
  mostly NOT YET."), and every pass so far has kept only the second clause
  ("The dashboard owes me the truth, and right now the truth is mostly NOT
  YET."), silently discarding the contrast that made it a flare. Distinct
  from the setup-glued-in-front pattern above — here the protected line
  itself was cut down. Always diff a protected/flare/verbatim line
  word-for-word against the draft, not just check it's present in some form.
  Confirmed this is NOT self-correcting across passes — re-diff the exact
  protected string every single review, even after a prior round already
  caught and "fixed" it. This is now the single most reliable recurring miss
  on this post; check it first.

- **Protected personality line genericized into flatter wording**
  (2026-07-15, ai-automation-stack draft; RECURRED unfixed in at least two
  later passes, same day — reconfirmed again on this round's full draft):
  gateGuidance protected "A regex has no ego about the prose it grades"
  verbatim, calling it out as the one line of dry personality in a
  numbers-heavy beat — multiple passes have rendered it as "Scoring code has
  no ego about the prose it grades," the exact more-literal rewrite the
  guidance warned against. Same failure mode as the flare-line truncation
  above (a protect-verbatim instruction not honored) but the alteration is a
  word swap, not a cut — check protected lines for both truncation AND
  synonym-substitution that flattens a vivid/specific noun into a generic
  one. Also confirmed not self-correcting — re-check every pass.

- **Secondary keyword stapled on as an unintegrated parenthetical**
  (2026-07-15, ai-automation-stack draft, new this round): a beat's assigned
  secondary keyword gets dropped into the sentence as a bare parenthetical
  instead of taking a grammatical role — e.g. "Split the work into narrow
  stages with hard boundaries (business automation with AI agents, done
  right)." Reads as a keyword-stuffing artifact, not a clause doing work.
  Fix by giving the keyword phrase an actual subject/verb role in the
  sentence rather than parking it in parens.

- **Draft section order doesn't match outline `order` field** (2026-07-15,
  ai-automation-stack draft, new this round): two H3 sub-sections under one
  H2 (Model Routing = order 5, Pipeline Became a Package = order 6) rendered
  in the draft with order 6 before order 5. The outline file itself listed
  the order-6 node earlier in the YAML than the order-5 node (an artifact of
  outline revision), which may be what misled the drafter — but the explicit
  numeric `order` field should win. Check sibling H3s under one H2 against
  their numeric order fields, not just the outline file's node sequence.

- **Same short phrase echoed twice within a single sentence** (2026-07-15,
  ai-automation-stack draft): "running this blog, end to end: four layers ...
  stacked end to end" — check hook/thesis-restating sentences for an
  accidental phrase echo within one sentence, not just across sentences.

- **`rendersAsProse: false` code-block beat silently dropped** (2026-07-15,
  design-system-with-css-variables draft) — see completeness-checks.md.

- **Drafter tacks a redundant recap sentence onto a CTA/closer after the
  outline's `ourTake` already ends cleanly** (2026-07-16,
  hired-a-team-of-specialists draft; RECURRED unfixed on a later pass same
  day): outline `ourTake` for the CTA beat ended at "carve the one concern
  your giant prompt keeps fumbling into its own subagent with a one-line
  mandate," but the draft appended an unscripted extra sentence-pair right
  before the closing link — first seen as "That's the whole swap: one prompt
  becomes a handful of narrow ones, and the only cost is the time it takes to
  write each mandate.", then reworded on the next pass to "One prompt becomes
  a handful of narrow ones. The only cost is the time it takes to write each
  mandate." — same tail-recap shape, new wording each time. Check CTA/payoff
  beats for a drafter-added trailing recap sentence beyond where the
  outline's `ourTake` stops, every pass, even after a prior round already
  flagged it — it comes back reworded, not fixed.

- **Unscripted mid-beat addition (beyond outline `facts`/`ourTake`)
  contradicts an earlier proof beat** (2026-07-16,
  hired-a-team-of-specialists draft): the "cost" beat added a sentence not in
  the outline claiming the tower-defense game example "lands closer to that
  shared-state end" of Anthropic's parallelization-doesn't-fit-cleanly
  caveat — directly undercutting an earlier beat that used the same game as
  the clean flagship proof of the technique working well. When a drafter adds
  material beyond the outline's scripted `facts`/`ourTake`, check it against
  every other beat's claims about the same example before accepting it; flag
  and cut/trim the contradicting addition rather than the original proof
  beat.
