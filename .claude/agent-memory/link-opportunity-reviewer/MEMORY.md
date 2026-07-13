---
name: link-opportunity-reviewer
description: Precedent ledger for link-opportunity-reviewer — missing-link/citation findings previously flagged and overruled, plus confirmed axis learnings.
---

## Precedents

- **2026-07-13 — automate-blog-writing-with-ai-agents (rewrite, pubDate 2026-07-13):** Do NOT flag missing links to `/blog/2026-07-18-which-claude-model-to-use/` or `/blog/2026-07-19-ai-automation-stack/` or `/blog/2026-07-15-grill-me-what-an-auditor-sees/` in this post even though the outline plans them. All three target posts publish AFTER this post's pubDate — link-integrity-reviewer already gated prior rounds to strip these as false forward-references (bare-text/present-tense mentions of an unpublished post are fine; a live hyperlink to it isn't). A post may only link forward to a not-yet-published post in explicit future tense ("I'll walk through X in a companion post") AND link-integrity has to actually leave that link live — check `docs/blog-link-map.md`'s learned entries for the current resolved state before trusting the outline's planned `links[]` array, since the outline is written before pubDates are locked.
- **Refinement (same audit):** a future-tense forward-link that WAS confirmed correct in an earlier round (e.g. `/blog/2026-07-21-hired-a-team-of-specialists/`, future pubDate 2026-07-21 but phrased "I'll dig into X in a companion post") can still get silently dropped in a later draft rewrite along with the links that correctly got stripped. Don't assume "this link was resolved before" means it's still there — re-check the current draft text every round; a correctly-future-tense forward link missing its `[text](url)` markup is still a real finding.
