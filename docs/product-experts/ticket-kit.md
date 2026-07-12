# ticket-kit — product expert ledger

The `ticket-kit-expert` agent's memory. Canonical facts about the **ticket-kit**
product, kept current by checking the source repo for drift. Read this FIRST,
update it LAST. When a fact here disagrees with a blog post, the post is wrong —
fix the post.

## What it is

**ticket-kit** is an **AI-first, git-native ticket system**. Every ticket is a
markdown file with YAML frontmatter; a **zero-dependency CLI** serves a **neon,
read-only Kanban board**. The board is read-only on purpose — changes happen by
*editing the files* (by an AI agent or by you), so your **git history is the audit
log**. It installs as a **Claude Code plugin** (and Codex — see the install table)
and drops into any repo. Two AI helpers ship with it: **ticket-author** (turns an
idea/bug into a well-formed ticket) and **ticket-groomer** (triages the board,
re-ranks, unblocks, answers "what next").

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Landing page | `https://ticket-kit.buildaloud.ai` | **LIVE, confirmed 2026-07-11**. Hand-authored static HTML/CSS. The canonical marketing URL (commit `72ee117`). |
| GitHub repo | `github.com/chadfurman/ticket-kit` | **PUBLIC** (verified via `gh repo view`). local: `~/projects/ticket-kit`. Push remote is `git@github.com-personal:chadfurman/ticket-kit.git`. |
| Plugin homepage | `https://github.com/chadfurman/ticket-kit` | Declared in `plugin.json` / `marketplace.json`. |
| Plugin install (Claude) | `/plugin marketplace add chadfurman/ticket-kit` → `/plugin install ticket-kit@ticket-kit` | From README. The plugin marketplace + plugin are both named `ticket-kit`, hence `ticket-kit@ticket-kit`. |
| Plugin install (Codex) | **inferred, unverified** — likely `codex plugin marketplace add chadfurman/ticket-kit` → `codex plugin add ticket-kit`. | The plugin `source: "."` (commit `4c28f9f`, "so Codex can install it too") supports Codex, but **no Codex command is documented anywhere in the repo**. Do not quote an exact Codex command in a post until confirmed. |
| CLI invocation (plugin) | `node --experimental-transform-types "$CLAUDE_PLUGIN_ROOT/src/cli.ts" <verb>` | The `--experimental-transform-types` flag is **required** (runs the `.ts` CLI directly). Needs **Node ≥ 22** (the install probe checks ≥ 22.6). |
| CLI invocation (in-repo / vendored) | `node --experimental-transform-types src/cli.ts <verb>` | Or copy `src/` in and run `node path/to/cli.ts <verb>` — no `npm install`, zero runtime deps. |
| CLI verbs | `serve`, `generate`, `new`, `check`, `migrate`, `version` | `serve` = live board (~3s file poll); `generate` = static `board.html` + README index. |
| Plugin commands | `/ticket-kit:install`, `/ticket-kit:serve`, `/ticket-kit:upgrade`, `/tickets` | Plus skills `install` / `serve` / `tickets` / `upgrade`. |
| Plugin agents | `ticket-author`, `ticket-groomer` | Author a ticket; triage the board. |

### Ticket format (the data contract)

Frontmatter on every ticket: `id` (`PREFIX-NNNN`, matches filename), `title`,
`status` (a column key, or `icebox` = hidden until promoted), `priority` (`P0` =
most urgent), `rank` (tie-breaker, lower floats higher), `area`, `pillars`
(optional), `blocked-by`, `created`, plus **optional** `parent` (a ticket id —
makes it a subtask). Board sort order: **column → priority → rank → id**.
Subtasks nest **one level deep**; the parent card shows a `[done/total]` badge.
Config overrides live in a `.tickets.json` at the project root (`title`,
`ticketsDir`, `port`, `idPrefix`, `priorities`, `columns`, `schemaVersion`).

### Versions (currently drifted inside the repo)

- **`KIT_VERSION` = `0.3.1`** (`package.json` + `src/version.ts`) — the code version.
- **Plugin manifests still say `0.3.0`** (`.claude-plugin/plugin.json` and
  `marketplace.json`). This is a real in-repo drift: the plugin version lags the
  code by one patch. Quote **0.3.1** as "the kit version" but know the *installed
  plugin* advertises 0.3.0 until the manifests are bumped.
- **`SCHEMA_VERSION` = `1`** — the data-contract version. Independent of `KIT_VERSION`;
  bumps only on a breaking frontmatter/config change (which also requires a migration).

### Retired / do NOT reference

- **`ticket-kit.chads.website`** — the OLD custom landing-page domain. **DNS does
  not resolve** (ENOTFOUND, confirmed 2026-07-11); it is **not deployed / dead**.
  Commit `72ee117` moved the canonical domain to `ticket-kit.buildaloud.ai`. Any
  post referencing `chads.website` is drifted — fix it.
- **`chadfurman.github.io/ticket-kit/`** (GitHub Pages default URL) — **do NOT
  link it.** GitHub Pages still has the old `chads.website` custom domain configured
  in repo settings, so this URL **301-redirects to the dead `chads.website`** and is
  effectively broken. Link `https://ticket-kit.buildaloud.ai` instead. (There is no
  `CNAME` file in `site/`; the custom domain lives in Pages settings, which is why
  it can drift from the repo.)

## Other durable facts

- **Zero runtime dependencies** — Node built-ins only. Dev-only deps: `typescript`
  + `@types/node`. Nothing to `npm install` to run the board via the plugin.
- **Board is read-only** — the CLI never mutates tickets; edits come from files.
  This is the core pitch ("git history *is* the audit log"), don't describe the
  board as an editing UI.
- **Deploy:** `site/` publishes to GitHub Pages via `.github/workflows/pages.yml`
  on any push touching `site/**`. The live serving domain is `ticket-kit.buildaloud.ai`
  (a `.wrangler/` dir is present in the repo, so a Cloudflare path may also exist —
  unverified; the workflow itself targets GitHub Pages).
- **Private-repo install:** the README pitches installing from a *private* repo
  (clones with your `git`/`gh` creds). The repo is **currently PUBLIC**, so that
  framing is a capability claim, not the current state — don't say "it's private."
- **License:** MIT © Chad Furman.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/ticket-kit log --oneline -15` — scan for domain, plugin-id,
   command-name, install-command, or version changes since this ledger's last update.
2. Grep the repo for the live domain and versions:
   - `grep -rn "buildaloud.ai\|chads.website" ~/projects/ticket-kit/site` (canonical domain)
   - `KIT_VERSION` in `src/version.ts` + `package.json` vs the `version` in
     `.claude-plugin/plugin.json` + `marketplace.json` (catch the manifest lag).
   - install commands in `README.md` + `commands/install.md`.
3. WebFetch `https://ticket-kit.buildaloud.ai` to confirm the landing page still
   loads (and hasn't reverted to a dead domain).
4. If anything here is stale, update this table, note it under Drift log, then sweep
   `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. If an early
post linked `ticket-kit.chads.website` when that domain was live, that narrative is
its history — the fix is to update *live* links and dead references, not to erase
that the domain once existed. Only fix things that are **wrong as of now**: dead
links, the retired `chads.website` / `github.io` URLs, wrong repo pointers, install
commands that no longer work, a quoted version that no longer matches. To reflect a
change, add a dated forward-note ("Update: canonical domain is now
`ticket-kit.buildaloud.ai`") — never edit the past into the present.

When a post's claim reflects an *old design decision* rather than a typo (e.g. it
describes a mechanism the product has since replaced), don't silently reword the
narrative — flag it for a product-learning pass per [[TD-0031]] instead.

## Drift log

- 2026-07-11 — **Ledger created.** Canonical facts captured from the repo at commit
  `4c28f9f`. Landing page `https://ticket-kit.buildaloud.ai` confirmed LIVE via
  WebFetch. `ticket-kit.chads.website` confirmed **dead** (DNS ENOTFOUND) and the
  `chadfurman.github.io/ticket-kit/` default URL confirmed to 301-redirect to it —
  both recorded as do-not-reference. GitHub repo confirmed `github.com/chadfurman/ticket-kit`
  and **PUBLIC** via `gh repo view`. Noted the in-repo version drift (code `0.3.1`
  vs plugin manifests `0.3.0`) and that no Codex install command is documented
  (Codex support inferred from plugin `source: "."`, exact command unverified).
- 2026-07-11 (re-audit) — Repo HEAD still `4c28f9f`, no new commits; version drift
  unchanged (`0.3.1` code / `0.3.0` manifests); domain grep in `site/` shows only
  `buildaloud.ai`, no `chads.website` remnants. Landing page re-confirmed LIVE via
  WebFetch (title "ticket-kit — your tickets are just files"). Swept
  `src/content/blog/`: 3 posts reference ticket-kit
  (`2026-06-23-chad-starts-a-lot-of-circles.md`,
  `2026-07-01-ticket-tracker-where-ai-does-the-ticketing.md`,
  `2026-07-10-claude-security-team-that-remembers.md`). All URLs, commands, and
  version mentions check out against this table — **no drift found**, PASS.
