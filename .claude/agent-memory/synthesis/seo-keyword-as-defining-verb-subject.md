# Keyword phrase fronted as bare-verb subject ("X, done this way, means Y")

Confirmed 2026-07-16, "rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill."
A targetKeyword phrase parked as the grammatical subject of a plain defining
verb ("means"/"is") reads as landing-page copy, not something a person says.

Confirmed 3x through draft round 2 (outline order 2, then the "Defense in
depth" beat at both outline and draft stage) with only a numeral swap between
recurrences — the underlying front-loading habit survives a same-round gate
fix if the fix only reorders the clause rather than demoting the keyword
phrase out of subject position entirely. On draft r2, voice's gate-tier fix
("Doing X this way means Y") only partially resolved this — still opens on
the keyword phrase as object of a gerund.

**4th recurrence, draft r3 — the predicted full-subject-swap fix showed up,
but lost on tier, not on merit.** emotion_impact proposed exactly the escape
hatch flagged in round 2 ("If a 4th recurrence surfaces, escalate to a full
subject swap"): move the "unclever/clever" framing to the END of the
paragraph as a `So the design stacks six unclever limits...` conclusion
instead of the opening subject. This is the correct shape of fix — it
actually demotes the keyword phrase out of subject position, not just
reorders around it. But emotion_impact is advisory-tier, and the SAME round,
wordsmith (auto-apply) proposed a much smaller word-swap on the same sentence
("unclever"→"blunt") that doesn't touch the subject-position problem at all.
Per the no-exceptions tier-collision rule, wordsmith's auto-apply fix won,
so the actual structural defect survives another round, landed-and-patched-
over with a single word swap while the real fix sat in the dropped-elevations
pile.

**Lesson for next round**: if this pattern shows up a 5th time on this exact
sentence (the "Defense in depth" opener), do not let an auto-apply-tier
word-swap keep beating an advisory-tier structural fix that actually solves
it — either escalate the structural fix's disposition explicitly (flag it to
the human owner as gate-worthy) or fold the auto-apply word choice INTO the
structural fix rather than letting tier alone decide, since blind tier
priority is now provably keeping a genuine defect open across at least 4
rounds while a correctly-shaped fix keeps losing on a technicality.

**5th recurrence, draft r4 — override applied per round 3's own instruction,
cycle broken.** The same paragraph drew the pattern a 5th time: formulaic
(AI-structural-crutches, gate-tier) proposed ANOTHER small tail-trim of the
opening sentence ("Doing public chatbot cost control this way means stacking
six blunt limits. No single one is clever enough to trust alone.") that still
opens on the keyword phrase as gerund-object and doesn't demote it — the
identical shape of non-fix as wordsmith's round-3 "win." This time emotion
proposed the same full-paragraph subject-swap shape as round 3
(move "the design stacks six blunt limits..." to the END, opening instead on
"Every limit here is beatable on its own"). Per this file's own round-3
instruction, synthesis did NOT let tier alone decide: emotion's structural
fix was adopted over formulaic's cosmetic one despite formulaic being
gate-tier and emotion advisory-tier, with wordsmith's ("single" trim) and
grammar's (visitor ID capitalization) and voice's (gate-tier, "Cap the
IP alone" shape-break) compatible micro-fixes folded INTO the winning
structural version rather than fought over separately. Final landed shape:
"Every limit here is beatable on its own. Cap the visitor ID alone, and a
script clears it for a fresh one on the next request. Cap the IP alone and it
just proxies to a fresh address. So the design stacks six blunt limits
instead of trusting one clever one, and the layers fail in different
directions — getting past all of them at once is the expensive part." This is
the first round the keyword phrase is fully out of subject position on this
sentence. Lesson confirmed: when a same-tier-favored cosmetic fix has already
lost to a structurally-correct fix on tier grounds 1+ prior rounds running,
and the cosmetic fix resurfaces again with no new rationale, treat the
override as already-decided precedent rather than re-litigating the tier
question from scratch each round — check next round's draft to confirm this
sentence actually stops drawing the pattern; if it recurs a 6th time even
after this fix, the structural fix itself is not resolving the root cause and
needs a different shape entirely.
