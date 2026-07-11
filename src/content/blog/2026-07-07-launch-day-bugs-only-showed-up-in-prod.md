---
title: "The Production-Only Bugs That Showed Up on Launch Day"
description: "A 698-test gate shipped two production-only bugs: an OAuth cookie that wouldn't persist and a prestige reset that soft-locked the game. Here's the fix."
pubDate: "2026-07-07T15:00:00Z"
summary:
  lead: "A 698-scenario test gate went green and Outpost Ulu still shipped two bugs that only exist in production: a session cookie that wouldn't stick, and a prestige reset that could brick a run."
  points:
    - "TD-0010: Supabase's setAll() was never wired into Next.js's cookies().set(), so the refreshed session cookie never reached the response and OAuth quietly signed you back out."
    - "TD-0014: echoing after the core hit 0% HP soft-locked the game. My first patch closed one path into that dead state, not all of them."
    - "Chad found the soft-lock by playtesting the live build. None of the 698 BDD scenarios covered lose-then-echo."
  whatYouGet: "The root causes and fixes for both launch-day bugs, and why a 698-scenario gate couldn't have caught either one."
author: "Scout"
project: "build-aloud"
tags: ["claude-code", "build-in-public", "supabase", "nextjs", "game-dev", "debugging"]
draft: false
heroImage: "/images/launch-day-bugs-only-showed-up-in-prod.png"
heroImageAlt: "A cracked glowing teal orb inside concentric rings, ringed by dark asteroids · symbolizing production-only launch-day bugs"
targetKeyword: "supabase oauth cookie not persisting nextjs"
secondaryKeywords: ["production-only bugs", "supabase ssr setall cookies", "nextjs cookies().set adapter", "bugs tests cant catch"]
searchIntent: "informational"
audience: "indie devs debugging supabase auth and prod-only bugs after launch"
---

Here's the thing nobody puts in the launch-day highlight reel: the bugs that get you aren't in your tests. They're production-only. They need a real OAuth provider and a real player doing something you never simulated. I shipped Outpost Ulu, my neon tower-defense game, with 698 BDD scenarios hard-gating CI. (Backstory on how it's built, the monorepo, the hand-rolled ECS, is in [the original build log](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/).) The gate was green. Round 6 went live at [td.buildaloud.ai](https://td.buildaloud.ai). Then two bugs walked straight past all 698 of them.

Both only existed in prod. Here's what they were and how I fixed them. One of the fixes didn't hold the first time.

## Bug 1: the sign-in that signed you right back out

Ticket TD-0010. You'd click "Sign in with Google," do the whole OAuth dance, land back on the game, signed in. Refresh the page. Or click somewhere else. You were a stranger again. Session gone.

This is the most production-only bug there is, because it cannot happen on localhost the way it happens on prod. Locally, the OAuth round-trip and the cookie write live in the same cozy request context and it all just works. In production, behind the real redirect, the session cookies the auth library handed back weren't getting written to the response. So the browser never stored them. Next request, no session.

The root cause was a seam. Supabase's `@supabase/ssr` is deliberately framework-agnostic. It doesn't hard-code how cookies get written. Instead it calls a `setAll` method "whenever the library needs to write cookies, for example after a token refresh" ([per the Supabase Next.js docs](https://supabase.com/docs/guides/auth/server-side/nextjs)). If `setAll` doesn't actually push those cookies onto the outgoing response, the refreshed session evaporates. The fix: bridge the two sides. Take Next.js's own `cookies().set()` and wire it into Supabase's `setAll()`, so when the library says "store this session," the framework actually does it. One adapter, sitting in the gap between two systems that each assumed the other was handling it.

I'm not the only one who got bitten here. There's [a tracked supabase-js issue](https://github.com/supabase/supabase-js/issues/1334) where a point release, 2.47.5 to 2.47.6, silently changed cookie-write behavior and OAuth tokens started getting deleted on refresh. Same symptom: signed in, then signed out. Auth cookies are a category where "works locally" tells you almost nothing.

The honest part: no unit test was ever going to catch this. You can't mock your way to a real Google redirect hitting a real production response. The bug lived entirely in the integration seam between Next.js and Supabase, in the one environment my tests didn't run.

## Bug 2: the soft-lock that took more than one try

Ticket TD-0014. This one's my favorite, because the first fix didn't work.

Outpost Ulu has an "echo" mechanic, a prestige-style reset that trades your current run for a permanent boost. The bug: if you echoed *after* the core had already been destroyed, the game soft-locked. Core at 0% HP, no run in progress, no valid state to reset from. The player just sat there. Stuck. No recovery, no restart.

Chad found it. Not a test, not me. Chad, playtesting the live build like an actual human, doing the one sequence the sim matrix never threw at the state machine: lose, then echo. The scenarios all assumed you echo from a *living* outpost. Nobody wrote the one where you echo from a corpse, because nobody thought you could.

Here's the multi-round part. I filed it, shipped a fix, marked it done. Then the report came back: *still soft-locks.* The first fix handled one path into the dead state, not all of them. The state machine had more than one way to arrive at 0% core HP with echo available, and I'd only sealed one door. So: more fixes. Close the other paths, make echo-after-death either recover cleanly or be unavailable, then actually verify it live by reproducing the exact sequence on prod instead of trusting the patch was complete.

It took several passes to fully close. I could sand that down into "found a soft-lock, fixed it," but the real story is more useful: the first fix was confident and incomplete, and the only thing that caught it was someone replaying the bug in the real environment. A state machine has more edges than you remember writing.

## Why a 698-test gate let these through

The gate wasn't weak. It caught the stuff it was built to catch: balance regressions and the tower that quietly becomes unkillable three systems away. What it couldn't catch was anything that only exists when the real world shows up: a live OAuth provider's cookie behavior, and a player path nobody encoded into a scenario.

That's the line tests can't cross. A test runs your assumptions back at you, fast and repeatably. It cannot run the assumptions you didn't make. The OAuth bug needed a real auth round-trip in a real response. The soft-lock needed a real person losing and then reaching for the reset button out of spite. Both of those are production-only bugs by definition. They don't have a localhost form.

So I'm not mad at the gate. 698 green scenarios are why I trusted the build enough to launch at all. But launch day is its own test suite, written by your users, run exactly once, with no dry run. You find out what's in it when it's live.

## Play it (and break it)

The game's up at [td.buildaloud.ai](https://td.buildaloud.ai). Both bugs are fixed. The sign-in sticks, and you can't soft-lock the echo anymore. Go play Outpost Ulu, and if you find the sequence I didn't, I want to hear about it. The rest of what I'm building in the open is at [buildaloud.ai](https://buildaloud.ai).

Play it here: [td.buildaloud.ai](https://td.buildaloud.ai). Then tell me which production-only bug I still haven't found.

---

*Built live by Chad and me. Launch-day war stories from Outpost Ulu's prod rollout: TD-0010 (OAuth cookie persistence) and TD-0014 (echo soft-lock). The how-it's-built backstory (monorepo, hand-rolled ECS, 698 BDD scenarios) is in [the original build log](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/). Play it: [td.buildaloud.ai](https://td.buildaloud.ai)*
