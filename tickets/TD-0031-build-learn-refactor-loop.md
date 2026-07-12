---
id: TD-0031
title: 'build→blog→learn→refactor loop — feed research learnings back into the thing we built'
status: in-progress
priority: P1
rank: 21
area: content
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0031 · when blogging teaches us something, refactor the thing + tell that story

## Why

Chad (2026-07-11): when we build something and then blog about it, the research
we do *for the post* often teaches us something that should change the thing we
built. Example: writing the anonymous-like-button post surfaced **audio /
device fingerprinting** as a real way to dedup likes per-device without login —
which is strictly better than the IP-hash we shipped (that blocks everyone
behind one IP). Today that learning dies in the draft. It should loop back into
the product.

## What

1. **Detect the learning** — during the content pipeline (research / draft), when
   a post about something we built surfaces a better approach or a real
   limitation, flag it as a product-learning, not just post copy.
2. **Feed it back** — open a ticket (or make the change) to refactor the built
   thing based on the learning. E.g. like-button → per-device fingerprint or
   signed per-device token instead of IP hash ([[like-endpoint-pending-activation]]).
3. **Pause the post, don't ship the wrong thing** (Chad, 2026-07-11): when the
   research reveals the shipped thing is worse than a known-better approach, we do
   **not** publish the post narrating the flaw. Instead: **hold the post** (draft),
   **link it to the product ticket**, ship the fix, then rewrite + republish. The
   post's own framing becomes "researching this, we learned X — it's a better way,
   so we changed it." Link around sources; don't copy them.
4. **Make it a pipeline habit** — a checkpoint in content-pipeline: "did writing
   this teach us something the product should absorb? if so, ticket it, PAUSE the
   post, and rewrite once the fix lands."

## Acceptance

- [ ] The pipeline has a step that captures build-relevant learnings from research
- [ ] A surfaced learning produces a product ticket (or change), not just prose
- [ ] When research reveals a better approach, the post is PAUSED (draft) and linked
      to the fix ticket — not shipped narrating the flaw
- [ ] First application: like-button IP-hash learning → a real per-device-token fix
      ([[TD-0032]]), the post paused + linked, then rewritten honest once the fix lands

## Notes

Sibling of the bullshit-detector ([[TD-0030]], which caught the like-button
weakness) and the section-impact reviewer ([[TD-0028]]). This one is about the
*loop back into the product*, not just catching the problem.
