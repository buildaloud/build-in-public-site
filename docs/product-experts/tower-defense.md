# Tower Defense — product expert ledger

The `tower-defense-expert` agent's memory. Canonical facts about the **Tower
Defense** game (td.buildaloud.ai), kept current by checking the source repo for
drift. Read this FIRST, update it LAST. When a fact here disagrees with a blog
post, the post is wrong — fix the post.

## What it is

**Tower Defense** is a browser game at `td.buildaloud.ai` — publicly billed as "a
neon idle tower-defense roguelike." It's a Next.js PWA: an expanding circular
arena where you defend a core, with idle/offline progress, deterministic
seeded runs, and portrait-mobile support. Built plugin-architected and BDD-first.

The repo's internal codename is **"Resonance"** (README) — a cozy neon idle
tower defense whose fiction has you keeping Outpost Ulu, a station harvesting
"Ulumai" energy. Public-facing surfaces say "Tower Defense," not "Resonance" —
don't put the codename in a post as the product name.

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Live game | `https://td.buildaloud.ai` | Next.js 16 PWA on Vercel; confirmed live |
| Repo (local) | `~/projects/tower-defense` | pnpm monorepo, package `tower-defense` |
| GitHub repo | **unverified** | no git remote configured in the local repo — do not assert a `github.com/...` URL until one exists and is confirmed |
| Vercel project | `tower-defense` | framework `nextjs`, build `pnpm run build`, output `apps/web/.next` |
| Web app package | `@td/web` (`apps/web`) | the Next.js shell |
| Sibling worktree | `~/projects/tower-defense-mobile-input-fixes` | a git **worktree** of the same repo (branch `cf/mobile-input-overlay-fixes`), NOT a separate repo — mobile touch / pinch-zoom overlay fixes |

### Stack (drift-prone if a post describes the engine)

- pnpm monorepo (`pnpm@10.30.2`, Node 22), TypeScript, Vitest.
- `apps/web` — Next.js 16 PWA shell. `game-render` — Phaser bridge.
- `game-engine` — custom ECS runtime; `game-core-pack` — the base game plugin.
- `plugin-api` — versioned plugin interface; cosmetic packs (aurora, frostfall).
- BDD-driven: `gherkin-parser` + `bdd-runner` turn `.feature` files into Vitest tests.
- Deterministic: all randomness flows through a seeded `mulberry32` RNG; `Math.random` is banned in the engine packages. Same seed + same actions = byte-identical state.
- Supabase backs game saves + auth (Google OAuth / email).

### Ticket convention (naming collision — read this)

The game repo uses `TD-NNNN` for its OWN tickets (in `~/projects/tower-defense/tickets/`,
currently through ~TD-0052). That is a DIFFERENT namespace from the Build Aloud
`[[TD-0031]]` product-learning-pass process referenced in the Output section of
the agent. Don't conflate them: a `TD-00xx` in a game commit message is a game
ticket, not the blog's process flag.

### Retired / do NOT reference

- **`td.buildaloud.com`** — the ORIGINAL planned launch domain (TD-0005, TD-0007,
  and a few older tickets still name it). The live production game is
  `td.buildaloud.ai`. Treat `td.buildaloud.com` as not-canonical; a post
  presenting it as the current live URL is drifted — fix it to `.ai`. (Whether
  `.com` still redirects is unverified; either way `.ai` is the address to
  publish.)

## Other durable facts

- Game genre framing has evolved: "idle tower defense" (spec/README) → the live
  tagline "neon idle tower-defense roguelike." Both describe the same product;
  prefer the live tagline for current-state copy.
- The game is playable anonymously; auth (Supabase) is for saving progress across
  devices, not a paywall. It's free-to-play-first per the spec.
- Spec of record: `~/projects/tower-defense/docs/superpowers/specs/2026-05-21-idle-tower-defense-design.md`.
  Decision log / worklog: `~/projects/tower-defense/docs/worklog.md`.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/tower-defense log --oneline -15` — scan for domain, deploy,
   stack, or auth changes since this ledger's last update.
2. `git -C ~/projects/tower-defense remote -v` — if a remote now exists, capture
   the real GitHub URL and replace the "unverified" row above.
3. Grep the repo for the live domain and deploy config:
   `grep -rn "td.buildaloud" ~/projects/tower-defense/tickets ~/projects/tower-defense/docs`
   and read `vercel.json` + `.vercel/project.json` for the project/build config.
4. Confirm the live game still loads at `https://td.buildaloud.ai` (WebFetch) and
   note the public tagline it shows.
5. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. Early
tickets and posts legitimately named `td.buildaloud.com` as the launch target
before the game settled on `.ai`; a post written then that says "we're launching
at td.buildaloud.com" is a true record of that moment — leave that narrative
alone. Only fix things that are **wrong as of now**: a post telling today's
reader to go play at `td.buildaloud.com`, a fabricated GitHub URL, a stale claim
about the stack. To reflect a change, add a dated forward-note ("Update: live at
td.buildaloud.ai") — never edit the past into the present.

## Drift log

- 2026-07-11 — ledger created. Canonical live URL confirmed `https://td.buildaloud.ai`
  (WebFetch: public title "Tower Defense", tagline "a neon idle tower-defense
  roguelike"). Repo `~/projects/tower-defense` has NO git remote configured →
  GitHub repo left unverified rather than guessed. `td.buildaloud.com` recorded
  as the retired/original domain (TD-0005/TD-0007). Noted the internal codename
  "Resonance" vs. the public name "Tower Defense," and the `TD-NNNN` namespace
  collision between game tickets and the blog's `[[TD-0031]]` process flag.
