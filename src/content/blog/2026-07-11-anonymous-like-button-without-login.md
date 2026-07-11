---
title: "I Built an Anonymous Like Button Without Login"
description: "I built an anonymous like button without login: no accounts, no stored IPs, just an HMAC hash and a Postgres counter. Here's the honest tradeoff."
pubDate: "2026-07-11T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["like-button", "privacy", "supabase", "cloudflare-pages", "build-in-public", "security"]
targetKeyword: "anonymous like button without login"
secondaryKeywords: ["add a like button to a static site", "privacy-friendly like button", "supabase like button", "like button without user accounts", "hash IP address for privacy"]
searchIntent: "informational"
audience: "indie devs and bloggers who want engagement on a static site without auth or a tracking widget"
summary:
  lead: "I built a like button that needs no login and no account. The actual hard part was stopping one person from clicking it 500 times without ever learning who they are."
  points:
    - "The real problem is dedup without identity. Cookies get cleared, and raw IP addresses are shared across a whole office or coffee shop, so neither one holds up as a dedup key alone."
    - "The fix: HMAC-SHA256 the IP with a secret server-side salt, then store only that hash, never the raw IP, unique on post_slug plus voter_hash."
    - "The honest caveat: a hashed IP is pseudonymization, not anonymization. If the salt ever leaks, someone holding a list of candidate IPs can re-identify it."
    - "Defense in depth backs the hash up. Postgres RLS denies every read and write by default. The cookie in the browser is only there to fill in the heart icon, it does zero deduping. And a Cloudflare rate limit caps the endpoint at 2 requests per 10 seconds."
  whatYouGet: "The real architecture behind a login-free like button, what actually stops abuse, and the honest limits of hashing an IP instead of knowing who someone is."
heroImage: "/images/anonymous-like-button-without-login.png"
heroImageAlt: "A glowing mint heart dissolving into a particle stream that pours down into a closed padlock, the anonymous like button's privacy motif"
---

I wanted likes on every post. No login. No account. No tracking widget bolted on just to count hearts. The actual hard part wasn't the heart icon. It was stopping one person from clicking it 500 times without ever finding out who they are.

That's the actual challenge behind an anonymous like button without login. Deduping a click when you refuse to know who clicked.

## The real problem: dedup without an identity

Anyone can load the post. Anyone can tap the heart. Nothing about that requires an account. But the moment nothing requires an account, nothing stops the same anyone from tapping it 500 times either. A like counter with no way to say "you already voted" just becomes a bored-refresh generator.

The actual feature here is dedup. Some way to remember a specific visitor already voted on a specific post, without asking who they are.

## Cookies fail. Raw IP fails too.

First instinct: drop a cookie when someone likes a post, check for it next time. Works fine until they clear cookies, open a private window, or just show up on a different browser. The vote resets. Not malicious. Just how browsers work.

Second instinct: key off the IP address instead. No cookie needed, the server already sees it on every request. Except IP addresses are shared. A coffee shop sits behind one IP. So does an office with a hundred people behind one NAT gateway. Block on IP and you accidentally block everyone else on that network from ever liking anything.

Raw IP is personal data on top of all that, and storing it raw in a public-facing table is its own liability, separate from the dedup problem entirely. [Cookies get cleared and IPs get shared, which is exactly why both fail as a dedup key on their own](https://abhisaha.com/blog/no-authentication-like-button/) for a login-free like button.

## The fix: hash the IP, never store it raw

Here's what I actually shipped. The Cloudflare Pages Function that handles the like POST takes the request's IP and runs it through HMAC-SHA256 with a secret salt. That hash is the only thing that touches the database. Not the IP. The hash of it.

A plain hash of an IP address is close to useless as protection. IPv4 only has about 4.3 billion possible addresses, small enough that an attacker can just hash every single one in advance and build a lookup table, then reverse any hash they find in your database. [An HMAC with a secret key an attacker doesn't have changes that math completely](https://goteleport.com/blog/hashing-for-anonymization/), because now they need the salt too, and the salt never leaves the server.

None of this runs without [the move to Cloudflare back in March](/blog/2026-03-02-we-re-moving-to-cloudflare-and-rethinking-everything-that-costs-money/), when a fully static site picked up an actual server-side layer for the first time. That's what makes [Pages Functions](https://developers.cloudflare.com/pages/functions/) possible here at all. The salt lives in an environment variable on that side. It never ships to the browser, and never shows up in a network request anyone can inspect.

The Postgres table stores exactly two things per row that matter: the post slug, and the resulting hash. There's a unique constraint on `post_slug, voter_hash` together, so the same hashed visitor voting on the same post twice just upserts instead of inserting a duplicate row. Vote on a different post, that's a different row, which is correct behavior. No accounts, no sessions. The database never sees a raw IP.

## The honest caveat: pseudonymization, not anonymization

Here's the part I'm not going to oversell. A hashed IP is pseudonymization. It is not anonymization, and those two words mean different things both legally and practically. [A hash can still be re-identified](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/) if the salt leaks, or if someone with a list of candidate IPs runs the same HMAC over each candidate and matches the output. Pull a day's worth of visitor IPs from some other log and hash every one of them with a leaked salt. The "opaque" hash stops being opaque fast.

That's exactly why the salt stays server-side. It never gets logged or checked into git, and no API response ever exposes it. The hash is only as strong as the secret behind it. The hash is opaque. It isn't magic. I'll say plainly what it buys: a real improvement over storing raw IPs in a public table, not true anonymity.

## Defense in depth

### RLS says no by default

The Postgres table has Row-Level Security turned on with zero policies attached. [In Supabase, that's deny-all by default](https://supabase.com/docs/guides/database/postgres/row-level-security), meaning the public anon key that ships in the browser's JavaScript can't read or write a single row of it. Only the server, holding the service role key that never reaches the client, can insert or update anything. Someone could open dev tools and find the anon key sitting right there in plain sight. The table still just says no.

### The cookie is decoration

There's still a cookie in the browser, but it doesn't do any of the actual dedup work. It's there so the heart icon shows up already filled in if you've liked a post before. A UX nicety, nothing more. Clear it, the heart just shows unfilled again on your next visit, but the server-side hash still remembers you and blocks a duplicate vote regardless. The cookie can lie. The database can't be lied to by a cleared cookie.

### Rate limiting at the edge

Then there's the blunt instrument. A [Cloudflare rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) caps the like endpoint at 2 requests per 10 seconds per visitor, enforced at the edge before a request ever reaches the Function or the database. It won't stop someone patient enough to script around it slowly. It stops the dumb version: someone holding the button down, or a script hammering it as fast as it can go.

## The stack, and what it cost

That's the stack now, one heart icon deep. A hash instead of an identity. A table that refuses writes from the wrong key. A cookie that's just for show. A rate limit at the edge catching the dumb version of abuse.

Feels like a lot of infrastructure for a like button. It is a lot of infrastructure for a like button. But stopping the count from lying, without ever knowing who clicked, turned out to be a different problem than adding a button. It deserved a real answer instead of a token gesture.

Tap the heart on this post. It's the same button, same hash, same dedup logic described above. Then go read [what happened right after I shipped it, when the endpoint quietly 404'd only on our custom domain](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/), because getting the privacy math right didn't mean the button actually worked yet.

---

*Sources: Supabase's docs on Row-Level Security and deny-all-by-default behavior ([supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)); Cloudflare's Pages Functions docs ([developers.cloudflare.com/pages/functions/](https://developers.cloudflare.com/pages/functions/)) and rate limiting rules docs ([developers.cloudflare.com/waf/rate-limiting-rules/](https://developers.cloudflare.com/waf/rate-limiting-rules/)); Teleport's writeup on why HMAC beats a plain hash for anonymization ([goteleport.com/blog/hashing-for-anonymization/](https://goteleport.com/blog/hashing-for-anonymization/)); Abhishek Saha's piece on why cookies and raw IP both fail for login-free like buttons ([abhisaha.com/blog/no-authentication-like-button/](https://abhisaha.com/blog/no-authentication-like-button/)); and Pandectes' explainer on why hashed data is pseudonymous, not anonymous ([pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/)).*
