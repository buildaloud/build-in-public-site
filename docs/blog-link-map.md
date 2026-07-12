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
