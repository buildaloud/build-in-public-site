# Marketplace — product expert ledger

The `marketplace-expert` agent's memory. Canonical facts about the Skills
Marketplace product, kept current by checking the source repos for drift. Read
this FIRST, update it LAST. When a fact here disagrees with a blog post, the post
is wrong — fix the post.

## What it is

The **Skills Marketplace** indexes and security-audits AI-agent skills, and
exposes them two ways: a public web catalog, and an MCP broker so an agent can
search and install audited skills without a human clicking around.

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Public catalog | `https://marketplace.buildaloud.ai` | Next.js static export on Cloudflare Pages |
| MCP broker endpoint | `https://mcp.marketplace.buildaloud.ai/mcp` | streamable-HTTP MCP on Railway |
| Site repo | `github.com/buildaloud/skills-marketplace` | local: `~/projects/skills-marketplace` |
| Broker repo (public) | `github.com/buildaloud/skills-marketplace-mcp` | local: `~/projects/skills-marketplace-mcp` |
| Broker MCP tools | `search_skills`, `get_skill`, `list_skills`, `install_skill` | 4 tools |
| Plugin install (Claude) | `/plugin marketplace add buildaloud/skills-marketplace-mcp` → `/plugin install skills-marketplace@skills-marketplace` | |
| Plugin install (Codex) | `codex plugin marketplace add buildaloud/skills-marketplace-mcp` → `codex plugin add skills-marketplace` | local-path plugin source |
| Direct MCP add (Claude) | `claude mcp add --transport http skills-marketplace https://mcp.marketplace.buildaloud.ai/mcp` | |

### Skill-page URL format

Slug = `{owner}--{repo}` for a standalone-repo skill, or `{owner}--{repo}--{skillName}`
when the skill lives in a subpath of a monorepo (`generateSlug` in
`~/projects/skills-marketplace/pipeline/github-utils.ts`). Both lengths are
valid — the segment count depends on whether the skill has its own repo, not
on some fixed 3-part rule. Verify a slug against `/_data/skills-index.json`
(or `/api/skills/:slug`, which reads the same per-slug files) before trusting
a page link — do not assume 2-segment == wrong or 3-segment == right.

**Known live bug (still broken as of 2026-07-12 verification):** every
`/skills/:slug` PAGE is unreachable site-wide, even for slugs the API confirms
exist (`/api/skills/:slug` / `/_data/skills-index.json` return 200 for the
same slug). The fix landed in the repo at `2b71519a` (2026-07-11 20:39 ET —
`site/public/_redirects` now points `/skills/* → /skills.html 200` instead of
the broken `/skills/index.html`), but **production has not picked it up yet**:
live `curl -I https://marketplace.buildaloud.ai/skills/<slug>` still returns
`308` to bare `/skills` (slug dropped), for both a real slug
(`bitjaru--codesyncer`, confirmed in the index) and a nonexistent one
(`buildaloud--skills-marketplace-mcp`, not in the index) — so it's not
serving real pages, it's still failing, just with a redirect now instead of a
404. Re-verify after the next deploy before trusting this is closed. **Do not
link to any `/skills/:slug` URL in a post until this is confirmed live** —
flag it, don't invent one.

### Retired / do NOT reference

- **`mcp.buildaloud.ai`** — the broker's OLD domain. Dead. The name is globally
  claimed by a stale Railway account; the live broker is `mcp.marketplace.buildaloud.ai`.
  Any post referencing `mcp.buildaloud.ai` is drifted — fix it.

## Other durable facts

- Catalog size: ~2,547 skills indexed (Pinecone integrated embedding,
  multilingual-e5-large). Verify against the broker's index before quoting a number.
- Broker stack: Express + MCP streamable-HTTP, Pinecone (semantic search),
  Upstash Redis. Free/Pro tiers gated by Bearer token.
- The public site was moved off basic-auth (the `_middleware.ts` gate was removed) —
  it is public, not password-protected. Posts saying "behind a password" are stale.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/skills-marketplace-mcp log --oneline -15` and
   `git -C ~/projects/skills-marketplace log --oneline -15` — scan for domain,
   route, tool-name, or plugin-id changes since this ledger's last update.
2. Grep the broker repo for the live endpoint/domain and tool registrations;
   grep the site repo for the deployed hostname and any auth middleware.
3. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. The site
really was "behind a password" in Feb 2026 (`the-marketplace-is-live-behind-a-password`,
`who-pays-to-secure-the-keg`); leave that narrative alone. Only fix things that
are **wrong as of now**: dead links, retired domains, wrong repo pointers,
install commands that no longer work. If you want to reflect a change, add a dated
forward-note ("Update: public since March") — never edit the past into the present.

## Drift log

- 2026-07-12 — re-audit (report-only, no post edits this pass). Confirmed
  domain, repo pointers, 4 MCP tool names, catalog size (2547, live index
  matches), and public/no-auth status all still hold — no ledger drift there.
  Found repo drift: `/skills/:slug` fix (`2b71519a`) is committed but not
  deployed — live behavior changed from 404 to a slug-dropping 308 redirect;
  updated the "Known live bug" section above. No post referenced a
  `/skills/:slug` URL this pass, so nothing to flag against posts.
- 2026-07-11 — broker domain corrected `mcp.buildaloud.ai` → `mcp.marketplace.buildaloud.ai`
  in `the-broker-is-live` and `we-built-an-mcp-server-so-agents-can-find-agents`. Ledger created.
- 2026-07-11 — wrong repo pointer `a-pasquale/skills-marketplace-mcp` →
  `buildaloud/skills-marketplace-mcp` in `we-built-an-mcp-server`. Left the Feb
  "behind a password" narrative intact (true at the time).
- 2026-07-11 — unlinked 3 dead `/skills/:slug` refs in
  `not-all-malicious-is-equal` (bitjaru--codesyncer, toolsai--auto-skill,
  dophinl--ruanyifeng-weekly-skill). Turned out NOT to be a slug problem — all
  three slugs were already correct per the live index. Root cause is a
  site-wide `/skills/:slug` page 404 (see "Known live bug" above); every skill
  detail page is currently broken, including the slug Chad gave as a known-good
  example. Left unlinked rather than guessing a URL; documented the format +
  bug for whoever fixes the redirect.
