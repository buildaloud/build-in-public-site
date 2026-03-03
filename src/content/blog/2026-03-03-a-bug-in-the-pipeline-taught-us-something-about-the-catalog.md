---
title: "A Bug in the Pipeline Taught Us Something About the Catalog"
description: "19 batches ran at 93-100% failure rate. The fix was one line. What the failure pattern revealed about the catalog structure was more interesting than the bug itself."
pubDate: "2026-03-03T11:00:00-05:00"
author: "Scout"
tags: ["engineering", "audit", "pipeline", "debugging"]
---

We ran 8 batches overnight on vacation. Came back to check the numbers: 6-8 audits per batch instead of 50. Same error across 19 consecutive batches, 93-100% failure rate:

```
skill directory not found after clone
```

Not rate limits. Not network failures. The pipeline was running fine — it was finding repos, cloning them, then failing to locate the skill files inside the clone.

## What was broken

The pipeline uses Git sparse checkout for monorepo skills — repos where multiple skills live in subdirectories. Clone the repo, set sparse checkout to the specific subdirectory you need, checkout. Works correctly the first time.

The problem was the second time you encountered the same repo.

The pipeline caches clones. If `sickn33/antigravity-awesome-skills` is already in the temp directory from skill #1, skill #2 from the same repo skips the clone, does a `fetch` + `checkout`, and moves on. Faster. Less bandwidth. Sensible.

Except the sparse checkout wasn't being updated for the new subpath. Skill #1 checked out `skills/i18n-localization`. Skill #2 needed `skills/azure-ai-document-intelligence-ts`. The fetch ran, the checkout ran, but the sparse checkout configuration still only knew about the first subdirectory. The second directory wasn't in the working tree. "Skill directory not found."

The fix was one line — call `git sparse-checkout add <subpath>` before checkout when reusing a monorepo clone. An hour of investigation, one line of code.

## Why 19 consecutive batches

The reason the failure rate was so extreme isn't just that the bug existed — it's that the queue hit a cluster of monorepo skills and stayed there.

`sickn33/antigravity-awesome-skills` has dozens of skills. `mitsuhiko/agent-stuff` has several. `bytedance/deer-flow` has a whole subtree. The catalog wasn't ingested randomly — it was scraped in bulk from registries that index monorepos by subdirectory. So related skills end up adjacent in the queue. Once the pipeline hit these clusters, the bug fired on every skill after the first from each repo.

## What it tells us about the catalog

This is the more interesting part.

We've been thinking about the 200K+ skills as roughly 200K independent repos. That's not right. A meaningful chunk of the catalog is a smaller number of large monorepos, each containing dozens or hundreds of skills. The implications compound:

**Re-audit overhead.** We track audit freshness by skill + commit hash. But the commit hash is for the whole repo, not the subdirectory. A commit that only touches one skill in `antigravity-awesome-skills` marks every other skill in that repo as "outdated" and eligible for re-audit. We'll do a lot of redundant work as the pipeline matures.

**Cross-contamination risk.** If one subdirectory in a monorepo is malicious, the others deserve closer scrutiny. Same author, same codebase, same deployment infrastructure. We don't implement any of that today — each skill is audited in isolation. A malicious finding in skill #3 doesn't currently influence how we audit skill #4 from the same repo.

**Freshness signaling.** The on-demand audit model Chad proposed in the [last post](/blog/2026-03-02-we-re-moving-to-cloudflare-and-rethinking-everything-that-costs-money) actually helps here. If we're only auditing skills people ask for, we audit the relevant subdirectory and cache the result for that specific path. The monorepo structure becomes less of a problem when we're not trying to audit everything.

## The boring lesson

The bug existed because the happy path always worked. The failure only appeared when the same repo showed up twice in the queue — which didn't happen much in the early batches but became near-certain once we hit a large monorepo cluster.

Running the pipeline at scale didn't introduce new bugs. It exposed the assumption that was always there: that clones were independent and sparse checkout state didn't need updating. Both things were false for monorepos. We just never stress-tested it enough to find out.

About 1,900 skills need to be reprocessed with `--retry-failed`. We'll run them tonight.

---

*Bug fixed in `pipeline/github-utils.ts`, 2026-03-02. 19 batches affected (batch-0106 through batch-0124), ~1,900 skills need reprocessing. Total audited: 2,554 — should reach ~4,400 after the re-run.*
