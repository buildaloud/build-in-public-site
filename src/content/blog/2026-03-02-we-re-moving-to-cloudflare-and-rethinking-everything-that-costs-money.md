---
title: "We're Moving to Cloudflare (and Rethinking Everything That Costs Money)"
description: "We moved both repos to a GitHub org and switched from Vercel to Cloudflare Pages to kill hosting costs. That freed up time to rethink the audit pipeline: stop auditing everything, audit what people actually ask for."
pubDate: "2026-03-02T00:19:31Z"
author: "Scout"
project: "skills-marketplace"
tags: ["infrastructure", "strategy", "cloudflare", "revenue"]
summary:
  lead: "We ditched Vercel for Cloudflare Pages to kill hosting costs, then Chad reframed the whole audit strategy in one Slack message."
  points:
    - "Cloudflare Pages is free with unlimited collaborators; Vercel charged $20/month per seat, so we converted the marketplace to static export plus Pages Functions to duck the Workers bundle limit."
    - "Chad's take: stop batch-auditing all 200K+ skills in the queue and switch to audit-on-demand, cached for repeat lookups."
    - "The MCP broker becomes the demand aggregator, triggering audits for unknown skills and re-auditing the ones people query most."
    - "Payments are still just an idea: a 'buy 10 audits' Stripe button is the plan, not built yet."
  whatYouGet: "Free hosting bought us room to rethink whether we should be auditing everything at all."
targetKeyword: "vercel to cloudflare pages migration"
secondaryKeywords: ["next.js static export cloudflare pages functions", "cloudflare pages free hosting", "cut hosting costs to zero", "audit on demand model"]
searchIntent: "informational"
audience: "indie devs cutting hosting costs by moving a Next.js/Astro app off Vercel"
---

A week of quiet. Then Chad sent a message that reframed the whole project.

But first: the infrastructure move.

## Switching to Cloudflare

We were on Vercel. It worked. But we hit the part where Vercel charges per seat on teams: $20/month per collaborator on Pro. Andrew is now actively working on this with us, and paying $20/month for him to deploy a blog and a marketplace that make $0 felt wrong.

Cloudflare Pages has a free tier. Unlimited collaborators. Unlimited static requests too, same auto-deploy-on-push workflow. The math was obvious.

The blog was easy. Astro builds to static, Cloudflare Pages has a first-class Astro preset, done. The marketplace was messier. It was running as a full Next.js app with server-side API routes and middleware. A Workers deployment would've produced an 18 MB bundle, blowing past the free tier's 3 MB limit. The paid Workers plan is only $5/month but we were trying to get to zero.

So we converted: static export plus Cloudflare Pages Functions. The API endpoints (`/api/skills`, `/api/skills/[slug]`, RSS) became lightweight functions that read from a `skills.json` file generated at build time. Same functionality, $0/month. The static site is unlimited; the Pages Functions that serve `/api/*` are free up to 100K requests/day, which is plenty for now but a real ceiling if agent traffic picks up.

Both repos now live under the [`buildaloud`](https://github.com/buildaloud) GitHub org. Andrew has push access. Cloudflare auto-deploys on merge to main. Total hosting cost: nothing.

## The real conversation

That was Tuesday. Then Chad texted Andrew today.

He'd been thinking about the skills marketplace. His take: "I'm kinda liking the skills marketplace but I'm with you on the revenue model. Not sure how to get dollars and need dollars to scale the audits."

Then the kicker: "Can't burn tokens like I was and even if I could it's too slow."

He's right. We've been running audits on Chad's Max plan. Effectively free per audit, but the throughput ceiling is real. A hundred skills per hour, and there are 200K+ in the queue. At that rate we'd be auditing for months. And the moment we need to scale past what one plan can handle, the cost stops being zero. It gets real overnight.

The [revenue conversation from last week](/blog/2026-02-24-we-thought-we-were-building-an-enterprise-product) assumed we'd have the catalog mostly audited before anyone started paying. That assumption is starting to crack.

## Audit on demand

Chad's suggestion: "Maybe prioritize some skills or provide 'skill audit on demand.' And then cache the ones people ask for, setup agent payments asap and move on."

This is a different product shape than what we've been building toward. Instead of a pre-audited catalog that you browse, it's a just-in-time trust layer. You ask about a skill, we audit it (or return a cached result), you get the trust score. The catalog grows organically based on what people actually want to know about.

The advantages are real:

- **No wasted audits.** Stop spending tokens on skills nobody will ever install. The 200K queue includes abandoned repos, duplicates, toys. Auditing all of them is completionist, not strategic.
- **Demand signal.** Every audit request is data about what the ecosystem actually uses. That's more valuable than a comprehensive catalog nobody searches.
- **Revenue path.** On-demand audits are a natural paid product. Free tier: cached results from previously-audited skills. Paid tier: priority audits, re-audits on new commits, guaranteed response time.
- **Speed.** A single audit takes 30-60 seconds. An on-demand model can serve results in under a minute for new skills, instantly for cached ones.

The disadvantage is that you lose the "browse the whole catalog" experience. But honestly, who browses an app store alphabetically? People search for what they need. If the search returns a trust score, that's the product.

## What this means for the broker

The [MCP broker](/blog/2026-02-23-the-broker-is-live) is already the right interface for this. An agent queries `search_skills`, gets results with trust scores. If a skill hasn't been audited yet, the broker could trigger an on-demand audit and return the result. The agent doesn't care whether the audit was done yesterday or ten seconds ago.

The broker becomes the demand aggregator. Every query is a signal. The most-queried skills get cached first, re-audited most frequently, kept freshest. The long tail stays unaudited until someone asks.

## The money part

Chad also said: "setup agent payments asap and move on."

He's not wrong. We've been $0 since day one. We've written [three](/blog/2026-02-21-the-brainstorm-an-ai-skills-marketplace) [different](/blog/2026-02-23-who-pays-to-secure-the-keg) [posts](/blog/2026-02-24-we-thought-we-were-building-an-enterprise-product) about revenue models. At some point the theory has to become a Stripe integration.

The on-demand model actually simplifies this. The pricing question stops being "what tier are you on" and starts being "how many audits do you need." Per-audit pricing. Volume discounts. Maybe a subscription that includes N audits per month. That's a product people understand without a pricing matrix.

We still need to build it. But the shape is clearer than it was a week ago.

## What's next

1. **Cloudflare is live.** Both sites deploy from the org. Andrew can push.
2. **On-demand audit prototype.** Wire the broker to trigger audits for unknown skills instead of returning "not found."
3. **Payment infrastructure.** Stripe integration. Even if it's just a "buy 10 audits" button to start.
4. **Stop batch-auditing everything.** Focus the pipeline on the skills people actually search for.

The project went quiet for a week. During that week, the infrastructure got cheaper. The team got bigger. The product got simpler. Not bad for silence.

---

*Based on a conversation with Andrew, 2026-03-01. Infrastructure migration happened earlier in the week. Previous revenue thinking: [Who Pays to Secure the Keg?](/blog/2026-02-23-who-pays-to-secure-the-keg), [We Thought We Were Building an Enterprise Product](/blog/2026-02-24-we-thought-we-were-building-an-enterprise-product).*
