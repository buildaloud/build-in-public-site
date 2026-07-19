---
title: "I Built an Anonymous Like Button Without Login"
description: "I built an anonymous like button without login: a layered device id plus a salted HMAC for dedup, and the shared-IP flaw I caught fact-checking my draft."
pubDate: "2026-07-11T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["like-button", "privacy", "supabase", "cloudflare-pages", "build-in-public", "security"]
targetKeyword: "anonymous like button without login"
secondaryKeywords: ["add a like button to a static site", "privacy-friendly like button", "supabase like button", "like button without user accounts", "dedupe likes without login"]
searchIntent: "informational"
audience: "indie devs and bloggers who want engagement on a static site without auth or a tracking widget"
summary:
  lead: "Likes on every post, with no login and no accounts. The build came down to dedup: remembering that a visitor already voted while refusing to learn who they are."
  points:
    - "v1 keyed dedup on an HMAC of the visitor's IP, which merges everyone behind one cafe or office NAT into a single vote."
    - "The rebuild identifies the device in layers: a localStorage id mirrored into a cookie, with coarse device signals to re-derive it after a wipe."
    - "Supabase RLS with zero policies denies everything by default, and this feature ships no Supabase key to the browser at all; every read and write goes through the server's service role key instead."
    - "The flaw surfaced while fact-checking this post's own draft."
  whatYouGet: "A working recipe for login-free likes with honest dedup, plus the exact mistake to skip when you build yours."
heroImage: "/images/anonymous-like-button-without-login.png"
heroImageAlt: "A glowing mint heart dissolving into a particle stream that pours down into a closed padlock, the anonymous like button's privacy motif"
---

I wanted likes on every post, no login and no tracking widget bolted on just to count hearts. The heart icon itself took minutes to wire up. But stopping one person, a visitor I refuse to ever identify, from clicking it 500 times ate the rest of the build. The first version I shipped got that quietly wrong.

This is that anonymous like button without login: one version that felt clever, and the rebuild that replaced it once I found the flaw hiding inside it.

## The real problem: dedup without an identity

This site is static: no server renders a page on request. Adding a like button to a static site meant anyone could load a post and tap the heart with no account required. Nothing about that flow stops the same visitor from tapping it again and again. Same person, same heart, forever. A like counter with no memory of "you already voted" is just a bored-refresh generator. So the feature to build is a memory: this specific visitor already voted on this specific post, recorded while asking nothing about who they are. Remembering a stranger without ever recognizing them is the engineering problem here, and every layer that follows is plumbing for that single fact.

## Why you can't dedupe likes without login with cookies or IP

The obvious first move is a cookie: drop one when someone likes a post, check for it on the next visit. It dies the moment that cookie clears, or someone opens a private window or switches browsers. None of that is malicious, just how browsers work.

IP looks sturdier at first glance. The server already sees it on every request, with nothing to install. But a coffee shop shares one IP, and so does an office with a hundred people behind one NAT gateway. Mobile carriers put whole customer blocks behind CGNAT on top of that. Key dedup to IP, and you've blocked entire networks from ever liking anything. A raw IP is also personal data, and storing it in a public-facing table is a liability separate from dedup entirely. I reached for both, convinced neither one would reveal who anybody was: they're the two things every dev tries first. [Saha's piece on login-free like buttons](https://abhisaha.com/blog/no-authentication-like-button/) calls out the same two failures you hit trying to dedupe likes without login. I should've believed him the first time through.

## What I shipped first, and why I tore it out

I was proud of this version for about a day. The [Cloudflare Pages Function](https://developers.cloudflare.com/pages/functions/) took the request's IP and ran it through HMAC-SHA256 with a secret salt. It stored only the hash, with dedup unique on the post slug plus the hash. That's the first thing any privacy-friendly like button has to get right: hash it, don't keep it.

The same logic [Teleport lays out for reversible hashes](https://goteleport.com/blog/hashing-for-anonymization/) hits even harder for an IP. IPv4 addresses are 32 bits long, [a format RFC 791 fixed back in 1981](https://tools.ietf.org/html/rfc791). That works out to 4,294,967,296 possible values, about 4.3 billion, a range small enough that an attacker can hash every one of them in advance and reverse yours straight out of a lookup table. An HMAC with a secret key changes the math: the attacker now also needs the salt, and the salt never leaves the server.

But v1 inherited the flaw from the section just above. An IP hash yields one value per address. Everyone behind the same office NAT or the same cafe router produces that identical value, so the second real person on that network likes a post, and the server swallows their vote as a duplicate. The realization landed while re-reading Saha's piece to fact-check my draft of this post: I sold "one hash per visitor"; what I actually shipped was one hash per network. That's the flaw sitting inside any login-free like button built on network identity: the shipped code just hadn't caught up to an argument I'd already made one section earlier. Saha's conclusion points the way out: the thing to identify is the device itself.

## The rebuild: a device id in layers

Threw out IP-as-identity and rebuilt around a per-device id, structured as a stack, since every method of identifying a browser fails somewhere on its own: the shape a like button without user accounts needs. A random id lives in localStorage, so it survives a cookie clear. That same id also mirrors into a cookie, so a localStorage wipe alone leaves it recoverable. When both are gone, the id re-derives from the device's signals: screen and timezone, language and hardware details, plus an audio fingerprint rendered through the [Web Audio API's OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext), the same trick [Saha uses in his own no-login like button](https://abhisaha.com/blog/no-authentication-like-button/). Saha's version caps a fingerprint at five likes; this rebuild's unique constraint on the post slug plus the device hash caps it at one, tighter than the source it borrowed the trick from. Saha's own testing found the fingerprint held steady across Chrome, Safari, and Arc; his caveat is that a different rendering engine could still produce a different value, and a private window or a future anti-fingerprinting update could shift it further. So it works as a recovery hint that only runs when storage is already gone; persistence stays in localStorage and the cookie. I skipped off-the-shelf fingerprinting libraries on purpose. A handful of coarse signals plus real storage keeps a like counter honest, and every dependency I don't ship is one less thing this feature could leak.

Whatever id comes out of the stack, the server treats it as opaque. The server HMACs it with the salt into a `device_hash`, and only that hash ever touches the database. Dedup is unique on the post slug and the device hash together; the raw signals never leave the browser. The IP still gets hashed, but it keeps exactly one job now: rate-limiting abuse, capped at 50 likes per hour per hashed IP and 300 inserts per minute across everyone voting, straight out of `_like-core.ts`'s `PER_VOTER_HOURLY_CAP` and `GLOBAL_PER_MINUTE_CAP` constants. Splitting those two questions into separate jobs fixed the design: the device hash answers "already voted," the IP hash answers "too fast."

## The honest limits

The rebuild doesn't get oversold either. The id is device-level: the same person liking a post from their phone and then their laptop counts as two likes. A storage wipe on a browser that also randomizes its signals opens the door to a re-like. Two identical, freshly wiped devices can even collide onto the same id. None of those three costs bite hard. A phone-and-laptop double count just rounds one real fan's enthusiasm up by one. A wipe-and-respoof re-like still costs an attacker a whole fresh browser profile for a single extra vote. And two identical fresh devices colliding onto the same id are rare enough not to chase.

The hash itself is pseudonymous, in [GDPR's sense of that term](https://gdpr-info.eu/art-4-gdpr/): data that could still be traced back to a person given the right additional information, kept separate and protected. Here that additional information is the salt plus a list of candidate values, and if the salt ever got out, that's what would re-identify the hash. [Pandectes spells out the re-identification mechanism itself](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/): hashed data stays reversible against any small or guessable input space, and both an IP and a device id qualify. The GDPR label here is this post's gloss on that mechanism; Pandectes never uses the word itself. The salt lives server-side only: never logged, never in git, never in an API response. For a heart icon, roughly right beats forensically exact. The threat model here is a bored spammer, and every remaining hole costs less than tracking people ever would.

## Defense in depth

### RLS says no by default

The Postgres table behind this Supabase like button has [Row-Level Security turned on with zero policies attached, which in Supabase means deny-all by default](https://supabase.com/docs/guides/database/postgres/row-level-security). Zero policies turned out to be the strongest policy on the table: every row says no unless the server itself is asking. This site's frontend never talks to Supabase directly for likes: every read and write routes through the Cloudflare Function first. Only the server can insert or update a row, and it holds the service role key that never reaches the client. This feature ships zero Supabase keys to the browser at all, so there's nothing for a policy gap to expose: RLS's deny-all is just the backstop for a mistake I never made.

### Rate limiting at the edge

Right now the only rate limit in force runs inside the Function itself, the same 50-per-hour-per-IP and 300-per-minute-global caps from a moment ago. A [Cloudflare rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) at the edge is the layer I want stacked on top of that, catching the dumb version of abuse (someone holding the button down, a script hammering as fast as it can go) before a request ever reaches the Function or the database; it isn't live yet, blocked on Cloudflare dashboard access my deploy automation doesn't have, so it's a task on my board for now. A patient attacker scripting around either layer slowly still gets through, and the device-hash dedup is what bounds the damage once they're in.

One honest gap for whenever it does ship: if it counts by client IP the way Cloudflare's defaults do, it inherits the same shared-network blind spot the dedup rebuild just fixed, so a dozen people liking posts from one busy office or cafe could trip the same threshold as an attacker hammering the button, though the failure stays milder, stalling that network for a few minutes instead of the old bug's silently swallowing one vote forever. [Cloudflare's rate-limiting docs](https://developers.cloudflare.com/waf/rate-limiting-rules/) already list the fix for that gap, too: a counting characteristic called "IP with NAT support," built for exactly this (requests sharing one address behind a NAT), available from the Business plan up. Keying the rule on a cookie instead of IP works too, but that one's gated to the top Enterprise-with-Advanced-Rate-Limiting tier, a much bigger ask than Business. I'm not paying for either tier over a heart icon, but the fix already exists on the shelf if this blind spot ever gets loud enough to matter.

## The stack, and the lesson

The stack now, one heart icon deep: a layered device id stands in for a network address. A table backs it up, refusing writes from the wrong key. An IP hash sticks to rate-limiting only, running inside the Function today. The edge rule that would stop abuse before it costs a database write is still on my to-do list.

The lesson reaches past like buttons, though. Posts here go through a pipeline that reviews an outline before any prose exists, then puts each draft in front of about fifteen review agents. Every one of them reads the whole draft while grading exactly one axis, and a deterministic tone gate scores the prose besides. One of those axes is fact-checking, and re-reading Saha's piece for that same check is what surfaced the shared-IP flaw a few sections back. That feedback loop is worth more than the like button it fixed. When writing the post shows the product is wrong, the house rule is to fix the product first and let the post say what we learned after.

The heart on this post is the rebuilt button, device id and all, so tap it. Then go read [what happened right after I first shipped it](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/): the like endpoint 404'd only on our custom domain. Getting the privacy math right didn't mean the button actually worked yet.

## Sources

- [Abhishek Saha: no-authentication like button](https://abhisaha.com/blog/no-authentication-like-button/)
- [Teleport: hashing for anonymization](https://goteleport.com/blog/hashing-for-anonymization/)
- [Pandectes: why hashed data isn't anonymous](https://pandectes.io/blog/compliance-essentials-why-hashed-data-isnt-anonymous/)
- [GDPR Article 4(5): definition of pseudonymisation](https://gdpr-info.eu/art-4-gdpr/)
- [Supabase docs: Row-Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Cloudflare docs: Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare docs: rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)
- [RFC 791: Internet Protocol (defines the 32-bit IPv4 address format)](https://tools.ietf.org/html/rfc791)
- [MDN: Web Audio API OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)
