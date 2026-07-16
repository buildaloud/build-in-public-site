# Completeness checks

- **2026-07-15** (design-system-with-css-variables draft) — A beat whose
  outline entry specifies `rendersAsProse: false` with `paragraphFormula:
  "show-the-work"` and an explicit "renders as a fenced code block"
  instruction can get dropped entirely during drafting — its facts get
  partially folded into a *later* prose beat's paragraph (individual token
  names mentioned inline) while other facts from the same beat (here: the
  layout tokens, `--max-width`/`--gutter`) never appear anywhere in the post
  at all. This is a real completeness gap, not just a formatting quibble — the
  beat was explicitly the "beat searchers came for" (the actual code). Check
  every `rendersAsProse: false` outline node against the draft for an actual
  fenced code block; if it's missing, that's a strong elevation
  (verdict-affecting even though advisory), not a nitpick. **Fixed in the next
  draft pass (2026-07-15, same post)** — the fenced `:root` code block with
  layout tokens included is now present; do not re-flag this specific gap
  unless it reappears.
