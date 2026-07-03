# New-project setup

Run-sheet for wiring a new Build Aloud product/site to its analytics, email, deploy, and stats plumbing. Copy this `setup/` folder into a new project and work the checklist.

## Ownership legend

Every step is tagged by who can safely perform it:

- **[AI]** — Claude can do it: navigate pages, read non-secret IDs, edit repo code/config, add tags, write pull scripts.
- **[AI→USER]** — Claude loads the page and narrates; **you click** the sensitive control. Used for anything that creates an account, changes access/permissions, verifies ownership, or accepts terms.
- **[USER]** — you only, off-limits to Claude even if asked: generating/downloading secret keys, copying keys/tokens into `.env`, entering payment or personal data, submitting forms.

Rule of thumb: **Claude never creates accounts, never changes permissions, and never touches a secret value.** Those are yours. Claude reads identifiers, edits the repo, and guides.

## Files

- `CHECKLIST.md` — master tracker: every service, its steps, owner, and the env var it produces. Update `Status` as you go.
- One folder per service, each with a `CLAUDE.md`:
  - Core: `cloudflare-pages/`, `google-analytics/`, `search-console/`, `gcp-service-account/`, `buttondown/`.
  - Alternative host: `vercel/`.
  - Per-need, add when the product requires it: `supabase/`, `stripe/`, `resend/`, `posthog/`.

## Order

Core, always: 1. `cloudflare-pages` (deploy) → 2. `google-analytics` (tag) → 3. `search-console` (verify) → 4. `gcp-service-account` (API access for stats) → 5. `buttondown` (newsletter). Stats pullers (`scripts/stats/`) need 2–5 done.

Per-need, pull in as the product requires: `supabase` (DB/auth) → `stripe` (payments) → `resend` (transactional email) → `posthog` (product analytics). `vercel` is an alternative to `cloudflare-pages`, not an addition to it.
