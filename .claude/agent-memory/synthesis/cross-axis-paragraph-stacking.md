# Cross-axis convergence + paragraph-stacking-avoidance rule

Reconfirmed 2026-07-13, round 5. When N≥3 axes independently propose
near-identical restructuring of the same span, synthesize ONE consolidated
edit at the highest tier present. When a paragraph already carries a
GATE-tier rewrite this round, defer (don't stack) an otherwise-fine ADVISORY
tweak to a DIFFERENT sentence in that same paragraph — round 5 deferred four
such advisory items (structure's "Past topic approval" split, grammar's
"them" antecedent fix, link-opportunity's Anthropic-anchor move, structure's
misplaced-modifier opener fix) purely because each shared a paragraph with a
round-5 gate edit, re-checking them next round against the post-gate-edit
text instead.

Reconfirmed 2026-07-14, "automate-blog-writing-with-ai-agents" outline round
#2: same pattern, now also seen mid-post (not just cross-post) — order-2 had
one gate-tier rewrite this round (factual-accuracy's ourTake fix); an
otherwise-fine emotion_impact ADVISORY tweak to order-2's gateGuidance (a
different field/sentence, same paragraph node) was deferred to next round
rather than stacked, to re-check it against the post-gate-edit text first.

Reconfirmed 2026-07-14, same post, outline round #5: three SAME-TIER
(elevation) axes — meta-content, technical-honesty, and formulaic — each
independently targeted the meta.point field this round, from three different
angles (meta-content + technical-honesty both caught the same wrong-stage
factual attribution; formulaic separately caught a tricolon in the back half
of the same field). All three consolidated into ONE edit covering the whole
field rather than three separate quote/replacement entries fighting over
overlapping text. This is the same-tier variant of the rule: it isn't only
"defer the lower tier to the higher tier" — same-tier collisions on one span
also collapse to a single merged edit, not N parallel ones.

**New variant, confirmed 2026-07-14, "how-i-automate-blog-writing-with-ai-agents"
draft round #2**: first documented instance of THREE GATE-tier axes
(voice, formulaic, technical-honesty) independently flagging overlapping
spans of the same two-sentence passage (the Google-spam-policy paragraph) —
voice and formulaic both caught the hedge opener ("Worth being precise
about..."), technical-honesty separately caught a factual misattribution one
clause later in the same passage, and technical-honesty's OWN proposed gate
rewrite kept the exact hedge opener the other two axes were gating on, plus
introduced a fresh negParallel closer ("Method, not authorship, is what
trips it."). Merging three GATE findings into one edit is not enough by
itself — the merged replacement still needs the full negParallel/hedge/
em-dash/tricolon scrub from negparallel-hedge-tics-systemic.md applied
AFTER merging, not just once per source finding. A 3-way GATE collision is
the highest-risk case for a smuggled-in tell, because each axis's own text
gets treated as "already gate-approved" and is the one most likely to be
copy-pasted into the merge without a fresh scrub.

**New variant, confirmed 2026-07-14, same post, draft round #3**: a merged
GATE edit's scrub must also check the merged replacement against
SURROUNDING sentences left untouched in the same paragraph, not just scrub
the replacement internally. Round 2's merged fix on the Google-spam-policy
passage replaced the hedge/factual sentence with "The policy targets intent
to manipulate rankings. It names generative AI as one example of how scaled
content abuse shows up, alongside scraping and content spinning." — internally
clean, no hedge/negParallel/em-dash — but it landed directly after an
untouched opening sentence ("It calls the pattern scaled content abuse
[...] and names generative AI tools specifically as one way that pattern
shows up") that already said almost the same thing. The merge created a
fresh 3-sentence redundant restatement the round-2 scrub never saw, because
it only checked the replacement text in isolation. Round 3 needed a second
GATE-tier fix on the same span (flatness + voice both re-flagged it) to
finally collapse it to two non-redundant sentences. Rule going forward: when
a GATE merge replaces text mid-paragraph, re-read the full paragraph
(replacement + whatever text stays before/after it) as one unit before
calling the scrub done, not just the substituted span.

**New variant, confirmed 2026-07-15, "which-claude-model-to-use" draft round
#3**: short reveal-framing / throwaway-emphasis "clincher" sentences
("That's the whole trick: ...", "No exceptions, no matter the task.",
"Here's the honest part: ...") reliably draw a full cross-axis pile-on EVERY
round they exist, not just once — round 2 saw a 3-axis stack (impact,
emotion_impact, grammar) on one such clincher ("Nobody looked at..."); round
3, after that span was rewritten, produced TWO separate 5-axis stacks on two
different clincher sentences in the same draft ("That's the whole trick:
looking, done call by call instead of once." drew structural-crutches [gate],
seo, structure, wordsmith, and emotion_impact; "Every marketplace audit
since has run on Sonnet, no exceptions." drew flatness [gate],
structural-crutches [gate], impact, emotion_impact, and voice-fidelity).
Rule: when a synthesis round shows ≥2 reviewers flagging the same short
reveal-framing/redundant-tail sentence, expect near-total army pile-on and
resolve fast at whichever gate-tier axis (flatness or structural-crutches,
whichever caught it) offers the plainest declarative fix — dropping the
other 3-4 proposals as tier-collision losses rather than trying to blend
them. These clincher sentences are a durable AI-tell shape for this
blog/voice specifically (Scout's drafter keeps reaching for them even after
prior rounds scrub the exact same tic elsewhere in the same draft), so treat
a fresh one appearing in a freshly-authored span as expected, not surprising.
