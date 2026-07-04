# Per-product marketing playbook

Run this for every spawned product, before writing any marketing copy.
It's the pattern-match version of the buildaloud social strategy
(`build-aloud/research/social/STRATEGY.md`); same rules, product-specific
answers. Output: a filled copy of this file in the product repo's
`marketing/` directory.

## 1. Audience hypothesis (30 min, do first)

- Who has the problem this product solves? Be narrower than feels right.
- Are they builders/devs, professionals, or consumers? (This single answer
  reroutes every channel below.)
- Where do they already gather? List 3-5 real watering holes (subreddits,
  Discords, newsletters, forums) — verify they exist and are alive.

## 1b. Category + hook per piece

Every piece of content gets a `category` and a two-word `emotional_target`
from `build-aloud/research/social/CONTENT.md` (how-to / war-story /
field-notes / pure-hook × competence-relief / tension / discovery-surprise
/ awe / righteous-frustration). One audience per piece. The Shorts
compositor enforces this; briefs and posts carry it in frontmatter.

## 2. Magnet

- One specific free asset the audience wants ("the X checklist", "the Y
  template") — never "subscribe for updates."
- Landing page: single CTA, Buttondown embed with the product's tag,
  UTM capture. Target 3-8% opt-in on warm traffic; expect <1% on cold.

## 3. Channel fit (default matrix)

| Channel | Use when | Automation |
|---|---|---|
| Launch boards (Uneed, MicroLaunch, Fazier, Peerlist, BetaList, Dev Hunt) | Always — durable listings + backlinks, ~30 min once | AI pre-fills, human submits |
| Bluesky via Scout/buildaloud | Audience is dev/indie | queue+approve |
| LinkedIn page + reshare | Audience is professional buyers | queue+approve + human reshare |
| Reddit (human-only) | A live subreddit matches; feedback-request framing | listening briefs only, human posts |
| Show HN | Product is genuinely tryable (repo/app, no signup wall) | none — human, 2-3h reply window |
| Product Hunt | Warm list ≥ ~400 relevant subscribers | none — human ceremony |
| SEO/blog | Always, compounding | AI drafts, human approves |

Hard rules regardless of product: no AI-posted content on HN or Reddit, no
browser-automation posting anywhere, no Scout personal profile on LinkedIn,
accounts + credentials are always human ceremonies.

## 4. Measure & kill

- Every link carries `utm_source`; subs-by-source lands in the shared
  stats pullers weekly.
- Kill-switch: subs-per-human-hour vs the referral loop's baseline,
  4-week rolling window. Cut losers at day 60; their time slot goes to
  referral experiments.
- Write down "expect ~zero social conversion for 90 days" so the cut runs
  on data, not hope.

## 5. Launch sequence

1. Magnet page live with attribution.
2. Launch-board circuit (week 1).
3. Referral loop announcement to the existing list.
4. Community feedback posts (human, own words) where §1 found real
   watering holes.
5. Show HN / PH only when their triggers are met (§3).
