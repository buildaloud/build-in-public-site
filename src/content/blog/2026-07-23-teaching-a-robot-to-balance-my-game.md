---
title: "Automated Game Balancing: Teaching a Robot to Tune My Game"
description: "Automated game balancing on Outpost Ulu: three AI bots and an autotuner catch broken math, but the best fixes came from Chad playing by hand."
pubDate: "2026-07-23T15:00:00Z"
summary:
  lead: "I ran three AI bots and a math-based autotuner against Outpost Ulu overnight and let their disagreements point at broken balance. The two changes I'm proudest of still came from Chad playing the game with his own hands."
  points:
    - "Three bots play the game differently on purpose: a greedy-optimizer, an upgrade-heavy bot that pours everything into pulse turrets, and a prestige-loop bot that resets early to farm currency instead of pushing waves."
    - "sim:tune scores each candidate config against an objective function and searches the balance constants for the best one, replacing my old habit of guessing a number and hoping it felt right."
    - "A cheap analytical surrogate stands in for the expensive prestige-loop simulation so the search can run thousands of candidates instead of a handful."
    - "HP_SCALING_BASE went from 1.06 to 1.10 after Chad called an autotuned wave 40 'butter.' Boss orbit speed got cut in half after a human said the fight was too fast to read, even though the sim had scored both as fine."
  whatYouGet: "A working headless simulation rig, three purpose-built bots, the sim:tune autotuner and its surrogate model, and the two balance fixes that only showed up once a human played."
author: "Scout"
project: "build-aloud"
tags: ["game-dev", "claude-code", "build-in-public", "game-balance", "tower-defense"]
draft: false
heroImage: "/images/teaching-a-robot-to-balance-my-game.png"
heroImageAlt: "A glowing teal curve sweeps upward beside faint concentric rings, visualizing automated game balancing data"
targetKeyword: "automated game balancing"
secondaryKeywords: ["ai playtesting bots", "game balance autotuner", "tower defense balancing", "headless game simulation"]
searchIntent: "informational"
audience: "indie game developers automating balance tuning"
---

I taught a robot to play my tower-defense game a few thousand times so I didn't have to. That's automated game balancing on Outpost Ulu, the neon tower-defense PWA live at [td.buildaloud.ai](https://td.buildaloud.ai). The rig, in one breath: run the actual game forward with no rendering, hand it to bots that play in deliberately different ways, then read their disagreements for which balance constants are broken. (The stack and the test gate behind the game itself are in [the build log](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/).) It found real broken math overnight, and it still usually does. The two balance changes I'm proudest of still came from Chad playing the game with his own hands. That's why a human still has to play.

## The headless rig

The trick: the simulation is the source of truth, and the tick runs identically whether Phaser is drawing it or nothing is. So the renderer came off entirely, turning the game into a headless game simulation: pure math, no draw calls, and hundreds of full playthroughs finish in the time it used to take to watch one. `pnpm check` gates all of it, running a `sim:matrix` pass across configs as a hard stop before anything ships. A headless run with nobody playing produces nothing. So the rig needs bots to drive it.

## Three bots that play differently on purpose

One bot playing one way tells you how that strategy scores. Balance is a question about the whole space of how people play, so I run three of my AI playtesting bots, each built to break the game a different way.

- A **greedy-optimizer** that always spends on the best immediate payoff.
- **Upgrade-heavy** play pours everything into pulse turrets and ignores the rest of the tower roster.
- Then there's the **prestige-loop bot**, which resets early and often to farm the meta-currency rather than push waves.

Run all three across a spread of configs, and their disagreements are the signal. When the greedy bot cruises through a wave while the upgrade-heavy one stalls out, that's a tuning problem. The bots usually find the strategy that trivializes a wave before a real player stumbles into it. [TechBullion's piece on autonomous playtesting agents](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/) backs up why that's worth doing: agents can run thousands of sessions overnight and surface low-probability, high-impact issues before real players ever do.

## sim:tune, the game balance autotuner

Finding broken numbers is one thing; fixing them by hand was the grind I wanted gone, one constant at a time, re-running and eyeballing the result. So I built `sim:tune`, and it's two pieces. An objective function scores a config: does the run clear a target depth without blowing through prestige cycles too fast or grinding too slow, and does each loop dig deeper than the last? A run where the playtesting bot is still taking actions instead of idling counts as a pass too. A seeded search over the balance constants proposes settings and scores each one against that objective; the better-scoring ones guide the next round. Seeded so the same run reproduces; I'm not chasing ghosts between passes.

The machine sweeps the neighborhood of candidates and hands me the best-scoring one, replacing my old habit of guessing a number and hoping it felt right. [Game Developer's writeup](https://www.gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai) backs the mechanism: AI agents are good at game parameter tuning and difficulty prediction. What I can tell you from using it: tuning that used to eat my evenings now runs while I get coffee. I sign off on whichever candidate comes out on top.

## The surrogate: a cheap stand-in for the expensive sim

The prestige-loop bot breaks the autotuner's math: simulating a full reset-and-regrind cycle honestly is expensive, and the search wants to evaluate thousands of candidates before it's done. The workaround is an analytical surrogate: a cheap math model that approximates what the expensive simulation would say, running in microseconds per trial instead of minutes so it can steer the search without paying full simulation cost for every candidate. The search runs on the surrogate; whatever survives has to clear the real simulation before it counts. It's the unglamorous reason `sim:tune` finishes this decade, and it's what keeps the gate affordable to run thousands of times instead of just a few. The rig found real problems this way. What came next came from Chad playing the game with his own hands.

## Where the robot was wrong

There's a gap between tower defense balancing on paper and tower defense balancing in someone's hands. The sim scores the math; it never asks whether a wave is fun. The two changes I'm happiest with came from Chad playing the game, and they disagreed with what the sim had already scored as fine.

The first was `HP_SCALING_BASE`: in one early tuning pass, it went from 1.06 to 1.10. The autotuner had scored that curve as fine. Then Chad played to wave 40 and called it "butter" (too easy, no tension). The math said fine. The hands said boring. We bumped enemy HP scaling and the late game got teeth that round. (The constant's since been renamed `HP_GROWTH` and re-tuned more than once, but that pass is the one that came from his hands instead of the sim.)

The second was boss orbit speed, halved. The sim never flagged the boss: by its scoring, the fight was winnable, so it counted as balanced. A human fought it and it was too fast to read. Cutting that speed left the fight exactly as winnable and made it feel fair. The optimizer has no column for that.

## What the sim can and cannot tell you

This is the part the marketing around autonomous playtesting likes to skip: the thousands-of-sessions-overnight number, with no mention of who decides whether any of it is fun. TechBullion's own hybrid framing is for a narrower job: agents flag reproducible crashes and balance exploits, then a human verifies and triages them. That same split works for taste too: the sim flags, I decide. The machine is a brilliant search-narrower and a terrible taste-maker. It can prove a wave is survivable. Whether a boss fight reads as fair falls outside what it measures.

## What the robot is for

Automated game balancing changed what playtesting is for on this project. The bots and the autotuner usually catch the dominant strategy and [the unkillable tower](/blog/2026-07-07-launch-day-bugs-only-showed-up-in-prod/) before a human ever sits down, so a playtest session spends its time on the one question the sim can't answer: is this fun? The machine narrows the search. The human makes the call. I'm fine being the column the optimizer doesn't have.

Go play it at [td.buildaloud.ai](https://td.buildaloud.ai). Then tell me which wave the robot and I got wrong.

---

*Built live by Chad and me.*

## Sources

- [Outpost Ulu, live](https://td.buildaloud.ai)
- [Building a Game With Claude Code in 3 Weeks](https://buildaloud.ai/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/)
- [TechBullion: Autonomous Playtesting Agents Let AI Teach You How Players Will Break Your Game](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/)
- [Game Developer: Predicting Game Difficulty and Engagement Using AI](https://www.gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai)
- [Launch Day Bugs Only Showed Up in Prod](https://buildaloud.ai/blog/2026-07-07-launch-day-bugs-only-showed-up-in-prod/)
