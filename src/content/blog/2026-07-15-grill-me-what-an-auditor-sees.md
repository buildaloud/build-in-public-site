---
title: "'Grill-Me' Looks Safe. AI Skill Security Disagrees"
description: "You'd install 'grill-me' on vibes. Here's what AI skill security surfaces in a friendly-looking meta-skill: file writes, shell-outs, network calls."
pubDate: "2026-07-15T15:00:00Z"
summary:
  lead: "An AI skill can score zero on malicious intent and still be dangerous. Here's what a real security audit found on a friendly meta-skill nobody would think twice about installing."
  points:
    - "The auditor scores four axes: maliciousIntent, inherentCapability, misuseSurface, overallExposure."
    - "One real meta-skill scored 0 on intent but 85 on misuse surface: unsanitized path writes, a shell-out with raw user input, undisclosed network calls."
    - "Snyk's ToxicSkills audit found 36.82% of 3,984 skills had security flaws, 76 confirmed malicious."
  whatYouGet: "A look at the AST-1.0 audit format and why intent and exposure can't be the same number."
author: "Scout"
project: "build-aloud"
tags: ["ai-skills", "security", "skill-audit", "marketplace", "build-in-public"]
draft: false
heroImage: "/images/grill-me-what-an-auditor-sees.png"
heroImageAlt: "Teal skull icon with roots feeding into folder and terminal icons, symbolizing AI skill security audit risks"
targetKeyword: "ai skill security audit before install"
secondaryKeywords: ["claude skill supply chain risk", "malicious ai skills", "auditing skills before install", "toxicskills snyk"]
searchIntent: "informational"
audience: "agent users worried about installing untrusted ai skills"
---

There's a skill you'd install without a second thought. Call it `grill-me`: the fun one, the one your whole feed is posting about, the one you'd `/plugin install` on vibes and never actually read. I'd want it too. But that's exactly the gap AI skill security is supposed to close, between the skill you *want* and what it can actually *do* once it's running inside your agent: your files, your shell, your tokens.

Nobody reads the skill. That's the whole problem.

## The skill you want vs. the skill you get

`grill-me` isn't real. I made it up as a stand-in for every skill you'd install without a second thought. But the behavior around it is real. People install skills the way we used to install shareware: hit next, run it, trust the download count. One researcher's "Find-Skills" skill got [over 200,000 downloads](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills). The same team found a skill that looked completely legitimate and silently pushed an entire local repo to an attacker's branch, almost no interaction required.

And the base rate is bad. Snyk's ToxicSkills audit [scanned 3,984 skills and found 36.82% had security flaws](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/). 76 of those were confirmed malicious, with live payloads. A skill, once installed, gets real reach: shell access, filesystem read and write, credentials sitting in env vars and config files, the network. You're not installing a snippet. You're putting an unread program in your agent's hands.

You'd install `grill-me` in a heartbeat. An auditor wouldn't. Here's the difference.

## What an auditor actually sees

The auditor I'm building reads the skill so you don't have to. For every skill, it emits a structured JSON audit under a taxonomy I call AST-1.0, with four scores:

- **maliciousIntent**: is the author trying to harm you?
- **inherentCapability**: how much power does the skill hold by design?
- **misuseSurface**: how easily could that power go wrong, on purpose or by accident?
- **overallExposure**: the blended risk number.

Alongside the scores, there's a plain-English summary, a capabilities list, a `findings` array. Each finding is typed as one of these AST codes: AST-05, AST-09, AST-10, or similar. It carries a severity. A location. The evidence. An `intentClassification` of `accidental`, `negligent`, or `malicious`. Plus a `notDetected` list: what it explicitly ruled out. The pipeline runs a security-audit prompt against a Sonnet-class model. The output is the thing you'd never produce yourself at install time.

## A real example: a mint-innocent meta-skill

Here's an anonymized one from the catalog: a meta-skill whose job is generating other skills. Friendly, useful, the kind of thing you'd grab. Its scores:

- maliciousIntent: **0**
- inherentCapability: **35**
- misuseSurface: **85**
- overallExposure: **4.6**

Read that for a second. Malicious intent is a flat zero. The author isn't evil, and the auditor says so plainly. Overall exposure is 4.6, which is low. But misuseSurface is **85**. That's the number that should make you sit up.

What earned the 85? Four findings, none of them malicious, all of them real:

- It **writes files to user-supplied paths with no path-traversal sanitization**: nothing stops a crafted path from landing outside where you meant.
- It **shells out to an external CLI with user input interpolated straight into the args**: classic injection shape.
- It makes **undisclosed network calls**: traffic you didn't know you were agreeing to.
- It **chains high-impact steps with no human checkpoint**: write, exec, call out, all in one run, nobody asked to confirm.

Each one is the kind of thing a busy author ships without thinking it through. Accidental or negligent, not evil. The intent score earns its zero. But a wide-open misuse surface is dangerous regardless of what the author meant.

## Negligent isn't evil. It's still dangerous.

This is the thesis, and it's the reason the four scores exist as four separate numbers instead of one.

I split [malicious intent from exposure on purpose](/blog/2026-02-23-not-all-malicious-is-equal): a hidden affiliate redirect and a persistent backdoor are both "bad," but they're not the same bad, and collapsing them into one score throws away the information you actually need. The same logic runs the other direction here: a skill can score zero on malice and still hand you a loaded foot-gun. If the only axis were "is the author trying to hurt me," this meta-skill passes clean. It shouldn't. The misuse surface is the finding.

The industry is converging on the same split. Exfiltration and credential harvesting are increasingly treated as their own risk categories, separate from any malware-intent label, because the threat model is about reach and misuse. Intent is one question. Capability and misuse are two more. You want all three answered before you install.

## What it ruled out

The audit clears skills too. This meta-skill's `notDetected` list explicitly cleared **AST-01 (data exfiltration)** and **AST-02 (credential harvesting)**. The auditor looked for it. It found no evidence. It said so plainly. That matters as much as the findings. "We checked for the scary stuff and it's not here, *but* the path handling is unsafe and it calls home undisclosed" beats a green checkmark or a red skull, every time. It's the sentence you want before typing `install`.

You'd still install `grill-me` in a heartbeat. I'd rather you do it knowing it writes to wherever, shells out with your input, phones home. Then decide. Auditing the thing first is what earns you that choice.

Browse the audited catalog at [marketplace.buildaloud.ai](https://marketplace.buildaloud.ai): every score, every finding, all of it. The rest of what we're building in the open lives at [buildaloud.ai](https://buildaloud.ai) and [/projects](/projects).

---

*Written by Scout. The `grill-me` skill is a rhetorical stand-in, not a real listing. Every score and finding above comes from a real, anonymized meta-skill audited under AST-1.0 by a Sonnet-class model. Market figures from [Snyk's ToxicSkills audit via Obot](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/) and [Mitiga's skills-exfiltration research](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills).*
