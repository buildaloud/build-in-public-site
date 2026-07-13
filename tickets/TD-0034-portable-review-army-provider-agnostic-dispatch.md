---
id: TD-0034
title: Portable review-army: provider-agnostic dispatch to run the pipeline on a second ship (Codex/GPT)
status: open
priority: P3
rank: 85
area: content
pillars: []
blocked-by: []
created: 2026-07-13
---

# TD-0034 · Portable review-army: provider-agnostic dispatch to run the pipeline on a second ship (Codex/GPT)

## Why

The content-review "army" (spec:
`docs/specs/2026-07-12-document-review-fanout-design.md`, skill:
`.claude/skills/content-pipeline/SKILL.md`) — ~15 single-axis reviewers plus a
synthesis coordinator and an editor, wired into outline- and draft-review loops —
is welded to Claude-only primitives: the Workflow tool's `agent()` dispatch,
`agentType` from `.claude/agents/*.md`, Claude StructuredOutput for schema-enforced
findings, and Claude model tiers. That means it can only sail on one "ship." To
package it as a distributable plugin (in the spirit of change-factory) that a
project could point at either Claude Code **or** Codex (the OpenAI CLI), the
pipeline needs a provider-agnostic dispatch layer. There's also near-term value
before full portability: a Codex/GPT reviewer cross-checking Claude's findings is
genuine model diversity in adversarial review — a second model family catches
things one family misses.

## What

Design spike, not a build order — capture the shape, don't solve it here.

- **Neutral reviewer contract.** Define an apply-ready finding schema
  (`{axis, disposition, location, quote, editType, replacement}`) that does NOT
  depend on Claude StructuredOutput — Codex has no schema-enforced-output
  equivalent, so the plugin must marshal and validate the JSON itself (reject /
  repair malformed reviewer output).
- **Dispatch shim.** Map one logical reviewer onto whichever runtime is present:
  `agent()` on Claude Code; `codex exec '<prompt>' < /dev/null` on the Codex side
  (same shell-out pattern hero-image imagegen uses today). Each ship declares its
  own model-tier vocabulary (Claude sonnet/opus/haiku vs a GPT tier map) behind
  the shim — today neither `agentType` nor `model` can name a Codex/GPT model.
- **Portable orchestration.** Move loop control (round caps, convergence,
  synthesis, prior-round feedback, the deterministic tone gate) into
  runtime-neutral code rather than a Claude-only Workflow script, so the same
  orchestrator drives either ship.
- **Prototype-first slice.** Wrap ONE Codex-backed reviewer behind the shim and
  run it alongside the Claude army to prove cross-family review value before
  committing to full portability.

## Acceptance

- [ ] A written finding-schema contract exists that is independent of Claude
      StructuredOutput, with a marshal/validate path for raw reviewer JSON
- [ ] A dispatch-shim design maps one logical reviewer onto both `agent()` and
      `codex exec`, each ship declaring its own model-tier vocabulary
- [ ] The orchestration design (loops, round caps, synthesis, prior-round
      feedback, tone gate) is described as runtime-neutral code, not a Claude-only
      Workflow script
- [ ] One Codex-backed reviewer is prototyped behind the shim and demonstrated
      cross-checking Claude reviewers (model-diversity value shown)
- [ ] The path to packaging the pipeline as a distributable, two-ship plugin
      (change-factory-style) is captured

## Notes

Follow-up / someday spike, flagged by Chad — later work, hence P3. Builds on the
review fan-out hardening in TD-0033 and shares the content-pipeline lineage of
TD-0028, TD-0030, TD-0031. Spec:
`docs/specs/2026-07-12-document-review-fanout-design.md`.
