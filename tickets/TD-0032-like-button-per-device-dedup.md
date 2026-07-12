---
id: TD-0032
title: 'like button: dedup per-device (cookie token), not per-IP — shared IPs shouldn''t block each other'
status: in-progress
priority: P1
rank: 22
area: engineering
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0032 · like button dedup: IP-hash → per-device token

## Why

Chad (2026-07-11): the shipped like button dedups on `HMAC(ip, salt)`, so every
visitor behind one IP — a household, an office, a cafe, a mobile carrier's CGNAT —
shares a single dedup key. After the first like, everyone else on that IP is
silently blocked. The feature is weaker than the post
([[the anonymous-like-button post]]) implies. Surfaced by the bullshit-detector
work ([[TD-0030]]) and the build→learn→refactor loop ([[TD-0031]]).

**The learning:** the post floated *browser fingerprinting* as the "better" dedup.
It isn't — fingerprinting is *more* privacy-invasive than a hashed IP and still
defeatable. For a low-stakes like button the honest, on-brand answer is a
**server-issued per-device cookie token**.

## What

1. **Dedup on a per-device token.** We already set a random `like_voter` cookie —
   make it the dedup key instead of a decorative UX hint. Each browser gets its own
   token, so shared-IP visitors can each like once.
2. **Keep the IP hash for abuse rate-limiting only** — the per-voter hourly cap and
   the Cloudflare rule — never for dedup.
3. **Schema:** unique constraint moves from `(post_slug, voter_hash)` to
   `(post_slug, device_token)`; keep an `ip_hash` column purely for the rate-limit
   window count. (Migration not yet applied — the endpoint is inert, so this is a
   free schema change, not a data migration. See [[like-endpoint-pending-activation]].)
4. **Honest caveat, baked in:** one like per browser; clearing cookies / incognito
   lets you like again. Fine for a like button — and we deliberately chose not to
   fingerprint.
5. **Privacy page:** rewrite the "Post likes" disclosure — a random per-device
   cookie token decides your like; the IP is hashed only ephemerally for abuse
   rate-limiting, not to decide whether you've liked.
6. **The post:** paused (draft) and linked here; rewritten once this ships to tell
   the honest learning story ([[TD-0031]] first application).

## Acceptance

- [ ] Dedup keys on the per-device token; two devices behind one IP can both like
- [ ] IP hash is used only for rate-limiting, never dedup
- [ ] Migration + `_like-core` + `like.ts` + tests updated and green
- [ ] privacy.astro reflects the per-device-token mechanism
- [ ] The anonymous-like-button post is unpublished (draft) pending the honest rewrite

## Notes

Ties to [[like-endpoint-pending-activation]] (still needs Chad's migration + CF env
vars + rate-limit rule to actually go live).
