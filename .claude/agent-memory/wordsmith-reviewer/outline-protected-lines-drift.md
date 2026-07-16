# Outline-protected verbatim lines drift during drafting

**Pattern**: when a beat's `gateGuidance` explicitly says "protect this line
verbatim" or "render it verbatim here," the drafter sometimes still paraphrases
it — usually softening the one sharp/specific word that gave the line its
personality, or truncating a two-clause line down to one clause. Confirmed on
`ai-automation-stack` (2026-07-15 revision), two instances in the same draft:

- The review-loops beat's protected line "A regex has no ego about the prose
  it grades" came out as "Scoring code has no ego about the prose it grades" —
  generic noun swapped in for the specific, dry one the outline called out by
  name.
- The measurement beat's sanctioned flare line "The dashboard doesn't owe me
  optimism; it owes me the truth, and right now the truth is mostly NOT YET."
  came out truncated to just "The dashboard owes me the truth, and right now
  the truth is mostly NOT YET." — dropped the negative-parallelism first
  clause the outline explicitly flagged as the post's one sanctioned instance.

**Check going forward**: any `gateGuidance` line containing "verbatim" is a
standing grep target — diff the draft's rendering of that exact beat against
the outline's quoted text word-for-word, not just for the gist. Flag any
drift as an elevation (restore the outline's exact wording), even though this
looks like a small paraphrase — the outline calls these out by name because
they're load-bearing lines, not filler.
