---
name: outline-structure-reviewer
description: Precedent ledger for outline-structure-reviewer — outline shapes previously flagged and overruled, plus confirmed axis learnings.
---

## Precedents

- **how-i-built-x with the "decisions" beat diffused across several proof beats
  (2026-07-13/14, "automate blog writing with AI agents" pipeline outline):**
  the formula's single "The decisions — 2-3 real forks" beat has grown to
  FIVE consecutive `proof` beats across rounds (outline-first grading / one
  axis per reviewer / model-tier routing / synthesis+classifier / deterministic
  tone gate), each carrying its own named road-not-taken or concrete
  fork, instead of one consolidated "decisions" section. This is a sound
  adaptation, not a formula violation or over-templating, when the one big
  design decision genuinely has several interlocking sub-parts that each need
  their own explanation — don't flag a diffused-decisions shape as incoherent
  or as a same-goal pile-up just because it isn't visually clustered into one
  beat or grows a beat between rounds. Count may keep growing; judge each new
  sub-decision on whether it's load-bearing, not on the total.

- **Diffused payoff (3 consecutive `payoff` beats) is sound when each hits a
  distinct sub-claim promised by the meta `point`/`emotionalCore`
  (2026-07-15, "design system with css variables" outline):** a
  how-i-built-x closed with theory-payoff → live-proof-payoff →
  aesthetic-payoff instead of one payoff beat. Not a rule-of-three tell —
  each beat delivered on a different clause of the meta block (re-theme from
  one file / absorbs a new token group with zero component edits / visual
  consistency as emergent result). Judge a run of same-`goal` beats by
  whether each is load-bearing and distinct, same standard as the
  diffused-decisions precedent above.

- **Recurring project-specific tell — CTA beat pivots to a generic newsletter
  subscribe + links an unrelated prior post (2026-07-15, same outline):**
  the closing/CTA beat's `intendedBeat` said "view-source ... and steal the
  values, **or subscribe there** for more of this build-in-public series,"
  with `links[]` pointing at an unrelated post (a site-animation post on a
  CSS-tokens article). This is the bookend-link gate rule firing on Build
  Aloud's actual habit: don't let the CTA beat drift from the article's own
  artifact into a generic subscribe pivot with an off-topic link. Fix:
  single on-topic CTA (view-source / clone the repo), drop the second
  ask, retarget or empty `links[]` to the article's own subject only.

- **Outline YAML paragraph blocks may be listed out of numeric-`order`
  sequence (2026-07-15, "which claude model to use" outline: blocks tagged
  `order: 9`, `order: 8`, `order: 7` appear physically in that reversed
  order in the file):** this is authoring/editing residue, not a shape
  defect. Judge the arc by the numeric `order` field (the actual render
  sequence), not by top-to-bottom position in the YAML. Don't flag physical
  list-position scrambling as a misordering gate finding unless the `order`
  field's own resulting sequence is itself incoherent.

- **`claim-then-evidence` beats in this project routinely lead with the
  evidence (a stat) and land the claim/interpretation second (2026-07-15,
  "AI automation stack" outline: the market-context beat and the
  small-business-adoption-gap beat both open on a cited number, e.g. "Lead
  with the market numbers... then the core argument," before stating Scout's
  read) — this is a deliberate, consistent house pattern (open on a concrete
  number as the punchier draw, then frame it), not an inverted-formula
  defect. Don't flag evidence-before-claim ordering inside a
  `claim-then-evidence` beat as a paragraphFormula mismatch; the formula
  name describes the two ingredients, not a mandated sentence order.

- **Declared novel extensions of a base formula (postFormula field states the
  named formula "extended with" a named beat-pair, with a stated reason) are
  a sound pattern, not a formula violation, when the extension is actually
  executed where declared (2026-07-16, "teaching a robot to balance my game"
  outline: `postFormula: "how-i-built-x, extended with a turn +
  honest-limit pair (math vs. human play) after the proof beats to carry the
  emotionalCore"` — beat 6 is the turn, beat 7 is the honest-limit, placed
  exactly after the three proof beats as declared, and both pay off the
  meta `emotionalCore`). Judge the declared extension on whether it's
  actually where the outline says it is and whether it earns its place, not
  on whether it deviates from the base formula's stock beat list.

- **The outline schema's `goal` enum (hook | proof | turn | payoff | context |
  CTA) has no dedicated value for an `honest-limit`-shaped
  `paragraphFormula`** — an honest-limit beat will legitimately carry
  `goal: "proof"` or another adjacent enum value because the enum doesn't
  offer a better fit (2026-07-16, same outline: beat 7's honest-limit beat
  is tagged `goal: "proof"`). This is a schema constraint, not a
  goal/paragraphFormula mismatch — don't flag it as an arc-labeling defect;
  read the actual arc off `paragraphFormula`, not `goal`, when the two
  diverge this way.
