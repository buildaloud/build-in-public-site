# security-kit — product expert ledger

The `security-kit-expert` agent's memory. Canonical facts about the
**security-kit** product, kept current by checking the source repo for drift.
Read this FIRST, update it LAST. When a fact here disagrees with a blog post,
the post is wrong — fix the post.

## What it is

**security-kit** is an orchestrated agentic security review that runs against
**your own repos** — it installs as a Claude Code + Codex plugin, builds a
threat map, traces untrusted input, hunts vulnerabilities with aggressive
false-positive filtering, plans mitigations, and leaves dated artifacts in the
host repo's `docs/security/` that make each subsequent review smarter than the
last. It is defensive self-assessment: it reviews code **you own**.

Inspired by `anthropics/claude-code-security-review`, extended from PR-diff
scope to whole-repo scope with persistent, compounding artifacts.

### Inward vs outward — the distinction posts conflate

- **security-kit reviews OUR OWN code** — inward-facing, defensive
  self-assessment of a repo you own. "Is *my* code safe?"
- **The Skills Marketplace audits OTHER people's skills** — outward-facing, it
  security-audits third-party AI-agent skills before you install them. "Is
  *this stranger's* skill safe to run?"

These are two different products. A post that says security-kit "audits skills
from the marketplace" or that the marketplace "reviews your repo" has crossed
the wires — flag and fix it.

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| GitHub repo | `github.com/chadfurman/security-kit` | **Private.** Installs from private via your `git`/`gh` creds |
| Local repo | `~/projects/security-kit` | ground truth |
| Git remote (this machine) | `git@github.com-personal:chadfurman/security-kit.git` | SSH host alias carrying the personal key; canonical URL is still `github.com/chadfurman/security-kit` |
| Version | `0.1.0` | in `plugin.json` + `marketplace.json`; verify before quoting |
| Plugin install (Claude) | `/plugin marketplace add chadfurman/security-kit` → `/plugin install security-kit@security-kit` | works from the private repo |
| Plugin install (Codex) | Supported — `source: "."` was added so Codex can install it (commit `6f4d474`). Exact Codex CLI **unverified** — README only documents the Claude commands | flag, don't invent a Codex command |
| Ships agents (6) | `surface-mapper`, `untrusted-input-tracer`, `threat-modeler`, `vuln-hunter`, `fp-judge`, `mitigation-planner` | see roster note below |
| Ships skills (2) | `security-kit` (orient + route), `security-review` (full workflow) | invoked `/security-kit:security-kit`, `/security-kit:security-review` |

### Agent roster note

There are **6** agents, not 5. The tracer (`untrusted-input-tracer`) is easy to
drop — the design seed and casual descriptions often list only surface-mapper,
threat-modeler, vuln-hunter, fp-judge, mitigation-planner. Verify against
`~/projects/security-kit/agents/` before quoting a count or a list.

### Retired / do NOT reference

- Nothing retired yet (product is at `0.1.0`, two commits in). No dead domains
  or renamed routes. Add here the first time a value is replaced.

## Other durable facts

- **The workflow (Phase 0–7):** refresh artifacts (scoped to diff since last
  review) → recon (`surface-mapper` ∥ `untrusted-input-tracer`) → threat map
  (`threat-modeler` → `docs/security/threat-map.md`) → hunt (`vuln-hunter` ×
  taxonomy cluster, parallel) → judge (`fp-judge` × finding, parallel) → plan
  (`mitigation-planner`) → artifacts (dated docs + rolling
  `security-data.json`) → tickets (offer epic + subtickets).
- **What lands in the host repo:** `docs/security/README.md` (review index),
  `threat-map.md` (living), `security-data.json` (rolling history), and
  `reviews/YYYY-MM-DD/index.md` per review. Optional reads:
  `precedents.local.md`, `taxonomy.local.md`.
- **False-positive discipline:** the judge applies hard exclusions +
  accumulated precedents and keeps only findings scoring **≥8/10** on concrete
  exploitability. Dropped findings are preserved in each review's audit table.
  Zero findings is a legitimate result.
- **Ticketing (Phase 7):** auto-detects the target — `ticket-kit` if the host
  repo uses it, Jira if an MCP is configured, otherwise a markdown checklist in
  the docs entry. Always asks before creating anything.
- **Not on npm / not a hosted service.** It is a Claude Code + Codex plugin
  distributed from the GitHub repo. No package registry, no web endpoint.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/security-kit log --oneline -15` — scan for version bumps,
   agent/skill renames, install-command changes, or repo-visibility changes
   since this ledger's last update.
2. Read `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` for
   the current `version`, plugin `name`, and `source`; `ls agents/` and
   `ls skills/` for the current roster; `git remote -v` for the repo pointer.
3. Grep the `README.md` for the deployed install commands and the
   inward-vs-outward framing.
4. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. If a Feb
post described a smaller agent roster or a different install flow that was true
then, leave the narrative alone. Only fix things that are **wrong as of now**:
dead links, wrong repo pointers, install commands that no longer work, a
miscounted current roster, or the inward/outward mix-up. To reflect a change,
add a dated forward-note ("Update: Codex install added in June") — never edit
the past into the present.

When a post's claim reflects an *old design decision* rather than a typo (it
describes a mechanism the product has since replaced), don't silently reword the
narrative — flag it for a product-learning pass per [[TD-0031]] instead.

## Drift log

- 2026-07-11 — ledger created. Captured canonical repo
  (`github.com/chadfurman/security-kit`, private), install commands, the 6-agent
  / 2-skill roster (flagged the frequently-dropped `untrusted-input-tracer`),
  and the inward (security-kit reviews your own code) vs outward (marketplace
  audits others' skills) distinction. No posts audited yet — build-only run.
