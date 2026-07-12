---
title: "I Built an Anonymous Like Button Without Login"
description: "A login-free like button, and the honest rebuild: why an IP hash silently blocked shared networks, and the layered device id that fixed it."
pubDate: "2026-07-11T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["like-button", "privacy", "supabase", "cloudflare-pages", "build-in-public", "security"]
targetKeyword: "anonymous like button without login"
secondaryKeywords: ["add a like button to a static site", "privacy-friendly like button", "supabase like button", "like button without user accounts", "dedupe likes without login"]
searchIntent: "informational"
audience: "indie devs and bloggers who want engagement on a static site without auth or a tracking widget"
summary:
  lead: "I built a like button that needs no login and no account. The hard part was stopping one person from clicking it 500 times without ever learning who they are, and the first version I shipped got that wrong."
  points:
    - "The real problem is dedup without identity. Cookies get cleared and raw IP addresses are shared across a whole office or coffee shop, so neither one holds up as a dedup key alone."
    - "My first version keyed dedup on a hashed IP. It quietly inherited the exact flaw I'd just called out: everyone behind one address shares one hash, so the second person on an office or cafe network got silently blocked."
    - "The rebuild identifies the device, not the network: a random id kept in both localStorage and a cookie, and if you clear both, re-derived from device signals like screen, timezone, and a Web Audio fingerprint. No single layer is trusted, because Safari randomizes the audio one on purpose."
    - "The server only ever sees an HMAC of that id, plus a separately hashed IP used only to rate-limit abuse. Postgres RLS denies every read and write by default, and a Cloudflare rule caps the endpoint at the edge."
  whatYouGet: "The real architecture behind a login-free like button, the flaw in the obvious version, and the layered device id that dedupes without ever knowing who you are."
heroImage: "/images/anonymous-like-button-without-login.png"
heroImageAlt: "A glowing mint heart dissolving into a particle stream that pours down into a closed padlock, the anonymous like button's privacy motif"
---

I wanted likes on every post. No login. No account. No tracking widget bolted on just to count hearts. The hard part wasn't the heart icon. It was stopping one person from clicking it 500 times without ever finding out who they are.

That's the actual challenge behind an anonymous like button without login. Deduping a click when you refuse to know who clicked. I shipped a version that felt clever and turned out to be quietly broken. So here's the honest version. I'll walk through the thing I shipped and the flaw that writing this post forced me to see.

## The real problem: dedup without an identity

Anyone can load the post. Anyone can tap the heart. Nothing about that requires an account. But the moment nothing requires an account, nothing stops the same anyone from tapping it 500 times either. A like counter with no way to say "you already voted" just becomes a bored-refresh generator.

The actual feature here is dedup. Some way to remember a specific visitor already voted on a specific post, without asking who they are.

## Cookies fail. Raw IP fails too.

First instinct: drop a cookie when someone likes a post, check for it next time. Works fine until they clear cookies, open a private window, or just show up on a different browser. The vote resets. Not malicious. Just how browsers work.

Second instinct: key off the IP address instead. No cookie needed, the server already sees it on every request. Except IP addresses are shared. A coffee shop sits behind one IP. So does an office with a hundred people behind one NAT gateway, and so does a whole chunk of a mobile carrier's customers behind CGNAT. Block on IP and you accidentally block everyone else on that network from ever liking anything.

Raw IP is personal data on top of all that, and storing it raw in a public-facing table is its own liability, separate from the dedup problem entirely. [Cookies get cleared and IPs get shared, which is exactly why both fail as a dedup key on their own](https://abhisaha.com/blog/no-authentication-like-button/) for a login-free like button.

## What I shipped first, and why I tore it out

Here's the version I was proud of for about a day. The Cloudflare Pages Function took the request's IP, ran it through HMAC-SHA256 with a secret salt, then stored only that hash. Never the raw IP. Dedup keyed on the hash, unique on the post slug and the hash together.

That solved the storage-liability half honestly. A plain hash of an IP is close to useless, because IPv4 only has about 4.3 billion possible addresses and an attacker can hash every one in advance and reverse yours from a lookup table. [An HMAC with a secret key an attacker doesn't have changes that math completely](https://goteleport.com/blog/hashing-for-anonymization/), because now they need the salt too, and the salt never leaves the server.

But it quietly inherited the exact flaw I'd just finished writing about. An IP hash is still one value per address, not one per person. Everyone behind one address produces the same hash, so the second real person at that office or cafe likes a post and the server swallows their vote as a duplicate. I sold "one hash per visitor" when what I actually shipped was one hash per network. Re-reading [Abhishek Saha's piece on login-free like buttons](https://abhisaha.com/blog/no-authentication-like-button/) while fact-checking my own draft is what made it land. Both cookies and IP fail, and the thing you actually want to identify is the device itself.

## The rebuild: identify the device, in layers

So I threw out IP-as-identity and rebuilt around a per-device id. Not one trick, a stack of them, because every single method of identifying a browser fails in some case:

- A random id kept in **localStorage**, so it survives a cookie clear.
- The same id mirrored into a **cookie**, so it survives a localStorage clear.
- If both are gone, the id is **re-derived from the device's own signals**. That means the screen and timezone, the language and hardware details, plus an audio fingerprint rendered through the Web Audio API, exactly the [OfflineAudioContext trick Saha uses](https://abhisaha.com/blog/no-authentication-like-button/). Same device tends to re-derive the same id instead of counting as brand new.

The audio fingerprint is a real signal, and it's also why you can't lean on any one layer. Safari and other privacy-minded browsers deliberately randomize their audio fingerprint to defeat exactly this kind of tracking. So the fingerprint isn't the identity. It's one input to a recovery hint that only runs when storage is already gone. Persistence lives in localStorage and the cookie. The signal seed just helps a wiped browser land back on its old id when it can.

I skipped the off-the-shelf fingerprinting libraries on purpose. For a heart icon I didn't want to ship a tracking-grade dependency or the privacy baggage that comes with it. A handful of coarse signals plus real storage is enough to keep a like counter honest.

Whatever id comes out of that stack, the server treats it as opaque. It gets HMAC'd with the server-side salt into a `device_hash`, and only that hash touches the database, unique on the post slug and the device hash together. The raw signals never leave the browser. The IP still gets hashed, but now it does only one job: rate-limiting abuse in a time window, never deciding whether you've already liked.

## The honest caveats

I'm not going to oversell this one either.

It's device-level, not identity. I still don't know who you are. That was the goal, but it also means the same person on their phone and their laptop counts as two separate likes. Clear your storage on a browser that also randomizes its signals and you can like a post again. Two identical, freshly-wiped devices can collide onto the same id. For a like button, every one of those is fine. It has to stop the bored-refresh spammer and count roughly right, not survive a determined attacker.

And the hash is pseudonymization, not anonymization, the same as before. [A hash can still be re-identified](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/) if the salt leaks and someone runs the same HMAC over a list of candidates. That's why the salt stays server-side, never logged, never in git, never in an API response. The hash is opaque. It isn't magic.

## Defense in depth

### RLS says no by default

The Postgres table has Row-Level Security turned on with zero policies attached. [In Supabase, that's deny-all by default](https://supabase.com/docs/guides/database/postgres/row-level-security), meaning the public anon key that ships in the browser's JavaScript can't read or write a single row of it. Only the server, holding the service role key that never reaches the client, can insert or update anything. Someone could open dev tools and find the anon key sitting right there in plain sight. The table still just says no.

### Rate limiting at the edge

Then there's the blunt instrument. A [Cloudflare rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) caps the like endpoint at the edge, before a request ever reaches the Function or the database. It won't stop someone patient enough to script around it slowly. It stops the dumb version: someone holding the button down, or a script hammering it as fast as it can go.

## The stack, and the lesson

That's the stack now, one heart icon deep. A layered device id instead of a network address. A table that refuses writes from the wrong key. An IP hash that only rate-limits. A rate limit at the edge catching the dumb version of abuse.

The lesson wasn't really about like buttons. It was that the research I do to write a post honestly is the same research that catches the thing I shipped wrong. I caught my own shared-IP flaw by fact-checking my own bragging. So now that's a rule here: if writing the post teaches us the product is wrong, we fix the product first and the post says what we learned.

Tap the heart on this post. It's the rebuilt button, device id and all. Then go read [what happened right after I first shipped it, when the endpoint quietly 404'd only on our custom domain](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/), because getting the privacy math right didn't mean the button actually worked yet.

---

*Sources:*

- *Abhishek Saha's piece on login-free like buttons, the inspiration for the device-id rebuild and the audio-fingerprint approach ([abhisaha.com/blog/no-authentication-like-button/](https://abhisaha.com/blog/no-authentication-like-button/))*
- *Teleport on why an HMAC beats a plain hash for anonymization ([goteleport.com/blog/hashing-for-anonymization/](https://goteleport.com/blog/hashing-for-anonymization/))*
- *Pandectes on why hashed data is pseudonymous, not anonymous ([pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/))*
- *Supabase docs on Row-Level Security and deny-all-by-default ([supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security))*
- *Cloudflare docs on Pages Functions ([developers.cloudflare.com/pages/functions/](https://developers.cloudflare.com/pages/functions/)) and rate limiting rules ([developers.cloudflare.com/waf/rate-limiting-rules/](https://developers.cloudflare.com/waf/rate-limiting-rules/))*
