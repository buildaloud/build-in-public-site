---
id: TD-0027
title: 'permaban "that''s the whole point." — humanizer phrase blocklist (hard fail)'
status: in-progress
priority: P1
rank: 17
area: content
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0027 · permaban "that's the whole point." across all posts

## Why

Chad (2026-07-11): the phrase "that's the whole point." keeps showing up (it was
in the security-review post) and it's a lazy, hollow AI tic. It must be
permanently banned from all written, queued, and future posts — enforced by the
humanizer so it can never slip through the tone gate again.

## What

1. Add a **hard-fail phrase blocklist** to the humanizer tone-grader (a matched
   banned phrase forces `aiScore` past the gate — not a soft weighted signal like
   the existing tells).
2. Seed it with `that's the whole point` (case-insensitive; catch the bare
   variants too — "that is the whole point", "which is the whole point").
3. Apply to **both** the upstream source of truth
   (`~/projects/humanizer/src/tone-grader.ts`) and the ported copy in this repo
   (`.claude/skills/human-tone/eval/tone-grader.ts`) — keep parity, per the
   humanizer-parity principle.
4. Surface banned hits in the grader's `hits` so the tone-fix pass sees exactly
   what to strip.
5. Sweep existing published + queued posts for the phrase and remove it (the
   security post was already fixed; confirm none remain).

## Acceptance

- [ ] A draft containing "that's the whole point." fails the tone gate outright
- [ ] The ban lives in both upstream + ported tone-graders (parity)
- [ ] Banned hits appear in the grader output
- [ ] No published or queued post contains the phrase
