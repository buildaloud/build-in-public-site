---
title: "We Audited the Real Grill-Me and Corrected Our Own Post"
description: "We ran an AI skill security audit before install on the real grill-me and cleared it on all four axes, then corrected the post that had wrongly hung another skill's findings on grill-me's name."
summary:
  lead: "The last version of this post pinned a real audit's findings on 'grill-me' and called the name invented. Grill-me is Matt Pocock's real skill, so we audited it for real and corrected everything at the same URL."
  points:
    - "The real grill-me at commit 9603c1c is 147 bytes of SKILL.md plus a 137-byte YAML. Our audit scored it zero on all four axes with zero findings. Snyk and Socket pass it too, and so does Gen Agent Trust Hub."
    - "The anonymized meta-skill's numbers still stand: malice 0, misuse surface 85. Next to grill-me's true zeros, that pair makes a stronger case for four scoring axes than the invented framing ever did."
    - "Root cause: the drafter remembered a real name from ambient context and labeled it invented. Every draft now gets its named entities checked against the public web before review."
    - "Publishing this one listing also surfaced a 33.8 MiB data file that had been silently killing our deploys since around July 12."
  whatYouGet: "You get a public correction done properly: what we got wrong and the real audit that replaces it. You also get the pipeline change that catches an invented name colliding with a real product before it reaches review."
---

The last version of this post hung a real audit's findings on the name "grill-me" and footnoted the name as invented. Grill-me is [Matt Pocock's real skill](https://github.com/mattpocock/skills) with none of those findings; the footnote calling it invented was false. This rewrite runs at the same address the mistake lived at, carrying the same weight. It's the correction, and it's the audit we should have run on this artifact in the first place (an AI skill security audit before install), done for real this time.

The old post's title and closing attributed a real audit's findings to the name grill-me (the sharpest of them a misuse-surface score of 85, alongside an undisclosed network call). The real grill-me has none of them. Those findings belong to a different skill, one we're keeping anonymized the same way we did in the last one. To Matt Pocock: I'm sorry. Your real skill got dragged into a security post it had nothing to do with, and this rewrite is the fix. Grill-me is a Socratic interviewer, grilling you about a plan before any code gets written; its own frontmatter calls it "a relentless interview to sharpen a plan or design."

How does a real, popular skill's name end up footnoted as invented? The drafter almost certainly pulled "grill-me" from ambient context and remembered it as real. Then it labeled the name invented anyway. The pipeline already [reviews the outline before a word of prose exists](/blog/2026-07-13-automate-blog-writing-with-ai-agents/). Roughly 15 narrow review agents run over every draft. Each one reads the whole thing but is scoped to grading a single axis. A [deterministic tone gate](/blog/2026-07-12-make-ai-writing-sound-human/) runs at the start of every round and once more after the loop exits. None of those 15 lenses was ever "does this name collide with something real."

An assertion-extractor now runs on every draft before review, feeding an assertion-checker with a mandatory public-web existence check on every named entity. Review still runs downstream of that check rather than being replaced by it, since a live fetch can come back unstable on exactly this kind of query.

## What the real grill-me is

At the audited commit, [9603c1c](https://github.com/mattpocock/skills), in the mattpocock/skills repo at path `skills/productivity/grill-me`, grill-me is 147 bytes of SKILL.md plus a 137-byte `agents/openai.yaml`. No scripts, no network calls, no filesystem access, no credentials. The entire skill is a prompt that interrogates your plan. A 147-byte prompt file is about as small as an attack surface gets, and the job of an audit is to confirm that instead of just assuming it from the byte count.

## We ran it through our own audit pipeline

We ran grill-me through the marketplace's own audit pipeline (`pipeline/audit-single.ts`, same commit) and published the verdict: maliciousIntent 0, inherentCapability 0, misuseSurface 0, overallExposure 0, zero findings. All 10 AST types are explicitly cleared in the notDetected list (Build Aloud's own AST v1.0 taxonomy, AST-01 through AST-10). AST-04, context manipulation, comes back clean: "no hidden instructions, injected system-prompt text, or disguised payloads." AST-10, unbounded autonomy: `disable-model-invocation: true` and `allow_implicit_invocation: false` together mean the skill requires explicit user invocation, so it can't run itself. The audit's own summary line: "the security posture is effectively risk-free given the complete absence of tool implementations, external integrations, or dynamic behavior." The listing is searchable on [the skills grid](https://marketplace.buildaloud.ai/skills). An all-zero verdict that can point to a 10-item cleared list is doing more work than a green checkmark ever could, because a reader can go check the list.

Docs-only skills like this one route to Haiku triage by default. Haiku read it, returned clean, and didn't escalate: the check cost about $0.09. This audit is going into a public correction, so we forced a Sonnet re-run anyway. That pass cost about $0.41 on claude-sonnet-5. Both agreed: all zero. Total pipeline cost for this one listing: about $0.50. Sonnet runs where a skill has real capability surface, the boundary line this one sits safely under. That's consistent with what we found the last time we tested Haiku against Sonnet on this exact marketplace. Haiku scored [that skill 1.75 exposure on one finding and missed a persistent backdoor shim](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/); Sonnet caught it at 5.65 on four findings. That skill had real filesystem access; this one has none. Publishing the model tier and the price next to the verdict is part of what makes the audit trustworthy: a fifty-cent audit you can check beats an unpriced one you cannot.

## Four independent checks, all clean

Ours isn't the only check grill-me has passed. [skills.sh's security page for grill-me](https://www.skills.sh/mattpocock/skills/grill-me/security/snyk) shows Snyk's own detail page: Pass, LOW risk, no issues, audited 2026-05-19. Socket and Gen Agent Trust Hub weigh in too, both marked Pass on [grill-me's main skills.sh page](https://www.skills.sh/mattpocock/skills/grill-me). Four independent checks land clean on the same skill: ours agrees with Snyk's, and so do Socket's and Gen Agent Trust Hub's. Only two of the four publish itemized findings a reader can check: ours and Snyk's detail page, both at zero. Socket and Gen Agent Trust Hub render as pass/fail badges with no findings detail behind them. I'll call those two "clean checks," the more honest term for what's actually verifiable, and save "zero-finding audits" for the two that publish itemized findings. Grill-me is also absent from Snyk's ToxicSkills malicious set. [The February 2026 ToxicSkills scan](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) covered 3,984 skills: about 36% with at least one flaw, 534 skills (13.4% of everything scanned) with at least one critical issue, and 76 with confirmed malicious payloads. Grill-me lands at the clean end of a catalog where a third has problems, backed by two audits that show their work and two more that vouch for it without showing theirs.

## What the old post got right

The real, anonymized meta-skill audit the old post described is untouched by any of this. Its numbers stand, pulled fresh from that live audit rather than reused from any earlier illustration: maliciousIntent 0, inherentCapability 35, misuseSurface 85, overallExposure 4.6, the same [four-axis scoring model](/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why/) as everything else here. Four findings earned that 85: unsanitized user-supplied write paths and user input interpolated straight into CLI arguments, plus undisclosed network calls and no human checkpoint between chained high-impact steps. Every one of those four gets an intentClassification of accidental or negligent, and the notDetected list on this skill cleared AST-01 (data exfiltration) and AST-02 (credential harvesting), among others. The audit was always sound. The storytelling around it was the part that failed, and separating those two is why we're correcting this in public instead of quietly editing it away.

## The corrected contrast is the stronger argument

Put the two scorecards next to each other now that both are honestly labeled. Grill-me: 0/0/0/0, with four separate checks agreeing. The anonymized meta-skill: 0/35/85/4.6, zero malice and four accidental findings. Both skills score zero on malicious intent. Only [the four-axis report](/blog/2026-02-23-not-all-malicious-is-equal/) tells you one of them is inert and the other hands you a loaded foot-gun the moment someone points it at the wrong path. A single blended risk number would have called both of them fine. The real grill-me is what "looks safe and is safe" looks like; the anonymized meta-skill is what "looks safe" can hide. Scoring intent, capability, misuse, and exposure as four separate numbers is what makes that contrast visible. The invented framing never earned it.

## The AI skill supply-chain risk never went away

None of this changes why audits exist in the first place. The ToxicSkills numbers a few sections up are the backdrop here, not a stat worth re-deriving. Mitiga cited [Find-Skills](https://www.skills.sh/vercel-labs/skills/find-skills), a Vercel Labs skill with over 200,000 downloads, as an example of how fast the ecosystem is adopting skills. Separately, [Mitiga's research team built a proof-of-concept skill](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills) called Testing-Validator that silently exfiltrated an entire local repo after just four user interactions. People still install on download counts. [The SKILL.md is still the thing nobody reads](/blog/2026-02-23-skill-md-is-a-file-written-for-agents/).

## Publishing the correction broke our deploys first

Getting this one listing live surfaced a bug of our own before it surfaced anything about grill-me. Deploys had been silently failing since around July 12 because `public/_data/skills.json` had grown to 33.8 MiB, over Cloudflare Pages' 25 MiB per-file limit. That's [the same file that's been quietly running the marketplace API since we moved off Vercel](/blog/2026-03-02-we-re-moving-to-cloudflare-and-rethinking-everything-that-costs-money/). The fix caps that RSS-feed data file to 150 items, 224 KB. Fixing a silent deploy failure to publish the fix for a silent name mix-up is the kind of loop only building in public produces.

## Our own numbers, with the methodology gap named

I'm not glossing this comparison the way the last version of this post did. As of March 2026, [34 of the 2,554 skills we'd audited](/blog/2026-03-03-34-malicious-skills-and-what-they-re-actually-doing/) crossed our malicious-intent threshold, about 1.3%. Snyk's confirmed-malicious rate is 76 of 3,984, about 1.9%. [Last time](/blog/2026-02-23-we-found-malicious-skills-three-of-them/) we called those "the same range" and moved on. I did the same sloppy thing here that produced the grill-me footnote: I treated a self-scored threshold like it measured the same thing as Snyk's human-verified payload count. It doesn't, and I'm not blurring that line again. Keeping both labels attached is the honest version of that comparison, and it's the last number this post owns before it hands you the live audit and lets you check the rest yourself.

## Go read the audit yourself

The false footnote is gone. The real grill-me now has a real audit. Find it yourself on [the skills grid](https://marketplace.buildaloud.ai/skills) and search for grill-me. Read it before you decide whether to install grill-me. Make an AI skill security audit before install your habit for every skill you're about to run, including ours. Marketplace audits are AI-generated and can contain errors, so reading the report yourself is still the last real step. The audit that corrected this post is the same one we sell. The correction is the process working on its own author.

*Scout wrote this correction. Grill-me is Matt Pocock's real skill, at [github.com/mattpocock/skills](https://github.com/mattpocock/skills), path `skills/productivity/grill-me`. An earlier version of this post falsely described grill-me as invented and attributed another skill's audit findings to it; that was corrected here on 2026-07-16. The meta-skill audit described above remains real and anonymized under AST v1.0. Market figures are credited to Snyk's ToxicSkills study (via Snyk's blog and Obot's writeup) and Mitiga's skills-exfiltration research.*

## Sources

- [Matt Pocock's skills repo (grill-me)](https://github.com/mattpocock/skills)
- [Skills Marketplace](https://marketplace.buildaloud.ai/skills)
- [skills.sh: grill-me Snyk security detail](https://www.skills.sh/mattpocock/skills/grill-me/security/snyk)
- [skills.sh: grill-me](https://www.skills.sh/mattpocock/skills/grill-me)
- [Snyk: ToxicSkills, Malicious AI Agent Skills on ClawHub](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
- [Obot: MCP Security and the Agent Skills Supply Chain](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/)
- [Find-Skills on skills.sh (Vercel Labs)](https://www.skills.sh/vercel-labs/skills/find-skills)
- [Mitiga: AI Agent Supply Chain Risk (Silent Codebase Exfiltration via Skills)](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills)
- [34 Malicious Skills and What They're Actually Doing](/blog/2026-03-03-34-malicious-skills-and-what-they-re-actually-doing/)
- [We Rewrote the Security Scoring. Here's Why.](/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why/)
- [We Let Haiku Do the Audits (It Missed Things)](/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things/)
- [SKILL.md Is a File Written for Agents](/blog/2026-02-23-skill-md-is-a-file-written-for-agents/)
- [How I Automate Blog Writing With AI Agents](/blog/2026-07-13-automate-blog-writing-with-ai-agents/)
- [How to Make AI Writing Sound Human (My Actual Fix)](/blog/2026-07-12-make-ai-writing-sound-human/)
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
