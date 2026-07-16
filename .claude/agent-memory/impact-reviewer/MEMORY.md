---
name: impact-reviewer
description: Precedent ledger for impact-reviewer — beats previously flagged as filler/redundant and overruled, plus confirmed axis learnings.
---

## Precedents (index — one line each, full detail in topic files)

### Callbacks, forward-refs, self-correction — see callbacks-and-forward-refs.md
- 2026-07-12: Scripted cross-beat bookends/callbacks are not redundancy — check `gateGuidance` before flagging; only flag full-length/unbounded restatements.
- 2026-07-13: A beat where Scout self-corrects an earlier post version is on-brand, not filler — only flag if it fully duplicates a later beat's numbers.
- 2026-07-13: Dangling forward-reference teasers with no link are broken promises, not bookends — confirmed recurring 3x in one draft.
- 2026-07-13: Hook phrasing that pre-empts a later turn beat's payoff line should be stripped back to naming the mechanism only.

### Outline hygiene — see outline-hygiene.md
- 2026-07-15: A detail handed off to a later beat often still gets fully re-described by the earlier beat too — trim the earlier one.
- 2026-07-15: "Protect verbatim" instructions can point at a line the outline prose no longer contains — fold it back into `ourTake`.
- 2026-07-16: A drafter-added trailing recap sentence beyond where the outline's `ourTake` ends (CTA/payoff beats) is redundant filler — flag for deletion. Unscripted mid-beat additions beyond outline `facts`/`ourTake` can also contradict an earlier proof beat's claim about the same example — check against other beats before accepting.
- 2026-07-15: Numbers restated in closing/payoff/CTA beats can drift from the number set earlier — cross-check, flag as impact-axis inconsistency.
- 2026-07-15: `gateGuidance` can forbid a move that `intendedBeat`'s own closing clause then commits anyway — trim `intendedBeat`.
- 2026-07-15 (ai-automation-stack outline): a stray editorial self-instruction can survive inside a `facts` entry's prose — flag for deletion.

### Redundant restatement (recurring drafter tic) — see restatement-pattern.md
- 2026-07-15 → ongoing, multiple posts (design-system-with-css-variables, which-claude-model-to-use, ai-automation-stack): the drafter repeatedly states the same point twice/thrice adjacent — abstract-then-concrete, `intendedBeat`-vs-`ourTake` duplication, flat intensifier fragments, unscripted setup glued before a protected closer, same short phrase reused near its protected instance, truncated protected/verbatim lines, same-sentence phrase echoes, self-referential meta-asides. Recurs across passes/posts even after a prior "fixed" note — re-check the same beat shapes (turn/payoff/CTA closers, proof beats beside a protected `ourTake`) every single pass. Full sub-shapes and fixes in the file.

### Completeness — see completeness-checks.md
- 2026-07-15: A `rendersAsProse: false` code-block beat can get silently dropped or scattered into a later prose beat — check every such node for an actual fenced block in the draft; fixed in one confirmed case, don't assume it stays fixed elsewhere.
