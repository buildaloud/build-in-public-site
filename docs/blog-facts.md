# Blog facts — fact-checker memory

The fact-checker owns this file. It reads it before every check and updates it
after: facts it verifies, corrections it makes, external claims it confirms
against a source. Keep it tidy — correct an entry rather than duplicating it.
These are OUR project facts (the expensive-to-get-wrong ones) plus a running
record of verified external claims.

## Our projects / tools (get these right)

- **security-kit** — a Claude Code plugin that runs an agentic security REVIEW
  over *your own* repositories (whole-repo, not just a PR diff): threat map,
  untrusted-input tracing, vuln hunting with an 8/10 exploitability gate, dated
  "case law" artifacts in `docs/security/`. Inward-facing (code you own).
  Lives on GitHub, installed as a plugin. **It is NOT the skills marketplace and
  is NOT a third-party skill auditor.**
- **Skills Marketplace** (marketplace.buildaloud.ai) — a catalog of AUDITED
  third-party skills, scored under the AST-1.0 taxonomy (maliciousIntent,
  inherentCapability, misuseSurface, overallExposure). Outward-facing (judging
  skills you'd install from others). Distinct from security-kit — "same family,
  opposite directions."
- **ticket-kit** — a Claude Code plugin for AI-first ticketing (agents author +
  groom tickets; a board via `/ticket-kit:serve`). GitHub + ticket-kit.chads.website.
- **Tower Defense** — a browser tower-defense game at td.buildaloud.ai.
- **The content pipeline** — SEO research → brief → draft → tone gate → fact +
  link check → review → hero → summary/digest → assemble → score/schedule.
  Posts are scheduled by the SEO impact model (`docs/seo-impact-model.md`).
- **Narrator** — every post is written as **Scout** (the AI). Who *built* a
  thing (Chad, or Chad + a collaborator) lives in `src/data/projects.ts`.

## Standing cautions (learned from the 2026-07-11 audit)
- **No OWASP "Agentic Skills Top 10" exists.** OWASP's real LLM work is coded
  `LLM01–LLM10` (Top 10 for LLM Applications). Do NOT attribute our own `AST-01…`
  taxonomy codes to OWASP — a drafter hallucinated an "OWASP Agentic Skills Top 10,
  AST01/AST02" citation (caught + removed on the grill-me post).
- **Anthropic pricing (as of mid-2026):** Opus 4.8 $5/$25, Haiku 4.5 $1/$5,
  Sonnet 5 list $3/$15 but with **introductory $2/$10 through Aug 31 2026**. A post
  citing Sonnet 5 at $3/$15 without noting the intro rate is misleading. Model
  names + prices date fast — frame "as of <month year>".
- **Control-panel v0 IS live** (panel.buildaloud.ai, shipped this session). Older
  notes calling it "unmerged / pending activation" are stale — the panel shipped.
- **Quotes must be verbatim.** Several posts put paraphrases in quotation marks
  (Addy Osmani, a GitHub README, "any question about you"). If it's not word-for-word
  in the source, drop the quote marks.
- **The content pipeline is 9 stages** (research → brief → draft → tone gate →
  fact+link check → review → hero → summary/digest → assemble). Posts calling it
  "8 stages / 7 agents" predate the fact+link-check stage.

## Claims that need a live source (don't state as fact without one)
- Market stats (turnover cost, adoption %, download counts, audit findings).
- Third-party product behavior / pricing / model names (these date fast).
- Any "X% of Y" figure — must trace to a fetched, reachable source URL.

## Verified external claims (append as confirmed, with source)
- **Mid-level dev turnover cost ~$77k; senior dev $150k-$200k; SHRM 6-9 months
  salary rule** — confirmed verbatim on
  [betterway.dev/posts/how-to-calculate-turnover-cost-for-tech-teams](https://www.betterway.dev/posts/how-to-calculate-turnover-cost-for-tech-teams).
- **McKinsey: new developer takes 3-6 months to reach full productivity** —
  confirmed on betterway.dev, attributed there to "McKinsey & Company."
  CAVEAT: on the same page, the separate **"up to 40% productivity drop during
  transition"** figure is attributed to "labor statistics," NOT to McKinsey.
  Don't merge the two into one McKinsey-attributed sentence — cite them
  separately or attribute the 40% figure generically.
- **Work Institute: turnover costs ~33% of base pay** — confirmed on
  [workleap.com/blog/cost-of-employee-turnover](https://workleap.com/blog/cost-of-employee-turnover).
  CAVEAT: the source's own exclusion language is "without considering any lost
  productivity or engagement" — it does NOT say the figure excludes
  "institutional knowledge." Don't paraphrase this source's exclusion as
  institutional-knowledge-specific; that's an added claim the source doesn't make.
- **Agent-powered codebase Q&A pattern** (embeddings + code graphs + AST
  parsing, natural-language queries about where features live / how
  components interact, at repo scale) — confirmed on
  [agentic-patterns.com/patterns/agent-powered-codebase-qa-onboarding](https://agentic-patterns.com/patterns/agent-powered-codebase-qa-onboarding/).
- **"AI may answer these questions confidently and wrongly"** (re: "why"
  questions / design rationale not visible in code) — confirmed verbatim on
  [super-productivity.com/blog/ai-codebase-onboarding-guide](https://super-productivity.com/blog/ai-codebase-onboarding-guide/).
- **Cam Houser's LinkedIn post** (one-day-handoff / Claude-Code-on-departing-
  engineer's-laptop anecdote) — confirmed real, correctly attributed to Cam
  Houser, company kept anonymous in the source too. CAVEAT: exact
  reaction/comment counts drift — fetched 2026-07-11 showed 162
  reactions/73 comments, already different from whatever count a draft cites.
  Don't cite precise engagement counts as a fixed fact; hedge ("well over a
  hundred reactions") or drop the numbers.
