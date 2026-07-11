# Accounts & services

Which external **account** (login/owner) powers which **service**, and which of
our projects use it. This is the *account map* — it never holds secret values.
Credential *keys* (env-var names + where to get each) live in the token ceremony:
`micro-blueprint/tools/lifecycle/env.ts` (`TOKEN_SPECS`) and the panel's
`/panel/tokens` page.

Legend: **owner** = the login the account is under · **key** = the env var (value
lives in `.env`, never here) · `?` = needs Chad to confirm.

**The identities** (which login "owns" a service — this is the tangle):
- **chad@chadfurman.com** — Chad's Google **Workspace** (chadfurman.com domain). Signs into Cloudflare, Supabase, GCP via Google OAuth. The panel operator identity.
- **chadthefurman@gmail.com** — Chad's **personal gmail**. Owns OpenAI/Codex. (Also what the Google Cloud console defaults to — it's NOT on the panel allow-list.)
- **scout@buildaloud.ai** — the AI's identity (Bluesky; future AI-owned accounts).
- **buildaloud (GitHub org)** — org-owned repos; chadfurman is admin.
- **chad-fossa** — Chad's work account; must NOT touch buildaloud. (`gh` defaults here — switch to `chadfurman`.)

## Infrastructure

| Service | Owner (login) | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **Cloudflare** | chad@chadfurman.com (Google OAuth) | Pages (buildaloud.ai, panel, demo, chesstell, skills-marketplace, ticket-kit), DNS (buildaloud.ai, chads.website, chesstell.com, chadfurman.com, agnai.guide, gaming-thrones.com, ladderlegendsacademy.*, ruttobats.com), WAF | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID` | free + metered | active |
| **Supabase** | chad@chadfurman.com (Google OAuth) — org "chadfurman's Org", project `buildaloud-shared` / `clweuvbzerykadyamdpw` | all products' auth + data (build-aloud likes/subscribe, panel, demo) | `SUPABASE_SECRET_KEY`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, `PUBLIC_SUPABASE_ANON_KEY` | free | active |
| **Google Cloud** | chad@chadfurman.com (Google OAuth; org chadfurman.com) | panel Google OAuth (project `buildaloud`), Gemini API (project `gen-lang-client-*`), GA4 + Search Console | OAuth client (`.oauth-client-panel-web.json`), `gcloud` auth | free-ish | active |
| **Railway** | `?` — Chad to create | MCP broker host (skills-marketplace-mcp) | Railway project token | ~$5/mo | **being set up** |
| **Vercel** | `?` | `?` — legacy? build-aloud CLAUDE.md still says "Vercel auto-deploys" but we moved to Cloudflare Pages | — | — | **confirm — likely unused** |

## Data / search / cache

| Service | Owner | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **Pinecone** | `?` — Chad to create | MCP broker semantic skill search (index `skills-marketplace`) | `PINECONE_API_KEY`, `PINECONE_INDEX` | free starter | **being set up** |
| **Upstash Redis** | `?` — Chad to create | MCP broker cache | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | free | **being set up** |

## Email / newsletter

| Service | Owner | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **Buttondown** | chad@chadfurman.com (Google OAuth) | newsletter (build-aloud subscribe, products) | `BUTTONDOWN_API_KEY` | `?` | active |
| **Resend** | chad@chadfurman.com (Google OAuth) | product-branded auth emails via Supabase Send Email Hook | `RESEND_API_KEY`, `SEND_EMAIL_HOOK_SECRET` | free | active |
| **scout@buildaloud.ai** | `?` — where hosted? (Google Workspace / forwarding / Resend?) | Scout's identity email (Bluesky + future AI-owned accounts) | — | `?` | active |

## Payments

| Service | Owner | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **Stripe** | chad@chadfurman.com (email + password, not OAuth) | product checkout (micro-blueprint, test mode until launch) | `STRIPE_SECRET_KEY` | test | active |

**Business entity:** the Stripe account is tied to **Chad Furman Development, Inc.**, with payouts to **Florence Bank**. (Legal entity + payout bank only — no account/routing numbers stored here.)

## AI / content

| Service | Owner | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **OpenAI / Codex** | chadthefurman@gmail.com (personal gmail) | hero-image gen (codex imagegen + Images API), Codex CLI | `OPENAI_API_KEY` | paid | active |
| **Anthropic (Claude)** | Chad | the whole content + dev pipeline | Claude Code auth | paid | active |

## Social

| Service | Owner | Used by | Key(s) | Tier | Status |
|---|---|---|---|---|---|
| **Bluesky** | scout@ / @buildaloud.ai | Scout's posts from the approval queue | `BLUESKY_APP_PASSWORD` | free | active |

## Code hosting

| Service | Account | Used for |
|---|---|---|
| **GitHub — chadfurman** | personal | build-aloud, ticket-kit, security-kit, mcp-server, chesstell, most product repos |
| **GitHub — buildaloud (org)** | org (chadfurman is admin) | skills-marketplace, skills-marketplace-mcp, micro-blueprint, build-in-public-site, safe-oss-forever |
| **GitHub — chad-fossa** | work | FOSSA work — NOT for buildaloud (note: `gh` defaults to this account; switch to `chadfurman` for buildaloud repos) |
| **GitHub — a-pasquale** | Andrew | Andrew's forks (e.g. a fork of skills-marketplace-mcp) |

## To confirm / fill in
- Where `scout@buildaloud.ai` is hosted.
- Whether **Vercel** is still used by anything (likely retired for Cloudflare).
- Railway / Pinecone / Upstash — fill owner once the broker signups happen.
