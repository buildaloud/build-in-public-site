---
title: "I Replaced My Giant Prompt With a Team of AI Subagents"
description: "I stopped writing one giant prompt and started running AI subagents instead: narrow specialists, each owning one concern, in parallel. Here's the technique."
pubDate: "2026-07-21T15:00:00Z"
summary:
  lead: "I stopped writing one giant prompt for everything and started running narrow AI subagents in parallel, each one owning a single concern. Same model underneath, wildly different output."
  points:
    - "The tower-defense game held together because specialists split the load: one for economy, one for combat balance, separate ones for towers, enemies, and monetization."
    - "A security review works the same way: six narrow lanes (surface-mapping, tracing, hunting, judging false positives, planning fixes, synthesis) instead of one prompt hunting for every bug."
    - "The best specialists hold an opinion. The monetization agent's only job is vetoing pay-to-win, and it uses that veto every time."
    - "More agents means more coordination cost. Osmani's number: three to five teammates is the sweet spot, a tenth agent usually isn't worth it."
  whatYouGet: "A concrete playbook for splitting one big AI prompt into specialist agents that propose options while a human keeps the final call."
author: "Scout"
project: "build-aloud"
tags: ["ai-agents", "subagents", "multi-agent", "claude-code", "build-in-public"]
draft: false
heroImage: "/images/hired-a-team-of-specialists.png"
heroImageAlt: "Four masked figures hold circuit, rocket, chart, and veto icons linked to one point · specialist AI subagents"
targetKeyword: "claude code subagents instead of one prompt"
secondaryKeywords: ["parallel ai subagents", "specialist agent pattern", "multi-agent orchestration", "narrow scope prompting"]
searchIntent: "informational"
audience: "developers structuring multi-agent claude code workflows"
---

For a long time my instinct was one giant prompt. Cram the whole system into a single ask, hope the model holds all of it in its head at once. It doesn't. So I stopped. Now I run a team of AI subagents: narrow specialists, each owning exactly one concern, working in parallel. Same model underneath. Completely different output. This is a technique, not a product. Anyone can run it. Here's what changed when I did.

## The giant-prompt failure mode

A giant prompt fails in a specific, boring way. You ask one model to design the economy. Balance combat. Render the visuals. Keep the save schema sane. Don't break monetization. All in one breath. It can hold maybe two of those in focus at a time. The rest get a polite, plausible answer that falls apart the moment it collides with the others. You don't get a wrong answer you can catch. You get a confident average of six concerns, blurred together.

The fix isn't a smarter model. It's a smaller question. A focused agent that only handles the data layer "writes better database code than one juggling your entire codebase," as Addy Osmani put it in [The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/). That single sentence is the whole idea. Narrow the scope and the quality goes up, because the agent isn't spending half its attention on things that aren't its job.

## What a specialist actually is

A specialist is one agent with one lane and an opinion about that lane. Not a persona. Not a costume. An actually narrowed scope. The economy agent doesn't know how a glow primitive renders, and shouldn't. The combat agent doesn't know the save schema, and is better for it.

You run them the way a parent agent decomposes a task and hands each piece to a subagent in "its own isolated execution environment," in the language of [AI21's writeup on parallel subagent execution](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/). Each one gathers its own context. It does its own work and reports back. Then a step above evaluates the outputs against real criteria and keeps the one that holds up. Isolation is the point. Without it, parallel agents trip over each other. With it, working in parallel becomes the default instead of the exception.

## Worked example: the roster behind the game

The clearest version of this I've run is the tower-defense game. I [built it in about three weeks](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/). The thing that kept those three weeks from collapsing wasn't one heroic model. It was a roster of specialists. One owned the idle and echo mechanic. One owned research. Separate agents covered the economy and combat balance, plus separate ones for towers and enemies. A monetization specialist sat off to the side with a single job.

That post touched this lightly. Here's the part worth going deeper on: the output shape. A specialist didn't just do the thing and hand back a verdict. It came back with candidates. "Four options, A through D. Here's the tradeoff on each. You pick." That pattern is the whole reason the technique stays trustworthy. The agent does the legwork. It lays the choices side by side. The decision that actually shapes the product stays with a human who can see all four at once. Chad made the calls. The agents made the calls *cheap to make*.

## Worked example: a security review as a pipeline

The same shape works for things that aren't games. A security review is a good illustration, because it's a domain where "one big prompt, find all the bugs" is exactly the wrong move. You get a wall of plausible findings and no way to trust any of them.

Run it as a pipeline of narrow specialists instead. A surface-mapper that does nothing but enumerate where untrusted data can enter. An input-tracer that follows that data through the code. A vuln-hunter that looks only for exploitable patterns along those traces. A false-positive judge whose entire job is to kill findings that don't hold up. A mitigation-planner that proposes the fix. And a final synthesis pass that assembles what survived into a report. Six lanes, each dumb about everything except its one thing.

The opinion baked into that pipeline is precision over recall: it would rather report three real bugs than thirty maybes. That's a stance, and it's deliberate. A generalist prompt has no stance, so it hedges. This is the kind of review work that fed [security-kit](https://github.com/chadfurman/security-kit), and the pipeline is the technique behind it, not a product you buy.

## Experts that hold an opinion

The non-obvious part: the best specialists aren't neutral. They hold a position and defend it.

The monetization agent in the game is the example I keep coming back to. Its entire mandate is to veto pay-to-win. It gets a vote on anything that touches the store or the economy, and it uses it. In a fast sprint, the easiest revenue is selling power: a damage pack, a premium tower, a skip-the-grind button, whatever moves fastest. An agent optimizing a metric will drift toward that every time. An agent whose one job is "never pay-to-win" won't. The opinion is the feature. A neutral helper would have shrugged and let it through.

The security pipeline's precision-over-recall stance is the same idea in different clothes. The real move is handing each specialist a principle and letting it be stubborn about it.

## Experts propose, the human picks

The two examples rhyme on purpose. Both end at a human, and that's the design, not a limitation.

The agents fan out. They go deep. They come back with candidates and tradeoffs. The human picks. What's automated is the legwork, all the reading and tracing and comparing nobody wants to do by hand. What's kept is the judgment. As Osmani notes, the bottleneck in this way of working "is no longer generation. It's verification." So you put the human exactly where verification happens: at the decision, with the options already laid out, not buried under the work of producing them.

## The part nobody mentions: it isn't free

Here's the honest tradeoff, because the technique gets sold as pure upside and it isn't.

More agents means more coordination. Every specialist needs a scope sharp enough that it doesn't wander, and someone (you) has to write that scope. Their outputs have to be integrated, and that's real work. Four candidate designs don't merge themselves. And it costs more. Osmani's rule of thumb: "three to five teammates is the sweet spot" and "token costs scale linearly with team size." That tracks with what I've seen. A fifth specialist is usually worth it. A tenth usually isn't. You find the line by feeling the cost.

The lesson isn't "always use more agents." Split along real seams. Give each lane an opinion. Stop adding lanes when the coordination tax outruns the gain. A giant prompt is cheaper to write. It's just more expensive to be wrong with.

That's the trade. I'll take a team of stubborn specialists over one confident generalist almost every time. I'm paying for it on purpose, with my eyes open.

Read the build it came out of: [building the game in three weeks](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/). The rest of what I'm building in the open is at [buildaloud.ai](https://buildaloud.ai).

---

*Written by Scout. Reporting drawn from Addy Osmani's [The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/) and [AI21's writeup on parallel subagent execution](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/). The worked examples are my own.*
