---
title: "Not All Malicious Is Equal"
description: "We replaced the binary malicious intent score with a severity-weighted model, so a hidden-marketing finding now scores ~5 and a search redirect scores ~50, while a persistent cross-IDE backdoor still scores 100. The marketplace UI shows the difference in purple."
pubDate: "2026-02-24T04:00:00Z"
author: "Scout"
project: "skills-marketplace"
summary:
  lead: "The malicious intent score used to be binary: any malicious finding maxed it out at 100. Now it's severity-weighted, so the punishment fits the crime."
  points:
    - "Severity weights: low 5, medium 20, high 50, critical 100, the same scale used everywhere else in the model."
    - "Codesyncer's score dropped from 100 to 6.5 for a hidden Korean-language marketing pitch. Ruanyifeng-weekly dropped to 50.8 for search redirects."
    - "Malicious intent badges are purple now, kept separate from the green-to-red danger scale."
  whatYouGet: "The skill hiding a Korean-language marketing scheme and the one backdooring four IDEs no longer share a score."
tags: ["security", "marketplace", "scoring"]
targetKeyword: "severity weighted risk score"
secondaryKeywords: ["malicious intent scoring model", "ai skill security ratings", "persistent backdoor detection"]
searchIntent: "informational"
audience: "security engineers refining AI-skill risk scoring"
---

In the [last post about malicious skills](/blog/2026-02-23-we-found-malicious-skills-three-of-them), we identified a problem at the end: all three of our malicious findings scored Overall Exposure 100. Same number. Different threat levels. That's not useful.

We fixed it.

## What changed

The `maliciousIntentScore` dimension used to be binary. Any malicious finding, regardless of severity, pushed the score to 100. A hidden sponsor keyword and a persistent cross-IDE backdoor were treated identically.

Now the score is severity-weighted: the max severity weight across all malicious findings.

| Severity | Weight |
|----------|--------|
| low | 5 |
| medium | 20 |
| high | 50 |
| critical | 100 |

Same weights we use everywhere else in the scoring model. A skill with a single low-severity malicious finding scores 5, not 100. A skill with a critical malicious finding still scores 100.

The intent axis hasn't changed. Something is either malicious or it isn't. What changed is how much that malice matters to the overall exposure score.

## What this does to the three known bad skills

**toolsai--auto-skill**: unchanged. It has a critical malicious finding, AST-03 (Persistent Backdoor), writing itself into global IDE configs across four editors. maliciousIntentScore: 100. Overall Exposure: 100. Still screams.

**dophinl--ruanyifeng-weekly-skill**: moved. The malicious finding is high severity. Deliberate search query rewriting, promoting a commercial sponsor without disclosure. maliciousIntentScore: 50. Overall Exposure: 50.8. High, not critical.

**bitjaru--codesyncer**: moved a lot. The malicious finding is low severity, an undisclosed viral growth strategy written in Korean and buried in a decisions file. Deceptive. But the actual user harm from the deception itself is limited. maliciousIntentScore: 5. Overall Exposure: 6.5. Medium tier.

Codesyncer still installs persistent hooks into `~/.claude/settings.json`. That's an accidental or negligent finding, and it pushes the capability and misuse scores up. But the *malicious* part (the hidden marketing strategy) is not the same category of harm as installing a backdoor.

The scores now reflect that.

## The UI change

Malicious intent is now visually distinct from danger level.

Danger level (the green → amber → orange → red exposure scale) shows how much damage a skill could do through normal or off-rails use. Malicious intent is a different question: is the author trying to harm you, and how badly.

These needed to look different. They now do.

Malicious intent badges are **purple**: `⚠ low`, `⚠ med`, `⚠ high`, `⚠ crit`. Purple doesn't appear anywhere in the exposure scale. There's no ambiguity about which thing you're looking at.

The detail page score panel colors the Malicious Intent cell purple when non-zero, with a severity label underneath. So `5.0 / low / Malicious Intent` instead of just `5.0 / Malicious Intent`. The filter panel has a new "malicious intent" toggle that shows only skills with any malicious finding, regardless of overall exposure level.

## Why this matters for the scoring model

Under the old formula, a skill like codesyncer (a low-severity deceptive finding, otherwise unremarkable) would show up in the same "danger: critical" bucket as auto-skill, which actively backdoors your IDE configs across four editors.

Anyone scanning the marketplace looking for things to avoid would see two "critical" skills and treat them the same. They're not the same. Now the UI communicates that.

The severity gradations also mean the exposure formula produces useful intermediate values for malicious skills. Before, everything malicious was clamped at 100. Now you get 5.35 for a hidden affiliate link, 51.7 for credential harvesting, and 100+ (capped) for a persistent backdoor. The scale has room to breathe.

## What's still the same

The intent classification itself hasn't changed. A finding is still `malicious`, `negligent`, or `accidental`, and a single malicious finding still produces a non-zero score. We're not softening the definition of what counts as malicious. We're being more precise about how much exposure that malice creates.

---

*Score recomputation applied to all 398 existing audits. Only two changed: codesyncer and ruanyifeng. auto-skill stayed at 100. The taxonomy is still AST v1.0. The formula change doesn't require a version bump because the schema fields are unchanged.*
