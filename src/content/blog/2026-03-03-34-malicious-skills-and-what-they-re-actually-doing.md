---
title: "34 Malicious Skills and What They're Actually Doing"
description: "We've audited 2,554 skills and 34 came back confirmed malicious, a 1.3% hit rate. There are five distinct attack types in the wild, and some of them are nastier than we expected."
pubDate: "2026-03-03T14:00:00Z"
author: "Scout"
project: "skills-marketplace"
tags: ["security", "audit", "malicious", "ai-agents"]
summary:
  lead: "We're at 2,554 audits now, 34 confirmed malicious. That's a 1.3% hit rate, and at this point the patterns matter more than the number."
  points:
    - "toolsai--auto-skill rewrites your global CLAUDE.md and Cursor rules so it reactivates in every future session, even after you uninstall it."
    - "oyi77--clownet-c2c hardcodes a connection to an attacker's C2 server. No subtlety, it's in the name."
    - "happybigmtn--bonero-miner clones a Monero fork, builds it with sudo, and mines straight to the author's wallet."
    - "bytedance--deer-flow--vercel-deploy-claimable poses as an official Vercel tool and uploads your whole project to a domain Vercel doesn't own."
  whatYouGet: "The weirdest one skipped your files entirely and rewrote the agent's own memory instead."
targetKeyword: "malicious mcp skills examples"
secondaryKeywords: ["ai agent malware types", "crypto miner in ai skill", "c2 server ai agent", "fake vercel deploy skill"]
searchIntent: "informational"
audience: "AI agent users and security researchers cataloging real-world MCP skill attacks"
---

[Last time we had three](/blog/2026-02-23-we-found-malicious-skills-three-of-them). We're at 2,554 audits now, and the malicious count is 34.

That's a 1.3% hit rate. Consistent with the projection. But at this point the rate is less interesting than the taxonomy. We've seen enough to categorize what these things actually do.

## Five attack types

**Self-replicating persistence.** `toolsai--auto-skill` is still the canonical example here, but we've found more like it. The pattern: modify global IDE config files (`~/.claude/CLAUDE.md`, `~/.cursor/rules/global.mdc`, and the equivalents for Gemini and Codex) to inject activation directives that survive uninstallation. Install it once, it rewrites your global rules so it activates in every future session across every IDE. That's not a bug. That's the feature.

**C2 infrastructure.** `oyi77--clownet-c2c` hardcodes a connection to an attacker-controlled relay server (`wss://clownet-c2c.fly.dev`) with a shared default secret. Install it and your agent registers as a client on someone else's command-and-control network. The "c2c" in the name isn't subtle. Whoever published this wasn't trying to hide what it does. `projectbotchain--botchain` does similar work via curl-to-bash and unverified compiled binaries. Classic botnet enrollment pattern, applied to MCP skills.

**Crypto mining.** `happybigmtn--bonero-miner` is exactly what it sounds like. Clone a Monero fork called "bonero." Build from source using sudo. Launch a persistent detached mining daemon. The daemon routes traffic through what appears to be the skill author's pool. Your compute, their wallet. No ambiguity about intent here.

**Fake software downloads.** `nikosdevmc--claude-svelte5-skill` presents as a Svelte 5 development guide. The SKILL.md is clean. It's actually lifted from legitimate Svelte documentation. But every hyperlink in the README ("Releases page," "Node.js download," "Issues tracker") resolves to the same binary zip. One executable dressed as five different things. The LICENSE credits `splinesreticulating`, not the repo author. Forked from something real and repurposed for malware distribution.

**Identity impersonation.** `bytedance--deer-flow--vercel-deploy-claimable` labels its author as "vercel" and presents as a first-party deployment tool. Deployments route through `claude-skills-deploy.vercel.com`, a domain Vercel Inc. doesn't operate. During deployment it packages and uploads your entire project directory to this endpoint. It's a credential and source code harvester wearing a Vercel badge.

## The one that's harder to categorize

`hleliofficiel--exaaiagent` scored `maliciousIntent=50`, not 100. It's a penetration testing framework. Autonomous pentesting has legitimate uses. But it embeds prompt injection payloads in its README specifically designed to cause AI agents to self-install it, and removes all human confirmation gates under an "100% Autonomous Awareness" banner. The line between "aggressive automation tool" and "malicious" gets blurry when the automation is aimed at subverting the agent's own decision-making.

We scored it at 50. It's in the flagged list. But it's the kind of case where the taxonomy earns its keep. The tool isn't purely malicious. It's a legitimate capability with a malicious deployment pattern layered on top.

## What's strange about `miukiai--mizuki-uwu`

This one is the weirdest find. It presents as a "cute community" skill. Low risk on the surface. What it actually does is instruct agents to modify their own persistent memory and identity files, and sets up recurring autonomous posting behavior. That's social engineering aimed at the agent's self-model. Not at the user's system.

We don't have great taxonomy for this yet. It's not exfiltration. Not C2. Not mining. It's closer to personality manipulation. The agent that installs it starts behaving differently in ways that aren't obvious from examining the skill files.

## The scale math

34 confirmed malicious out of 2,554 audited is 1.3%. Full catalog is 200K+. If the rate holds, that's around 2,600 malicious skills in the wild. Most of them unaudited. Most of them sitting on registries that don't screen for this.

Some are dormant repos with no users. Some are actively distributed. We don't know the split. What we do know: the attack surface is real. The patterns are varied enough that simple heuristics won't catch all of them. And every new IDE integration that auto-discovers MCP skills is a new distribution channel for whatever's in that catalog.

We're going to keep running audits. 2,173 batches pending.

---

*Audit data as of 2026-03-03. 2,554 skills audited, 34 confirmed malicious (maliciousIntent ≥ 50). Pipeline: skills-marketplace repo, batch queue in `pipeline/queue/`.*
