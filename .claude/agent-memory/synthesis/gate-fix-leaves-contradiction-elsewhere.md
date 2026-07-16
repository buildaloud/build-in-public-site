# Gate-tier fact fix in one field can leave the contradiction unfixed elsewhere

2026-07-13 outline round #2, "review army" post; reconfirmed 2026-07-14,
"automate-blog-writing-with-ai-agents" outline round #1, a different post —
so this generalizes across posts, not just this one.

Pre-empt: whenever a gate finding corrects a factual or thesis-level
contradiction, grep the rest of the artifact for the same phrase/claim before
finalizing the round's edit set — and don't stop at narrative prose fields
(intendedBeat/ourTake/facts).

The 2026-07-14 round-1 instance found the same wrong figure ("10 to 15" /
"10-15" as a human-prose baseline, contradicting the documented ~2 baseline)
sitting in THREE fields of one paragraph node: intendedBeat, the facts array,
AND gateGuidance — the fact-checker reviewer itself only caught the first
two; synthesis caught the third (gateGuidance) by grepping the whole
paragraph block. gateGuidance is instructional text that propagates straight
into the next stage's prompt, so a wrong number left there re-seeds the same
error in drafting even after the visible prose is fixed. Check gateGuidance
every time, not just narrative fields.

**New variant, confirmed 2026-07-14 same-post round #2**: the contradiction
doesn't have to originate in the outline itself — an ADVISORY/elevation edit
APPLIED by the editor in a prior round can introduce a fresh contradiction
against text elsewhere in the artifact that the original reviewers never
flagged (because it didn't exist yet). Round 1's flatness-elevation rewrite
of order-2 ourTake ("This rewrite is the correction" → "...one review pass
became fifteen narrow ones") landed cleanly, but "one review pass"
contradicted that same paragraph's own facts bullet ("a handful of separate
passes"), caught only in round 2 by factual-accuracy. Lesson: after
confirming prior-round gate edits landed (§1.5 first check), also diff
prior-round ADVISORY/AUTO-APPLY edits against neighboring facts/gateGuidance
in the SAME paragraph — an applied advisory fix is a new source of
contradiction risk, not just the original draft.

**New variant, confirmed 2026-07-15, DRAFT round #1 (not outline), "/stats/
dashboard" post**: the contradiction can be created and fixed within the
SAME round, on prose (not outline fields). technical-honesty's gate fix
corrected "it never touches a data point" (false — the ranking status line's
mint color includes the embedded position number) two sentences into a
paragraph; that paragraph's own closing sentence three sentences later
("...never once touches a data point") restated the now-false claim
verbatim, and no reviewer flagged it (the closing line hadn't changed, so no
reviewer's diff touched it). Synthesis had to author a fresh follow-on GATE
edit itself, not sourced from any reviewer, to keep the paragraph internally
consistent in the same round rather than shipping a self-contradicting
paragraph into round 2. Lesson: this check applies to DRAFT rounds and
same-round gate rewrites too, not just outline rounds or cross-round
advisory-edit residue — always re-read the full paragraph/section around a
factual gate rewrite for restated claims, even ones several sentences away
and even when synthesizing round 1.

**New variant, confirmed 2026-07-15, same post, DRAFT round #2**: a corrected
falsehood can act as a magnet for the NEXT round's reviewers, independent of
each other, all pulling the prose back toward the punchier-but-false original
because it matches the outline's protected/memorable "line that lands." Round
1 fixed the mint-paragraph closer away from "never once touches a data
point" (false per PostStats.astro — the ranking status line's mint DOES
include the avg-position number) to an accurate exception-flag framing. Round
2 saw FIVE independent axes (impact, emotion_impact, structure, wordsmith,
meta-content-signature — several self-tagged low-confidence) each propose
reverting that same sentence back toward "...and it never once touches a data
point," none of them re-deriving the falsehood, all just pattern-matching on
"this doesn't sound as sharp as the outline's protected line." Volume of
independent agreement is not evidence of correctness here — a factual
correction, once established (esp. one verified against actual source code),
outranks any number of axes wanting the punchier original back. Resolution:
keep the diagnosis (the paragraph's closer WAS genuinely redundant/flat) but
supply a fix that solves the flatness without reintroducing the false claim
(here: delete the redundant trailing sentence entirely rather than restore
"never once touches"). Pre-empt: when a gate-tier factual correction from a
prior round gets contested by multiple LOWER-tier (advisory/elevation) axes
in the next round proposing the same reversion, treat that as the false-claim
magnet pattern, not fresh signal — verify against the original evidence
before honoring the reversion, and default to holding the fix.

**New variant, confirmed 2026-07-15, same post, DRAFT round #4: the magnet
now pulls in GATE-tier axes too, not just advisory ones, and does so via TWO
different framings simultaneously.** Round 3 already saw one gate axis
(bullshit-detector/technical-honesty, "not fully binary") hit this pattern
and get dropped. Round 4 saw it hit at GATE tier from TWO axes at once —
flatness AND voice — both proposing the literal same reinstatement
("...and never once touches a data point"), while a THIRD gate axis
(technical-honesty) independently re-raised its round-3 "not fully binary"
argument reworded around signal()'s 3-state return value, and TWO advisory
axes (impact, emotion_impact) plus one self-tagged-low-confidence advisory
axis (meta-content-winners) piled onto the same reversion from the numbers
side (proposing to strip "average position included" instead of restoring
the closer's tail — the same false claim approached from the opposite
direction). All six were dropped on the same grounds: the mint status line
provably DOES color the avg-position number (established round 1 against
PostStats.astro), so any framing — restoring "never touches a data point," OR
stripping the "average position included" clause that already accurately
states the exception, OR re-litigating "not fully binary" — is the same
established falsehood/over-read wearing a new outfit. Gate-tier volume is
still not evidence of correctness on a span with a settled factual
determination. Pre-empt: on this specific mint-status-line span, drop any
reviewer proposal (any tier, any framing) that either (a) claims mint never
touches a data point, or (b) claims the avg-position figure isn't actually
colored mint, or (c) re-argues the mint flag isn't "binary" by pointing at
signal()'s internal state count rather than what mint visually communicates
(present/absent) — without re-deriving the source evidence, don't spend
further analysis budget on it.

**New variant, confirmed 2026-07-15, "grill-me" outline, round #3, SAME
NODE / SIBLING FIELDS**: a wording fix applied to one field of a paragraph
node can leave an identical stale phrase sitting in a sibling field of the
SAME node, and no reviewer catches it until a later round. Round 2's
advisory edit fixed order-6's `intendedBeat` field ("a hidden affiliate
redirect" → "a hidden affiliate link", matching the source post's exact
wording) but left the parallel phrase in order-6's `facts` array untouched
— the two fields of one node now disagreed with each other for a full round
before factual-accuracy and technical-honesty both caught the `facts`-field
copy in round 3. Distinguishing detail from the round-1/round-2 variants
above: this isn't intendedBeat vs. gateGuidance or intendedBeat vs. a distant
closing sentence — it's two short, near-duplicate fields (`facts` bullet vs.
`intendedBeat` prose) inside the SAME paragraph node that restate the same
source quote. Pre-empt: whenever a gate/advisory fix corrects a quoted or
sourced phrase, grep not just gateGuidance and distant prose but every OTHER
field of that same node (facts array, ourTake) for a second copy of the
original phrase — nodes that quote a source in prose almost always echo it
in facts too.

**New variant, confirmed 2026-07-15, "automate-blog-writing-with-ai-agents"
outline round #4: contradiction propagates across NODES, meta-level field vs.
a paragraph node, not just within one node.** Round 3's gate fix on order
13's `intendedBeat` (the install-CTA beat) added a hedge about the package's
missing tone-register detectors, AND round 3's gate fix on order 13's own
`gateGuidance` banned ever claiming the package installs "the same machinery
described above" or "the same tone gate" without that hedge — but the
`intendedBeat` fix's own replacement text still contained the phrase "the
same core machinery described above," a near-miss of the very ban its
sibling gateGuidance fix had just landed in the SAME round's edit batch (self-
contradiction within one round's own gate output, not just left over from an
earlier round). Compounding it, the top-level meta `emotionalCore` field
(a wholly separate YAML node, not a sibling field of order 13) independently
claimed "the reader can install the fixed machine with one command" — the
same full-parity overclaim, unhedged, never touched by round 3's order-13-
scoped fixes because it isn't part of that node at all. Lesson: this
precedent's "grep sibling fields of the same node" reach is too narrow —
when a gate fix hedges an overclaim in one paragraph node, also grep
TOP-LEVEL meta fields (point, hook, emotionalCore, flare) for the same
unhedged claim; they're the fields most likely to compress a beat's nuance
back into a punchy overclaim, and no per-node reviewer is scoped to catch
that cross-node echo. Also: when APPLYING a gate fix, re-check the fix's own
replacement text against that same node's OTHER just-landed gate fixes in
the same round, not only against the pre-edit artifact — a same-round,
same-node gate-fix-vs-gate-fix contradiction is possible and easy to miss
when each fix is drafted independently.

**New variant, confirmed 2026-07-15, same post, outline round #5: the same
TD-0038 package-parity overclaim resurfaced a FOURTH time, in a THIRD field
of order 13's own node.** Rounds 3-4 fixed `intendedBeat`, `gateGuidance`,
and the cross-node `emotionalCore` field for this exact overclaim ("install
the same machine/machinery" without the missing-detectors hedge). Round 5
found the identical unhedged claim still sitting in order 13's own `ourTake`
field ("...and now you can set up the same machine with one command"),
untouched by any of the three prior fixes because none of them were scoped
to `ourTake`. This is the sibling-field variant (documented above, "grill-me"
round #3) recurring on THIS post specifically, and it took four separate
rounds to fully exhaust all the fields carrying the claim (intendedBeat,
gateGuidance, emotionalCore, ourTake) one at a time rather than all at once.
Sharper pre-empt for future TD-0038-style hedge fixes: the FIRST round that
fixes an overclaim on one field of a node should immediately grep that SAME
node's `ourTake` too — `ourTake` is the field most likely to carry a punchy,
unhedged restatement of a beat's core claim (it's written to be quotable),
and it's the one field the last four rounds' checks kept skipping until it
was the last one standing. Don't treat "I checked intendedBeat and
gateGuidance" as exhaustive for this post's specific overclaim; check
intendedBeat, gateGuidance, ourTake, facts, AND top-level meta together, in
one pass, the first time this claim shape is fixed anywhere.

**New variant, confirmed 2026-07-15, "writing-alt-text-seo-accessibility"
outline round #2, a FOURTH post — numeral count-fix sweeps specifically are
prone to this, not just wording/claim fixes.** Round 1 fixed a stale
hero-image count (15→17) across 8 separate spans (hook, order-1 facts/
intendedBeat, order-6 topic/intendedBeat×2/facts×2) plus one dependent
"plenty"/"few" contradiction — a deliberately thorough multi-span sweep — but
still missed a NINTH span carrying the same stale numeral in prose form:
order-8's closing intendedBeat, "Resolve the hook: fifteen images later, the
rule held." No round-1 reviewer flagged it (their diffs didn't touch that
paragraph), and it survived a full round undetected until round 2's impact
and outline-structure axes both caught it independently. Sharper pre-empt for
numeral/count-fix sweeps specifically: when a gate fix corrects a count that
appears as both a digit ("15") and spelled out ("fifteen"), grep the whole
artifact for BOTH forms before declaring the sweep complete — a
digit-only grep will miss spelled-out recurrences in closing/CTA beats,
which is exactly the paragraph type (hook-resolution, "N units later...")
most likely to restate the post's headline number in prose form.

**New variant, confirmed 2026-07-15, "css-variables-design-system" outline
round #2, a FIFTH post — TWO nodes hit the sibling-field variant
SIMULTANEOUSLY in the same round.** Round 1 fixed a fabricated
"colorblind-safety and contrast validator" claim and a fabricated
"categorical lightness band" phrase at the `intendedBeat` level of order 8,
plus a "typically" overclaim at the `intendedBeat` level of order 7 (CSS-
Tricks generalizing from one dark-mode example). Both fixes landed cleanly in
`intendedBeat`. But each node's own `facts` array carried an independent,
never-touched copy of the same claim: order 7's facts bullet still read
"theming... typically means reassigning..." and order 8's facts bullet still
read "...fails the categorical lightness band on dark" — both survived a
full round undetected until round 2's factual-accuracy and technical-honesty
caught them (order 8's fabrication caught by BOTH reviewers independently,
confirming it's a well-known claim). Reinforces the existing pre-empt with a
sharper trigger: the moment a gate fix corrects a sourced/fabricated claim in
ANY field, check that SAME node's `facts` array in the SAME pass, not as a
follow-up — do not wait for it to resurface as its own round-2 finding, this
is now confirmed on 5 separate posts as the single most common way a
"landed" gate fix leaves the artifact still internally wrong.

**New variant, confirmed 2026-07-15, "automate-blog-publishing-schedule"
outline round #1, a SIXTH post — a whole fictional MECHANISM sweep, not just
a stale claim/numeral.** technical-honesty's 5-finding sweep debunking a
fabricated "reserved next-day slot" scheduling mechanism (order 6's topic /
intendedBeat / ourTake / facts×2) left that SAME node's own `gateGuidance`
field uncorrected (it still instructed "keep the queue-wide one-day bump
when the slot gets used" — the same fictional slot), plus TWO sibling nodes
(order 7's bridging elevation referencing "the one reserved slot"; order 9's
CTA recap restating "leave tomorrow open" and a stale live-figure claim in
its own gateGuidance) still leaning on the debunked mechanism, none flagged
by any reviewer. Synthesis authored 3 additional gate edits to close the
gap. Sharpens the pre-empt once more: a fictional-MECHANISM sweep (not just
a wrong number or claim) needs the same-node-gateGuidance check AND a scan
of every OTHER node whose prose bridges into or recaps the corrected node —
mechanism claims get restated in transition/CTA prose even more readily than
simple facts do.
