---
id: TD-0026
title: 'per-project branding — each product gets its own design language, not default mint/charcoal'
status: open
priority: P2
rank: 16
area: build
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0026 · per-project branding — stop defaulting every product to mint/charcoal

## Why

Chad (2026-07-11): mint-on-charcoal is fine for what exists, but it shouldn't be
the automatic look for every new microsaas. Each product should get its own
design language that fits its purpose, audience, and feel — arrived at through
the frontend-design skill plus light market/positioning research, not copied
from the template default.

## What

1. **Bootstrap step**: when `lifecycle up <product>` (or the idea→build handoff)
   spins up a new product, run a branding pass — frontend-design skill informed
   by the product's audience + positioning — that outputs a small design-guideline
   doc (palette hexes, type pairing, voice/look-and-feel one-liner) and the four
   theme vars for `products.ts`.
2. **Persist it**: each product carries its own `theme` (already supported —
   `ProductTheme` in `src/config/products.ts`) plus a committed
   `docs/brand/<product>.md` guideline the drafter/designer can consult.
3. **Template default stays** mint/charcoal as a neutral fallback for
   un-branded scaffolds; the point is that a real product overrides it
   deliberately, with a rationale on file.

## Acceptance

- [ ] A new product can be created with its own palette + type + guideline doc, not the template default
- [ ] The branding pass is a documented step in the product-bootstrap flow
- [ ] `products.ts` theme + a `docs/brand/<product>.md` exist per branded product
