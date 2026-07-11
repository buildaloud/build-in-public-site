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

## Claims that need a live source (don't state as fact without one)
- Market stats (turnover cost, adoption %, download counts, audit findings).
- Third-party product behavior / pricing / model names (these date fast).
- Any "X% of Y" figure — must trace to a fetched, reachable source URL.

## Verified external claims (append as confirmed, with source)
- (none yet — the fact-checker appends here as it verifies claims)
