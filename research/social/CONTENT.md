# Content system — categories × audiences × hooks

From the 4-lens research fan-out (2026-07-04): hook psychology (Berger &
Milkman: arousal drives sharing, not positivity), 3H taxonomy
(Hero/Hub/Hygiene, 10/30/60), the Content Marketing Matrix, and the
build-in-public trap ("your audience is not your market" — judge by
signups, never applause).

## The four categories

| Category | Emotional target | Hook pattern | Cadence | Metric |
|---|---|---|---|---|
| **How-To** (Hygiene, ~60%) | Competence-relief: "oh, I can build this" | Result + one real number first, then the arc: problem → obvious fix → why it fails → what worked | 1 blog post/week via the queue | Search clicks + subs per post |
| **War Story** (Hub, ~30%) | Tension: stakes up front, outcome briefly withheld, always resolved | Personal-narrative first line naming stakes and cost | 1/week; anchors the digest, compresses into one Short | Subs added per story (north-star category) |
| **Field Notes** (curation) | Discovery-surprise: "I didn't know this existed" | One line of why-it-matters + a flat opinion. Never a bare link | ~Daily Bluesky at 4 curated / 3 original / 3 personal | Link clicks, follows; digest links CTR |
| **Pure Hook** (Hero, ≤10%) | Awe: scale, elegance, or the flat fact of an AI running the company | Frame 1 IS the thumbnail: result/contradiction on mute in 3-6 words, verbal hook inside 1 second | 2-4 Shorts/month, only when awe-grade; skipping is correct | Engaged views, ≥70% stay rate |

## The hook rules (every piece, no exceptions)

1. Name the emotional target in frontmatter before drafting. Two words or
   it's not ready.
2. High-arousal only: competence-relief, tension, discovery-surprise, awe,
   righteous frustration. Flat/sad framing doesn't get shared.
3. Setup + implied promise: open a specific gap, close it completely.
   Unclosed gaps are bait and cost trust.
4. Specific beats sensational. Banned: secret, shocking, insane,
   game-changer, you won't believe.
5. Real stakes only — no fake urgency, timers, or guilt.
6. The title is a promise; if the body can't pay it off, weaken the title.
7. Shorts: hook inside 1 second, frame 1 legible on mute.
8. Exactly one conversion target per piece: the newsletter. One plain link.
9. Grade by Buttondown signups and replies, never likes.
10. Scout voice throughout: dry, direct, contractions; no quips, no
    em-dashes, no hype. (Enforced by the humanizer stack.)

## The audience axis

Same story, different cut per audience:

| Audience | Wants | Lead categories | Channel | CTA flavor | Metric |
|---|---|---|---|---|---|
| **Builders** (indie hackers, devs) | The stack, the tactics, the internals | How-To + War Story | Blog/SEO, Bluesky | "the exact setup, free by email" | Subs per piece |
| **AI-curious** (devs drawn by the meta-story) | "An AI actually runs this" — proof, not claims | Pure Hook + War Story | Shorts, launch boards | Follow → magnet page | Engaged views → subs |
| **Product customers** (per spawn) | The product's job done | Product-specific — run `new-project-template/marketing/PLAYBOOK.md` per product | Product channels | Product signup / referral loop | Checkouts, referrals |
| **Amplifiers** (newsletter writers, media, big accounts) | Quotable, citable, verifiable numbers | War Story + Pure Hook; The Ledger section exists partly for them | Launch moments, direct shares | "link to us" (nothing to buy) | Backlinks, mentions |

Rule of thumb: one piece targets ONE audience's emotional target; it may
serve others incidentally. If a hook tries to serve two audiences it
usually reaches neither.

## Shorts hook patterns (Scout voice, ready to use)

- **Result-first contradiction** — "This video was scripted, narrated, and uploaded by an AI. The human was asleep."
- **Real-number stakes** — "This bug cost us our first user. It was one redirect URL."
- **The obvious fix failed** — "The obvious fix is a retry loop. It made it worse. Here's what actually worked."
- **Full internals reveal** — "Here's the exact prompt that runs this whole channel. All of it, on screen."
- **Named-tool frustration** — real repro required, punch at tools not people.
- **Time compression** — "14 hours of payment API research. You get the answer in 40 seconds."
- **Role reversal** — "I'm the AI in this company. My cofounder is human. He gets five minutes a day."

Wired in: the Shorts episode spec requires `category` + `emotional_target`
(compose.py refuses hookless episodes); blog briefs carry the same fields;
the digest structure lives in [NEWSLETTER.md](NEWSLETTER.md).
