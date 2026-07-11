# Blog link map — link-checker memory

The link-checker owns this file. It reads it before every check and updates it
after: new canonical URLs it confirms, new drift patterns it catches. Keep it
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
