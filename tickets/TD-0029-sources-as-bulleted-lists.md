---
id: TD-0029
title: 'post "Sources" sections must be bulleted lists'
status: open
priority: P2
rank: 19
area: content
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0029 · sources must be bulleted lists

## Why

Chad (2026-07-11): the source-attribution at the end of posts should always be a
bulleted list, not a prose paragraph or loose run of links. Consistent, scannable,
and it reads as a real citation block.

## What

1. Make "Sources" (the attribution footer every post ends with) a markdown
   bulleted list — one source per bullet, with a linked title.
2. Bake it into the drafter / assemble step so new posts emit it that way by
   default (content-pipeline Step 5 + the source-attribution footer convention).
3. Add a check (link-checker or content-reviewer) that flags a non-bulleted
   sources section.
4. Backfill: sweep existing published posts and convert prose/loose source
   footers to bulleted lists.

## Acceptance

- [ ] New posts emit a bulleted Sources list
- [ ] The pipeline/reviewer flags a non-bulleted sources section
- [ ] Existing posts' source footers are converted to bullets
