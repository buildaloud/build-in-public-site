# Build Aloud — product expert ledger

The `buildaloud-expert` agent's memory. Canonical facts about the **Build Aloud
blog + its AI content pipeline** — the product THIS repo is — kept current by
checking the repo for drift. Read this FIRST, update it LAST. When a fact here
disagrees with a blog post, the post is wrong — fix the post.

## What it is

**Build Aloud** is a build-in-public blog that narrates building an AI business
from $0 to $10K/month. Two halves:

1. **The site** — a static Astro blog on Cloudflare Pages at `buildaloud.ai`.
   Posts are markdown in `src/content/blog/`. A few dynamic bits run as
   Cloudflare Pages Functions in `functions/api/` (a like counter, a subscribe
   endpoint).
2. **The content pipeline** — an AI system (the `content-pipeline` skill + a
   roster of memory-backed subagents) that produces each post end-to-end:
   source scan → topic gate → SEO research → brief → draft → human-tone gate →
   review → hero image → summary/digest → assemble → schedule → commit.

**Scout** is the AI author persona that writes the posts (posts use
`author: "Scout"`; Chad's own posts use `author: "Chad"`).

## Canonical URLs & repos (the drift-prone facts)

| Thing | Current value | Notes |
| --- | --- | --- |
| Live site | `https://buildaloud.ai` | set as `site` in `astro.config.mjs`; also the `ORIGIN` in `functions/api/like.test.ts` |
| Hosting | Cloudflare Pages, project `build-in-public-site` | NOT Vercel — see Retired below |
| Deploy mechanism | GitHub Actions → `wrangler pages deploy dist --project-name build-in-public-site --branch=main` | `.github/workflows/deploy.yml`; on push to `main`, plus a daily cron (`0 13 * * *`) rebuild so future-dated posts publish |
| Repo | `github.com/buildaloud/build-in-public-site` | local: `~/projects/build-aloud`; git remote `git@github.com-personal:buildaloud/build-in-public-site.git` |
| Stack | Astro 5 (static), TypeScript, vitest; `@astrojs/rss` + `@astrojs/sitemap` | `package.json` name is `build-in-public-site` |
| Posts | `src/content/blog/*.md` | ~52 posts as of this ledger's creation |
| Pages Functions | `functions/api/like.ts`, `functions/api/subscribe.ts` | like counter + email subscribe; not part of `dist` (see `scripts/gen-slugs.ts`) |
| Pipeline skill | `.claude/skills/content-pipeline/SKILL.md` | the orchestrator; drip dates owned by `schedule.ts` |
| Human-tone gate | `.claude/skills/human-tone/` | hard gate: `aiScore ≤ 2` AND `banned = 0` |

### Agent roster (the pipeline's experts)

Lives in `.claude/agents/`. As of this ledger: `brief-writer`,
`bullshit-detector`, `content-judge`, `content-reviewer`, `drafter`,
`fact-checker`, `link-checker`, `marketplace-expert`, `section-impact-reviewer`,
`seo-researcher`, `web-researcher`, plus this expert (`buildaloud-expert`).
Verify the count against `ls .claude/agents/` before quoting a number — the
roster grows. Product experts also keep ledgers in `docs/product-experts/`.

### The pipeline shape (how a post is made)

Numbered stages in `SKILL.md`: (1) gather source material, (2) topic-approval
gate + keyword discovery, (3) SEO research → `ResearchResult`, (4) brief →
schema-valid `.brief.md`, (5) draft in Scout/Chad voice, (6) **human-tone gate**
(hard: `aiScore ≤ 2`, `banned = 0`), (7) content review, (7.2) section-impact
review, (7.5) fact + link + bullshit check (three memory-backed experts, all
must PASS), (8) hero image (real screenshot or `codex exec` imagegen), (9)
structured summary + rolling digest, (10) assemble frontmatter, (10.5)
score & schedule per `docs/seo-impact-model.md`, (11) bookkeeping, (11.5)
capture product-learnings, (12) build + commit + push. Drip cadence is owned by
`schedule.ts`, not hand-picked dates.

### Retired / do NOT reference

- **"Vercel auto-deploys from `main`"** — WRONG. The site is on **Cloudflare
  Pages**, deployed by GitHub Actions running `wrangler pages deploy`. `SKILL.md`
  Step 12 still says "Vercel auto-deploys from `main`" — that line is stale; the
  hosting is Cloudflare. Any post claiming Vercel hosting is drifted — fix it.
- **Repo named "build-aloud"** — the local directory is `~/projects/build-aloud`,
  but the GitHub repo and `package.json` name are **`build-in-public-site`**.
  Don't link to `github.com/buildaloud/build-aloud`; it's `build-in-public-site`.

## Other durable facts

- **`/api/*` on the custom domain has a known live issue.** Per project memory,
  `buildaloud.ai` has 404'd `/api/*` (Pages Functions) while the `*.pages.dev`
  URL served them — a zone Worker Route/Rule shadowing `/api/*`. The like
  endpoint also shipped inert (needs a Supabase migration + CF env vars). Treat
  any post claiming the like counter / subscribe endpoint is live on
  `buildaloud.ai` as **unverified** until re-checked against the live site.
- **Deploy must pin `--branch=main`.** CF Pages deploys silently go to a preview
  (prod frozen) unless wrangler is pinned to `--branch=main` — it is, in
  `deploy.yml`. Don't "simplify" that flag away.
- Cornerstone posts can be `pinned: true` (dated live, surfaced in the hero,
  exempt from the drip cadence); evergreen fillers are `filler: true` and sink
  to the queue tail.

## Drift-check routine

On each run, before trusting the table above:
1. `git -C ~/projects/build-aloud log --oneline -15` — scan for domain, deploy,
   repo, or pipeline-stage changes since this ledger's last update.
2. Confirm the live facts in the repo: `site` in `astro.config.mjs`; the
   `wrangler pages deploy ... --project-name ... --branch=main` line in
   `.github/workflows/deploy.yml`; the git remote (`git remote -v`); the agent
   roster (`ls .claude/agents/`); the pipeline stages in
   `.claude/skills/content-pipeline/SKILL.md`.
3. If anything here is stale, update this table, note it under Drift log, then
   sweep `src/content/blog/` for posts carrying the old value and fix them.

## History vs drift — do not rewrite the past

A dated post describing a *past* product state is history, not drift. If an
early post described a smaller pipeline (fewer stages, no tone gate) or an
earlier hosting/deploy setup that was true at the time, leave that narrative
alone. Only fix things that are **wrong as of now**: dead links, the wrong repo
pointer (`build-aloud` vs `build-in-public-site`), a "Vercel" hosting claim, a
stale live domain. To reflect a change, add a dated forward-note ("Update: …")
— never edit the past into the present.

## Drift log

- 2026-07-11 — ledger created. Confirmed from the repo: live domain
  `https://buildaloud.ai` (`astro.config.mjs`), hosting Cloudflare Pages project
  `build-in-public-site` via GitHub Actions `wrangler pages deploy dist
  --branch=main` (`.github/workflows/deploy.yml`), repo
  `github.com/buildaloud/build-in-public-site`, ~52 posts, 11 pipeline agents +
  this expert. Flagged the stale "Vercel auto-deploys" line in `SKILL.md` Step 12
  and the `build-aloud` vs `build-in-public-site` repo-name trap. No posts swept
  yet — first audit pending.
