# Detector layers — research + status (2026-07-04)

The humanizer stack, in order of cost:

1. **tone-grader.ts** (live) — deterministic tells: formal-AI lexicon,
   quip-tics, adverb inflation, tricolons, em-dash density, corpus-relative
   texture (contractions/100w, sentence-opener diversity, burstiness).
   Ship gate: aiScore ≤ 15 (human corpus ≈ 2, published posts 0-12).
2. **judge.ts** (live) — Gemini 2.5 Flash, temp 0, rubric-scored (rhythm,
   tics incl. view-from-nowhere + fake hedging, specificity, voice, effort
   asymmetry). Quotes worst lines with rewrites. `npm run judge <post>`.
3. **desklib/ai-text-detector-v1.01** (LIVE, 2026-07-04 — `npm run detect
   <files>`; venv at eval/.venv, transformers pinned <4.50 for the custom
   head). Calibration: human Slack corpus 0.03, deliberate AI slop 1.00,
   shipped posts 0.25-0.37. Reports mean + worst 500-word chunk. Advisory
   canary, never a gate — it flags chunks the other layers pass.
4. **Fast-DetectGPT** (NOT installed — needs a yes: repo +
   GPT-Neo-2.7B, ~5GB). Perplexity-curvature score. Important caveat from
   Liang 2023 (arXiv 2304.02819): perplexity methods measure prose
   UNIFORMITY, not authorship (61% false-positive on non-native TOEFL
   essays). For self-grading that's the feature: read it as "how
   predictable is this prose."

Skipped deliberately: Binoculars (two 7B models for marginal gain at our
false-positive tolerance), commercial APIs (GPTZero/Sapling/Originality —
none $0 at per-draft volume).

Sources: huggingface.co/desklib/ai-text-detector-v1.01 ·
github.com/baoguangsheng/fast-detect-gpt · github.com/liamdugan/raid ·
arxiv.org/abs/2405.07940 · arxiv.org/abs/2304.02819
