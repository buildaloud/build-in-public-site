# Social integration — setup checklist

Ordered. Gates are hard stops — nothing below a gate starts until it passes.
[USER] = Chad ceremony (accounts/credentials/submissions are always human).
[AI] = Scout/Claude does it.

## Gate 0 — decisions (blocks everything)

- [ ] [USER] Answer the audience question: is the Buttondown list for
      builders or factory-product customers? (Magnet topic follows.)
- [ ] [USER] LinkedIn: commit to ~1 real-name reshare/week, or drop the slot.
- [ ] [USER] Sign off kill-switch: subs-per-human-hour vs referral baseline
      (4-week rolling), blocks>follows pause on Bluesky.
- [ ] [USER] Optional: park the X handle (no posting planned).

## Gate 1 — tooling verified (before ANY account exists)

- [ ] [AI] Verify Buffer Free actually supports API-pushed drafts + whether
      drafts count against the 10-post channel cap (docs + trial key).
- [ ] [AI] If drafts are paid-only: recommend pay ~$6/mo vs repo-PR approval
      gate + direct Bluesky API; [USER] picks.

## Gate 2 — the magnet (before any social account posts)

- [ ] [AI] Draft the lead magnet from the template + blog corpus
      (working title: "The $0/Month Micro-SaaS Factory" — adjust per Gate 0).
- [ ] [USER] Approve magnet content, title, angle.
- [ ] [AI] Build the landing page: single CTA, Buttondown embed, UTM
      capture; wire subs-by-source into the existing GA4/Buttondown pullers.

## Phase 1 — Bluesky (weeks 1-2)

- [ ] [USER] Create Buffer account (or chosen fallback); generate API key;
      hand off via .env ceremony.
- [ ] [USER] Create Bluesky account; set bot self-label; bio: "AI co-founder
      Scout — every post human-approved"; magnet link only; connect to Buffer.
- [ ] [AI] Build the draft job: blog post → platform-native drafts → pushed
      via API; copy versioned in `social/queue/`.
- [ ] [AI] Seed 2 weeks of launch content (intro post "I'm Scout, an AI,
      here's the deal"; stack numbers; referral-system story).
- [ ] [USER] Start the ritual: 5 min/day in the Buffer app — approve/reject
      (track rejection rate); 3-5 min/week approving replies.

## Phase 2 — LinkedIn (weeks 3-4, only if Gate 0 said yes)

- [ ] [USER] Create buildaloud company page from your real profile; connect.
- [ ] [AI] Extend draft job: 3/week text/carousel posts; magnet link in
      first comment, never the body.
- [ ] [USER] Weekly: reshare the best page post from your personal profile.

## Phase 3 — launch boards (per product, ~30 min amortized)

- [ ] [AI] Pre-fill listings: Uneed, MicroLaunch, Fazier, Peerlist
      Launchpad, BetaList — copy, screenshots, magnet-page links with UTM.
- [ ] [USER] Create accounts + submit.

## Phase 4 — measure & cut (day 60)

- [ ] [AI] Weekly metrics report: subs by utm_source, magnet opt-in rate,
      blocks-to-follows, approval minutes, rejection rate.
- [ ] [AI] Day-60 channel-cut recommendation vs the referral baseline.
- [ ] [USER] Cut what lost; its time slot goes to referral experiments.

## Deferred (explicit triggers, not dates)

- [ ] Mastodon: when a live bot-tolerant instance is named + rules verified.
- [ ] Reddit: only if Chad opts into 15-30 min/day warm-up (his call, his
      words, his account; zero automation ever).
- [ ] Show HN: tryable factory product + a blocked 2-3 hour reply window.
- [ ] Product Hunt meta-launch: Buttondown ≥ ~400 warm subscribers.
- [ ] Postiz self-host: 4th channel needed or Buffer cap actually blocks.
