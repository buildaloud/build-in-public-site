# Social integration — strategy

**Verdict: CONDITIONAL-GO.** Build the social layer in the narrow shape the
research supports — Bluesky-first, queue+approve through a scheduler,
everything pointed at one lead magnet — not a 7-platform blitz. Marginal
cash cost ≈ $0; the scarce resource is Chad's 5 min/day, and every channel
must out-earn the live referral loop ($0.17/sub, 32% conversion) in
subs-per-human-hour or lose its slot.

Amended per the devil's-advocate pass (see RESEARCH.md §amendments).

## Platform sequence

1. **Bluesky — primary, week 1-2.** Scout's home. Bot self-label, bio says
   "AI co-founder — every post human-approved." 1 post/day, original posts
   only. Never automated replies/likes/follows (policy + the actual
   block-trigger). 3-5 min/week of Chad-approved replies, or Scout is
   declared broadcast-only in the bio.
2. **LinkedIn — conditional, week 3-4.** ONLY if Chad commits to ~1 real-name
   personal reshare/week before the company page is created (pages reach
   1.6% of followers; his reshare is the product). Company page via
   scheduler; text/carousels; links in first comment. Never a Scout profile.
3. **Mastodon — deferred.** Until a specific live bot-tolerant instance is
   named and its rules verified. Then it's a free cross-post tap. Disposable.
4. **Indie launch boards — per product, amortized.** Uneed, MicroLaunch,
   Fazier, Peerlist Launchpad, BetaList: Scout pre-fills, Chad submits
   (~30 min per product). Durable listings + backlinks; replaces PH for now.
5. **Reddit — human-only, optional, outside the budget.** Chad's account,
   Chad's words; Scout drafts are private raw material only. Warm-up
   (30d, 100 karma, 9:1) costs 15-30 min/day — Chad's call whether that
   ever happens.
6. **Hacker News — one shot, later.** Human-only (AI comments are banned).
   Show HN when a factory product is genuinely tryable AND Chad can block
   2-3 hours for replies. The blog itself is off-topic — don't try.
7. **Product Hunt — the 400-subscriber trigger.** One meta-launch ("an
   openly-AI agent runs a $0/month SaaS factory") after Buttondown passes
   ~400 warm subs. Launching smaller burns the shot in PH's most saturated
   category.
8. **Not doing:** X (parked by decision — consider registering the handle),
   AI-first networks (Moltbook is Meta-acquired + spoof-tainted; Chirper/
   Butterflies have no buyers — at most one Scout novelty post about them).

## Content engine

One lead magnet, everywhere: **"The $0/Month Micro-SaaS Factory"**
(checklist/guide distilled from the template + blog corpus), on a dedicated
landing page tuned for the 3-8% opt-in band. Every bio links only there;
every post footer sells concrete value ("the exact stack + checklist, free
by email") — never "subscribe to my newsletter."

Flow: each blog post → Scout repurposes into platform atoms (1/day Bluesky:
a decision, a number, a failure — receipts included; 3/week LinkedIn).
Scout's AI identity is the hook, stated up front. Referral wins feed social
("reader X earned Y credits"); the weekly digest resurfaces the best thread.

## Automation architecture

- **Source of truth**: post copy versioned in this repo
  (`social/queue/*.md`, frontmatter: platform, date, UTM link). The
  scheduler is a disposable delivery layer.
- **Pipeline**: Scout drafts via scheduler API → Chad approves in the
  mobile app (that IS the gate) → scheduler publishes via official platform
  APIs. Primary candidate: Buffer Free (API rebuilt 2025, drafts + 3
  channels + 3,000 req/mo at $0) — **verify drafts work on Free before any
  account ceremony**; fallbacks: pay ~$6/mo, or repo-PR-as-approval-gate +
  direct Bluesky API (`com.atproto.repo.createRecord`, official bot
  template).
- **Browser automation posts NOWHERE.** It's a ToS violation on LinkedIn
  and ban-bait everywhere. Browsers are for human ceremonies only: account
  creation, credential handoff, launch-board submissions, analytics reads.
- **Attribution**: per-platform utm_source on every link → magnet page →
  Buttondown + GA4 (stats pullers already exist) → weekly subs-by-source.
- **Graduation**: self-hosted Postiz (~$6/mo) only when a 4th channel or
  Reddit automation is sanctioned or Buffer's queue cap actually blocks;
  approval gate moves upstream (git PR) since Postiz has no draft state.
- **Account creation and credentials are always [USER] ceremonies.**

## Metrics & kill-switch

- Buttondown subs/week **by utm_source** — the only number that matters.
- **Subs-per-human-hour vs the referral baseline** — the kill-switch
  denominator, 4-week rolling window. A cut channel's time slot goes to
  referral experiments, pre-committed.
- Magnet page opt-in rate (target 3-8%; under 2% = fix the page first).
- Bluesky blocks-to-follows (Attie early warning; blocks > follows = pause).
  Blocklisting is permanent — this alarm fires late by design, so behavior
  rules (no automated engagement) are the real protection.
- Chad's actual approval minutes/day + rejection rate (0% rejections for
  two weeks = rubber-stamping = the safeguard is theater).
- Newsletter open rate ≥50% guard (referral mechanics can stuff the list).
- Written expectation: **~zero social conversion for the first 90 days.**
  The day-60 channel-cut runs on data against that baseline, not hope.

## Open decisions (Chad)

1. **Who is the list for** — builders (the meta-story audience) or factory-
   product customers? The magnet's topic and every platform choice follow.
2. **LinkedIn yes/no** — weekly real-name reshares to a network that
   includes the day job: commit or drop the slot.
3. **Reddit warm-up** — 15-30 min/day of genuine participation: in or out?
4. **X handle** — not posting, but park @buildaloud before someone else does?
5. **Kill-switch numbers** — sign off on subs-per-hour-vs-referral +
   blocks>follows before the first account exists.
