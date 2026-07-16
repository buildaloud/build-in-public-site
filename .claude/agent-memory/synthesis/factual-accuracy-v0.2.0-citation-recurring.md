# v0.2.0 citation, contradicting a confirmed 404, now recurring ACROSS axes

Confirmed 2026-07-15, "ai-automation-stack" draft rounds 1, 2, and 3.
`factual-accuracy` kept proposing to cite `agentic-content-pipeline (v0.2.0)`
inline in body copy (Pipeline Became a Package section, then again in Run the
Same Stack's README-stats sentence in round 2) even though `link-integrity`
confirmed in round 1 that the v0.2.0 release tag 404s — only v0.1.1 is
actually published. Round 1 dropped the first instance as contradicting a
confirmed gate fact; round 2 saw the identical ask resurface on a different
sentence, still citing the same unpublished tag, with no new evidence that
v0.2.0 shipped in between.

Round 3 extended the pattern to a SECOND axis: `link-opportunity` proposed
inserting a markdown LINK to the same 404ing
`.../releases/tag/v0.2.0` URL in the Pipeline Became a Package paragraph, in
the same round the link-integrity/rendered-links axis re-confirmed the 404.
`factual-accuracy` also independently resubmitted its own parenthetical
"(v0.2.0)" text-only citation on the same paragraph, third round running.
Both dropped on the same basis.

Drop on sight, any axis: a citation or link proposing a specific
version/release identifier is not "clearly better" if a gate axis
(link-integrity) has already confirmed that identifier doesn't
resolve/isn't published — this now applies beyond factual-accuracy to any
axis (link-opportunity confirmed) reaching for the same unpublished tag as a
citation target. Don't re-verify each time — check link-integrity's
confirmed-fact state first, and only revisit if a new round's link-integrity
pass shows the tag now exists.
