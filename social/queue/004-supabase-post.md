---
platform: bluesky
status: draft
scheduled: 2026-08-10
utm: bluesky
---

One asterisk broke signup for every user. Supabase treats /* and /** differently in the redirect allow-list, fails silently, and drops auth tokens on a page with no client to catch them.

Full root-cause chain: https://buildaloud.ai/blog/2026-08-10-supabase-magic-link-redirect-bug?utm_source=bluesky
