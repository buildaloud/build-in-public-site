---
name: eval-content
description: Evaluate the content pipeline's SEO + brief-writer output. Runs the deterministic graders, the advisory content-judge, and (for the gold briefs) scores both against the seeded-defect manifest. Use to validate the pipeline before trusting it on real posts, or to grade a freshly produced Brief.
---

# eval-content

Two modes.

## Mode A — regression (the eval-of-the-eval)

Validate that the eval itself still works against the gold briefs.

1. Run the deterministic layer + manifest test:
   ```bash
   EVAL_OFFLINE=1 npx vitest run .claude/skills/content-pipeline/eval
   ```
   This asserts: gold-good passes every grader (zero false positives) and each
   offline deterministic seeded defect in `eval/gold/manifest.ts` is caught by its
   grader. Must be green.
2. Online source-URL check (validates the fabricated-source defect, D5):
   ```bash
   npx tsx .claude/skills/content-pipeline/eval/run.ts \
     .claude/skills/content-pipeline/eval/gold/gold-good.brief.md \
     .claude/skills/content-pipeline/eval/gold/gold-bad.brief.md
   ```
   Expect gold-good all ✓; gold-bad's `source-urls-reachable` ✗.
3. Judge-only defects (D7 weak-hook, D8 intent-mismatch/thin-rationale): dispatch
   the **content-judge** subagent on both gold briefs. Expect it to flag the
   judge-only defects on gold-bad and clear gold-good.
4. Print a scorecard mapping each manifest defect → caught / missed, plus any
   gold-good false positives. The eval is healthy only if every seeded defect is
   caught and gold-good is clean.

## Mode B — grade a real Brief

Given a `<brief-file>.brief.md` produced by the pipeline:

1. Deterministic: `npx tsx .claude/skills/content-pipeline/eval/run.ts <brief-file>`
   — any ✗ on a hard grader (schema, keyword-in-title/meta, internal-links,
   banned-terms, source-urls-reachable) is a blocker; fix before publishing.
2. Advisory: dispatch **content-judge** on the brief. Surface its `defect: true`
   checks as revision suggestions (advisory — they inform, they don't block).
3. Report: a per-grader ✓/✗ table + the judge's verdict + an overall
   ship / revise call.

## Notes

- The deterministic graders are the gate; the content-judge is advisory (it answers
  binary yes/no, no flaky 1–5 scores).
- Grading a full draft/post rather than just the Brief? Use
  `.claude/skills/human-tone/eval` too — `tone-grader.ts` gates at **aiScore < 15**
  (required, unchanged). `judge.ts` adds advisory axes on top: `authenticity`,
  `emotion_impact`, and `ai_crutches` (quoted structural AI tells), with a
  code-enforced crutch-density cap on `score` (3-4 crutches → ≤6, 5+ → ≤4). These
  are additive to the aiScore gate, not a replacement. See
  `.claude/skills/human-tone/SKILL.md`.
- `EVAL_OFFLINE=1` skips the network source-URL probe — use it in CI / unit runs;
  run the online step (2) when you need to validate real citations.
- The Brief contract lives in `.claude/skills/content-pipeline/lib/brief-schema.ts`;
  the graders in `.claude/skills/content-pipeline/eval/graders.ts`.
