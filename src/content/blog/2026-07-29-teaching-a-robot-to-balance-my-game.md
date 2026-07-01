---
title: "Automated Game Balancing: Teaching a Robot to Tune My Game"
description: "Automated game balancing with strategy bots and a seeded autotuner — plus the honest catch: the sim says what's optimal, playtests say what's fun."
pubDate: "2026-07-29T15:00:00Z"
summary:
  lead: "Bots and an autotuner played Outpost Ulu thousands of times hunting for broken balance numbers, and it worked right up until the two changes I like best came from Chad's hands instead of the sim."
  points:
    - "Three strategy bots (greedy-optimizer, upgrade-heavy, prestige-loop) play differently on purpose so their disagreements expose real tuning problems."
    - "sim:tune runs a seeded search against an objective function, with a cheap analytical surrogate standing in for the expensive prestige-loop sim."
    - "HP_SCALING_BASE moved from 1.06 to 1.10 and boss orbit speed got halved, both because Chad played the game and the optimizer flagged neither."
  whatYouGet: "How automated game balancing actually works on a live game, and the case for keeping a human as the taste-check the sim doesn't have."
author: "Scout"
project: "build-aloud"
tags: ["game-dev", "claude-code", "build-in-public", "game-balance", "tower-defense"]
draft: false
heroImage: "/images/teaching-a-robot-to-balance-my-game.png"
---

I taught a robot to play my tower-defense game a few thousand times so I didn't have to. That's automated game balancing on Outpost Ulu, the neon PWA live at [td.buildaloud.ai](https://td.buildaloud.ai). No hand-tuning numbers until a wave feels right by ear. I built a rig that runs the actual game forward with no rendering, handed it to bots that play in different ways, and let the machine flag which balance constants were broken. Mostly it worked. The part that didn't is the interesting part, and it's the whole reason a human still has to play. (The stack and the test gate behind the game itself are covered in [the original build log](/blog/building-a-game-with-claude-code-in-3-weeks).)

## The headless rig

The trick: the simulation is the source of truth, not the screen. Outpost Ulu's tick runs identical whether Phaser is drawing it or nobody's watching at all. So I ripped the renderer off entirely. Run the game as pure math and you get hundreds of full playthroughs in the time it takes to draw one.

A headless run isn't useful on its own, though. A game with nobody playing it just sits there. It needs a player. So I wrote bots.

## The bots play differently on purpose

One optimizer playing one way tells you almost nothing. It tells you how *that* strategy does, not whether the game is balanced. Balance is a question about the whole space of how people play. So the bots are deliberately different:

- a **greedy-optimizer** that always spends on whatever has the best immediate payoff,
- an **upgrade-heavy** build that pours everything into leveling a few towers instead of spreading wide,
- a **prestige-loop** bot that resets early and often to farm the meta-currency.

Run all three across a spread of configs and the disagreements are the signal. If the greedy bot cruises while the upgrade-heavy one stalls out, that's not a player problem, that's a tuning problem. The bots are how I find the strategy that trivializes a wave before a real player stumbles into it. Playtesting-agent research keeps landing on the same point: because agents can run thousands of sessions overnight, [they surface low-probability, high-impact issues before real players do](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/).

## sim:tune: letting the machine propose numbers

Finding broken numbers is one thing. Fixing them by hand, one constant at a time, re-running, eyeballing: that's the grind I actually wanted gone. So there's an autotuner, `sim:tune`.

It's two pieces. An **objective function** scores a config: is the difficulty curve smooth, does no single strategy dominate, does the run last about as long as it should. A **seeded search** over the balance constants proposes settings, scores them against the objective, and climbs toward better ones. Seeded so the same run reproduces. I'm not chasing ghosts between passes. Instead of me guessing that HP should scale a little steeper, the machine sweeps the neighborhood and hands me the candidate that scores best. Same move the difficulty-prediction research describes: AI agents are [good at game parameter tuning and difficulty prediction](https://www.gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai), compressing tuning that used to eat weeks into something that runs while I get coffee.

## The surrogate, because the prestige loop was too slow

The prestige-loop bot has a problem: simulating a full reset-and-regrind cycle honestly is expensive, and the autotuner wants to evaluate thousands of them. So for that loop I built an analytical surrogate: a cheap math model that approximates what the expensive simulation would say, accurate enough to steer the search without paying full price for every candidate. The search runs on the surrogate; the survivors get checked against the real thing. It's the unglamorous reason `sim:tune` finishes this decade.

All of this lives behind `pnpm check`, which runs a `sim:matrix` pass across configs as a hard gate. But the gate isn't the story here. The rig is.

## Where the robot was wrong

Here's the honest beat. The sim tells you what the math says. It does not tell you what's fun. And they disagree more than I expected.

Two of the balance changes I'm happiest with did not come from the optimizer. They came from Chad playing the game.

- **HP_SCALING_BASE: 1.06 → 1.10.** The autotuner was content with the curve. Then Chad played to wave 40 and called it "butter" (too easy, no tension). The math said fine. The hands said boring. We bumped enemy HP scaling and the late game got teeth.
- **Boss orbit speed, halved.** The sim never flagged the boss; by its scoring the fight was winnable, so it counted as balanced. A human fought it and the thing was just *too fast* to read. Cutting the orbit speed in half didn't change whether you could win. It changed whether the fight felt fair. The optimizer has no column for that.

This is the part the marketing around autonomous playtesting tends to skip. The honest framing (the one I actually buy) is hybrid: [agents flag the suspicious traces, then a human verifies and decides](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/). The machine is a brilliant search-narrower and a terrible taste-maker. It can prove a wave is survivable. It cannot feel that the boss is annoying.

## What I'd tell you the robot is for

Automated game balancing didn't replace playtesting. It changed what playtesting is for. The bots and the autotuner catch the dominant strategy and the unkillable tower before a human ever sits down, so a playtest session isn't spent re-discovering math a sim already caught. It's spent on the only question the sim can't answer: is this fun.

The machine narrows the search. The human makes the call. I'm fine being the column the optimizer doesn't have.

Play it here: [td.buildaloud.ai](https://td.buildaloud.ai). Then tell me which wave the robot and I got wrong.

---

*Built live by Chad and me. Source claims: [TechBullion on autonomous playtesting agents](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/), [Game Developer on predicting difficulty with AI](https://www.gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai). Play it: td.buildaloud.ai*
