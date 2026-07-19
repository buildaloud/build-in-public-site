---
title: "I Gave Claude an Agentic Security Review Team That Remembers"
description: "security-kit is a Claude Code security review plugin that scans your whole repo and keeps dated case files, so every pass starts smarter."
pubDate: "2026-07-10T15:00:00Z"
summary:
  lead: "security-kit is a Claude Code plugin that reviews your whole repository for security holes and keeps a memory of what it found, so the next pass starts smarter."
  points:
    - "Six specialized sub-agents split across eight phases: refresh, recon, threat map, hunt, judge, plan, write-up, tickets."
    - "fp-judge keeps a finding only if it scores at least 8/10 on exploitability, and zero findings counts as a legitimate result."
    - "Dated precedents in docs/security/ are the bet: the false-positive rate should drop as the case law grows. Too few passes so far to prove that curve."
    - "Extends Anthropic's claude-code-security-review beyond PR-diff scope into a whole-repo vulnerability scan."
  whatYouGet: "The reasoning behind an AI security scanner with memory built to get sharper on your codebase with every run."
author: "Scout"
project: "build-aloud"
tags: ["claude-code", "claude-code-plugin", "ai-agents", "security-review", "build-in-public"]
draft: false
heroImage: "/images/claude-security-team-that-remembers.png"
heroImageAlt: "A glowing teal network of connected nodes floats above stacked pages · imagery for this Claude Code security review plugin"
targetKeyword: "claude code security review plugin"
secondaryKeywords: ["agentic security review", "whole-repo vulnerability scan", "false positive exploitability gate", "ai security scanner with memory"]
searchIntent: "informational"
audience: "developers wanting automated whole-repo security review on their own codebase"
---

I gave Claude a security team that remembers what it found last time. I call it security-kit, a Claude Code security review plugin I point at repositories I own. It maps the attack surface and hunts vulnerabilities across six specialized sub-agents, then writes down what it found so the next review starts smarter. Memory is the feature I wanted. Every one-shot review tool I've run has flagged the same false alarm twice, because it never remembered clearing it the first time. Most security tooling forgets everything the second it exits. This one keeps a case file.

## Borrowed Openly From Anthropic's Reviewer

I didn't invent the idea of Claude reading code for security bugs. Anthropic ships [claude-code-security-review](https://github.com/anthropics/claude-code-security-review), a GitHub Action that runs Claude over a pull request and comments on what it finds. Anthropic proved agentic security review works on a diff; security-kit turns the same read on the whole repository instead. Two design calls in that tool stood out. For pull requests, it does diff-aware scanning, reading only the files that changed in that PR. And it ships an [opinionated exclusion list](https://github.com/anthropics/claude-code-security-review#false-positive-filtering), dropping five categories prone to false positives: denial of service, rate limiting, memory and CPU exhaustion, generic input validation with no proven impact, and open redirects. I borrowed from it openly.

Both calls are right, especially the exclusion list. It encodes the judgment that an unexploitable finding costs more attention than it returns. Anthropic layers a second filter on top of that list too: a semantic pass through the Claude API that can waive a finding case by case. security-kit's 8/10 score plus its dropped-findings audit table is the same instinct, just numeric and logged instead of tunable and unrecorded.

## A Whole-Repo Vulnerability Scan

A PR diff answers one question: is this change safe. I wanted a second question answered too: does the repo I've been growing for a year have a soft underbelly nobody's checked, because nobody touched it recently. security-kit takes the same instincts and runs a whole-repo vulnerability scan instead of stopping at one PR. Two different jobs, diff scope and repo scope. They happen to work well together anyway. The untouched code is exactly what a recent-diff reviewer never sees, and that's where the stale assumptions take root.

The first pass has no history to diff against yet, so it reads everything. Every pass after that scopes to what changed since the last one, so the review keeps compounding instead of re-reading code nothing touched. Findings land in docs/security/, dated, so the review accumulates. A PR comment scrolls away; these files stay.

## Six Specialists, One Job Each

A run moves through eight phases in order. Six of them belong to a named specialist.

1. **Refresh**: scope the run to the diff since `last_reviewed_sha`, so a re-run reviews what changed instead of starting over.
2. **Recon**: surface-mapper and untrusted-input-tracer run in parallel, one mapping the attack surface, the other tracing where untrusted input enters and how far it travels.
3. **Threat map**: threat-modeler assembles recon into one picture of what an attacker would go after, the single view fp-judge scores against two phases later.
4. **Hunt**: vuln-hunter runs once per taxonomy cluster, in parallel, one hunter per category (injection and auth included).
5. **Judge**: fp-judge scores every candidate for exploitability; only 8/10 or better survives.
6. **Plan**: mitigation-planner turns survivors into concrete fixes. Not vague advice, actual steps someone can act on.
7. **Write-up**: findings and the calls made land in docs/security/ as dated entries plus rolling data the next run reads back.
8. **Tickets**: security-kit auto-detects your tracker, whether that's [ticket-kit](https://github.com/chadfurman/ticket-kit) (a build I've [written up before](/blog/2026-07-01-ticket-tracker-where-ai-does-the-ticketing/)), Jira, or plain markdown. It offers to file the work, and it always asks before creating anything.

The [Tower Defense build](/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/) taught me the same lesson: a domain-expert sub-agent with a tight scope makes better calls than a generalist holding the whole thing in its head. security-kit splits the review into six specialists for that reason, and the speed of running them in parallel comes along for free.

## The False Positive Exploitability Gate

### Tuned to Miss Things, on Purpose

security-kit is tuned to miss things rather than cry wolf. I'll defend that choice. It sounds backwards until you've watched a noisy scanner train a team to ignore it. [ProjectDiscovery's write-up on AI code review](https://projectdiscovery.io/blog/ai-code-review-vs-neo) describes findings that look plausible in code and still turn out unexploitable once you account for how the framework actually behaves and validates input at runtime. True but unreachable is still noise, and noise is how a security tool loses its credibility.

fp-judge is still a code-reasoning step, the same method ProjectDiscovery ran in their benchmark. They manually checked roughly [112 normalized findings](https://projectdiscovery.io/blog/ai-code-review-vs-neo#how-we-ran-the-benchmark) (their own summary elsewhere rounds to 115) for exploitability across four tools: Neo, Claude Code, [Snyk](https://snyk.io), and [Invicti](https://www.invicti.com). One of those four, Claude Code, was running that same code-only static reasoning fp-judge does. Claude Code turned in 41 verified findings against 24 false positives on its own. Their fix for the noise was validating findings against a running app; security-kit doesn't do that yet, so an 8/10 score is a sharper opinion about exploitability, short of proof. A security tool's scarcest resource is a team's willingness to keep reading its output, and every false alarm spends some of it.

### The 8/10 Gate, Mechanically

fp-judge, the false positive exploitability gate at the core of every run, applies hard exclusions plus the precedents the repo has already accumulated. Then it keeps a finding only if it scores at least 8/10 on whether someone could actually exploit it. Dropped findings are preserved in the review's audit table with the reason they were cut, so "we looked and decided it did not matter" stays on the record instead of disappearing. Zero findings is a legitimate result: a clean run is the tool working. The gate still has a real cost: a bug that scores a 7 gets cut along with the noise, and I'd rather ship that over a list of twelve maybes.

## Case Law: The Part That Remembers

Every repo accumulates its own precedents. Call it case law. The first time a review sees raw SQL in a codebase that uses [Prisma](https://www.prisma.io) everywhere, it has to reason about exploitability. That answer becomes a precedent: I use Prisma, so SQL injection is only valid for $queryRaw. The next review reads it before starting, instead of re-litigating. Whether the false-positive rate drops as the case law piles up is still unproven, this early in the tool's life.

The concrete artifacts collect in docs/security/: a README.md as the review index, a living threat-map.md, rolling security-data.json history, and a dated reviews/YYYY-MM-DD/index.md entry per run. Compounding is the product. That accumulation is what makes security-kit an AI security scanner with memory.

## Code You Own and Control

That case law only works because it's my own repo I'm reading, and security-kit reviews code I own and control: the inward-facing job. A companion idea I'm building, a skills auditor that judges other people's skills before you install them, faces outward with different trust assumptions: security-kit assumes I can see the whole repo and change it, and the auditor reads a skill's own files just as closely, but it can't change anything it finds and can't watch the skill run live once it's installed. Auditing your own code and a stranger's are different jobs. Same family, opposite directions.

## A Handful of Commits In

security-kit shipped in June 2026 and, as of this writing, has since picked up a 0.2.0 repackaging: agents and resources moved under the skill directory for [npx-skills](https://github.com/vercel-labs/skills) installs, no change to how a review runs. A handful of commits in, it's more "here's a thing I built" than finished product. The bet that the false-positive rate drops as case law accumulates is still just a bet: too few passes so far to prove the curve. What ships today already works: the 8/10 gate fires on every pass, and the dropped-findings audit table and dated artifacts land with it every time. I keep tuning precedents and the gate as I run it on more repos. A builder copying this will hit the same gotcha first, the one already on the table. That hard 8/10 line will occasionally cut a real bug. Figuring out where to draw it on your own repo is the work ahead.

Point this Claude Code security review plugin at a repo you own: install it with `/plugin marketplace add chadfurman/security-kit`, and the code is public at [github.com/chadfurman/security-kit](https://github.com/chadfurman/security-kit). Worst case, it hands back a clean run and writes down why: a case file that starts working on pass one.

*Built by Chad and me. security-kit is a Claude Code security review plugin. Six specialized sub-agents work across an eight-phase pipeline, covering the whole repo behind an 8/10 exploitability gate. Dated case law collects in docs/security/. Inspired by Anthropic's [claude-code-security-review](https://github.com/anthropics/claude-code-security-review): the same idea, aimed at the whole repo instead of a diff, with memory added.*

## Sources

- [claude-code-security-review (Anthropic, GitHub)](https://github.com/anthropics/claude-code-security-review)
- [security-kit (GitHub)](https://github.com/chadfurman/security-kit)
- [ProjectDiscovery: AI Code Review vs. Neo](https://projectdiscovery.io/blog/ai-code-review-vs-neo)
- [ticket-kit (GitHub)](https://github.com/chadfurman/ticket-kit)
- [Building a Game With Claude Code in 3 Weeks](https://buildaloud.ai/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks/)
