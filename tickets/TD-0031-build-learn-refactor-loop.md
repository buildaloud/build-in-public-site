---
id: TD-0031
title: 'build→blog→learn→refactor loop — feed research learnings back into the thing we built'
status: open
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
3. **Tell the story in the post** — include the learning *process* (what we
   thought, what we found, what we changed) as part of the build-in-public
   narrative. Don't reproduce a source wholesale — **link around** it and add our
   own take/what-we-did.
4. **Make it a pipeline habit** — a checkpoint in content-pipeline: "did writing
   this teach us something the product should absorb? if so, ticket it + narrate
   it."

## Acceptance

- [ ] The pipeline has a step that captures build-relevant learnings from research
- [ ] A surfaced learning produces a product ticket (or change), not just prose
- [ ] Posts about our own builds narrate the learning process and link (not copy) sources
- [ ] First application: like-button IP-hash learning → a real fingerprint/token
      ticket + honest post update

## Notes

Sibling of the bullshit-detector ([[TD-0030]], which caught the like-button
weakness) and the section-impact reviewer ([[TD-0028]]). This one is about the
*loop back into the product*, not just catching the problem.
