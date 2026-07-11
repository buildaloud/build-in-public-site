---
id: TD-0028
title: 'post + paragraph formulas + a per-section impact-review agent for the content pipeline'
status: open
priority: P1
rank: 18
area: content
pillars: []
blocked-by: []
created: 2026-07-11
---

# TD-0028 · post/paragraph formulas + section-impact review agent

## Why

Chad (2026-07-11): our posts need a repeatable structure and a reviewer that
judges each section on its own merits AND against the whole doc — so we stop
shipping paragraphs that are redundant, inconsistent, off-target, or flat. Right
now the tone gate catches AI-ness but nothing checks whether a section actually
*earns its place* and *lands emotionally* for the target audience.

## What

1. **Post formulas** — a small library of named post structures (e.g. war-story,
   how-I-built-X, contrarian-take, teardown) with the beat sequence each one
   uses. The brief-writer picks a formula per post; the outline follows it.
2. **Paragraph formulas** — named paragraph shapes (hook, evidence, turn,
   payoff, etc.) so each beat has an intended job, not just filler prose.
3. **Section-impact review agent** — a new memory-backed expert (change-factory
   pattern, like fact-checker/link-checker). For each section it judges:
   - **purpose** — what job is this section doing? does it have one?
   - **impact** — is it interesting / emotional / would it resonate with the
     target audience? or is it flat?
   - **concept** — is the idea clear and worth including?
   Then it checks each section **against the whole doc**:
   - **consistent** — no contradictions with other sections
   - **not redundant** — doesn't repeat another section's point
   - **unique / relevant** — earns its place
   - **resonant** — emotionally engaging for the audience, not just correct
4. **Act on the findings** — strip or rewrite anything redundant, inconsistent,
   or low-impact; ensure what remains is interesting/emotional and on-target.
5. **Wire into the pipeline** — a new stage after the draft (near the tone gate /
   content-review), so every post runs the section-impact pass before assembly.

## Acceptance

- [ ] A documented library of post formulas + paragraph formulas exists
- [ ] The brief-writer selects a post formula; the outline reflects it
- [ ] A section-impact review agent exists (memory-backed) and runs per-section
      then whole-doc, emitting concrete strip/rewrite edits
- [ ] The agent is a numbered stage in the content-pipeline skill
- [ ] A test post shows redundant/flat sections flagged and improved

## Notes

Design-worthy — run brainstorming before building. Relates to the existing
tone gate ([[human-tone]]) and the fact/link checker experts (same
memory-backed-expert pattern). TD-0027 (phrase blocklist) is a narrow slice of
the same "raise content quality" goal.
