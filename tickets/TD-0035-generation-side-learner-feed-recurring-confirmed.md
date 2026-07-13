---
id: TD-0035
title: Generation-side learner: feed recurring confirmed review findings back into the drafter/outline-builder
status: open
priority: P3
rank: 100
area: content
pillars: []
blocked-by: []
created: 2026-07-13
---

# TD-0035 · Generation-side learner: feed recurring confirmed review findings back into the drafter/outline-builder

## Why

Learnings only live on the **detection** side today: each of the ~15 single-axis
reviewers keeps a precedent ledger (`.claude/agent-memory/<reviewer>/MEMORY.md`),
so reviewers get sharper over time. The **generation** side has no memory. The
drafter (`.claude/agents/drafter.md`) and the outline-builder
(`.claude/skills/content-pipeline/lib/outline-schema.ts`) don't know what they
keep getting flagged for, so every post re-earns the same findings. This session
the recurring gate-tier flags were: negative parallelism ("X, not Y") opening
beats, overclaims about our own pipeline, future-dated internal links, and
disposition-mislabeling. Each of those burns review rounds — and the outline +
draft loops are being bumped from a 3-round cap to 5, so the cost of re-earning
known findings is going up, not down. A generation-side pitfalls ledger the
drafter/outline-builder read *before* generating is the mirror of the reviewer
ledgers, and should cut rounds-to-converge. Spec:
`docs/specs/2026-07-12-document-review-fanout-design.md`.

## What

A **hand-curated first version** of the generation-side ledger
(`docs/blog-drafter-pitfalls.md`) is being written this session. This ticket is to
**automate** keeping it fresh, and only after the hand-curated version is proven.

- **Retro/learner step** — after each run (or per batch), mine the review
  findings for **confirmed, gate-tier** items that recur across **≥N posts** and
  append them to the pitfalls ledger. Dedup against what's already there.
- **Wire the ledger into generation** — drafter + outline-builder read
  `docs/blog-drafter-pitfalls.md` **before** generating, the same way reviewers
  read their precedent ledgers.
- **Context-scope every learning** — entries are written as scoped guidance
  ("don't *open* beats with negative parallelism"), never blanket bans ("never use
  X"). The flare line deliberately uses negative parallelism and stays protected.
- **Guard voice** — track that tone score and the meta-content rank/likes signal
  **hold** across the automated runs, not just that round-count drops.
- **Keep reviewers untouched** — the learner only edits the generation-side
  ledger; it never weakens, silences, or retunes a reviewer.
- **Rollout gate** — automate the append only *after* the hand-curated ledger is
  shown to reduce rounds without flattening voice.

## Acceptance

- [ ] A retro/learner step mines review output and appends recurring pitfalls to
      `docs/blog-drafter-pitfalls.md`; drafter + outline-builder read it before
      generating.
- [ ] Only **confirmed, gate-tier** findings that recur across **≥N posts** are
      learned — never one-offs, advisory-tier churn, or reviewer false-positives.
- [ ] Every learned entry is **context-scoped** (e.g. "don't open with negative
      parallelism"), not a blanket ban; the flare line's deliberate use stays
      protected.
- [ ] **Voice holds, measured:** tone score and the meta-content rank/likes signal
      do not regress after learnings are applied (guards the homogenization / bland-
      but-passing "new slop" risk — voice is the product).
- [ ] **Rounds-to-converge is reported as a health metric, not the objective** — the
      learner does not optimize round-count directly and does not weaken reviewers to
      hit a round target (proxy-gaming guard).
- [ ] **Net-positive across all axes:** a learning that quiets one axis is checked
      not to trigger another (e.g. killing tricolons → choppy two-item lists that the
      structure reviewer flags) before it's kept.
- [ ] Automation ships **only after** the hand-curated `docs/blog-drafter-pitfalls.md`
      is shown to cut rounds without flattening voice; reviewers stay untouched.

## Notes

Sibling of the content-pipeline review work. Complements — does not duplicate —
[[TD-0031]] (loops *product* learnings back into the built thing) and [[TD-0033]]
(hardens the fan-out mechanically). Those learn on the product / mechanics side;
this one closes the generation-side learning gap. The reviewer precedent ledgers
under `.claude/agent-memory/` are the detection-side mirror this design copies.
