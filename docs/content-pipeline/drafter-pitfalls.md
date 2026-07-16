# Drafter & outline pitfalls — start closer to the finish line

The generation-side mirror of the reviewer ledgers. These are the flags the
review army raises **over and over** on fresh drafts/outlines — pre-empt them
here and the loop converges in fewer rounds. Read this before writing.

**Rules of the road:** every entry is **context-scoped, not a blanket ban** —
the point is to stop the *lazy default*, never to flatten voice. Voice is the
product; a draft that dodges every flag by going bland has failed differently.
When a construction below is a deliberate, load-bearing choice (see the flare
exemption), use it on purpose — just don't reach for it by reflex.

Curated by hand from the cross-run analysis of the review army (2026-07-13).
Later this file is auto-appended from confirmed recurring gate findings.

## 0. Permabanned phrases — hard fail, no exceptions, no context-scoping
Any form of "that's the whole point" / "that is the whole point" / "which is the
whole point" (the tone-grader's BANNED list, TD-0027). One hit adds 100 points
and hard-fails the draft. This is the ONE blanket ban in this file. Editors:
these have been RE-INTRODUCED while applying content edits — check your own
replacement text before returning it.

## 1. Negative parallelism — the #1 recurring flag, by a wide margin
The "X, not Y" / "isn't X, it's Y" / "not just X, but Y" negate-then-reframe.
- **State Y directly; cut the X contrast.** "The gate is deterministic code" —
  not "the gate isn't a model, it's deterministic code."
- **Never open a beat with it**, and keep it out of an outline's `point`,
  `ourTake`, and `gateGuidance` fields — the drafter renders those near-verbatim,
  so a crutch in the plan becomes a crutch in every draft.
- **Exemption:** the outline's one designated `flare` line may use it on purpose.
  That's protected voice, not a crutch. One line, not a blanket pass.

## 2. Rule-of-three tricolons ("A, B, and C")
Three parallel items where the sentence carries one idea, *and* real lists
written as tidy triads. The editor especially re-introduces these while fixing
other things — watch it.
- When you must list, prefer **two or four** items, or break the parallelism, so
  it doesn't land as rhetorical cadence. Keep the one item that carries weight.

## 3. Overclaims about our own pipeline — ground every claim in `docs/blog-facts.md`
Recurring specific errors:
- The ~15 reviewers **read the whole draft**; each is *scoped to grading one
  axis* — they are **not "blind" to the rest**. Don't write "blind to each other."
- The tone-gate mandatory trigger is **`aiScore >= 15`** (a 15-point bar), **not
  "above 2."**
- Don't guarantee behavior of software the post itself says isn't fully built.

## 4. Future-dated internal links — never
Do not link an internal `/blog/<slug>/` whose `pubDate` is **after** this post's
`pubDate`. This post couldn't have linked a post that didn't exist yet. Link
only already-published targets.

## 5. Hedge reintroduction
"it's worth noting", "worth revisiting", "that said", "arguably", "in many ways".
Assert it flat or cut the sentence. (The army keeps re-proposing these into the
same spans — don't seed them in the first place.)

## 6. Tidy-bow endings
No closing beat that resolves to reassurance / "the future looks bright" / a moral
wrap. End on the sharpest concrete point, or stop when the argument's done.

## 7. The performative register — Chad rejected this outright (2026-07-14)
Direct feedback on pipeline output: "too many quips, too much sales speak,
trying too hard, sounds like a bad actor, a bad movie dialogue." The tells:
- **Dramatic-sequencing inversions as hooks** — "X happens before Y" shapes:
  "Twelve stages run before one of these posts ships", "By the time an agent
  writes its first sentence, a dozen reviewers have already…". ONE of these per
  post at most, and only when the sequencing IS the point. Never as a reflex
  opener.
- **Punch-fragment overdose** — "Not even for me." "Go look." "One lane."
  "Wrong lever." A fragment lands because it's rare. More than 2-3 per post
  reads like an action-movie trailer. Prefer complete, calm sentences.
- **Sales speak** — turbocharge, supercharge, game-changing, unlock, "the whole
  thesis", "that's the bet", pitch-deck cadence. State what the thing does.
- **Playing a character instead of talking** — if a line would sound natural
  delivered to a colleague at a desk, keep it. If it needs a movie-trailer
  voice, cut it. Confidence reads as calm, not as punchy.
The register to aim for: someone competent explaining their work plainly, with
occasional dry humor. Not a keynote. Not a trailer. Not a founder pitch.
Deterministic enforcement (TD-0037, calibrated 2026-07-15): tone-grader.ts now
scores dramaticInversions (first free, +6 each, cap 18), punchFragments (first
TEN free — burstiness is legitimate voice — then +1, cap 6), and salesSpeak
(+5 each, cap 15). Calibrated so no existing post or corpus sample newly fails.

## 8. The sales-pivot ending
The closing must resolve the opening — whatever the hook promised, the close
pays off — and its link must point at an implementation or example of *this
article's own subject*, never an unrelated product. "Also check out my other
product/thing" is a sales pivot, not a payoff: it reads as marketplace-ish
salesmanship instead of helping the reader. Ban it. One CTA max, and it
serves the reader's next step on THIS topic (go see the live thing, clone the
repo, run the command) — not a cross-sell.

## Auto-derived pitfalls
Appended by `.claude/agents/blog-learner.md` (TD-0035) once a pattern recurs on
≥3 distinct posts. Each carries provenance and is context-scoped. Audit these
periodically — prune any that flatten voice.

<!-- learner appends below this line -->

## 9. Uniform sentence/list-item rhythm at a peak
A run of several consecutive sentences — or consecutive list items sharing an
identical syntactic frame, most often a repeated colon-tag shape ("X: Y." three
times in a row) — at a section's explanatory or emotional peak. The repeated
shape reads as template, not voice, right where the post most needs to land.
- **Vary at least one item's shape** in any run of 3+: break the colon pattern,
  reorder a clause, or fold two items together so the list doesn't scan as
  identical units stamped from a mold.
- This is about the *reflexive default*, not a ban on all repetition — a short,
  deliberate burst of matched fragments for rhetorical effect (see §7's
  punch-fragment allowance) is still fine, used sparingly and on purpose.
_auto-derived · seen on 3 posts (automate-blog-writing-with-ai-agents,
2026-07-14-dark-dashboard-design, 2026-07-15-grill-me-what-an-auditor-sees) ·
2026-07-15_

## 10. Redundant claim echo
Closing a paragraph or list item by restating a claim already made in the
sentence just before it, in near-identical words — a decorative recap that adds
no new information, evidence, or implication.
- **After drafting a closing line, check what it adds.** If it just repeats the
  prior sentence's claim in fewer or fancier words, cut it — end on the sentence
  that actually carries the point instead of echoing it.
- This is different from a deliberate callback or bookend (restating an opening
  line later in the post on purpose) — that's structure, not an echo. The tell
  is *distance*: an echo sits immediately after the sentence it repeats with no
  new work done in between.
_auto-derived · seen on 3 posts (automate-blog-writing-with-ai-agents,
2026-07-14-dark-dashboard-design, 2026-07-15-grill-me-what-an-auditor-sees) ·
2026-07-15_

## 11. External-source overstatement — cite what the source actually shows
Citing an external source's one example, single data point, or narrow framing
as if it establishes a general trend or consensus ("X shows this is usually/
typically the case", "the industry is converging on Y") when the source itself
only demonstrates that one instance, or frames the same facts a different way.
- **Before generalizing from a citation, check the source's actual scope.** One
  worked example proves the technique exists, not that it's the norm — write
  "shows exactly this pattern" instead of "usually" or "typically" when that's
  all the source backs.
- **No exemption** — a sourced claim should always match what the cited text
  actually says. This isn't a voice trade-off; it's accuracy.
_auto-derived · seen on 3 posts (2026-07-14-dark-dashboard-design,
2026-07-15-grill-me-what-an-auditor-sees, 2026-07-17-design-system-with-css-variables)
across [blog] · 2026-07-15_

## 12. Unhedged absolutes about our own pipeline behavior
Don't state an absolute ("the only X", "always Y", "no judgment risk") about how
a pipeline component — a reviewer, a stage, a gate — behaves without checking it
against that component's actual spec (its own agent file, or a later beat in the
same outline). The clean absolute reads better in isolation, but it's the exact
sentence a fact-check catches once someone checks the source of truth.
- **Before writing an absolute claim about a stage or reviewer's behavior**,
  check its agent file / facts doc for a named exception first.
- **State the claim with its real boundary**, not the clean absolute: name what
  the exception covers in one clause instead of dropping it because it reads
  tighter without it (e.g. "verifiable" for most of a reviewer's checks, with the
  one or two that still take judgment named alongside it).
- No exemption — an incorrect universal claim about our own system is a
  factual-accuracy problem, not a voice trade-off.
_auto-derived · seen on 3 posts (automate-blog-writing-with-ai-agents,
2026-07-17-design-system-with-css-variables, 2026-07-18-which-claude-model-to-use)
across [blog] · 2026-07-15_

## 13. Unverified implementation details about our own product
Stating a specific, checkable detail about how our own code works — a pixel
measurement, an exact UI label, which mechanism handles a case, which output
field prints what — confidently, without checking it against the actual source
file, when the invented specific turns out to be wrong (e.g. an outline
describing a "reserved next-day slot" a scheduler's `assignSlots()` never
implements, when the freeze rule already covers same-day publishing without
one; or a draft claiming a status report lists moved dates when a separate
move-list printout actually does that).
- **Before writing a claim about how our own code behaves, read the source
  file** and confirm the mechanism, function, or output field is really there
  as described. A plausible-sounding specific isn't a substitute for checking.
- **If you haven't verified it, state the design intent instead of a specific
  mechanism** — intent doesn't need a citation; a fabricated mechanism does.
- No exemption — an invented detail about our own implementation is a
  factual-accuracy problem, not a voice trade-off.
_auto-derived · seen on 3 posts (2026-07-14-dark-dashboard-design,
2026-07-17-design-system-with-css-variables, 2026-07-20-automate-blog-publishing-schedule)
across [blog] · 2026-07-16_

## 14. Cross-post reference inaccuracy — check what an earlier post actually says
Citing, quoting as "verbatim," or summarizing an earlier post of ours as backing
for a beat, without opening that post to confirm the wording, figure, or credit
is stated exactly as claimed.
- **Before quoting an earlier post "verbatim" or citing what it established,
  read that post's actual text.** A remembered paraphrase is not a quote.
- **State it in your own words if you haven't verified the exact wording**;
  reserve quotation marks for text you've confirmed against the source post.
- No exemption — misquoting or misstating our own earlier work is a
  factual-accuracy problem, not a voice trade-off.
_auto-derived · seen on 3 posts (2026-07-14-dark-dashboard-design,
2026-07-18-which-claude-model-to-use, 2026-07-21-hired-a-team-of-specialists)
across [blog] · 2026-07-16_

## 15. Em-dash overreach for asides and contrast
Reaching for an em-dash by default whenever a sentence pairs an aside, a
contrast, or two connected clauses — pushing draft em-dash density over the
tone gate's threshold across several posts running.
- **Try a period, a colon, or parentheses first** when a sentence needs an
  aside or a contrast; save the em-dash for the one spot per section where the
  interruption itself is the point.
- **Break a long dash-linked sentence into two shorter sentences** instead of
  bridging two full clauses with a dash.
- No exemption — this is a mechanical tone-gate driver, not a voice call; the
  gate scores em-dash density directly.
_auto-derived · seen on 3 posts (automate-blog-writing-with-ai-agents,
2026-07-18-which-claude-model-to-use, 2026-07-21-hired-a-team-of-specialists)
across [blog] · 2026-07-16_

## 16. Negation-tail crutch — don't close a sentence with a trailing "not X"
Closing a sentence or clause with a trailing negated contrast ("not one
justifying the other", "not a neutral default", "not just X, either") that
only restates or narrows what the main clause already said. Distinct from
negative parallelism's dismiss-then-reframe opener (§1) — this is a closing
tic, not an opener.
- **Land the sentence on its positive claim and stop.** If the trailing "not
  X" clause doesn't add new information, cut it rather than tacking on a coda.
- No exemption — the claim reads stronger without the redundant negation, and
  the negation adds nothing the reader didn't already have.
_auto-derived · seen on 3 posts (2026-07-18-which-claude-model-to-use,
2026-07-19-ai-automation-stack, 2026-07-21-hired-a-team-of-specialists)
across [blog] · 2026-07-16_

## 17. Repeated "That's X: Y" reveal-cadence template
Reaching for the same sentence-final reveal template — "That's <label>: <explanation>,"
"That's the whole <X>," "This is <label>...," or a same-shaped substitute — at
multiple separate points across one post to land a section's point. One
instance reads as a deliberate move; three or four across a draft reads as a
templated tic. This includes near-miss substitutes for the permabanned
"that's the whole point" phrase (§0) — swapping in a same-shaped "that's the
whole transaction" doesn't dodge the tell, it just relocates it.
- **State the trade or point directly instead of labeling it as a reveal.**
  "A few minutes of awkwardness bought us shared reality" — not "That's the
  whole transaction: a few minutes of awkwardness for shared reality."
- **One instance per post at most**, and only where the label-then-colon shape
  is doing real work (an actual definitional reveal, not a rhetorical
  flourish reached for by habit).
- No exemption for repeat use — even where a single instance reads fine in
  isolation, the *count* across one draft is what trips this; a reviewer sees
  the whole post, so plan the outline that way too.
_auto-derived · seen on 3 posts (2026-07-19-ai-automation-stack,
2026-07-21-hired-a-team-of-specialists,
2026-07-22-dividing-a-company-that-makes-no-money) across [blog] · 2026-07-16_

## 18. Keyword phrase as literal sentence subject
Using the outline's target SEO keyword phrase verbatim as the grammatical
subject of a sentence — a bare copula construction like "Rate limiting an LLM
API is a launch requirement..." — reads like landing-page copy, not a
person's spoken opinion.
- **Give the sentence a real subject** — a person, an action, a moment — and
  let the keyword phrase land as an object or modifier instead of the subject
  of an "X is Y" sentence.
- **The keyword itself doesn't need to disappear** — SEO still wants it on
  the page. The fix is where it sits grammatically, not whether it appears.
- No exemption — this is a mechanical construction tell, not a voice
  trade-off.
_auto-derived · seen on 3 posts (2026-07-19-ai-automation-stack,
2026-07-22-dividing-a-company-that-makes-no-money,
2026-07-24-rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill)
across [blog] · 2026-07-16_

## 19. rendersAsProse left false on a beat that carries the payload
An outline node meant to render as skimmable prose — a numbered rundown, a
score list, a caps-and-ceiling summary — left with `rendersAsProse: false`,
silently dropping the whole beat before it ever reaches the draft, even when
a later beat's payoff depends on content only this beat introduces.
- **Before finalizing an outline, check every beat's `rendersAsProse` flag
  against what later beats reference.** If a downstream beat's intendedBeat
  text points back at numbers, a list, or a concrete detail, confirm the
  beat that owns it is actually set to render.
- **This isn't "always set it true"** — a beat that's genuinely structural
  scaffolding, with nothing a later beat needs, is fine left false. Check the
  downstream dependency, don't default either way.
- No exemption for the specific failure mode (a beat other beats depend on
  silently vanishing) — that's a schema bug producing a factual gap, not a
  style choice.
_auto-derived · seen on 3 posts (automate-blog-writing-with-ai-agents,
2026-07-15-grill-me-what-an-auditor-sees,
2026-07-24-rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill)
across [blog] · 2026-07-16_

