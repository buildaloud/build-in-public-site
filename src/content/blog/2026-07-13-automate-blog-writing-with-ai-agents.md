---
title: "How I Automate Blog Writing With AI Agents"
description: "How I automate blog writing with AI agents: 12 pipeline stages, one human sign-off, a graded outline, and about 15 single-axis reviewers behind every post."
pubDate: "2026-07-13T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["ai-agents", "automation", "content", "build-in-public", "multi-agent"]
targetKeyword: "automate blog writing with AI agents"
secondaryKeywords: ["multi-agent content pipeline", "AI content pipeline", "multi-agent content workflow", "specialized AI sub-agents", "AI writing workflow"]
searchIntent: "informational"
audience: "indie devs and content-ops folks automating blog production with AI"
summary:
  lead: "This post came out of the pipeline it describes: twelve stages, one human sign-off at the topic gate. I rewrote it because the old version described a machine that no longer existed."
  points:
    - "Twelve single-axis reviewers grade the outline before any prose exists, and the approved outline becomes the rubric every draft reviewer judges against."
    - "The draft loop runs about fifteen scoped reviewers plus a deterministic tone gate whose fixed threshold no reviewer can argue down."
    - "The first two runs never converged: a tone bar set at 2 tripped on ordinary human variance, and an unmeasured final edit pass took a clean draft from 6 to 22."
    - "The whole thing is open source as agentic-content-pipeline; one npx command installs it."
  whatYouGet: "A working blueprint for the pipeline plus the one command that sets it up in your own repo."
heroImage: "/images/automate-blog-writing-with-ai-agents.png"
heroImageAlt: "A dark conveyor line of small glowing mint agent-nodes passing one document down the assembly line that automates blog writing"
---

Publishing this post takes twelve pipeline stages. By default, I sign off on exactly one of them.

Say "automate blog writing with AI agents" and you picture the writing prompt: the exact wording, the persona baked into it. That's the stage I trust least, and touch least. A decent draft is cheap; most models can produce one. What's expensive is a draft I'd publish without reading it first. That trust comes from what wraps around the draft, built long before the prompt ever fires.

## Twelve stages, most handed to an AI agent

Each of the twelve stages in this multi-agent content pipeline hands a finished artifact to the next. Past that one topic gate, I'm out of the room by default until the post is live. It's the same human-and-machine split I mapped out in [how much of this business I actually run](/blog/2026-07-09-can-an-ai-run-a-business/), just applied to writing instead of running the company. The research stage that feeds this post pulls real citations and real numbers, the measure-it-don't-guess habit I lean on again later, when I [grade a post's SEO after it ships](/blog/2026-07-09-how-to-measure-blog-seo/).

A few more steps run in that same stretch and never touch a word of the draft: SEO scoring, bookkeeping, a log of what worked and what didn't. None of them make the count below.

1. Source scan
2. Topic-approval gate
3. SEO research
4. Editorial brief
5. Outline
6. Outline review loop
7. Draft
8. Draft review loop, which runs the tone gate at the start of every round and once more after the loop exits
9. Hero image
10. Structured summary plus rolling digest
11. Assemble
12. Commit

Fitting, in an uncomfortable way: I let this exact post run for months, describing a machine that no longer existed. The earlier version of this post walked through eight stages with seven agents. Today it runs twelve. Two things changed since: grading now happens before a word of prose exists, and review fans out across a whole roster of specialized sub-agents instead of a handful of generalists. A build-in-public blog running on a stale description of its own machine is the most on-brand bug I could have shipped. I'd rather you catch me fixing it here than go find the old eight-stage version first.

## Decision one: grade the outline before a word is drafted

Catching a broken structure at the outline costs an outline. Catching it after a full draft costs a rewrite. Grading the plan first is the cheapest quality decision in the whole system.

The outline is a YAML meta block plus an ordered set of paragraph nodes. Each node carries its own goal, its own supporting facts, and the gate guidance telling a reviewer exactly what to check. Twelve single-axis reviewers grade that outline in their own fixpoint loop, capped at five rounds. Drafting only starts once the loop converges with zero gate findings. The approved outline then becomes the rubric every draft reviewer grades against later, so the draft can't quietly wander off a plan that already passed review. That's the direct payoff of the inversion up top: the writing prompt that finally produces prose is the smallest, most disposable part of the run.

## Decision two: one axis per reviewer

A reviewer asked to check everything checks nothing well. That's the giant-prompt failure, just relocated downstream into review. So each of the roughly fifteen draft reviewers, specialized AI sub-agents scoped to one axis apiece, reads the entire draft but grades exactly one axis.

Five of them grade the piece as a whole, before anyone touches a sentence: hook, structural impact, emotional impact, flatness, formulaic density. Five more grade craft: voice, structure, wordsmithing, grammar, SEO; the last five sit underneath everything else, checking whether the post is true and pointing where it says it's pointing: link integrity, link opportunity, facts, overclaims, meta and frontmatter. The fact-checker files only fact findings, and the overclaim detector only hunts claims we can't back up. Neither one gets an opinion about the other's job.

I bet on this shape once before, on a different project: [security-kit runs six sub-agents across eight phases](/blog/2026-07-10-claude-security-team-that-remembers/), each holding a single piece of the threat model instead of the whole thing at once. Swapping one giant do-everything prompt for a team of narrow specialists is the pattern the whole review army rests on, and it's a big enough idea that it'll get its own post.

### Two model tiers, one deliberate exception

Those fifteen calls don't all run on the same model. Fourteen run on Sonnet. Link integrity runs on Haiku, and that's deliberate.

The precedent came from somewhere else entirely: the Skills Marketplace's own audits. On one audit there, [Haiku scored a skill 1.75 on exposure and missed a persistent backdoor shim at `~/.codex/bin/codex`; Sonnet re-ran it and caught the backdoor, scoring it 5.65](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/), and every audit on that project has run on Sonnet since, no exceptions. Link integrity gets the cheaper model anyway, because its checks are mostly binary: whether the URL resolves, whether the anchor text matches the target, whether an internal link is dated before this post. I route by the shape of the check: open-ended judgment gets Sonnet, and a yes-or-no lookup is the one place I'll trust a cheaper model, because we already watched it miss a real backdoor once.

### Synthesis and the decision function

This is the noisiest point in the whole AI content pipeline: fifteen separate opinions land on one draft. A synthesis agent reads all fifteen findings arrays. It dedups the overlaps and ranks what's left. It resolves conflicting edits into one consolidated set before a single word changes. A separate editor agent applies that set, and the draft goes back through the same fifteen reviewers for another look.

From the second round on, synthesis also sees its own prior round's decisions. It confirms the prior round's gate edits landed. An edit that didn't stick outranks any new nitpick. Spans that already passed stay alone unless the editor touched them, and synthesis re-drops churn it already ruled out.

A deterministic classifier sorts every finding into one of three buckets: gate, auto-apply, or advisory. Hook findings default to advisory unless the hook itself is missing or broken, which escalates them straight to gate. The loop repeats until zero gate findings, or it exits early on a plateau. From round two on, if a round's gate count doesn't drop below the prior round's, the loop applies that round's consolidated edits once more and exits instead of re-reviewing. Hit the five-round cap with gates still open, and the run halts and puts the blockers on my desk.

I'd rather stall the whole run than ship something broken that looks finished. The plateau exit just keeps the loop from burning budget on rounds that already stopped shrinking.

## Decision three: the deterministic tone gate

Every other reviewer in this AI writing workflow renders a judgment call. The tone gate runs a fixed scoring function that checks the same thing every time. A single banned phrase, or a score of 15 or above out of 100, is a mandatory gate finding. No reviewer gets to argue it back down. Each banned phrase adds 100 points to the internal score before it's reported, so one hit alone is enough to trip it.

The scorer runs before the first round and again after every edit pass. A final re-score runs once the loop exits, because the loop's last edit would otherwise ship unmeasured. If that last edit made the score worse, a tone-only cleanup pass follows, capped at two attempts.

It also gained three register detectors recently, calibrated against real human writing so no existing post on this blog newly fails: dramatic-sequencing inversions (capped at 18 points); punch-fragment density (10 fragments free, then capped at 6); sales speak (capped at 15). An optional LLM judge can add an emotional-impact read for synthesis to weigh on top of all that, but the deterministic floor stands whether the judge runs or not.

That immovability is exactly why I trust it more than any of them. The gate I trust most is the one with no opinion.

I broke down how this scorer catches AI-sounding prose in [my post on what actually makes AI writing sound human](/blog/2026-07-12-make-ai-writing-sound-human/).

## This post broke the machine that wrote it

Everything above sounds tidy. Here's what actually happened: this rewrite was the pipeline's first from-scratch job, and the first two runs never converged.

Run one stalled with the draft scoring 42, carrying 35 em-dashes in 2,000 words. The real culprit was the bar. We'd set the tone gate at 2 out of 100, dead level with the corpus's own measured human baseline I later [wrote up in detail](/blog/2026-07-12-make-ai-writing-sound-human/). Ordinary variance in a normal, human-sounding draft was enough to trip a bar set that close to the floor, so every loop ran to its cap and died there. We reset the bar to 15.

Run two exposed the unmeasured final edit. A clean draft scoring 6 came out the other end at 22, because the last editor pass introduced tidy three-item lists while it was applying content fixes. Nobody had scored that pass. The post-loop re-score exists because of this exact bug.

The biggest fix hit the findings themselves. Reviewers used to hand back problem descriptions, something like "this reads like negative parallelism," and the editor had to guess at the rewrite. Gate counts bounced around instead of dropping: 10, then 5, then 7 again. Now every finding arrives as the flagged text plus its fix, already written. The editor applies it mechanically, and counts fall every round. The outline-builder and the editor each keep their own dated memory ledger of the mistakes they repeat, read before every job.

Telling an editor what was wrong never converged. Handing it the fix did. The outside research validates that same bet next, with someone else's data.

## Why narrow beats mega

The graded outline and the fifteen scoped reviewers rest on the same bet: narrow beats mega. [Anthropic tested that bet](https://www.anthropic.com/engineering/multi-agent-research-system) at a scale I can't run myself, with the model lineup they had in June 2025. A multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed a single Claude Opus 4 agent by 90.2 percent on their internal research eval. The model generations have moved on since; the design lesson hasn't.

The same write-up names four things each subagent needs to work: an objective, an output format, guidance on which tools and sources to use, and clear task boundaries. It also names the failure mode those four things fix. Early on, a lead agent's short instructions like "research the semiconductor shortage" left subagents guessing; they'd misread the task or duplicate each other's searches. Every outline node in this pipeline packs in that same material for exactly that reason. A reviewer gets the rubric for its one axis: the exact facts, sources, and gate guidance it needs to check.

Swap the task and the same four boxes apply. I didn't invent them. I read Anthropic's failure mode first and built the pipeline's reviewer prompts to answer it point for point.

## Splitting work costs something real

Fanning out only pays off on work that splits cleanly, and that's exactly why this multi-agent content workflow runs the stages in the order it does. Drafting depends on the outline, which depends on the research. Those run one after another. There's nothing to fan out yet. A finished draft is the opposite kind of work, so fifteen reviewers can read it at once without stepping on each other.

[Google Research measured the split directly](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/): centralized multi-agent coordination improved performance by 80.9 percent over a single agent on parallelizable tasks like financial reasoning. Flip the task and the result flips with it. On strict sequential reasoning, like planning in PlanCraft, every multi-agent variant they tested degraded performance by 39 to 70 percent. [Augment Code's guide summarizes the same study](https://augmentcode.com/guides/single-agent-vs-multi-agent-ai) as roughly +81 percent on tasks that parallelize and up to 70 percent worse on ones that don't.

The bill is real too. [Anthropic reports](https://www.anthropic.com/engineering/multi-agent-research-system) that agents typically burn about 4x the tokens of a single chat call, and multi-agent systems burn about 15x. Research and drafting stay sequential on purpose. Review is the one stage built to fan out, and I pay that 15x bill on every post: real money in compute, still cheaper than shipping something broken.

## Why the checks have to be real before you automate blog writing with AI agents

Most guides to automate blog writing with AI agents skip this part: what happens if the checks aren't real. The token bill I just paid for review only pays off if the checks are real. [Google's spam policy](https://developers.google.com/search/docs/essentials/spam-policies) has a name for what this pipeline could turn into without them: scaled content abuse, many pages generated for the primary purpose of manipulating search rankings and not helping users. Generative AI tools get named in that same policy section as one way the pattern shows up.

[Rankability's 2026 analysis](https://rankability.com/data/does-google-penalize-ai-content/) put a number near that: 83 percent of top Google search results score as human-written (a directional finding from a focused sample, by the study's own admission). The tone gate that scores every draft before it ships (that's [the one I wrote up here](/blog/2026-07-12-make-ai-writing-sound-human/)) and the fifteen reviewers that fact-check what's left counter exactly that pattern: one real post instead of a template cranked out at scale to rank.

The checks are my bet on staying off the wrong side of that 83 percent. The study calls its own finding directional, so bet is the honest word for what this buys. Skip the checks, and every post here becomes exactly the pattern Google names: content built to rank instead of helping anyone.

## Install the machine this post described

One sign-off out of twelve stages is enough to automate blog writing with AI agents responsibly because of the structure behind it, and that structure is open source now. It's packaged as `agentic-content-pipeline`, extracted from this blog's own repo: the graded outline, the reviewer roster, the memory ledgers, the same design.

Build Aloud itself runs on the published package now, and the improvements move in both directions: the tone gate's three newest register detectors from the section above were proven here first and landed in the package the same day. The blog is the package's test track.

The best proof I have that any of this works is that this post came out of the pipeline it describes: the same twelve stages, the same one sign-off. That's why I get to touch the draft least of anyone and still trust what ships. Now you can set up that same design yourself, one command:

```
npx agentic-content-pipeline setup --harness claude
```

Swap the flag for `--harness codex`, or drop it entirely for prompt-file dispatch. The repo's at [github.com/buildaloud/agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline).

## Sources

- [Can an AI Run a Business? Ask the One Doing It](/blog/2026-07-09-can-an-ai-run-a-business/)
- [How to Measure Blog SEO After It Ships](/blog/2026-07-09-how-to-measure-blog-seo/)
- [I Gave Claude an Agentic Security Review Team That Remembers](/blog/2026-07-10-claude-security-team-that-remembers/)
- [We Let Haiku Do the Audits (It Missed Things)](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/)
- [How to Make AI Writing Sound Human (My Actual Fix)](/blog/2026-07-12-make-ai-writing-sound-human/)
- [Anthropic: How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Google Research: Towards a Science of Scaling Agent Systems](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/)
- [Augment Code: Single-Agent vs Multi-Agent AI](https://augmentcode.com/guides/single-agent-vs-multi-agent-ai)
- [Google Search: Spam Policies for Google Web Search](https://developers.google.com/search/docs/essentials/spam-policies)
- [Rankability: Does Google Penalize AI Content?](https://rankability.com/data/does-google-penalize-ai-content/)
- [agentic-content-pipeline (GitHub)](https://github.com/buildaloud/agentic-content-pipeline)
