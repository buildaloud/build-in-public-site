# Website — product expert ledger

The `website-expert` agent's memory. Canonical facts about **Chad's personal
site (chads.website)**, kept current by checking the source repo for drift. Read
this FIRST, update it LAST. When a fact here disagrees with a blog post, the post
is wrong — fix the post.

## What it is

**chads.website** is Chad Furman's personal site — an interactive
engineering-manager résumé / portfolio. It's a Next.js 15 app exported to static
HTML and served on Vercel. The page is a single-scroll portfolio: hero, an
interactive "engineering creed" band, a career timeline, skills, a project
spotlight, a dependency graph, and an **Ask** console — an AI chat bot that
answers visitor questions about Chad (third person, with a visible logging
notice). The bot is a *separate* Vercel serverless function, not part of the
static site.

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Live site | `https://chads.website` | canonical; 200, served by Vercel. Next.js static export (`output: 'export'`) |
| Apex/alias domains | `chadfurman.com`, `www.chadfurman.com` | both **301-redirect to `chads.website`** — not separate sites |
| Site repo | `github.com/chadfurman/blog` | private; local: `~/projects/blog`. SSH host alias `github.com-personal`; needs `gh auth switch --user chadfurman` |
| Chat API endpoint | `https://chadfurman-chat.vercel.app/api/chat` | separate Vercel project `chadfurman-chat` (`api/chat.ts` at repo root) |
| Chat frontend caller | `frontend/src/app/_components/portfolio/AskConsole.tsx` | POSTs to the endpoint above; overridable via `NEXT_PUBLIC_CHAT_API_URL` |
| Résumé content source | `frontend/src/data/portfolio.ts` | hard-coded; the live source of truth for experience/skills/projects |
| Deploy | push to `main` → Vercel Production | commits the built `frontend/out/` artifact; run `npm run build` in `frontend/` first |

### Hosting split (two Vercel projects, one repo)

1. **The static site** — built from `frontend/` (`output: 'export'`), artifact
   committed under `frontend/out/`, served at `chads.website`.
2. **The chat API** — `chadfurman-chat` (Vercel projectName `chadfurman-chat`,
   `.vercel/project.json` at repo root), the `api/chat.ts` serverless function.
   Uses Vercel AI Gateway (model `anthropic/claude-haiku-4-5`, OIDC auth, no
   API key), Upstash Redis for per-visitor/IP/global rate limits. CORS allows
   `chadfurman.com`, `www.chadfurman.com`, `chads.website`, `localhost:3000`.

### Retired / do NOT reference

- **`chadfurman.com` as "the site's URL"** — it's an alias that 301s to
  `chads.website`. Reference `chads.website` as canonical; don't present
  `chadfurman.com` as a separate or primary destination.
- **Strapi CMS + markdown `posts/` workflow** — DORMANT. The README and
  `CLAUDE.md` "Content Management" section describe a Strapi → markdown → build
  pipeline; `AGENTS.md` confirms the Strapi backend is dormant. The live résumé
  content is hard-coded in `frontend/src/data/portfolio.ts`. Do **not** describe
  the live site as Strapi-driven or blog/markdown-driven.
- **"BigScoots managed WordPress hosting"** (in `CLAUDE.md` Brand section) — that
  refers to a *client services* offering, not this site's own hosting. The
  personal site runs on Vercel, not WordPress. Don't say chads.website is on
  WordPress/BigScoots.

## Other durable facts

- Stack: Next.js 15 (App Router, MDX), Tailwind + SCSS modules + Styled
  Components, `next-image-export-optimizer` for static images, Google Analytics.
- The hero badge links out to `https://buildaloud.ai` ("Now building ·
  buildaloud.ai") — the site cross-promotes Build Aloud.
- Portfolio identity (from `portfolio.ts`): "Chad Furman — Engineering Manager |
  Applied AI & SRE", South Hadley MA, `chad@chadfurman.com`,
  `github.com/chadfurman`, `linkedin.com/in/chadfurman`. Verify any quoted
  timeline/role claim against `portfolio.ts` (it's dated + sourced there).
- Deploy nuance: fast-forwarding `main` to a SHA Vercel already built as a
  Preview yields **no** Production deploy. Merge with `git merge --no-ff` so
  `main` gets a unique SHA. Verify prod by curling `chads.website`, not by git.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/blog log --oneline -15` — scan for domain, deploy, chat
   endpoint, or content-source changes since this ledger's last update.
2. Grep the repo for the live hostnames and the chat endpoint:
   `grep -rn "chads.website\|chadfurman.com\|chadfurman-chat" ~/projects/blog`
   (skip `node_modules`, `.git`, `.claude/worktrees`). Confirm CORS origins in
   `api/chat.ts` and the caller URL in `AskConsole.tsx`.
3. Confirm the live site: `curl -sI https://chads.website` (expect 200/Vercel)
   and that `chadfurman.com` still 301s to it.
4. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. If an early
post described the site as Strapi/markdown-driven when that was true, leave that
narrative alone. Only fix things that are **wrong as of now**: dead links, the
wrong canonical domain, a stale chat endpoint, a repo pointer that doesn't
resolve. To reflect a change, add a dated forward-note ("Update: content is now
hard-coded in `portfolio.ts`") — never edit the past into the present.

## Drift log

- 2026-07-11 — ledger created. Canonical live URL confirmed `https://chads.website`
  (200, Vercel); `chadfurman.com` + `www.chadfurman.com` 301-redirect to it.
  Repo confirmed `github.com/chadfurman/blog` (private). Chat API confirmed as a
  separate Vercel project `chadfurman-chat` at
  `https://chadfurman-chat.vercel.app/api/chat` (model `anthropic/claude-haiku-4-5`
  via Vercel AI Gateway). Flagged the Strapi/markdown pipeline (README + CLAUDE.md)
  as dormant — live content lives in `frontend/src/data/portfolio.ts`. No blog
  posts audited this run.
- 2026-07-11 — re-audit: repo log (`b01fb00`..`82e8882`) is all UI/animation
  polish, no domain/deploy/chat-endpoint changes since ledger creation. Live
  values reconfirmed unchanged: `chads.website` 200/Vercel;
  `chadfurman.com`/`www.chadfurman.com` still 301 to it (confirmed via GET —
  HEAD returns 405, not a reliable check); chat endpoint still
  `chadfurman-chat.vercel.app/api/chat`; CORS origins in `api/chat.ts`
  unchanged. Audited posts this run and flagged 2 with `chadfurman.com`
  presented as canonical (see task report) — fixes not applied here per
  report-only instruction, left for consolidated pass.
