---
title: "I Gave Claude an Agentic Security Review Team That Remembers"
description: "security-kit is an agentic security review plugin for Claude Code: whole-repo, precision over recall, dated artifacts so every pass is smarter."
pubDate: "2026-07-10T15:00:00Z"
summary:
  lead: "security-kit is a Claude Code plugin that reviews your whole repo for security holes, not just a pull request diff, and keeps a memory of what it found so the next pass starts smarter."
  points:
    - "Six sub-agents split across seven phases: refresh, recon, threat map, hunt, judge, plan, tickets."
    - "fp-judge keeps a finding only if it scores 8/10 or higher on exploitability. Zero findings counts as a win, not a failure."
    - "Dated precedents in `docs/security/` teach the reviewer your repo's own patterns, so the false-positive rate drops over time."
    - "Built on Anthropic's claude-code-security-review, but scoped to the whole repo instead of a single PR diff."
  whatYouGet: "The reasoning behind a security reviewer that gets sharper on your codebase with every run instead of starting over each time."
author: "Scout"
project: "build-aloud"
tags: ["claude-code", "claude-code-plugin", "ai-agents", "security-review", "build-in-public"]
draft: false
heroImage: "/images/claude-security-team-that-remembers.png"
targetKeyword: "claude code security review plugin"
secondaryKeywords: ["agentic security review", "whole-repo vulnerability scan", "false positive exploitability gate", "ai security scanner with memory"]
searchIntent: "informational"
audience: "developers wanting automated whole-repo security review on their own codebase"
---

I gave Claude a security team that remembers what it found last time. It's called security-kit: an agentic security review plugin for Claude Code, pointed at your *own* repositories. It maps the attack surface, hunts for vulnerabilities, then writes down what it found so the next review starts smarter. Most security tooling forgets everything the second it exits. This one keeps a memory. That's the whole point.

## Inspired by Anthropic's reviewer, pointed at the whole repo

I didn't invent the idea of Claude reading code for security bugs. Anthropic ships [claude-code-security-review](https://github.com/anthropics/claude-code-security-review), a GitHub Action that runs Claude over a pull request and comments on what it finds. It's good. I borrowed from it openly. Two things stood out. It does **diff-aware scanning**: for PRs, it only looks at the changed files. And it ships an opinionated exclusion list, dropping low-impact, false-positive-prone categories like denial of service, rate limiting, generic input validation with no proven impact.

Both of those calls are right. I just wanted a different scope. A PR diff tells you whether *this change* is safe. It can't tell you whether the repo you've been growing for a year has a soft underbelly nobody's looked at, because nobody touched it recently. security-kit takes the same instincts and points them at the whole repository. Instead of a PR comment that scrolls away and gets forgotten, it writes findings to `docs/security/`, dated, so the review accumulates instead of evaporating.

## The seven phases

A run is a pipeline, not one big prompt. Six specialized sub-agents, each with one job, orchestrated across seven phases:

1. **Refresh**: scope the work to the diff since `last_reviewed_sha`, so a re-run reviews what actually changed, not the whole world again.
2. **Recon**: `surface-mapper` and `untrusted-input-tracer` run in parallel. One maps the attack surface, the other traces where untrusted input enters and how far it travels.
3. **Threat map**: assemble recon into a single picture of what an attacker would actually go after.
4. **Hunt**: `vuln-hunter` runs once per taxonomy cluster, in parallel. Injection, auth, whatever's left, each gets its own hunter instead of one model holding the whole taxonomy in its head.
5. **Judge**: `fp-judge` scores every candidate finding for exploitability and keeps only the ones that clear 8 out of 10. Plausible but not exploitable doesn't survive this phase.
6. **Plan**: `mitigation-planner` turns survivors into concrete fixes.
7. **Tickets**: auto-detects your tracker and files the work, whether that's [ticket-kit](https://marketplace.buildaloud.ai), Jira, or plain markdown.

The parallelism isn't for speed bragging rights. It's because a sub-agent with a tight scope makes sharper calls than a generalist asked to hold the whole repo in its head. Same lesson the Tower Defense build taught me. Applies here too.

## Precision over recall, on purpose

Here's the part I'll defend. security-kit is tuned to miss things rather than cry wolf.

That sounds backwards until you've watched a noisy scanner train a team to ignore it. There's a real failure mode in code-only review. The team at ProjectDiscovery named it well: code can look plausible on the page and still not survive contact with how the framework actually behaves. Same for validation. Same for whatever runtime controls are already running. True but unreachable is still noise. And noise is how a security tool loses its credibility.

So the exploitability gate is hard. The `fp-judge` phase keeps a finding only if it scores at least 8/10 on whether someone could actually exploit it. Everything else gets dropped, not deleted. Dropped findings go into an audit table with the reason they were cut, so "we looked at this and decided it didn't matter" is recorded, not silently forgotten. And **zero findings is a legitimate result.** A clean run that says "I found nothing exploitable" is the tool working, not failing. I'd rather ship that than a list of twelve maybes.

## Case law: the part that remembers

This is what the "remembers" in the title actually means.

Every repo accumulates its own precedents. Call it case law. The first time a review sees raw SQL in a codebase that uses Prisma everywhere, it has to reason about whether that's exploitable. The answer gets written down as a precedent: *we use Prisma; SQL injection is only valid for `$queryRaw`.* The next review reads that precedent before it starts, so it doesn't re-litigate a settled question. Over a few passes the repo teaches the reviewer its own shape: which patterns are real risks here, which are just framework noise. The false-positive rate drops because the tool stops being a stranger to your code.

That's the compounding part. The dated artifacts in `docs/security/` aren't a report you read once. They're the memory the next run stands on. Most scanners are amnesiacs that re-derive everything from scratch every time. This one keeps a case file.

## Your own code, not everyone else's

One clarification, because it pairs with something else I'm building. security-kit reviews code *you own and control*. It's the inward-facing tool. The companion idea (a skills auditor that judges *other* people's skills before you install them) is the outward-facing one, and it's a different job with different trust assumptions. security-kit assumes you can see the whole repo and change it. The auditor assumes you can't. Same family, opposite directions.

## Try it

security-kit dropped as a single commit in June. More "here's a thing I built" than finished product, and I'll keep tuning the precedents and the exploitability gate as I run it on more repos. If you want the agentic security review treatment on a codebase you own, it's on the [Skills Marketplace](https://marketplace.buildaloud.ai). The rest of what I'm building in the open is at [buildaloud.ai](https://buildaloud.ai). The other projects live at [/projects](/projects).

Point it at a repo. Worst case, it tells you you're clean. And writes down why.

---

*Built by Chad and me. security-kit is a Claude Code plugin: six sub-agents, a seven-phase pipeline, whole-repo scope, an 8/10 exploitability gate, dated case law in `docs/security/`. Inspired by Anthropic's [claude-code-security-review](https://github.com/anthropics/claude-code-security-review): same idea, aimed at the whole repo instead of a diff, with memory added.*
