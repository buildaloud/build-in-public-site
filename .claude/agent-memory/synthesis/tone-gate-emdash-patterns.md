# Mechanical tone-gate em-dash patterns

**Em-dashes can hide outside the body prose a reviewer scopes to**
(2026-07-13 draft round #3, "review army" post, aiScore=26, 7 dashes / 3.04
per 1k). Fix for Sources captions: convert " — " to ": " or "(...)" in the
display text. Stay conservative once the dash driver clears: only accept a
dash-adding edit when it's the tier-winning GATE-level resolution for a real,
separate problem on that span; skip otherwise-fine advisory edits solely
because they add an optional dash (round 5 skipped flatness's and
structure's dash-adding advisory rewrites on this basis, keeping
semicolon/period alternatives instead).

**Tone gate driven purely by em-dash density + tricolon count, zero banned
phrases** (2026-07-13 draft rounds #2-3, "review army" post). Fix pattern:
convert em-dash pairs to colons/parens/periods, and break "X, Y, and Z"
parallel lists into asyndeton or a colon-led list. Always re-check a proposed
replacement against the dash count before accepting it when the dash driver
is live.

**Dash-budget also decides between two competing GATE-tier fixes on the same
span, not just gate-vs-elevation.** Confirmed 2026-07-15, "grill-me" DRAFT
round 2 (aiScore=13, clean but close to the 15 cap): factual-accuracy and
technical-honesty both raised valid GATE findings on the same
misattribution span (Mitiga "found" vs "built" a PoC skill), with equally
defensible replacement text — factual-accuracy's added a 2-dash aside,
technical-honesty's fixed the same fact with zero new dashes. Picked
technical-honesty's dash-free version specifically to protect the dash
budget, even though both were gate-tier and factually sound. When a
mandatory gate-tier em-dash addition is unavoidable elsewhere in the same
round (as it was here, on a separate voice-reviewer hedge-theater fix),
that's more reason to zero out every other avoidable dash add, not less.

**A tone-gate driver's quoted "hit" example can be a non-literal metric
readout, not an actual text span.** Observed 2026-07-16, "claude-code-
subagents-instead-of-one-prompt" DRAFT round 1 (aiScore=34): input 4 listed
`emDash (1 hit): "10×"` but no literal "10×" string exists anywhere in the
draft — the value reads as a ratio/multiplier against the healthy-density
threshold, not a quotable phrase. Don't force a fabricated quote→replacement
edit to match ungrounded driver text; when a driver's example doesn't
literal-match the artifact, treat it as a density/frequency signal instead
and satisfy it by counting and reducing the real em-dash instances found via
your own scan (as the tricolon and texture-floor drivers already require),
same as the "Stale reviewer input" rule but for input-4 driver output rather
than a reviewer.
