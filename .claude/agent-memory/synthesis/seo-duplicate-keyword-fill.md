# SEO keyword-fill elevations recur without checking sibling assignments first

Confirmed 2026-07-15, "automate-blog-writing-with-ai-agents" outline rounds
4-5: the SEO axis repeatedly proposes filling an empty `keyword: ""` field on
one paragraph node with a secondaryKeyword that's already assigned to a
different node in the same outline.

Round 4: proposed assigning "multi-agent content pipeline" to order 9's empty
`keyword` field — already assigned to order 2. Dropped (would duplicate order
2's assignment and blur the order-2-vs-order-7 framing distinction).

Round 5: TWO separate instances in the same round — proposed assigning
"specialized AI sub-agents" to order 10's empty `keyword` field (already
assigned to order 5), and separately "multi-agent content pipeline" to order
4's empty `keyword` field (already assigned to order 2, the same keyword
round 4 already flagged as a duplicate on a different node).

Pattern: the axis is scanning for empty `keyword: ""` fields on proof/H2-worthy
beats and picking a thematically-plausible secondaryKeyword for each, but
isn't cross-checking the outline's existing keyword-to-node map first — so it
keeps re-colliding with an already-assigned keyword rather than proposing an
actually-unused one from `secondaryKeywords`.

Pre-empt: before forwarding any SEO keyword-fill elevation, build the
keyword→node assignment map from the current artifact first (grep every
`keyword:` field) and check the proposed keyword isn't already claimed
elsewhere. If it is, drop as recurring churn (this precedent) rather than
re-deriving the collision from scratch each round. If SEO wants to fill a
genuinely empty slot, the fix that would actually clear this pattern is
picking an UNUSED secondaryKeyword for the empty field, not the nearest
thematic match that happens to be taken.

**Variant confirmed 2026-07-15, "css-variables-design-system" outline round
4: a REASSIGNMENT, not just an empty-field fill.** SEO proposed swapping
which of two already-filled keyword fields ("css custom properties theming"
vs "primitive and semantic tokens") sat on beats 6 vs 7 — but the swap would
have landed "css design tokens" (order4's move) onto beat 6, which is already
the keyword on THREE other nodes (order 2, order 4, order 8) in the same
outline. Same root cause as the empty-field case: no keyword→node map
cross-check before proposing the move. Dropped on sight, no re-derivation
needed. Confirms the pre-empt applies to keyword *reassignment* proposals
too, not just fills of an empty field — check the destination keyword's
existing usage count before forwarding any SEO keyword-field edit, fill or
swap alike.
