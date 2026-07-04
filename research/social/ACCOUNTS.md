# Account registry

Every external account, so nothing gets lost. Credentials NEVER live here —
they live in Chad's password manager; API keys flow through the lifecycle
console ceremony into `.env` (chmod 600, gitignored).

| Platform | Handle / URL | Status | Purpose | Credential home |
|---|---|---|---|---|
| Bluesky | buildaloud.bsky.social → @buildaloud.ai (DNS pending) · did:plc:3sib6ewjbyhl7fpyuqo7kp57 | live, 2026-07-04 | Scout's primary channel, queue+approve | password mgr; app password → console |
| X | @buildaloudai | parked, 2026-07-04 | handle squat only, no posting | password mgr |
| LinkedIn | [linkedin.com/company/buildaloudai](https://www.linkedin.com/company/buildaloudai/) | live, 2026-07-04 | Phase-2 archive + Chad's weekly reshare | Chad's real profile admins it |
| Buffer | — | not yet created | LinkedIn page scheduling (Phase 2) | password mgr; API key → console |
| Mastodon | — | deferred | needs a named bot-tolerant instance first | — |
| YouTube | @buildaloudai · "BuildAloud" · [channel/UCsHj57v6S83bcNTcKwxx0nw](https://www.youtube.com/channel/UCsHj57v6S83bcNTcKwxx0nw) | live (handle parked), 2026-07-04 | video lane — pipeline researched, see VIDEO.md | Chad's Google account |
| Email | scout@buildaloud.ai (Workspace user-alias-domain alias on chad@chadfurman.com) | in setup, 2026-07-04 | Scout's signup + send-as address for social accounts | Google Workspace admin |
| Buttondown | buildaloud | live (pre-existing) | the mailing list — the north star | key in console ceremony |
| GitHub | github.com/buildaloud (org) | live (pre-existing) | factory + product repos (private) | Chad + fine-grained PAT |

Infra accounts (Cloudflare, Supabase, Stripe, GA/GSC, PostHog, Vercel,
Resend) are inventoried per-service in `new-project-template/setup/`.
