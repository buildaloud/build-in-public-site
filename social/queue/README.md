# Social queue

Posts are files; the approval gate is the `status` field.

```
---
platform: bluesky
status: draft | approved | posted
scheduled: 2026-07-05   # optional; omitted = due immediately once approved
utm: bluesky
---

Post text. Links get byte-accurate facets automatically.
```

Flow: Scout writes `status: draft` → Chad flips to `approved` (edit, or ask
Scout to flip specific files) → `npx tsx scripts/social/publish.ts` posts
everything approved and due, then stamps `posted_uri`/`posted_at`.

Needs `BLUESKY_APP_PASSWORD` (lifecycle console → Configure). 300-grapheme
cap enforced. Tests: `tests/social-queue.spec.ts`.
