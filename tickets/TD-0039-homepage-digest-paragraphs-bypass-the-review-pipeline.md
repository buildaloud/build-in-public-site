---
id: TD-0039
title: Homepage digest paragraphs bypass the review pipeline — route them through tone gate + assertion audit
status: open
priority: P2
rank: 6
area: content
pillars: []
blocked-by: []
created: 2026-07-16
---

# TD-0039 · Homepage digest paragraphs bypass the review pipeline

## Why

Chad (2026-07-16): "are we auditing the ai-summaries on the homepage also?
Because when we publish posts, those also need to be checked through our
content-review pipeline as well."

The "THE LAST 30 DAYS" rolling digest (`src/data/digests.json`, rendered by
`src/pages/index.astro`) is reader-facing prose authored by a lone Sonnet
agent at publish time (content-pipeline Step 9, "Rolling digest"). It never
passes the tone gate, the reviewer army, or the assertion audit. This is the
same defect class the one-artifact change (build-aloud 4446bbe / package
e33775a) fixed for post frontmatter: prose a reader sees, shipped unreviewed.
The grill-me incident showed what unreviewed assembly prose can do.

Post frontmatter (title/description/summary) is now covered — authored in
the draft, reviewed by every loop. The digest entry is the remaining
unreviewed reader-facing artifact. (Hero alt text rides in frontmatter
already; the like-button and stats surfaces are data, not authored prose.)

## What

1. When a digest entry is authored (at post publish), gate it before it
   lands in `digests.json`:
   - deterministic tone gate (`scoreText` — same aiScore<15 + banned=0 bar),
   - one assertion-extractor → assertion-checker pass (entries make claims
     about several posts at once — exactly where composite drift happens),
   - the digest-expert agent's existing drip-timing check (no describing
     posts that aren't live yet).
2. During the rewrite queue, digest entries were NOT regenerated. After the
   queue finishes, re-score every SHIPPED digest entry in `digests.json`
   (tone + assertion pass over the current window's entries); fix what fails.
3. Port the gate to the package: Step 9's "Rolling digest" paragraph gets
   the same treatment as the structured summary got in e33775a.

## Acceptance

- No digest entry can land in `digests.json` without passing tone gate +
  assertion audit (documented in SKILL.md Step 9, both package and
  build-aloud installed copy).
- Existing shipped entries re-scored once; failures fixed and committed.
- digest-expert agent file references the gate so future authors follow it.
