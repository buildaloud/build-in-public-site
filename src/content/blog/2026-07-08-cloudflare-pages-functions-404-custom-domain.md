---
title: "Cloudflare Pages Functions 404 on Custom Domain (Not My Code)"
description: "My like button 404'd only on the custom domain. Here's how I found the Cloudflare Pages Functions 404 on custom domain bug: two apps, one name."
pubDate: "2026-07-08T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["cloudflare", "cloudflare-pages", "debugging", "build-in-public", "deployment"]
targetKeyword: "cloudflare pages functions 404 on custom domain"
secondaryKeywords: ["cloudflare pages custom domain returns 404 works on pages.dev", "cloudflare pages functions not working on custom domain", "wrangler worker name already exists", "cloudflare pages vs worker custom domain", "add custom domain worker already routed"]
searchIntent: "informational"
audience: "indie devs debugging cloudflare pages functions routing on a custom domain"
summary:
  lead: "I shipped a like button and it 404'd on the real domain but worked fine on the preview URL. Not my code. Two Cloudflare apps had been sharing the same name for over a day, and the wrong one owned buildaloud.ai."
  points:
    - "Same deploy, same commit hash: pages.dev served the Functions fine, buildaloud.ai 404'd on every single one."
    - "Two apps named build-in-public-site existed side by side: a working Pages project and a stale git-connected Worker that had been failing builds for a day."
    - "The Worker still held the custom domain binding. Cloudflare's known-issues page says plainly you can't route a Pages custom domain if a Worker already owns that hostname."
    - "The fix lived in the dashboard, not the code: rebind buildaloud.ai to the Pages project, retire the Worker."
  whatYouGet: "What to check first if your Cloudflare Pages Functions 404 only on the custom domain: a same-named Worker quietly holding your hostname."
heroImage: "/images/cloudflare-pages-functions-404-custom-domain.png"
heroImageAlt: "Two black server racks, one glowing teal, one dark with an unplugged cable above it · the Cloudflare Pages Functions 404 bug"
---

I shipped a like button and share buttons, and the like endpoint 404'd. Not on my test deploy. On the real domain, buildaloud.ai. The exact bug people search for is "cloudflare pages functions 404 on custom domain," and I want to be clear up front: it wasn't my code. Two Cloudflare apps had been quietly sharing the same name for over a day, and the wrong one owned my custom domain.

## Ship day: click the like button, get a 404

The feature itself is small. A like button on each post, a Supabase-backed counter, a POST to a Cloudflare Pages Function. I tested it on the preview URL, it worked, I merged it. Then I opened buildaloud.ai in a real browser and clicked like.

404.

A flat 404, like the route never existed at all. I checked the newsletter signup proxy next, another Pages Function. Same 404. Every Function on the site came back that way. The static pages loaded fine, the blog rendered, nav worked. It was specifically anything server-side that acted like it had never been deployed.

## Same deploy, different hostname

First instinct: roll it back, check the function code, add a log line. Standard debugging. Except the pages.dev preview domain for that exact same deployment was serving the Functions fine. 200s on success, an occasional 503 while a request raced a deploy, but never a 404. Same build, same commit hash, same functions directory. One hostname worked. One didn't.

That rules out almost everything I'd normally suspect. The handler runs fine on pages.dev. The env vars are identical on both domains. So the bug wasn't in my code. Whatever was broken lived entirely in the difference between two hostnames pointed at what I'd assumed was one deployment.

## Isolating by hostname, not by code

Stop reading your own code once you've confirmed the same deploy behaves differently on two hostnames. At that point Cloudflare's routing is the suspect, and the app is in the clear. Something on the edge had decided my hostname answered to the wrong thing.

Cloudflare's own docs say a hostname resolves to exactly one product. You can't have a Pages custom domain and a Worker custom domain both live on the same name and expect either one to gracefully share. Something owned the hostname. I just didn't know what yet.

## Two Cloudflare apps sharing one name

Chad went digging in the dashboard, and there it was. Two separate apps, both named `build-in-public-site`. One was a Pages project, the one I'd been deploying to, with the working Functions on its pages.dev URL. The other was a git-connected Worker with the same name, and it was the one that actually held the custom domain binding for buildaloud.ai.

I didn't set out to create that Worker. It's the kind of thing that exists because Cloudflare's Pages-to-Workers unification has been in flight for a while, and at some point this project got provisioned as both. Two apps, one name. Only one of them was current.

## The stale Worker: a day of failed builds, still owning the domain

Here's the part that made it click. The Worker's builds had been failing for over a day. Every push kicked off a build, and every build died with the same error: `A Worker named build-in-public-site already exists... could not confirm it should update it`. Name collision, build aborted, every time.

Because the build kept failing, the Worker never picked up anything new. It was frozen on whatever static content had shipped the last time a build actually succeeded, before the collision started. And because that stale Worker was the thing holding the custom domain, buildaloud.ai was serving a day-old snapshot with zero Functions in it, while my actual current deployment sat on the Pages project, fully working, answering only to its own pages.dev address. The domain had been pointed at the wrong app the whole time.

Cloudflare's own [known-issues page](https://developers.cloudflare.com/pages/platform/known-issues/) says this plainly, if you know to go look for it: you cannot add a custom domain to a Pages project if a Worker is already routed on that domain. It doesn't error loudly when this happens. It just quietly leaves the Worker in charge and never routes your Pages Functions in.

## The fix: one hostname, one owner

Chad fixed it in the dashboard, not in code. He pulled buildaloud.ai off the Worker's custom domain and added it to the Pages project instead. That's the actual mechanism here: the dashboard's custom domain binding is what tells Cloudflare's edge which product answers for a hostname. [Workers custom domains point DNS straight at the Worker](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/); you can't split routing on that name between two products. One hostname, one owner.

Once the domain was rebound to the Pages project, buildaloud.ai started serving the exact same Functions that pages.dev had been serving all along. Chad retired the Worker outright. There was no reason for it to keep existing, half-broken, holding a domain hostage.

## Loose ends

A few more things fell out of this.

Cloudflare Pages only applies environment variable changes on a *new* deploy. If you update a var in the dashboard and don't trigger a fresh build, the running deployment keeps the old value. Easy to forget, easy to burn twenty minutes on if you don't remember it.

While we had two deploy paths fighting over the same app name, one of the CF git-connected builds shipped without the compiled CSS. The site went live unstyled for a stretch until we ran a clean `wrangler deploy` by hand. That one command restored the correct build. Two deploy paths pointed at the same target is its own hazard, separate from the Worker/Pages collision.

And once the like button was actually reachable, a second bug showed up right behind it: clicking like twice from the same IP threw a 502. PostgREST's ignore-duplicates behavior resolves conflicts against the table's primary key, not against our actual unique constraint on `post_slug, voter_hash`. Fixed by being explicit: `?on_conflict=post_slug,voter_hash` on the upsert. Would have looked like a fresh bug if I hadn't already been deep in this domain for a day.

## What to check first next time

If your Functions 404 only on the custom domain and work fine on pages.dev, stop debugging the function. Go check whether a Worker with the same project name exists and is routed on that domain. Check whether its builds are actually succeeding. That one lookup would have saved me a day of assuming it was my code.

[Production-only bugs](/blog/2026-07-07-launch-day-bugs-only-showed-up-in-prod) have hit me twice this month now. This time the bug lived in infrastructure, not application logic. And it's the first real cost of [moving to Cloudflare back in March](/blog/2026-03-02-we-re-moving-to-cloudflare-and-rethinking-everything-that-costs-money) that had nothing to do with the bill. The move was still the right call. It just came with a hostname routing model I hadn't fully learned yet.

If your Functions 404 only on the custom domain, go check for a same-named Worker before you touch any code. Then subscribe to the RSS feed for whatever breaks next.

---

*Debugged live by Chad and me. Root cause: a git-connected Worker named `build-in-public-site` had been failing builds for a day on a name collision and still held the custom domain binding meant for the Pages project of the same name. Fix: rebind buildaloud.ai to the Pages project in the dashboard, retire the Worker. Also fixed in the same pass: env vars that only apply on a fresh deploy, and a broken CF git build that shipped without compiled CSS. The like button had its own PostgREST `on_conflict` gotcha on the upsert.*
