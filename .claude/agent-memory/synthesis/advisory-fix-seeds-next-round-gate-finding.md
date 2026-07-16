# An applied advisory/auto-apply edit can itself become next round's gate finding

Confirmed 2026-07-14, "how-i-automate-blog-writing-with-ai-agents" draft,
round 4→5. Three separate round-4 ADVISORY/AUTO-APPLY edits landed cleanly,
and each one became the exact span a GATE-tier reviewer flagged fresh in
round 5: (1) hook's advisory split of the opener's "Ask how I automate..."
sentence landed, then voice (gate) flagged the resulting 6-sentence hook
paragraph as monotone-short and rejoined it, effectively reversing hook's
split; (2) voice's own advisory rhythm-variation rewrite of "That's a
different bug..." landed as "Not the tone-gate bug. A different one, and a
bigger one...", then flatness AND formulaic (both gate) flagged that exact
landed text next round as a restatement / forbidden negParallel shape;
(3) link-opportunity's advisory anchor-text fix on the token-bill sentence
landed, and the editor's application of it also collapsed the sentence split
that had protected the outline's same-sentence gateGuidance, which voice
(gate) then had to re-fix. Lesson: §1.5's "touched span" carveout cuts both
ways — applying a lower-tier edit does not immunize that span from a
higher-tier reviewer next round; if anything, freshly-touched prose is WHERE
gate reviewers are most likely to find something, because the edit itself
introduced (or re-triggered) the very shape a gate axis polices. When
dedup'ing a low-tier fix onto a span that borders a gate-sensitive
construction (negParallel, tricolon, same-sentence factual pairing,
rhythm/burstiness), flag it for a recheck next round rather than assuming the
lower-tier fix closed the book on that span.

**Narrowed pattern, confirmed 2026-07-15, "grill-me" outline, rounds 2→3,
TWO instances in the same round**: the highest-yield version of this pattern
is specifically an `ourTake` field escalation. Round 2 forwarded two
ADVISORY `ourTake` rewrites chosen for emotional punch over a competing
milder rewrite of the same span (voice's first-person order-1 stake beating
hook's trim; emotion_impact's order-6 "waved that exact skill through"
escalation beating flatness's version) — both landed, and both became fresh
AI-structural-crutches GATE findings in round 3: order-1's landed text
("the impulse isn't the problem... is the problem") is a textbook negParallel
shape, and order-6's landed text ("zero malice, nothing to flag, install
approved") is a textbook tricolon. The punchier rewrite that wins an
advisory-tier collision is disproportionately likely to reach for exactly the
rhetorical shapes (negParallel, tricolon) that gate-tier structural reviewers
police, because that's often *what makes it punchier*. Pre-empt: when
resolving an advisory-tier same-span collision on an `ourTake` field by
picking the more emotionally escalated option, scan that specific replacement
text yourself for negParallel/tricolon before forwarding it — don't just wait
for next round's gate reviewer to catch it, since the pattern is now
confirmed recurring at 100% hit rate across 2 instances in one round.

**Mitigation confirmed working, 2026-07-15, same outline, round 3→4**: with
round 3's ourTake gate fixes landed clean, round 4 produced zero gate
findings from any axis — but two FRESH elevation-tier `ourTake` rewrites this
round independently reproduced the same banned shapes this outline's own
gateGuidance explicitly forbids: voice's order-1 rewrite ("...is how it ends
up with your files, your shell, your credentials...") reproduced the exact
reach-list tricolon the paragraph's gateGuidance names as forbidden by
example ("never a tricolon like 'your files, your shell, your tokens'"), and
emotion_impact's order-3 rewrite closed on "...not a nice-to-have," an
X-not-Y negParallel tail. Both were caught in synthesis and dropped from the
forwarded set before reaching the editor, per this entry's own pre-scan
instruction — confirms the pre-scan step actually prevents the next-round
gate finding rather than just predicting it. Third and fourth confirmed
instances (now 4 across 3 rounds, still 100% hit rate on ourTake-field
escalations that reach for a punchier close). Keep pre-scanning every
`ourTake` rewrite — winning OR merely offered-for-consideration — against the
node's own gateGuidance ban-list before it ships to drafting, not just
against the generic negParallel/tricolon shapes.

**New combinatorial variant, confirmed 2026-07-15, "grill-me" DRAFT round
3→4**: this time the seeding wasn't one edit, it was two compatible
lower-tier edits from the SAME round stacking. Round 3 landed an AUTO-APPLY
word-repeat fix ("lists"→"carries" on the JSON-anatomy opener) and,
separately, an ADVISORY sentence-split on the AST-code sentence right after
it (which itself introduced a second "carries" as its own new sentence's main
verb). Neither edit was wrong in isolation — each solved its own local
problem — but together they produced three consecutive sentences all using
"carries" as the main predicate, which voice-fidelity caught fresh as a
round-4 GATE finding (the exact burstiness/same-shape-repetition failure this
axis polices). Lesson: when multiple lower-tier fixes land in the same round
on adjacent sentences, scan the ROUND'S FULL EDIT BATCH for accumulated
verb/word repetition across the merged result, not just each edit against its
own immediate context — a locally-clean auto-apply fix plus a locally-clean
advisory fix can jointly recreate the very repetition problem a gate axis
exists to catch, even though neither one duplicated the OTHER's changed word.

**Cross-post confirmation, 2026-07-15,
"automate-blog-writing-with-ai-agents" REWRITE outline round 1→2**: a landed
ADVISORY fix (voice-reviewer's order-6 `ourTake` model-routing rewrite, "I
route by the shape of the check, not the price tag...") drew a fresh
GATE-tier negParallel finding (AI-structural-crutches) one round later, on
the exact clause the advisory fix itself introduced ("not the price tag,").
Same shape as the ourTake-escalation pattern above, at the outline stage this
time rather than draft.

**Scope broadened beyond `ourTake`, confirmed 2026-07-15,
"writing-alt-text-seo-accessibility" outline round 2→3, TWO instances in one
round**: both round-2 ADVISORY/elevation edits that landed cleanly became
fresh AI-structural-crutches GATE findings in round 3 — (1) impact's `ourTake`
rewrite on order-3 ("Image alt text best practices aren't a compromise
between two audiences — they're one instruction...") landed and was flagged
next round as textbook negParallel, the by-now-familiar ourTake shape; but
(2) factual-accuracy's `facts`-field insert-after elevation on order-4 (the
W3C happy-family example, "...doesn't get alt text describing faces and a
lawn, it gets 'We're family-friendly' ... not an inventory of what's in
frame") also landed and was flagged next round as TWO stacked negParallel
constructions. (2) confirms the pattern isn't ourTake-specific — any
elevation that lands prose making an evidentiary/illustrative point (facts,
insert-after citations, worked examples) is just as likely to reach for
negParallel/contrastive framing as a punchy ourTake rewrite, because
"X, not Y" and "doesn't get X, it gets Y" are the generic go-to shape for
stating a corrective/clarifying fact, not a register unique to first-person
takes. Pre-scan EVERY elevation's replacement text for these shapes before
forwarding, regardless of which field it targets.

**Scope broadened to GATE-tier fixes themselves, confirmed 2026-07-15,
"css-variables-design-system" outline round 3→4**: round 3's own GATE-tier
fix (technical-honesty, de-overclaiming order-8 `ourTake`'s "zero component
edits") landed as "...same file (and not one component that already existed
had to change to pick it up), and even the color choice followed a rule:
dodge red and green." — and round 4's AI-structural-crutches flagged that
exact landed text fresh as a stacked tricolon + emphatic-negation-aside
crutch. This confirms the pattern isn't limited to lower-tier edits seeding
gate findings: a GATE fix's own replacement prose is just as exposed, because
fixing one defect (overclaim) under time/word pressure reaches for the same
punchy asyndetic/negation shapes as any other rewrite. Pre-scan a GATE fix's
own proposed replacement for negParallel/tricolon before finalizing it in the
SAME round it's written, not just lower-tier edits.

**Scope broadened to non-`ourTake` top-level fields, confirmed 2026-07-15,
"css-variables-design-system" outline round 4→5, TWO instances in one round**:
both round-4 ADVISORY elevations that landed became fresh AI-structural-crutches
GATE findings in round 5 — (1) impact's `emotionalCore` rewrite ("...proof the
discipline wasn't just tidy, it was load-bearing") landed verbatim (modulo an
em-dash→colon punctuation drift) and was flagged next round as an unauthorized
second instance of the post's one-permitted-use negParallel construction (the
flare line already spent that budget); (2) voice-fidelity's order-3 `ourTake`
rewrite ("no wiring, no prop-drilling, nothing to forget") landed and was
flagged next round as a textbook tricolon — this is the SAME post's SECOND
ourTake instance of this exact pattern (order-8 drew it in round 3→4, order-3
now in round 4→5), meaning this one post has now independently reproduced the
ourTake-tricolon shape twice on two different nodes. Confirms `emotionalCore`
joins `facts`/insert-after (alt-text post) as a non-ourTake field prone to the
same seeding, and that a single post can reproduce the ourTake variant more
than once if synthesis doesn't pre-scan winning advisory rewrites before
forwarding them. Pre-scan discipline (this entry's own repeated instruction)
is not yet being applied consistently in practice — treat "scan every
elevation before forwarding, whatever field it targets" as the standing rule,
not a lesson that self-enforces after being logged once.

**New sub-shape: banned-cliché phrase, not just negParallel/tricolon,
confirmed 2026-07-15, "ai-automation-stack" outline round 2→3**: round 2's
ADVISORY-tier `emotion` rewrite of order-5's `ourTake` ("Swapping the engine
mid-queue while it kept publishing should have been terrifying. It wasn't —
that's the whole point of building the stack this way.") landed clean, and
round 3's AI-structural-crutches flagged it fresh — not for negParallel or
tricolon, but for a sales-deck reveal cliché ("that's the whole point"),
explicitly named by the reviewer as a shape already gated as a relapse crutch
on a sibling post. Confirms the seeding pattern isn't scoped to
negParallel/tricolon specifically — any of formulaic's banned-phrase/cliché
list (hedges, reveal-framing, "the whole point/beauty/thing is") is just as
likely to get reached for by a punchy advisory `ourTake` rewrite. Widen the
pre-scan checklist for winning advisory `ourTake` rewrites to the FULL
AI-structural-crutches banned-phrase list, not just negParallel/tricolon
shape-matching.

**Cross-post confirmation, 2026-07-15,
"automate-blog-publishing-schedule" outline round 1→2**: round 1's own
GATE fix (technical-honesty's whole-mechanism sweep debunking the fictional
"reserved next-day slot") landed across order-6's `intendedBeat`, `ourTake`,
AND `facts` fields, and round 2's AI-structural-crutches (formulaic) flagged
all three landed fields fresh — one negate-then-reframe ("doesn't X: Y")
construction per field, the densest single-node instance of this pattern
recorded so far (three fields, one round, one node). Same shape as
css-variables-design-system round 3→4 above: a whole-mechanism debunking
rewrite reaches for negate-then-reframe just as naturally as a punchy
`ourTake` does ("it's not X, it's actually Y" is the generic shape for
stating any correction), and a GATE fix is exactly as exposed as any other
tier. Reinforces the standing pre-empt with a sharper trigger: when a GATE
fix debunks a whole fictional mechanism across multiple fields of one node in
a single round, pre-scan ALL of those fields' replacement text for
negate-then-reframe shapes together, not just the one field a formulaic
reviewer happens to flag first — density (3+ in one node) is now a confirmed
pattern, not a one-off.

**Scope broadened to `hook`/meta fields, confirmed 2026-07-16,
"claude-code-subagents-instead-of-one-prompt" outline round 2→3**: round 2's
ADVISORY merge of hook + outline-structure elevations on the `meta.hook`
field ("It felt like the responsible way to work: one ask, one clear line of
sight, no hand-off where context could get lost.") landed clean, and round
3's AI-structural-crutches flagged that exact landed text fresh as a
textbook three-item tricolon scaffold. The merge itself was reasonable at
the time (it scrubbed em-dashes and checked the post's own negParallel/
punch-fragment rules before landing) but a tricolon wasn't on the pre-scan
checklist for that specific merge. Confirms the pattern reaches the meta-block
`hook` field too, not just body-paragraph `ourTake`/`facts`/`emotionalCore`.
Standing instruction unchanged, restated once more for emphasis: pre-scan
every winning advisory/merge replacement — meta fields included — against
the FULL AI-structural-crutches shape list (negParallel, tricolon, reveal-
cliché, punch fragment) before forwarding, not just the specific rule the
merge was originally trying to satisfy.

**Cross-post confirmation, 2026-07-16,
"2026-07-22-dividing-a-company-that-makes-no-money" DRAFT round 1→2, THREE
simultaneous instances in one round — density confirmed at draft stage,
not just outline.** All three of round 1's GATE fixes on this post that
touched a copula/negation construction seeded a fresh round-2 finding on
their own landed replacement text: (1) voice's round-1 auto-apply-merged fix
of "This is founder equity before revenue, in practice..." left the leading
"This is X: Y" bare-copula shell in place (only fixed the trailing hedge/
dangling clause), and voice itself caught the leftover copula fresh in round
2; (2) flatness's round-1 GATE fix built the sentence "Getting the ratio
exactly right matters less than avoiding cofounder conflict altogether." to
replace a different negation sentence — round 2's flatness caught that its
OWN round-1 replacement pre-states the post's one licensed flare line two
sentences later, diluting it; (3) the round-1 gate merge of the Stripe quote
sentence inserted the word "forever" while splicing two sentences together —
round 2's technical-honesty caught that "forever" isn't in Stripe's actual
source text, a misquote the merge itself introduced. Confirms this pattern
applies at full density (3 instances, 1 round) at the DRAFT stage on prose
gate fixes, not just outline-stage `ourTake`/field rewrites — and confirms
axes can catch their OWN prior-round gate fix's residual defect (voice on
voice, flatness on flatness), not just a different axis catching another
axis's fix. Standing instruction reinforced: re-scan every landed GATE fix's
full replacement text next round against that SAME axis's own rules, not
just against other axes' rules.
