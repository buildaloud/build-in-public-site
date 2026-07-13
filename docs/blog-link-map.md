# Blog link map — link-integrity-reviewer memory

The `link-integrity-reviewer` (formerly `link-checker`) owns this file. It reads
it before every check and updates it after: new canonical URLs it confirms, new
drift patterns it catches. Keep it
tidy — one row per entity, correct the row rather than appending duplicates.
Source of truth for project URLs is `src/data/projects.ts`.

## Canonical URLs (what a link to this entity MUST point at)

| Entity | Canonical URL | Notes / common mistakes |
|---|---|---|
| Build Aloud (the publication) | https://buildaloud.ai | — |
| Skills Marketplace (audited-skill catalog) | https://marketplace.buildaloud.ai | The catalog of AUDITED third-party skills. NOT where the plugins below "live". Some old posts say `skills.buildaloud.ai` — treat as drift, flag it, prefer `marketplace.buildaloud.ai` unless a specific subpath (e.g. `/ast`) is confirmed live. |
| security-kit | https://github.com/chadfurman/security-kit | Public Claude Code PLUGIN (whole-repo security review of your OWN code). Install via `/plugin marketplace add chadfurman/security-kit`. **NOT on marketplace.buildaloud.ai** — linking it there is the known error. |
| ticket-kit | https://github.com/chadfurman/ticket-kit | Public Claude Code PLUGIN. Landing page: https://ticket-kit.chads.website. **NOT a marketplace listing.** |
| Tower Defense | https://td.buildaloud.ai | slug `tower-defense` in projects.ts |
| chads.website | https://chads.website | Chad's personal site |
| Anthropic claude-code-security-review | https://github.com/anthropics/claude-code-security-review | The reviewer security-kit is inspired by |

## Drift patterns to flag on sight
- A `*-kit` plugin linked to `marketplace.buildaloud.ai` → wrong; use its GitHub repo.
- `skills.buildaloud.ai` vs `marketplace.buildaloud.ai` for the marketplace → pick the canonical (marketplace.buildaloud.ai) unless a live subpath is verified.
- Internal `/blog/<slug>/` links → the target file must exist in `src/content/blog/`.
- Bare `code.claude.com` / vendor docs → fine if they resolve.

## Learned (audit 2026-07-13, draft gate review — CONVERGED)
- **automate-blog-writing-with-ai-agents (draft review, link-integrity-reviewer):** Three future-dated links specified in outline (07-15, 07-18, 07-21) have been correctly NOT rendered in the draft prose. Deterministic rule applied: no future-dated internal links. Verified rendered links: 2026-07-09-can-an-ai-run-a-business (OK), 2026-07-09-how-to-measure-blog-seo (OK), 2026-07-10-claude-security-team-that-remembers (OK), 2026-02-22-we-let-haiku-do-the-audits-it-missed-things (OK), 2026-07-12-make-ai-writing-sound-human (OK), 2026-02-23-skill-md-is-a-file-written-for-agents (OK), 2026-02-22-we-rewrote-the-security-scoring-here-s-why (OK). External links verified: anthropic.com (200, www variant OK via redirect), augmentcode.com (200), rankability.com (200), marketplace.buildaloud.ai (200). Google Research and spam-policies URLs not yet in index (unverified but correct per gate guidance). VERDICT: PASS (no gate findings, draft clean).

## Learned (audit 2026-07-13 — final gate review, link-integrity-reviewer)
- **automate-blog-writing-with-ai-agents (outline gate review):** Three future-dated links remain in outline's links arrays: 2026-07-15-grill-me-what-an-auditor-sees (order 11), 2026-07-18-which-claude-model-to-use (order 5), 2026-07-21-hired-a-team-of-specialists (order 5). All three post-date this post's pubDate 2026-07-13; deterministic gate rule: no future-dated internal links, apply every time. Prose currently clean (links not yet rendered), but outline specifies them for embedding. Valid past-dated links verified: 2026-07-09-can-an-ai-run-a-business (before), 2026-07-09-how-to-measure-blog-seo (before), 2026-07-10-claude-security-team-that-remembers (before), 2026-02-22-we-let-haiku-do-the-audits-it-missed-things (before), 2026-07-12-make-ai-writing-sound-human (before), 2026-02-23-skill-md-is-a-file-written-for-agents (before), 2026-02-22-we-rewrote-the-security-scoring-here-s-why (before). External links: Anthropic (200), Google Research (200), Rankability (200), Augment Code (resolved). VERDICT: GATE (three future-dated links must be deleted from outline before rendering).

## Learned (audit 2026-07-13, REWRITE draft review — link-integrity-reviewer)
- **automate-blog-writing-with-ai-agents (rewrite draft, link-integrity pass):** Rendered links verified. No future-dated internal links in prose or Sources footer — the three outline-specified future-dated links (07-15, 07-18, 07-21) are correctly absent from the draft. All rendered internal links past-dated: 2026-07-09 (both), 2026-07-10, 2026-02-22 (both), 2026-07-12, 2026-02-23. Anchor texts verified accurate (checked "security-kit runs six sub-agents across eight phases" against published post; confirmed at line 8 of 2026-07-10 post summary). External links spot-checked: anthropic.com (200), developers.google.com (200), marketplace.buildaloud.ai (200). All files exist in src/content/blog/. VERDICT: PASS (zero gate findings, links clean).

## Learned (audit 2026-07-11)
- **Soft-404 (CRITICAL method):** an internal `/blog/<slug>` link missing its
  `YYYY-MM-DD-` date prefix returns **HTTP 200**, not 404 — the site serves the
  homepage (`<title>Build Aloud…</title>`, canonical `buildaloud.ai/`). `curl -sI`
  status is NOT sufficient. Validate by matching the slug against real filenames
  in `src/content/blog/` (or `functions/api/_slugs.json`); the canonical slug is
  the filename minus `.md`, date prefix included.
- **Dead domains (as of 2026-07-11):** `mcp.buildaloud.ai` (no DNS — MCP broker
  gone; 2 Feb posts reference it), `skills.buildaloud.ai` (no DNS → use
  `marketplace.buildaloud.ai`), `ticket-kit.chads.website` (no DNS right now →
  fall back to `github.com/chadfurman/ticket-kit`). Recheck before trusting.
- **`marketplace.buildaloud.ai` returns HTTP 401 by design** (basic-auth gate,
  per the "marketplace is live behind a password" post) — do NOT flag as broken.
- **Private repos 404 to the public:** `buildaloud/skills-marketplace-mcp` (and
  most of the org) is private; public blog links to it fail for readers. Only
  `build-in-public-site` + `safe-oss-forever` are public in the buildaloud org.
- **Curl UA false-positives:** `support.google.com`, `pandectes.io`,
  `machinelearningmastery.com` reject bare/generic UAs (403/404/CF-challenge) but
  resolve with a full desktop-Chrome UA — not dead. Retry with a real UA before flagging.
- **`chadfurman.com` → `chads.website`** is a clean 301 (works, but prefer the canonical `chads.website` in new links).
- **`a-pasquale`** = Andrew's GitHub handle (attribution cross-checks).
