# Filler intensifiers: actually / exactly / actual / genuinely / even

**Pattern**: the drafter stacks these five words as throwaway intensifiers that add no claim ("is actually true", "actually gets reconciled", "exactly why I trust it"). Confirmed cross-post on 6+ distinct drafts (`how-i-automate-blog-writing`, `dark-dashboard-design`, `automate-blog-writing-with-ai-agents`, `design-system-with-css-variables`, `which-claude-model-to-use`, `ai-automation-stack`, `automate-blog-publishing-schedule`) across many revisions — treat as a **standing per-draft grep on every new post**, not tied to any one topic.

**Carve-outs (do NOT flag)**:
- Words doing real contrast work: "Everything above sounds tidy. Here's what **actually** happened."
- Hard-constraint precision uses: "grades **exactly** one axis," "the scorecard has **exactly** three states."
- Anything baked verbatim into the outline's own `ourTake`/`intendedBeat` text — always diff against the outline before flagging; only flag the drafter's own additions beyond approved outline wording.
- Sub-pattern: "actual" right after a heading that already claims real/actual (e.g. heading "The real token block" then body "Here's the **actual** `:root` block") — flag as a redundant echo of the heading.

**Status**: this pattern regenerates on every fresh revision even after a prior round fixes it — always re-grep fresh, never assume a clean pass holds. Latest confirmed instance count: `ai-automation-stack` draft (2026-07-15) had ~12 clean-cut instances, one outline-sanctioned exception ("looks like an ambition problem and is **actually** a scope problem").
