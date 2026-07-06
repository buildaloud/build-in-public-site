# Build Aloud Content Pipeline — Design Spec

Date: 2026-06-14 · Status: approved + revised by spec review (see Revisions)

## Revisions from spec review (2026-06-14)

Six-agent spec-stage review (architecture, simplicity, tests/eval, prior-art,
devil's advocate, decomposer). Locked decisions:

**Adopted:**
1. **Eval judge stability** — LLM-judge runs temperature=0 with binary yes/no
   defect-detection prompts (NOT a 1-5 scale). It is *advisory*; the deterministic
   layer is the real gate. (tests, architecture)
2. **Real-research enforcement** — cited `marketResearch[]` URLs are HTTP-probed (or
   domain-allowlisted) so fabricated sources FAIL. Presence alone is not enough.
   A fabricated-URL case is a seeded defect in gold-bad. (tests, devil's advocate)
3. **Clean agent contract** — seo-researcher emits a typed `ResearchResult`;
   brief-writer is the SOLE author of the Brief (removes dual-owner / dual-slug
   ambiguity). Both agents kept (Chad wants both evaluated). (architecture, simplicity)
4. **Orchestrator keeps the existing skill's guts** — the cheap topic-approval gate
   runs BEFORE the expensive pipeline; posted.md/cursor state, the content-safety
   scrub, and build/commit are mapped onto the new steps, not dropped. (architecture)
5. **Reuse seo-audit skill** (`~/.agents/skills/seo-audit`) — PLAYBOOK references it
   and carries only Build Aloud deltas; seo-researcher grounds its keyword
   methodology in it. Cite content-strategy skill's searchable-vs-shareable framing.
   (prior-art)
6. **BriefSchema in Zod**, mirroring `skills-marketplace/pipeline/schemas.ts`; graders
   parse against it instead of ad-hoc checks. (prior-art)
7. **Shared `web-researcher` sub-harness** — fan-out/verify/cite logic lives in one
   place; both seo-researcher and the keyword-refresh use it. (prior-art)
8. **Trim ceremony** — derive `slug` at assemble; `headlineVariants` is optional
   ideation, not a graded exactly-3; the drafter receives only the editorial+publish
   subset of the Brief, not research provenance. (simplicity, architecture)
9. **Voice > SEO** — PLAYBOOK + drafter state plainly: never flatten Scout's voice for
   a keyword. Voice is the product; SEO is a constraint. (devil's advocate)
10. **Bootstrap graders against gold-bad before locking the manifest** (so the
    manifest reflects real grader behavior, not assumption). (tests)

**Kept against review pushback (Chad's deliberate calls):**
- Gold-bad brief + known-defects manifest — kept (hardened via #2/#10).
- Keyword research as a workflow — kept, but reframed as a one-off refresh that
  populates a PLAYBOOK keyword section via the `web-researcher` harness (not a
  per-post staleness dependency).
- Build whole pipeline → then eval — kept; the first real drip topics double as the
  eval's live validation, which also answers the devil's-advocate voice-risk.

**Dependencies:** add `zod` + `vitest` to the blog repo (neither present).
`generate-image` skill confirmed reachable.

---

Date: 2026-06-14 · Status: original design below (superseded where Revisions differ)

## Goal

Turn the `content-pipeline` skill into an **orchestrator** over specialized subagents
so every Build Aloud post is researched, SEO/marketing-briefed, drafted in Scout's
voice, reviewed, and given a hero image — then queued future-dated to drip-publish.
Plus an **eval** that gates the two highest-leverage agents (seo-researcher,
brief-writer) against hand-written gold briefs.

**Audience / optimization target:** indie hackers / AI builders / the Claude-Code
crowd. Goal = grow the Build Aloud audience + RSS, drive plays/installs of the
projects (td.buildaloud.ai, ticket-kit, security-kit, the marketplace). SEO around
AI-building, Claude Code, build-in-public, agentic-coding terms.

## Architecture

```
content-pipeline (orchestrator skill)
  1. gather-material   → existing check-new-content.ts scanner (kept)
  2. seo-researcher    → keyword/intent/angle, WEB-RESEARCHED, cites real data
  3. brief-writer      → structured Brief artifact (the gradable contract)
  4. drafter           → Scout draft written to the Brief
  5. reviewer          → fresh-eyes scorecard (voice/SEO/marketing) + edits
  6. hero image        → generate-image skill from Brief.imageConcept → heroImage
  7. assemble          → frontmatter + future pubDate → queued post
```

Shared grounding: **`PLAYBOOK.md`** (marketing/SEO layer; voice stays in
PERSONALITY.md). Agents live in `.claude/agents/` (project-local subagents).

### PLAYBOOK.md (shared brand reference)
- Target themes/keyword clusters for the builder audience.
- SEO rules: SEO title ≤60 chars, meta description ≤155, one H1, descriptive H2s,
  kebab slug, target keyword in title + first 100 words + one H2.
- Internal-link map: td.buildaloud.ai, ticket-kit, security-kit, the marketplace,
  /projects, prior related posts.
- CTA conventions per post type (play the game / read next / subscribe RSS).
- Social blurb format (≤280 chars, hook-first).
- Hero-image style guide (one cohesive brand look, not 14 random AI images).

### The Brief (structured artifact — the eval contract)
The brief-writer emits a Brief as YAML-frontmatter + markdown so it is both
human-readable and machine-gradable. Schema:

```yaml
topic: string                 # which drip topic
targetKeyword: string         # primary phrase
secondaryKeywords: string[]   # 2-5 supporting
searchIntent: informational | navigational | commercial
seoTitle: string              # <= 60 chars, includes targetKeyword
headlineVariants: string[]    # exactly 3 distinct A/B options
metaDescription: string       # <= 155 chars, includes targetKeyword
slug: string                  # kebab-case, no stop-word bloat
hook: string                  # 1-2 sentence opener angle
outline: string[]             # 4-8 beats
internalLinks: string[]       # >= 2 from the Playbook link-map, on-topic
cta: string                   # the post's primary call to action
socialBlurb: string           # <= 280 chars
imageConcept: string          # hero-image prompt seed, on brand-style
marketResearch:               # REQUIRED — proves real research happened
  - claim: string             # e.g. "'claude code' ~X searches/mo, rising"
    source: string            # URL or tool the seo-researcher consulted
keywordRationale: string      # why this keyword fits intent + audience
```

**Market-research requirement:** `seo-researcher` MUST run real web searches
(WebSearch / WebFetch) and populate `marketResearch[]` with cited claims. A brief
with empty/fabricated `marketResearch`, or keywords unsupported by any source,
fails the eval. This is deliberate: the spec can only be satisfied by doing the
research.

### Agents (each a focused project subagent)
- **seo-researcher** — input: topic + digest + Playbook. Does real web/keyword
  research; outputs the SEO half (targetKeyword, secondaryKeywords, searchIntent,
  marketResearch[], keywordRationale, slug candidate).
- **brief-writer** — input: topic + digest + seo-researcher output + Playbook.
  Synthesizes the full Brief (titles, hook, outline, links, CTA, social, image
  concept). Owns the Brief schema.
- **drafter** — input: Brief + PERSONALITY.md + recent posts. Writes the post as
  Scout to the Brief. Output: the markdown post body.
- **reviewer** — input: draft + Brief + Playbook + PERSONALITY.md. Fresh-eyes
  scorecard on voice fidelity, SEO checklist, marketing punch; returns concrete
  edits + pass/fail per axis. Also runs the banned-term scan (catches
  "change-factory").

### Static workflow — theme/keyword research (run occasionally, not per-post)
A separate workflow that fans out web research to build/refresh the Playbook's
keyword-theme map. Amortizes the heavy research so per-post seo-researcher stays
fast (it extends/draws from the map rather than starting cold).

## Eval (priority: seo-researcher + brief-writer)

Because the Brief is structured, it is gradable. The eval is the regression gate
before we trust the pipeline on the 14-post drip.

### Fixtures
~6 input cases drawn from the drip topics + edge cases:
1. tower-defense (rich material)
2. ticket-kit (clean product)
3. skills-auditor / "grill-me" (evergreen, rhetorical hook)
4. thin-material case (little to say — tests over-claiming)
5. coy/sensitive case (on-ice — tests restraint)
6. change-factory-landmine case (sub-agents topic — tests banned-term scrub)

### Two grader layers
1. **Deterministic graders** (TS, fast, pass/fail on the Brief YAML):
   - seoTitle ≤60 and contains targetKeyword
   - metaDescription ≤155 and contains targetKeyword
   - slug is kebab-case, no banned stop-word bloat
   - exactly 3 headlineVariants, all distinct
   - ≥2 internalLinks, all from the Playbook link-map
   - marketResearch[] non-empty, each entry has a source URL
   - banned-term scan: no "change-factory" anywhere
   - all required schema fields present
2. **LLM-judge rubric** (judge subagent, 1-5 per axis): hook strength, keyword/
   intent fit, Scout-voice alignment, headline click-worthiness, research
   credibility. Returns scores + a defects[] list.

### Gold briefs (hand-written ground truth)
Two reference briefs with a documented **known-defects manifest**, so we measure
whether the graders catch what we planted:
- **gold-good.brief.md** — clean, passes all deterministic + scores ≥4 on rubric.
- **gold-bad.brief.md** — several seeded defects of varying difficulty, mixed type:
  - *missing* (omission): e.g. only 2 headlineVariants; empty marketResearch.
  - *wrong* (incorrect): e.g. seoTitle 78 chars; an internalLink to a nonexistent
    page; targetKeyword absent from the title.
  - *not-good-enough* (quality): e.g. a limp generic hook; a keyword with no real
    search intent; a "change-factory" leak buried mid-outline.
  - Difficulty spread: easy/mechanical (length, count → deterministic catches) vs.
    hard/judgment (weak hook, wrong intent → only the rubric catches).

  The manifest lists each seeded defect + which grader layer SHOULD catch it. Eval
  success = good brief passes clean; bad brief's defects are all flagged by the
  expected layer (no misses, minimal false positives on the good one).

### Runner
`/eval-content` command (or `npm run eval:content`): runs deterministic graders on
the gold briefs, dispatches the LLM-judge, prints a scorecard (per-defect
caught/missed, good-brief false positives). Optionally runs seo-researcher +
brief-writer live on a fixture and grades the fresh output.

## Build order
Whole pipeline first, then eval (per Chad):
1. PLAYBOOK.md + Brief schema doc.
2. Agents: seo-researcher, brief-writer, drafter, reviewer.
3. Orchestrator: extend content-pipeline skill to sequence the steps + image + assemble.
4. Theme/keyword research workflow.
5. Eval: deterministic graders + gold-good + gold-bad (+ manifest) + LLM-judge +
   runner. Validate the graders catch the seeded defects.

## Testing
- Deterministic graders: TDD (unit tests over the Brief schema + the two gold briefs).
- Agents/skill: validated via the eval runner on fixtures (the eval IS their test).
- Gold-bad manifest doubles as the eval's own regression test.

## Out of scope (YAGNI)
- Per-post Pinecone/semantic SEO (the marketplace's concern, not the blog's).
- Auto-publishing social posts (socialBlurb is produced, posting stays manual).
- Paged RFC-5005 RSS (llms.txt already covers agent consumption).
