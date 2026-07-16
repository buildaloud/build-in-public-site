# Static-verb crutch: sit / sits / sitting

**Pattern**: drafter overuses "sit(s)/sitting" as a placement verb ("charcoal sitting behind everything," "sits at the very front"). Confirmed cross-post on 4 distinct drafts (`design-system-with-css-variables`, `which-claude-model-to-use`, `ai-automation-stack`, `automate-blog-publishing-schedule`) — standing per-draft grep on every new post. An earlier `automate-blog-publishing-schedule` revision (2026-07-15) had 4 in one draft: "the site just sat there," "sitting on top of an escape hatch," "no gap sitting idle between runs," "the scheduler sits after all twelve of those stages." A later revision (2026-07-15, second pass) fixed 3 of the 4 ("built on top of," "no idle gap between runs," "comes after all twelve of those stages") — only "the site just sat there" persisted; re-flag that one specifically until it's fixed too.

**Carve-outs (do NOT flag)**:
- Deliberate structural callbacks where two "sits" lines echo each other on purpose (e.g. `which-claude-model-to-use`'s "it sits at the very front of the chain" / "Opus sits at the front") — leave both.
- The idiomatic numeric sense "the blog **sat around** 48 impressions" (hover-around-a-number) is a different usage, not the crutch — don't flag.
- Outline-baked instances (e.g. `content-pipeline.config.json, sitting at the repo root` came from the outline's own facts text) — still worth flagging per the general outline-provenance rule (low-risk elevation), but note the provenance.

**Fix pattern**: swap for a concrete verb matching the image (tucked, parked, topping, opens, used to live) rather than a generic synonym.

**Status**: regenerates fresh each revision even after prior fixes hold — always re-grep, don't assume clean. New instance: `rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill` (2026-07-16) — "a hard global ceiling **sits on top of all of it**" in the closing beat; fix used the post's own "cap" motif as a verb ("caps it all off") rather than a generic swap, worth reusing when the draft already has a thematic noun to verb-ify.
