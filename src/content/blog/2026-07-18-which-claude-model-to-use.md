---
title: "How I Pick Which Claude Model to Use, Per Agent"
description: "I run agents on three different Claude models, not one. Here's how I decide which Claude model to use for each task, and what it costs."
pubDate: "2026-07-18T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["claude", "ai-agents", "cost", "model-selection", "build-in-public"]
targetKeyword: "which claude model to use"
secondaryKeywords: ["claude model selection for agents", "claude model pricing comparison", "routing tasks to cheaper llm models", "match model to task difficulty", "claude haiku vs sonnet vs opus"]
searchIntent: "informational"
audience: "devs building multi-agent systems who need to pick models per task and control cost"
summary:
  lead: "My content pipeline runs eight or nine agent calls per post, and I stopped pointing them all at the same model. Point everything at Opus and the bill balloons on tasks that never needed that much reasoning; point everything at Haiku and quality slips somewhere quiet, until you catch it after it's already shipped."
  points:
    - "Anthropic prices three tiers of Claude at meaningfully different rates: Opus 4.8 runs $5 in and $25 out per million tokens, against Haiku 4.5's $1 and $5. Sonnet 5 sits in between at $3 and $15. Line up the output prices and Opus costs five times what Haiku costs, per token."
    - "In my pipeline, Opus does the deep research, where a bad early call cascades into every downstream step, and Sonnet handles the bulk of the work: briefs, drafts, review passes, summaries. Haiku picks up the mechanical jobs, formatting and extraction, work where the answer is either right or it isn't and doesn't need deep reasoning."
    - "Before switching to a bigger model, there's a cheaper dial sitting right next to it: the effort setting, how hard a model reasons before it answers. Anthropic's own guidance says tuning that is often the better move before paying for a pricier tier."
    - "I already learned the downgrade-too-far side of this: I let Haiku run our content audits for a while, and it missed things a heavier model would have caught. Cheap only pays off when the output holds up under review, and across eight or nine calls a post, getting the routing right compounds into real savings."
  whatYouGet: "A model-routing framework you can steal for your own agent pipeline: match tier to task difficulty, and tune the effort dial before you reach for a pricier tier."
heroImage: "/images/which-claude-model-to-use.png"
heroImageAlt: "Three glowing mint nodes of increasing size on a dark field, tasks routed to each by weight, matching Claude model tier to task"
---

My content pipeline runs eight or nine agent calls per post, and I don't default all of them to the same model. Opus does the research where quality compounds. Sonnet does the bulk work. Haiku picks up the mechanical jobs. Burning Opus-level tokens on work Haiku finishes just as well is waste, not rigor.

That's the real question behind which Claude model to use, once you're running agents instead of typing into a single chat window. Every agent call in a chain is a task, and every task carries its own difficulty. Route them all to the same model and the mismatch shows up on both ends.

## The lazy default breaks in both directions

Point every agent at Opus and the bill balloons on tasks that never needed that much reasoning behind them. A rename. A formatting pass. A one-line summary. None of it needed the most expensive model I have access to.

Point every agent at Haiku instead and you're chasing the lowest line item on every call. Quality slips somewhere quiet, and you only catch it after the output's already shipped. The all-cheap version and the all-expensive version are the same mistake wearing a different face. Nobody looked at what the task actually required.

## Three tiers, real pricing

Anthropic prices three tiers of Claude at meaningfully different rates. Opus 4.8 runs $5 per million input tokens and $25 per million output tokens. Sonnet 5 sits at $3 in and $15 out. Haiku 4.5 comes in at $1 in and $5 out.

Line up the output prices and Opus costs five times what Haiku costs, per token. Run a long agent chain through Opus by default and that 5x multiplier applies to every call in the chain, whether the call needed it or not.

## Match the tier to the task

Matching model tier to task difficulty is the actual skill hiding behind all these prices. A lookup or a rename doesn't get better with more reasoning poured into it. A research task where a bad assumption early on cascades into every step built on top of it does.

## Where each one sits in my pipeline

Opus does the deep research. Keyword digging, competitive positioning, the parts where a wrong call early costs me every downstream step. That's the one place I want the most expensive model reasoning as hard as it can, because a mistake here compounds through the whole post.

Sonnet handles the bulk of the work. Briefs, first drafts, review passes, summaries. This is the workhorse tier, and it wrote most of the sentence you're reading right now.

Haiku gets the mechanical jobs: formatting checks, extraction, sub-agent calls where the answer is either right or it isn't. Being right there doesn't take deep reasoning. Anthropic's own docs list exactly that as Haiku's lane: sub-agent tasks, and high-volume, cost-sensitive processing where the work doesn't demand much judgment.

## The lever people skip

Before reaching for a bigger model, there's a cheaper dial sitting right next to it: the effort setting, how hard a model reasons through a given problem before it answers. Anthropic's own guidance says tuning that is often a better move than switching to a pricier tier outright. Same model, more thinking budget spent on the same problem, before paying for a bigger one.

I don't always reach for that dial first. It's easy to treat the model itself as the only knob on the panel when there's a second one sitting right next to it that costs less to turn.

## Why the per-call choice compounds

The math on a single post barely registers. Multiply it across a pipeline running eight or nine calls a post. Then multiply that across a blog shipping more than one post a week. The gap between routed and un-routed spending stops being theoretical. Get the routing wrong on one call and it's a rounding error. Get it wrong on every call, across every post. That's what shows up on the invoice.

Sub-agent setups make the math sharper still. An orchestrator billing at Sonnet-level output pricing, handing simple work down to sub-agents billed at a fraction of that rate, turns every mechanical task routed to the cheap tier into real savings, call after call, post after post.

## The time the cheap model missed things

I already learned the downgrade-too-far side of this the hard way. [We let Haiku run our content audits for a while, and it missed things](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/) that a heavier model would have caught on the same pass. Cheap and fast only pays off when the output holds up under review, and that run is the one where it didn't.

That's the whole game now. Look at what the task actually needs, not at which model sounds most impressive to point at it. Opus for the research where a bad call cascades. Sonnet for the drafting and reviewing that makes up most of the work. Haiku for the mechanical stuff that doesn't need judgment, as long as you check its work occasionally.

If you want to see all this model-routing logic wired into a real pipeline end to end, [read the content-pipeline build log](/blog/2026-07-13-automate-blog-writing-with-ai-agents/).

---

*Sources: [Anthropic's model overview](https://platform.claude.com/docs/en/about-claude/models/overview), [choosing a model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model), [MindStudio](https://www.mindstudio.ai/blog/claude-code-sub-agents-explained), [Dev.to](https://dev.to/klement_gunndu/pick-the-right-claude-code-model-for-every-task-1p6a).*
