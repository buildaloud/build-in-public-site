# Auto-apply fix that fails to land isn't self-limiting to one field/round

Escalated 2026-07-13 draft round #5. meta.title's over-60-char fix has now
been reported broken 4 consecutive rounds (2, 3, 4, 5) despite being
re-applied each time. Previously logged as a metadata-only landing gap
"distinct from body prose, which lands reliably" — **that framing is now
WRONG.** Round 5 confirmed ALL SIX of round 4's body-prose GATE edits also
failed to land verbatim (checked every quote against the round-5 artifact
text directly; all six were still present unedited, character-for-character
identical to their pre-round-4 form), a jump from round 3's ~94% landing rate
to round 4's apparent 0%. This is no longer a metadata-vs-prose distinction —
it looks like an entire round's edit batch can silently fail to apply at
all.

Pre-empt, standing now: at the START of every synthesis round, before doing
any new dedup/rank work, literal-match EVERY gate edit (not just the
historically-flaky meta.title) from the immediately prior round's
consolidatedEdits against the current artifact text. Treat ANY mismatch as
the round's top priority, ahead of new findings — and if the landing rate for
a whole round drops sharply (not just one field), flag to Chad explicitly
that this may be a pipeline/tooling bug (wrong file target, edit-then-revert,
etc.), not just "the editor missed a line."

**Cross-post confirmation, 2026-07-15, "ai-automation-stack" DRAFT, rounds
1→2→3 — three of the SAME three spans fail to land three rounds running.**
Three body-prose GATE edits (intro hook asyndeton list; the Measurement
ourTake "scorecard doesn't perform confidence it hasn't earned"; the
Measurement flare line "doesn't owe me optimism; it owes me the truth") were
each issued as a GATE edit in round 1, reissued verbatim in round 2 after
failing to land, and STILL had not landed as specified by round 3 — each
time the editor applied a different, non-matching rewrite instead of the
literal quote→replacement (e.g. splitting the hook into two sentences again
instead of one asyndeton list; keeping "shows only the confidence it has
actually earned" instead of switching to the negParallel "doesn't perform...
hasn't earned" construction; dropping the flare line's first clause a third
time). The flare line specifically has now been the #1 most-cited finding
across all three rounds (7+, 5+, and 7+ reviewers respectively) without once
landing correctly. Two other GATE edits from round 2 (a colon→em-dash fix on
the Model Routing closer, and the same fix on the Scheduling closer) also
landed with the WRONG punctuation (colon retained instead of em-dash),
recreating the exact "colon-tag reveal-cadence" defect the AI-structural-
crutches axis was hunting, causing that axis's own 3-instance density gate to
re-trip in round 3 (it had explicitly predicted in round 2 that fixing those
two spans would drop the density below its own gate threshold).

Refined lesson: for a span that has failed to land 2+ rounds running, don't
just reissue the same-shaped quote/replacement pair unchanged — shrink the
quote to the smallest possible exact span (avoid multi-sentence quotes an
editor might partially match or paraphrase around), and flag the repeat
count explicitly in the edit's rationale so the priority is unmistakable. If
a 4th round also fails to land one of these three spans, escalate to Chad as
a probable tooling/apply-mechanism bug rather than continuing to reissue
identically — three failed identical attempts is past the point where "the
editor missed it" is the most likely explanation.
