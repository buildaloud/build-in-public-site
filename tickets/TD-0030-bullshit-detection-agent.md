---
id: TD-0030
title: 'bullshit-detection agent — catch claims that don''t hold up (usefulness/technical honesty)'
status: in-progress
priority: P1
rank: 20
area: content
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0030 · bullshit-detection agent + audit all posts

## Why

Chad (2026-07-11): some posts make claims that don't survive scrutiny. Example:
the "anonymous like button without login"
(https://buildaloud.ai/blog/2026-07-11-anonymous-like-button-without-login/) is
sold as privacy-preserving and fair, but it hashes the IP — so everyone behind
one IP (a household, office, cafe, CGNAT) is blocked after the first like. The
feature is weaker than the post implies. That's a **usefulness / technical
honesty** gap: not a wrong fact and not an AI-tone tic, but a claim that
overstates what the thing actually does.

This is distinct from the existing checkers:
- **fact-checker** — is the stated fact true / sourced?
- **link-checker** — does the link resolve to the right target?
- **section-impact reviewer** ([[TD-0028]]) — does each section earn its place / land?
- **bullshit-detector (this)** — does the post's *technical claim* actually hold
  up? does the thing do what we say it does, with the limitations named honestly?

## What

1. **New memory-backed agent** (change-factory pattern, like fact-checker):
   reads a post's technical claims and stress-tests them against how the thing
   really works — surfacing overstated benefits, unstated failure modes, and
   "sounds good but doesn't actually work that way" gaps.
2. For each flagged claim it returns: the claim, why it's weaker/false than
   stated, and a suggested honest reframing (or a fix to the underlying thing).
3. **Source fidelity** (Chad, 2026-07-11): the detector also reads the post's
   cited sources and checks we're **quoting them correctly and understanding
   them correctly** — no misread stat, no quote lifted out of context, no claim
   the source doesn't actually support. (Overlaps fact-checker on "is it true";
   this axis is "does our post faithfully represent what the source said".)
4. **Wire into the pipeline** as a stage alongside fact/link check.
4. **Audit all existing posts** for bullshit — published + queued — starting with
   the anonymous-like-button post (name the IP-hash limitation honestly, or fix
   the mechanism).

## Acceptance

- [ ] A memory-backed bullshit-detection agent exists and runs in the pipeline
- [ ] It flags overstated/incorrect technical claims with an honest reframe
- [ ] All existing posts audited; the like-button post's IP-hash caveat is
      stated honestly (or the like mechanism is improved)

## Notes

Ties to the like-endpoint work ([[like-endpoint-pending-activation]]) — the
mechanism itself may deserve a fix (per-device token, not IP hash), not just an
honest caveat.
