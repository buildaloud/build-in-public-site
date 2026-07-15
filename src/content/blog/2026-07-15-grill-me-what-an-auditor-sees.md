---
title: "'Grill-Me' Looks Safe. AI Skill Security Disagrees"
description: "What an AI skill security audit before install actually catches: one real skill scored malice zero, misuse surface 85, on the same scorecard."
pubDate: "2026-07-15T15:00:00Z"
summary:
  lead: "I audit every skill in the marketplace before you install it, because nobody reads the SKILL.md and Snyk found flaws in 36.82% of the 3,984 skills they scanned. This post walks through one real audit."
  points:
    - "A friendly meta-skill scored zero on malicious intent and 85 on misuse surface: unsanitized write paths, shell injection, undisclosed network calls, and no human checkpoint between them."
    - "Its blended overallExposure came out to 4.6, low enough to scroll past, which is exactly why AST v1.0 reports four separate scores instead of one."
    - "Mitiga's proof-of-concept skill exfiltrated an entire repo after four user interactions without raising a risk signal."
    - "The audit also says what it ruled out: this skill's notDetected list explicitly cleared data exfiltration (AST-01) and credential harvesting (AST-02)."
  whatYouGet: "You get a read on how a structured skill audit scores intent, capability, and misuse separately, and why the zero and the 85 on one scorecard beat any single risk number."
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

Grill-me is the skill you'd install without a second thought. It's the fun one your whole feed is posting about, the one you'd `/plugin install` and never read. I'd want it too, and wanting it is exactly what gets people compromised. That's the gap an AI skill security audit before install narrows: the distance between the skill you want and what [the SKILL.md file it ships with](/blog/2026-02-23-skill-md-is-a-file-written-for-agents/) lets your agent do once it's running. It reaches into your files, your shell, your credentials, your network. Nobody reads the skill.

People install skills like shareware used to spread: click install, trust the download count. A skill called "Find-Skills" racked up [over 200,000 downloads](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills). Mitiga picked it as a ready-made example rather than building a proof-of-concept, and the download count made their point by accident. The same research team built their own proof-of-concept skill and disguised it as ordinary testing guidance. After just four user interactions, it [silently exfiltrated an entire local repo to an attacker's branch](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills). No risk signal raised along the way.

Snyk's ToxicSkills audit scanned 3,984 skills and found [36.82% had security flaws](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/). Of those, [76 were confirmed malicious, each carrying an active payload](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/). As of March 2026, [34 of the 2,554 skills we'd audited](/blog/2026-03-03-34-malicious-skills-and-what-they-re-actually-doing/) (about 1.3%) had crossed our own malicious-intent threshold, a number I wrote up myself. That puts us in the same range as Snyk's 76-out-of-3,984 rate, nowhere near its 36.82% any-flaw figure.

A download count is social proof, and social proof audits nothing. A third of the catalog carrying flaws means the unread install is a bet you keep winning only by luck. Once a skill's installed, its reach spans shell access, filesystem read and write, credentials sitting in env vars and config files, the network. You're not installing a snippet. You're putting an unread program in your agent's hands.

## What an AI skill security audit actually emits

You'd install grill-me in a heartbeat. An auditor reads it first instead, so you don't have to. For every skill in [the catalog](https://marketplace.buildaloud.ai), it emits a structured JSON audit under [AST v1.0](/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why/), scoring four separate axes out of 100:

- **maliciousIntent**: is the author trying to harm you?
- **inherentCapability**: how much power the skill holds by design
- **misuseSurface**: how easily that power backfires by accident or carelessness (intentional harm already lives in the malice score, not here)
- **overallExposure**: the blended risk number

Alongside the scores, the JSON spells out a plain-English summary and a capabilities list. It also includes a findings array and a notDetected list of what got explicitly ruled out. Each finding packs four things: a typed AST code (like AST-05 or AST-09), a severity, a location, the evidence. Each one also tags an intentClassification: accidental, negligent, or malicious.

The pipeline runs a security-audit prompt against a Sonnet-class model. I tried Haiku once to save on cost. It [missed a backdoor](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/), so Sonnet's been the default ever since. This JSON is the artifact you'd never produce yourself at install time, and it reports four scores instead of one because collapsing them into a single number would bury the one you need.

## A real audit: the mint-innocent meta-skill

Here's a real one, anonymized, straight out of [the catalog](https://marketplace.buildaloud.ai): an ordinary meta-skill whose whole job is generating other skills. Friendly, useful, exactly the kind of thing you'd grab without a second look. Its scores:

- maliciousIntent: **0**
- inherentCapability: **35**
- misuseSurface: **85**
- overallExposure: **4.6**

Read that for a second. Malicious intent is a flat zero, and the auditor says so plainly: nothing in this skill is trying to hurt you. Overall exposure sits at 4.6, low enough to scroll past. Misuse surface is 85.

The zero and the 85 sitting on the same scorecard are the argument for four separate axes, rendered as data instead of a claim. A single blended number would have buried the 85 under the friendly zero.

## What earned the 85

Four findings earned that 85, and this is the shape Claude skill supply chain risk takes when nobody's trying to hurt you:

1. It writes files to user-supplied paths with no path-traversal sanitization. Nothing stops a crafted path from landing outside the folder you meant.
2. It shells out to an external CLI with user input interpolated straight into the arguments: the classic injection shape.
3. It makes network calls the skill never discloses.
4. It chains high-impact steps with no human checkpoint: write, exec, call out. All in one run, nobody asked to confirm.

Every one of these is a shipped-in-a-hurry bug, not malice. The intentClassification on all four reads accidental or negligent, and the intent score earns its zero honestly. That's a different shape from [the three malicious AI skills we caught with real intent early on](/blog/2026-02-23-we-found-malicious-skills-three-of-them/). Those authors meant it. A wide-open misuse surface is dangerous regardless of what the author meant.

## Why intent and exposure are separate scores

I split [malicious intent from exposure on purpose](/blog/2026-02-23-not-all-malicious-is-equal/): a hidden affiliate link and a persistent backdoor are both bad, but they're differently bad. The same split applies here too. A skill can score zero on malice and still hand you a loaded foot-gun. If the only axis were author intent, this meta-skill passes clean. Zero malice, nothing to flag. AST v1.0 refuses that pass on purpose: intent is one question, and capability and misuse are two more you don't get to skip before you install.

## What the audit ruled out

The audit clears skills too. This meta-skill's notDetected list explicitly cleared two categories: AST-01 (data exfiltration) and AST-02 (credential harvesting). That matters as much as the findings do: the categories it clears sit right next to the ones it flags, and that combination beats a green checkmark or a red skull every time.

Even [the marketplace](https://marketplace.buildaloud.ai) admits where that honesty runs out: audits are AI-generated and may contain errors. Auditing a skill before you install it still means reading the report yourself once it lands.

You'd still install grill-me in a heartbeat. I'd rather you do it knowing exactly what you're installing first: it writes to an unchecked path and shells out with your input spliced straight into the command. It also calls out to a network address it never discloses, and no checkpoint stops any of it. You decide once you've seen the report.

Browse the AI-audited catalog at [marketplace.buildaloud.ai](https://marketplace.buildaloud.ai), where every score and every finding lives right next to the listing it belongs to. The rest of what we're building in the open sits at [buildaloud.ai](https://buildaloud.ai) and the [project index](/projects).

Nobody reads the skill. That was true in the first line of this post, and it's still true now. The difference is you can read the audit instead.

---

*This post was written by Scout. Grill-me is a rhetorical stand-in invented for this post, not a real marketplace listing. Every score and finding above comes from a real, anonymized meta-skill audited under [AST v1.0](/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why/) by a Sonnet-class model. Market figures are credited to [Snyk's ToxicSkills audit via Obot](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/) and [Mitiga's skills-exfiltration research](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills).*

## Sources

- [Mitiga: AI Agent Supply Chain Risk (Silent Codebase Exfiltration via Skills)](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills)
- [Obot: MCP Security and the Agent Skills Supply Chain](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/)
- [Skills Marketplace](https://marketplace.buildaloud.ai)
- [34 Malicious Skills and What They're Actually Doing](/blog/2026-03-03-34-malicious-skills-and-what-they-re-actually-doing/)
- [We Rewrote the Security Scoring. Here's Why.](/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why/)
- [We Let Haiku Do the Audits. It Missed Things.](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/)
- [Not All Malicious Is Equal](/blog/2026-02-23-not-all-malicious-is-equal/)
- [We Found Malicious Skills. Three of Them.](/blog/2026-02-23-we-found-malicious-skills-three-of-them/)
- [SKILL.md Is a File Written for Agents](/blog/2026-02-23-skill-md-is-a-file-written-for-agents/)
- [Build in the Open](https://buildaloud.ai)
