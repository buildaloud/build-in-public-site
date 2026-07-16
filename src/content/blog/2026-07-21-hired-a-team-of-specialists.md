---
title: "I Replaced My Giant Prompt With a Team of AI Subagents"
description: "I replaced one giant prompt with a team of narrow Claude Code subagents, each with its own lane and a stubborn opinion."
pubDate: "2026-07-21T15:00:00Z"
summary:
  lead: "I stopped cramming every concern into one giant prompt and started running narrow Claude Code subagents instead, each blind to everything outside its lane. Three real projects show what changed: a tower-defense game, a security review pipeline, the pipeline that writes this blog."
  points:
    - "The tower-defense game's monetization agent has one mandate: veto pay-to-win, even when a damage pack is the easiest revenue in a fast sprint."
    - "The security review splits into six narrow lanes, tuned for precision over recall."
    - "Fifteen single-axis reviewers grade every round of the pipeline that wrote this post, capped at five rounds, plus a deterministic tone gate that kills anything scoring 15 or above on AI-ness."
    - "Anthropic's multi-agent research system runs about 15 times the tokens of a single chat call. Addy Osmani calls 3-5 teammates the sweet spot."
  whatYouGet: "The specialist pattern from three real builds, the actual rosters behind each one, and where the coordination tax says stop."
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

I used to write one giant prompt. Cram every concern into a single ask, hope the model holds it all in its head. That prompt felt responsible: one ask, so nothing could get lost in a hand-off. It holds maybe two concerns before the rest blur into a confident average, and confident is the part that gets you.

The fix isn't a smarter model. It's a smaller question. I started running a team of narrow Claude Code subagents instead of one prompt, using the same underlying model the whole time. The output quality jumped more than any model upgrade I've tried.

I never ran a controlled before-and-after on this: no spreadsheet, no A/B split. Three real projects tell the story instead: a tower-defense game, a security review pipeline, the production line that writes this blog. I just watched what shipped. [Claude Code ships subagents by default](https://code.claude.com/docs/en/sub-agents), built into the tool, with no separate paid tier required.

## How a giant prompt actually fails

A giant prompt fails quietly. Ask one model to design the economy, balance combat, render the visuals, and keep the save schema sane. It's also on the hook for protecting monetization, all in the same breath. Two of those five get real attention. The rest come back plausible and wrong, in ways that pass a skim (harder to catch than an outright error). Nothing here looks broken until the concerns collide three systems downstream. By then it looks like a deliberate design decision. The concern that got skipped has vanished from view.

Addy Osmani names the same shape from a different angle: a focused agent that only handles the data layer "writes significantly better database code than a generalist juggling your entire codebase."

## What a specialist actually is

A specialist is one agent with one narrow lane, nothing more. The narrowing has to be real scope: the economy agent in the game can't see how a glow primitive renders, and that blindness is what makes its economy design better. Skip the isolation, and you've just renamed one prompt into four personas sharing the same tangled context.

AI21 describes a related shape of that isolation: theirs runs parallel attempts at one task; this post runs parallel specialties instead. Each attempt runs in "its own isolated execution environment," per AI21's write-up on parallel subagent execution. The same mechanic is what let the game's economy agent and combat agent run side by side without one clobbering the other's workspace mid-run. Every specialist gathers its own context, does its own work, then reports back. One layer up reviews what comes back the way the security pipeline's false-positive judge checks findings later: it kills what doesn't hold up and keeps what does.

## The roster behind the tower-defense build

The clearest version of this I've run is [the tower-defense game I built in about three weeks](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/). What kept those three weeks from collapsing was the specialist agent pattern in action: a roster of specialists, each dumb about everything except its one lane. One agent owned the idle and echo mechanic. Research went to another. Separate agents split economy and combat balance on one side, towers and enemies on the other. A monetization specialist stood off to the side with a single job.

## A security review run as six narrow lanes

Asking one big prompt to find all the bugs returns a wall of plausible findings with no way to trust any of them. Run the review as six narrow lanes instead: the shape behind [the security review team I gave Claude](/blog/2026-07-10-claude-security-team-that-remembers/). The stance baked into the pipeline is precision over recall. It would rather report three real bugs than thirty maybes.

A surface-mapper only enumerates where untrusted data can enter. From there, an untrusted-input-tracer follows that data through the code. A threat-modeler maps how those entry points could be abused. Along that trail, a vuln-hunter looks only for exploitable patterns. Then a false-positive judge's entire job kicks in: kill findings that don't hold up, before a mitigation-planner ever proposes a fix.

This kind of review work fed [security-kit](https://github.com/chadfurman/security-kit), and the pipeline is the technique behind it. Anyone can run it without touching security-kit itself.

## The specialist team that writes this blog

The heaviest version of this pattern I run today is [the pipeline that wrote this post](/blog/2026-07-13-automate-blog-writing-with-ai-agents/). Every review concern gets its own narrow Claude Code subagent, and the split happens twice: once on the plan, once on the prose. Two passes, same rigor. Before any prose exists, an outline artifact goes through its own review loop: a dozen single-axis reviewers per round, capped at five rounds. The draft goes through the same five-round cap, but with fifteen single-axis reviewers per round instead of a dozen. The axes: hook, voice, structure, SEO, fact accuracy, link integrity, structural impact, emotional impact, meta-content. Each reviewer reads the whole draft but grades exactly one of those.

A deterministic tone gate runs inside that same draft review loop: a banned phrase, or an AI-ness score of 15 or above out of 100, gates the draft regardless of what any reviewer concludes. It runs at the start of every round and once more after the loop exits.

The only human checkpoint in the whole run, by default, is topic approval: the outline loop auto-proceeds straight to drafting once it converges. The pipeline now runs as the open-source [agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline) package. And yes: one of those fifteen agents is grading this very sentence right now.

## The best specialists hold an opinion

The best specialists defend a stubborn position beyond their narrow scope. That stubbornness is what makes a specialist useful. A neutral helper would have shrugged and let the pay-to-win call through.

[The game](https://td.buildaloud.ai)'s monetization agent has one mandate: veto pay-to-win. It gets a vote on anything touching the store or the economy, and it uses it. In a fast sprint the easiest revenue is selling power: a damage pack, a premium tower, a skip-the-grind button. An agent optimizing a revenue metric drifts toward that; an agent whose one job is never pay-to-win refuses instead.

The stubbornness cuts both ways. The opinion baked into an agent is only as good as the opinion I gave it. And a wrong veto is harder to catch than a wrong suggestion, because nothing in the design flags its own certainty as misplaced.

The security pipeline's precision-over-recall stance from a few sections back is the same design move in a different domain: a bias built in on purpose. Even the content pipeline that wrote this post has one. Its tone gate is an opinion compiled into deterministic code, and it fails a draft on a banned phrase no matter how good every reviewer thinks the prose is.

## Specialists propose, a human picks

The examples rhyme on purpose: each one ends at a human. Agents fan out and work their own lane. Then they return with candidates and tradeoffs laid side by side. On the game, specialists came back in the shape: "Here's candidate A, B, C, D. Here's the tradeoff on each. Chad picks." Chad made the calls; the agents just cut the cost of making them.

Addy Osmani names the shift this creates: the bottleneck in this way of working "is no longer generation. It's verification." Anthropic's own multi-agent research system backs that up with a number: tested against the June 13, 2025, model lineup, it outperformed a single Opus 4 agent by 90.2 percent on an internal research eval. That's real evidence the fan-out buys quality, and it's why the verification step at the end matters most. The content pipeline places its one human checkpoint, topic approval, at that kind of decision. By default it stands ahead of all the generated legwork.

## What the team costs

Running a team of parallel AI subagents has a real bill, and the technique gets sold as pure upside anyway. Every specialist needs a scope sharp enough that it doesn't wander, and someone has to write that scope. I've shipped ones too loose. Two agents solved the same problem twice, in different files, disagreeing with each other by the time either one reported back.

Anthropic's own multi-agent write-up admits most coding tasks don't parallelize as cleanly as its research use case does. Domains needing shared context or tight dependencies between agents aren't a good fit for the technique today. That's why I still draw the lane boundaries by hand instead of trusting the fan-out to find them on its own. Outputs need integrating too; four candidate designs don't merge themselves.

Addy Osmani's rule of thumb, verbatim: "3-5 teammates is the sweet spot." A separate line in the same post states, "Token costs scale linearly with team size." Controlling that second cost is a separate call, made agent by agent: [I laid out the routing table, tier by tier, in its own post, with pricing as of that post's date](/blog/2026-07-18-which-claude-model-to-use/). Anthropic puts a rough floor under that second point. The same June 2025 study found its multi-agent research system runs about 15 times the tokens of a single chat call. The agentic-content-pipeline README is blunter about the bill for its own defaults: roughly 100-160 agent dispatches and several million tokens per post. It warns that the fan-out bursts up to 15 agents at once per round: check a usage dashboard and mind your rate limit before queueing more than one run.

A fifth specialist is usually worth it. A tenth usually isn't. The review army behind this very post runs well past Osmani's ceiling (a dozen outline reviewers, fifteen draft reviewers) because his reviewers lean on tools that return a flat pass or fail: a linter, a test suite, a security scan. Prose has no such tool, so I split judgment by axis instead, one reviewer standing in for the mechanical check that doesn't exist. That substitution is a bet more than a proof. For a single-concern task, though (a one-off script with nothing else to trip over), his lower ceiling is right: there's no seam yet to split along.

A giant prompt is cheaper to write. It's just more expensive to be wrong with.

## Split along real seams

I'll take a team of stubborn specialists over one confident generalist almost every time, and I'm paying the coordination tax with my eyes open. Split along real seams. Give each lane an opinion. The coordination cost sets the ceiling: once adding a lane costs more than it buys, stop. Ask a smaller question instead of hoping one big one holds everything. Start by carving the one concern your giant prompt keeps fumbling into its own subagent with a one-line mandate. If you'd rather skip straight to the assembled version, the pipeline that runs this exact technique on this blog is open source: [agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline), installable with `npx agentic-content-pipeline setup --harness claude`.

## Sources

- [Addy Osmani: The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/)
- [AI21: What Is Parallel Subagent Execution?](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/)
- [Claude Code Docs: Subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic: How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)
- [security-kit (GitHub)](https://github.com/chadfurman/security-kit)
- [agentic-content-pipeline (GitHub)](https://github.com/buildaloud/agentic-content-pipeline)
- [Building a Game With Claude Code in 3 Weeks](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/)
- [I Gave Claude an Agentic Security Review Team That Remembers](/blog/2026-07-10-claude-security-team-that-remembers/)
- [How I Automate Blog Writing With AI Agents](/blog/2026-07-13-automate-blog-writing-with-ai-agents/)
- [How I Pick Which Claude Model to Use, Per Agent](/blog/2026-07-18-which-claude-model-to-use/)
