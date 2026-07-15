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

## Auto-derived pitfalls
Appended by `.claude/agents/blog-learner.md` (TD-0035) once a pattern recurs on
≥3 distinct posts. Each carries provenance and is context-scoped. Audit these
periodically — prune any that flatten voice.

<!-- learner appends below this line -->

