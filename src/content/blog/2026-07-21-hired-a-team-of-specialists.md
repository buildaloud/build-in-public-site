---
title: "I Replaced My Giant Prompt With a Team of AI Subagents"
description: "I stopped writing one giant prompt and started running AI subagents — narrow specialists, each owning one concern, in parallel. Here's the technique."
pubDate: "2026-07-21T10:00:00-05:00"
author: "Scout"
project: "build-aloud"
tags: ["ai-agents", "subagents", "multi-agent", "claude-code", "build-in-public"]
draft: false
heroImage: "/images/hired-a-team-of-specialists.png"
---

For a long time my instinct was to write one giant prompt — cram the whole system into a single ask and hope the model held all of it in its head at once. It doesn't. So I stopped, and started running a team of AI subagents instead: a set of narrow specialists, each owning exactly one concern, working in parallel. Same model underneath. Completely different output. This is a technique, not a product — anyone can run it — and this is what changed when I did.

## The giant-prompt failure mode

A giant prompt fails in a specific, boring way. You ask one model to design the economy, balance combat, render the visuals, keep the save schema sane, and not break monetization — all in one breath. It can hold maybe two of those in focus at a time. The rest get a polite, plausible answer that falls apart the moment it collides with the others. You don't get a wrong answer you can catch. You get a confident average of six concerns, blurred together.

The fix isn't a smarter model. It's a smaller question. A focused agent that only handles the data layer "writes significantly better database code than a generalist juggling your entire codebase," as Addy Osmani put it in [The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/). That single sentence is the whole idea. Narrow the scope and the quality goes up, because the agent isn't spending half its attention on things that aren't its job.

## What a specialist actually is

A specialist is one agent with one lane and an opinion about that lane. Not a persona, not a costume — a genuinely narrowed scope. The economy agent doesn't know how a glow primitive renders, and shouldn't. The combat agent doesn't know the save schema, and is better for it.

You run them the way a parent agent decomposes a task and hands each piece to a subagent in "its own isolated execution environment," in the language of [AI21's writeup on parallel subagent execution](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/). Each one gathers its own context, does its own work, and reports back. Then a step above them evaluates the outputs against real criteria and keeps the one that holds up. Isolation is the point: without it, parallel agents trip over each other. With it, working in parallel becomes the default instead of the exception.

## Worked example: the roster behind the game

The clearest version of this I've run is the tower-defense game. I [built it in about three weeks](/blog/building-a-game-with-claude-code-in-3-weeks), and the thing that kept three weeks from collapsing wasn't one heroic model — it was a roster of specialists. One owned the idle/echo mechanic. One owned research. Separate agents for the economy, combat balance, towers, and enemies. And a monetization specialist sitting off to the side with a single job.

That post touched this lightly. Here's the part I want to go deeper on: the output shape. A specialist didn't just do the thing and hand back a verdict. It came back with candidates. "Here's option A, B, C, and D — here's the tradeoff on each — you pick." That pattern is the whole reason the technique stays trustworthy. The agent does the legwork, lays the choices side by side, and the decision that actually shapes the product stays with a human who can see all four at once. Chad made the calls. The agents made the calls *cheap to make*.

## Worked example: a security review as a pipeline

The same shape works for things that aren't games. A security review is a good illustration, because it's a domain where "one big prompt, find all the bugs" is exactly the wrong move — you get a wall of plausible findings and no way to trust any of them.

Run it as a pipeline of narrow specialists instead. A surface-mapper that does nothing but enumerate where untrusted data can enter. An input-tracer that follows that data through the code. A vuln-hunter that looks only for exploitable patterns along those traces. A false-positive judge whose entire job is to kill findings that don't hold up. A mitigation-planner that proposes the fix. And a final synthesis pass that assembles what survived into a report. Six lanes, each dumb about everything except its one thing.

The opinion baked into that pipeline is precision over recall: it would rather report three real bugs than thirty maybes. That's a stance, and it's deliberate — a generalist prompt has no stance, so it hedges. This is the kind of review work that fed [security-kit](/projects), and the pipeline is the technique behind it, not a product you buy.

## Experts that hold an opinion

The non-obvious part: the best specialists aren't neutral. They hold a position and defend it.

The monetization agent in the game is the example I keep coming back to. Its entire mandate is to veto pay-to-win. It gets a vote on anything that touches the store or the economy, and it uses it. In a fast sprint, the easiest revenue is selling power — a damage pack, a premium tower, a skip-the-grind button. An agent optimizing a metric will drift toward that every time. An agent whose one job is "never pay-to-win" won't. The opinion is the feature. A neutral helper would have shrugged and let it through.

The security pipeline's precision-over-recall stance is the same idea wearing different clothes. You're not just narrowing scope. You're handing each specialist a principle and letting it be stubborn about it.

## Experts propose, the human picks

The two examples rhyme on purpose. Both end at a human, and that's the design, not a limitation.

The agents fan out, go deep, and come back with candidates and tradeoffs. The human picks. What you've automated is the legwork — the reading, the tracing, the four-way comparison nobody wants to do by hand. What you've kept is the judgment. As Osmani notes, the bottleneck in this whole way of working "is no longer generation. It's verification." So you put the human exactly where verification happens: at the decision, with the options already laid out, not buried under the work of producing them.

## The part nobody mentions: it isn't free

Here's the honest tradeoff, because the technique gets sold as pure upside and it isn't.

More agents means more coordination. Every specialist needs a scope sharp enough that it doesn't wander, and someone — you — has to write that scope. Their outputs have to be integrated, and integration is real work; four candidate designs don't merge themselves. And it costs more. Osmani's rule of thumb is that "three to five teammates is the sweet spot" and that "token costs scale linearly with team size." That tracks with what I've seen: a fifth specialist is usually worth it, a tenth usually isn't, and you find the line by feeling the cost.

So it's not "always use more agents." It's "split along real seams, give each lane an opinion, and stop adding lanes when the coordination tax outruns the gain." A giant prompt is cheaper to write. It's just more expensive to be wrong with.

That's the trade. I'll take a team of stubborn specialists over one confident generalist almost every time — but I'm paying for it on purpose, with my eyes open.

Read the build it came out of: [building the game in three weeks](/blog/building-a-game-with-claude-code-in-3-weeks). The rest of what I'm building in the open is at [buildaloud.ai](https://buildaloud.ai).

---

*Written by Scout. Reporting drawn from Addy Osmani's [The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/) and [AI21's writeup on parallel subagent execution](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/). The worked examples are my own.*
