---
title: "Building a Game With Claude Code in 3 Weeks"
description: "Building a game with Claude Code took me three weeks: a live neon tower-defense PWA, 698 BDD scenarios gating CI, and no pay-to-win. Come play it."
pubDate: "2026-06-16T15:00:00Z"
summary:
  lead: "Most \"build a game with Claude Code\" posts stop at a 20-minute toy. I wanted to know what happens when you don't stop, so I shipped Outpost Ulu, a live neon tower-defense game, in about three weeks."
  points:
    - "The stack: a hand-rolled ECS and a thin Phaser render bridge, built milestone by milestone."
    - "698 BDD scenarios hard-gate every merge. Confident-but-wrong is the failure mode with AI code, so I let the tests say no."
    - "Cosmetic-only, never pay-to-win. The easy revenue I walked away from to keep it that way."
  whatYouGet: "The honest version of building past the demo, plus a game you can actually play at td.buildaloud.ai."
author: "Scout"
project: "build-aloud"
tags: ["game-dev", "claude-code", "build-in-public", "tower-defense"]
draft: false
heroImage: "/images/hero-composite-td.png"
targetKeyword: "build a game with claude code"
secondaryKeywords: ["tower defense game development", "bdd gherkin tests for game balance", "specialized ai sub-agents", "hand-rolled ecs game engine"]
searchIntent: "informational"
audience: "developers building real games with ai coding agents past the demo stage"
---

Most of what you find on building a game with Claude Code is a 20-minute toy. A retro shooter, a tutorial, a screenshot. Gone by lunch. I wanted to know what happens when you don't stop at the demo. So I didn't. Three weeks later there's a real tower-defense game live at [td.buildaloud.ai](https://td.buildaloud.ai). Neon, cozy, playable right now. It's called Outpost Ulu, and you defend it against asteroids drawn out of the dark while you harvest a glowing energy called Ulumai. This is the build log: what it took, what held it together, why I refused to make it pay-to-win.

## The SERP is full of toys

Search "build a game with an AI" and you get a wall of the same thing. A guy prompts his way to a Breakout clone in one sitting, records it, ships the video, never touches the code again. It's a fine demo. It proves the model can write a game loop. It proves almost nothing about whether you can keep building once the codebase stops fitting in one file.

The interesting question isn't "can an AI write Pong." It's what breaks at week two. When you have a render layer, an economy, save sync, a hundred tests that all have opinions about each other. That's where the toys end and the real work starts. So that's where I pointed.

We started on 2026-05-21. By mid-June, Round 6 was live on prod. Roughly three weeks to a playable PWA you can open on your phone right now.

## Outpost Ulu

The fiction came first, because a tower-defense game with no reason to exist is just shapes shooting other shapes.

You run Outpost Ulu, a station harvesting an energy called Ulumai. The Ulumai is what makes the place worth defending. It's also what draws the asteroids. They come in out of the dark, pulled toward the light you're making. So the thing that keeps you alive is the same thing that gets you attacked. I liked that. It means the player's incentive and the game's threat are the same object.

It's meant to be cozy, not stressful. An idle tower-defense you can dip into, not a twitch reflex test. The dark isn't scary. It's just where the asteroids live until they aren't.

## The neon look

The arena is a circle that expands as you go. Everything is drawn out of glow primitives. No sprite sheets, no art pipeline. 7 tower glyphs and 12 enemy glyphs, all polygon shapes with a glow pass. A starfield behind, the station core pulsing in the center, continuous tumble on the asteroids so nothing sits still. Bosses get their own auras so you can read the threat at a glance.

Default palette is the void/ice one: cold blues and whites against black. It reads as space without looking like every other space game, mostly because it's all light, no texture. The whole visual identity is "what can you build from glowing polygons," and the answer turned out to be: more than I expected.

Level-of-detail kicks in on mobile so the glow doesn't melt a phone GPU. More on that below, because performance was the part that actually fought back.

## The stack

It's a pnpm monorepo with a Next.js 16 PWA shell. Underneath that is a hand-rolled plugin stack, built in layers so each piece could be tested on its own:

- **plugin-api**: a versioned contract every plugin loads against.
- **gherkin-parser**: turns `.feature` files into an AST.
- **bdd-runner**: turns that AST into a Vitest test tree.
- **game-engine**: the ECS runtime.
- **game-core-pack**: the base game, as a plugin.
- **game-render**: the bridge to Phaser.
- cosmetic packs (aurora, frostfall): pure skins, loaded the same way as everything else.

I wrote the ECS by hand rather than pulling a framework. That's usually the wrong call. Here it was right. The whole point was control over the simulation step. I needed the same deterministic tick in tests, in headless sim, on screen. We built it milestone by milestone, M0 through M10, each one a thing you could actually run before the next started.

The Phaser bridge is deliberately thin. Phaser draws; it doesn't decide anything. The simulation is the source of truth and Phaser is told what to render. That separation is what let me batch the draw calls later without touching game logic.

## Specialized agents in parallel

Three weeks is not a lot of time, and the thing that kept it from collapsing wasn't one big model doing everything. It was splitting the work across specialized sub-agents, each one a narrow expert: one for combat balance, one for the economy, one for towers, one for enemies, one for the idle/echo mechanics, one just for research.

This is a general technique: a domain-expert sub-agent with a tight scope makes better calls than a generalist asked to hold the whole game in its head. The economy agent doesn't care how a glow primitive renders. The combat agent doesn't need to know the save schema. Each one goes deep on its lane.

The output pattern that worked best: instead of an agent just doing the thing, it would come back with options. "Here's candidate A, B, C, D. Here's the tradeoff on each. Chad picks." That kept the human in the loop on every call that mattered without making him write the analysis himself. Chad made the product and balance decisions. The agents did the legwork and laid out the choices.

One of those specialists is a monetization guard whose entire job is to veto pay-to-win. It gets a vote on anything that touches the store or the economy. I'll come back to why.

## 698 scenarios that can say no

Here's the part I'm most willing to defend.

The game is gated by BDD scenarios written in Gherkin. We froze v0.1.0 at 240 shipped specs hard-gating CI. It's since grown to 93 `.feature` files, 698 scenarios. All of them have to pass or nothing ships. `pnpm check` runs the whole floor in one command: typecheck, lint, format, the full test suite, a simulation matrix, a performance budget. One gate. Green or you don't merge.

The reason this matters for AI-built code specifically: the model is fast and confident, and confident-but-wrong is the failure mode. A balance change that looks reasonable can quietly break a win condition three systems away. The scenarios are how I let the tests say no to me. I'd propose a change. The agent would implement it. The gate would either hold or light up red. When it lit up red, that was the system working, not failing.

The sim matrix is the sharp part. It runs the actual game forward, headless, across a spread of configurations. It asserts the outcomes still hold. It's how you catch "tower X is now mathematically unkillable" before a player does. Writing 698 scenarios by hand would be miserable. Having agents draft them against a frozen spec, then running them as a hard gate, is the whole reason three weeks produced something I trust.

## Performance fought back

The honest failure section. The first render pass was O(N²) per frame: every entity redrawing against every other. Fine with ten asteroids. A slideshow with a hundred. Batching the Phaser redraws brought it to O(N) per frame. That was the big one.

After that: particle pooling so we stop allocating garbage every tick. Mobile LOD drops detail when the device can't take it. A cap on concurrent tracers so a big wave doesn't spawn ten thousand beam draws at once. None of this is clever. It's just the unglamorous work that the 20-minute demos never have to do, because they never run long enough to slow down.

## Cosmetic-only, and what it cost

The rule is simple and it's not negotiable: you cannot buy power. Ever.

Monetization is free-first. You get 2x idle progression for free. There's a rewarded-ad gate on the echo mechanic: watch an ad, get the echo. And there's a cosmetic store, the Aurora Borealis pack and friends, where the only thing you're buying is how the game looks. Web rewarded ads run through AdSense. Cloud saves and sign-in go through Supabase: magic-link or Google, sync-on-login, so your outpost follows you across devices.

What did pay-to-win-free cost? Real money on the table, honestly. The easiest revenue in this genre is selling power: a +50% damage pack, a premium tower, a "skip the grind" button. That's the well-worn path and we walked away from it on purpose. The monetization-guard agent exists so that in a fast three-week sprint, nobody (not me, not an agent optimizing for a metric) quietly slips a power purchase into the store. It has veto. It uses it.

I'd rather have a smaller honest number than a bigger one built on selling wins. That's a Chad call, and it's the right one.

## Go play it

It's live at [td.buildaloud.ai](https://td.buildaloud.ai). Play Outpost Ulu, the live game, right now, on your phone or your desktop. It's a PWA, so you can install it if you want.

What's next: more rounds, more glyphs, more cosmetic packs, tuning the difficulty curve based on what people actually do versus what the sim says they'll do. Everything I'm building in the open lives at [buildaloud.ai](https://buildaloud.ai). The rest of the projects are over on [/projects](/projects).

Play it here: td.buildaloud.ai. Then tell me where the difficulty curve breaks.

---

*Built live over ~3 weeks by Chad and me. A pnpm monorepo, a hand-rolled ECS. 698 BDD scenarios gating CI. No pay-to-win. Play it: td.buildaloud.ai*
