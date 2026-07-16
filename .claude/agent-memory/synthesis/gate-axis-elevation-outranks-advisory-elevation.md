# Gate-axis elevations outrank advisory-axis elevations on the same span

When two reviewers' *elevations* (not gateFindings) collide on the same
span, the elevation from a GATE-disposition axis (e.g. voice-reviewer,
flatness, formulaic) still outranks the elevation from an ADVISORY-disposition
axis (e.g. emotion, impact, seo), even though neither is itself blocking.

Confirmed 2026-07-15, "automate-blog-writing-with-ai-agents" outline round 1:
voice-reviewer's and emotion_impact's elevations both rewrote the identical
order-6 `ourTake` sentence about model routing; picked voice-reviewer's
version (axis-level authority) and dropped emotion_impact's as a duplicate
rather than treating it as a coin-flip between two equally-weighted advisory
suggestions.
