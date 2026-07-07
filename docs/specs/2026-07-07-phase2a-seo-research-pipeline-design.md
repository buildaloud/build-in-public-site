# Phase 2A — SEO Research Pipeline (design spec)

Scope: `.claude/` pipeline tooling + a backward-compatible content-schema addition. Does **not** change deployed-site rendering.

## 1. Research grounding
- codebase-researcher: content-pipeline (SKILL.md steps — Step 2 topic gate, Step 3 SEO research, Step 7 review, Step 10 Assemble; drip enters at Step 3).
- codebase-researcher: agents (`seo-researcher.md` reactive ResearchResult + `web-researcher` fan-out + HTTP-probe hard rule; `content-reviewer.md` SEO axis).
- codebase-researcher: schema (`src/content.config.ts` blog schema, `lib/brief-schema.ts` already carries the three SEO fields).
- reviewers + decider: two reviewers found discovery was orphaned; decider chose **extend seo-researcher, no new agent**.

## 2. Data model
- `src/content.config.ts` blog schema — add three OPTIONAL fields: `targetKeyword: z.string().optional()`, `secondaryKeywords: z.array(z.string()).optional()`, `searchIntent: z.enum(['informational','navigational','commercial']).optional()`. `.optional()` keeps all 37 SEO-less posts valid (hard backward-compat).
- `lib/brief-schema.ts` — **no change**: the three fields already exist; Assemble forwards them.
- New `lib/keyword-opportunity-schema.ts` — typed discovery output (§6).

## 3. Flow (no step renumber — Steps 3–12 untouched)
1. Step 1 (Gather) unchanged.
2. **Step 2 Topic-Approval Gate — new sub-step "2a. Keyword Discovery."** Orchestrator dispatches `seo-researcher` in **discovery mode** with `seedTopics: string[]` (2–3 candidates), **one dispatch** returning a `KeywordOpportunitySet` keyed by candidate. Discovery does breadth research via the existing `web-researcher` fan-out (autocomplete / PAA / related / SERP), runs the **single** cannibalization check, and emits the set. The gate presents candidates **with** their opportunity sets so Chad chooses informed.
3. Step 3 SEO research — same `seo-researcher` in **refinement mode**, given the approved topic **AND its discovery output**. Refinement **consumes** discovery: the chosen opportunity's `keyword` **binds to `targetKeyword`** — it does not re-derive. Produces the final ResearchResult (targetKeyword, secondaryKeywords, searchIntent, marketResearch).
4. Step 10 Assemble writes the three SEO fields into new-post frontmatter from the Brief.
5. Step 7 content-reviewer gains two advisory SEO sub-checks (density, anchor-text).
6. **Drip path:** topic is pre-approved, so **discovery is SKIPPED** (nothing to inform). Refinement (Step 3) still runs; Assemble still persists SEO frontmatter for drip posts.

Rationale (steelman rejected): a separate discovery agent gives clean single-authorship but double-Opus cost and orphaned output — the observed flaw; two modes on one agent keep the binding intact for less cost.

## 4. TEST PLAN
- **Given** a well-formed `KeywordOpportunitySet` **When** parsed by the new schema **Then** it validates; **Given** a set with a numeric volume field or missing `intent` **Then** it rejects.
- **Given** the chosen opportunity keyword **When** refinement runs **Then** `targetKeyword` equals it (binding, not re-derivation).
- **Given** an SEO-less fixture post **When** `npm run build` runs **Then** Astro validation passes.
- **Given** a Brief with SEO fields **When** Assemble runs **Then** frontmatter carries all three verbatim (drip + normal).
- Unit targets: `keyword-opportunity-schema.test.ts`, content.config backward-compat assertion.
- **KNOWN LIMITATION.** The binding + forwarding rules are agent-prose contracts; the gold-fixture grader (`eval/seo-contract.test.ts`) guards the contract shape + fixture-level regressions, but live-LLM obedience at generation time is not unit-tested (would need an expensive live-dispatch integration test) — it's backstopped by the content-reviewer stage + the hard-rule prose.
- **Reuse dedup does not weaken marketResearch veracity.** Refinement's SERP-research reuse of discovery's `sources`/`signals` (§3 step 3) is scoped to keyword/SERP context only. Every `marketResearch[]` `sourceUrl` still requires refinement's own WebFetch call in its own dispatch (unchanged hard rule) — refinement never receives discovery's raw fetched page content, only the terse `KeywordOpportunitySet`, so "discovery already confirmed this" is unobservable and cannot substitute for refinement's own fetch.

## 6. Contracts
`seo-researcher` discovery mode input: `seedTopics: string[]`. Emits ONE YAML block, no prose:
```
keywordOpportunitySet:
  candidates:
    - seedTopic: string
      playbookCluster: string        # one PLAYBOOK §4 cluster
      opportunities:                 # pre-sorted, strongest-first (no rank field)
        - keyword: string
          intent: informational | navigational | commercial
          signals: string[]          # e.g. "in Google autocomplete", "3 PAA questions"
          sources: string[]          # real web-researcher / WebFetch-probed URLs only
          estimate: string           # qualitative label; NEVER a fabricated number
  cannibalization:
    - keyword: string
      conflictsWith: string          # existing slug or drip-plan entry
    caveat: "heuristic until posts carry SEO frontmatter"   # ALWAYS emitted at launch
```
Zod `KeywordOpportunitySchema` mirrors this; **no numeric-volume field** (structurally blocks fabrication). Veracity is the real enforcement: every `sources` URL is web-researcher/WebFetch-probed — same hard rule as refinement mode. Cannibalization runs **once, in discovery only**; refinement does not re-run it. Check greps `src/content/blog/*.md` frontmatter (`targetKeyword`/`secondaryKeywords`, falling back to `title`/`tags` for legacy posts) + `.plans/drip-plan.md`. At launch all 37 posts lack SEO frontmatter, so it is 100% title/tag heuristic — the `caveat` line makes that visible in the gate output.

## 7. Tests required
- `keyword-opportunity-schema.test.ts` — valid set parses; numeric-volume field / missing `intent` / missing `sources` rejects.
- content.config backward-compat — SEO-less fixture post validates.
- Assemble forwarding — Brief SEO fields land in output frontmatter (drip + normal).

## 8. Files affected
- modify: `.claude/agents/seo-researcher.md` (two modes: discovery pre-gate consuming `web-researcher`, refinement post-gate binding to discovery), `src/content.config.ts`, `.claude/skills/content-pipeline/SKILL.md` (Step 2 sub-step "2a. Keyword Discovery" + drip-skip note + Step 10 Assemble frontmatter block), `.claude/agents/content-reviewer.md` (SEO axis: advisory density + anchor-text).
- create: `.claude/skills/content-pipeline/lib/keyword-opportunity-schema.ts`, `.claude/skills/content-pipeline/lib/keyword-opportunity-schema.test.ts`.
- **No new agent file.** No gold/manifest change (density/anchor stay advisory).

## 9. Risks
- Discovery and refinement drift: if refinement silently re-derives, the binding is lost again. Mitigate — refinement mode must echo the chosen `keyword` into `targetKeyword`; test asserts equality.
- Heuristic cannibalization misses overlaps on legacy posts; the `caveat` line keeps Chad aware. Improves as posts adopt fields.
- Advisory density risks false "stuffing" flags on legitimately dense posts; keep advisory, never a hard gate.

## Non-goals
Not Run B stats/measurement; not site rendering (Runs B/C); not fabricating keyword volumes; not a new keyword-scout agent; not a keyword-cluster auto-refresh workflow (deferred).

## 10. Open questions / ambiguities resolved
- **New agent vs extend** → resolved: extend `seo-researcher` into two modes (decider's call; avoids double-Opus + orphaned discovery).
- **Discovery dispatch shape** → resolved: one dispatch, `seedTopics: string[]`, set keyed by candidate (cost control over per-candidate dispatch).
- **Persist discovery output?** → resolved: passed in-message from Step 2a to Step 3; not persisted to disk (no new infra).
- **Drip frontmatter** → resolved: confirmed — drip skips discovery, keeps refinement + SEO frontmatter persistence.
- Open: should density/anchor advisories graduate to deterministic graders in a later phase?
