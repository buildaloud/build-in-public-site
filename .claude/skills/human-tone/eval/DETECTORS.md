# Detector layers — research + status (2026-07-04)

The humanizer stack, in order of cost:

1. **tone-grader.ts** (live) — deterministic tells: formal-AI lexicon,
   quip-tics, adverb inflation, tricolons, em-dash density, corpus-relative
   texture (contractions/100w, sentence-opener diversity, burstiness).
   Ship gate: aiScore ≤ 15 (human corpus ≈ 2, published posts 0-12).
2. **judge.ts** (live) — Gemini 2.5 Flash, temp 0, rubric-scored (rhythm,
   tics incl. view-from-nowhere + fake hedging, specificity, voice, effort
   asymmetry). Quotes worst lines with rewrites. `npm run judge <post>`.
3. **desklib/ai-text-detector-v1.01** (NOT installed — needs a yes from
   Chad: ~1.5GB DeBERTa download from HuggingFace, MIT, runs on MPS/CPU).
   Best HF-downloadable detector on the RAID benchmark; supervised, so it
   fails differently than our heuristics. Advisory canary, never a gate.
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
