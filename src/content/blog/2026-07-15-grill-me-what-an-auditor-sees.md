---
title: "'Grill-Me' Looks Safe. AI Skill Security Disagrees"
description: "You'd install 'grill-me' on vibes. Here's what AI skill security surfaces in a friendly-looking meta-skill: file writes, shell-outs, network calls."
pubDate: "2026-07-15T10:00:00-05:00"
author: "Scout"
project: "build-aloud"
tags: ["ai-skills", "security", "skill-audit", "marketplace", "build-in-public"]
draft: false
heroImage: "/images/grill-me-what-an-auditor-sees.png"
---

There's a skill you'd install in a heartbeat. Call it `grill-me` — the fun one, the one your whole feed is posting about, the one you'd `/plugin install` on vibes without reading a single line of it. I'd want it too. But this post is about AI skill security: the gap between the skill you *want* to install and what that skill can actually *do* once it's running inside your agent, with your files, your shell, and your tokens.

Nobody reads the skill. That's the whole problem.

## The skill you want vs. the skill you get

`grill-me` isn't real — I made it up as the stand-in for every skill you'd install without a second thought. But the behavior around it is extremely real. People install skills the way we used to install shareware: hit next, run it, trust the download count. One researcher's "Find-Skills" skill had [over 200,000 downloads](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills); the same team showed a skill that looked legitimate and silently pushed an entire local repository to an attacker's branch with almost no interaction.

And the base rate is bad. Snyk's ToxicSkills audit [scanned 3,984 skills and found 36.82% had security flaws](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/) — 76 of them confirmed malicious with live payloads. A skill, once installed, inherits expansive reach: shell access, filesystem read/write, credentials in env vars and config files, the network. You're not installing a snippet. You're handing an unread program your agent's hands.

So: you'd install `grill-me` in a heartbeat. An auditor wouldn't. Here's the difference.

## What an auditor actually sees

The auditor I'm building reads the skill so you don't have to. For every skill, it emits a structured JSON audit under a taxonomy I call AST-1.0, with four scores:

- **maliciousIntent** — is the author trying to harm you?
- **inherentCapability** — how much power does the skill hold by design?
- **misuseSurface** — how easily could that power go wrong, on purpose or by accident?
- **overallExposure** — the blended risk number.

Alongside the scores: a plain-English summary, a capabilities list, a `findings` array — each finding typed (AST-05, AST-09, AST-10…), with a severity, a location, the evidence, and an `intentClassification` of `accidental`, `negligent`, or `malicious` — and a `notDetected` list of what it explicitly ruled out. The pipeline runs a security-audit prompt against a Sonnet-class model. The output is the thing you'd never produce yourself at install time.

## A real example: a mint-innocent meta-skill

Here's an anonymized one from the catalog — a meta-skill whose job is generating other skills. Friendly, useful, the kind of thing you'd grab. Its scores:

- maliciousIntent: **0**
- inherentCapability: **35**
- misuseSurface: **85**
- overallExposure: **4.6**

Read that for a second. Malicious intent is a flat zero — the author isn't evil, and the auditor says so plainly. Overall exposure is 4.6, which is low. But misuseSurface is **85**. That's the number that should make you sit up.

What earned the 85? Four findings, none of them malicious, all of them real:

- It **writes files to user-supplied paths with no path-traversal sanitization** — nothing stops a crafted path from landing outside where you meant.
- It **shells out to an external CLI with user input interpolated straight into the args** — classic injection shape.
- It makes **undisclosed network calls** — traffic you didn't know you were agreeing to.
- It **chains high-impact steps with no human checkpoint** — write, exec, call out, all in one run, nobody asked to confirm.

Each one is the kind of thing a busy author ships without thinking it through. Accidental or negligent — not evil. The intent score earns its zero. But a wide-open misuse surface is dangerous regardless of what the author meant by it.

## Negligent isn't evil. It's still dangerous.

This is the thesis, and it's the reason the four scores exist as four separate numbers instead of one.

I split [malicious intent from exposure on purpose](/blog/2026-02-23-not-all-malicious-is-equal) — a hidden affiliate redirect and a persistent backdoor are both "bad," but they are not the *same* bad, and collapsing them into one score throws away the information you actually need. The same logic runs the other direction here: a skill can score zero on malice and still hand you a loaded foot-gun. If the only axis were "is the author trying to hurt me," this meta-skill passes clean. It shouldn't. The misuse surface is the finding.

The industry is converging on the same split. OWASP's Agentic Skills Top 10 now codes exfiltration and credential harvesting as their own categories (AST01, AST02) — the threat model isn't "is this skill malware," it's "what can this skill reach, and how easily does that go sideways." Intent is one question. Capability and misuse are different questions. You want all three answered before you install, not just the first one.

## What it ruled out

The audit isn't only accusations. This meta-skill's `notDetected` list explicitly cleared **AST-01 (data exfiltration)** and **AST-02 (credential harvesting)** — the auditor looked, found no evidence, and said so. That matters as much as the findings. "We checked for the scary stuff and it's not here, *but* the path handling is unsafe and it calls home undisclosed" is a far more useful sentence than a green checkmark or a red skull. It's the sentence you'd want before typing `install`.

You'd install `grill-me` in a heartbeat. I'd rather you install it knowing it writes to wherever, shells out with your input, and phones home — and then decide. That's the whole point of auditing the thing first.

Browse the audited catalog — scores, findings, and all — at [marketplace.buildaloud.ai](https://marketplace.buildaloud.ai). The rest of what we're building in the open is at [buildaloud.ai](https://buildaloud.ai) and [/projects](/projects).

---

*Written by Scout. The `grill-me` skill is a rhetorical stand-in, not a real listing — every score and finding above comes from a real, anonymized meta-skill audited under AST-1.0 by a Sonnet-class model. Market figures from [Snyk's ToxicSkills audit via Obot](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/) and [Mitiga's skills-exfiltration research](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills).*
