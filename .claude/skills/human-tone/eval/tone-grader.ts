// Deterministic "AI-ness" scorer for prose. Higher aiScore = reads more like AI.
// Signals are drawn from the tone research + the Build Aloud human corpus
// (Chad's Claude prompts + Slack). No single signal is conclusive; the score
// is a weighted cluster. Pair with the human-tone skill for the fix pass.

export interface ToneMetrics {
  words: number;
  sentences: number;
  emDashPer1k: number;
  tricolons: number;
  hedges: number;
  signposts: number;
  aiVocab: number;
  copulaAvoid: number;
  quips: number;
  negParallel: number;
  fromXtoY: number;
  transitionsPer1k: number;
  burstiness: number; // stdev of sentence word-counts; LOW is AI-like
  aiScore: number; // 0-100, higher = more AI
  hits: Record<string, string[]>;
}

const HEDGES = [
  "it's worth noting", 'it is worth noting', 'arguably', 'potentially',
  'it could be said', 'it is important to note', "it's important to note",
  'that said', 'to be fair', 'in many ways', 'one might argue',
];
const SIGNPOSTS = [
  "let's dive in", "let's dive into", 'in this section', 'in this post',
  'in conclusion', 'to sum up', 'in summary', 'first and foremost',
  'without further ado', 'at the end of the day', 'when it comes to',
];
const AI_VOCAB = [
  'delve', 'delved', 'delving', 'tapestry', 'underscore', 'underscores',
  'leverage', 'leverages', 'leveraging', 'showcase', 'showcases',
  'meticulous', 'meticulously', 'intricate', 'seamless', 'seamlessly',
  'robust', 'realm', 'testament', 'landscape', 'navigate', 'navigating',
  'foster', 'crucial', 'vital', 'pivotal', 'harness', 'elevate', 'unlock',
  'empower', 'ever-evolving', 'deep dive', 'game-changer', 'cutting-edge',
  'utilize', 'utilizing', 'commence', 'plethora', 'myriad', 'boasts',
];
const COPULA_AVOID = ['serves as', 'stands as', 'acts as a', 'boasts a', 'boasts an'];
// The OTHER AI failure mode: try-hard internet-quip flavor. Formal-AI tells
// above; these are punchy-AI tells (2024-26 vintage). Caught by human review
// ("we're still saying stupid stuff like 'no mocks no mercy'"), now scored.
const QUIPS = [
  'the receipts', 'with receipts', 'no notes', "chef's kiss", 'hits different',
  'no mercy', 'let that sink in', 'rent free', "it's giving", 'understood the assignment',
  'we love to see it', 'living my best', 'built different', '*mic drop*', 'mic drop',
  'and honestly?', 'chaotic energy', 'main character', 'plot twist:', 'spoiler:',
  'spoiler alert', 'the math is mathing', 'stay tuned', 'buckle up', 'wild ride',
  'the money shot', 'and yeah,', 'not gonna lie', 'ngl', 'low-key', 'lowkey',
];
const TRANSITIONS = ['furthermore', 'moreover', 'additionally', 'consequently', 'nevertheless', 'notably', 'importantly'];

function countMatches(text: string, phrases: string[]): string[] {
  const lower = text.toLowerCase();
  const hits: string[] = [];
  for (const p of phrases) {
    let i = 0;
    while ((i = lower.indexOf(p, i)) !== -1) { hits.push(p); i += p.length; }
  }
  return hits;
}

function regexHits(text: string, re: RegExp): string[] {
  return (text.match(re) ?? []).map((m) => m.trim());
}

export function scoreText(raw: string): ToneMetrics {
  const text = raw.trim();
  const words = (text.match(/\b[\w'-]+\b/g) ?? []).length || 1;
  const sentenceParts = text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
  const sentLens = sentenceParts.map((s) => (s.match(/\b[\w'-]+\b/g) ?? []).length).filter((n) => n > 0);
  const sentences = sentLens.length || 1;

  const emDashes = regexHits(text, /—/g).length + regexHits(text, / -- /g).length * 0; // count true em-dashes only
  const tricolonHits = regexHits(text, /\b[\w'-]+, [\w'-][^,.]*, and [^,.]+/gi);
  const hedgeHits = countMatches(text, HEDGES);
  const signpostHits = countMatches(text, SIGNPOSTS);
  const aiVocabHits = countMatches(text, AI_VOCAB.map((w) => ' ' + w)).map((s) => s.trim());
  const copulaHits = countMatches(text, COPULA_AVOID);
  const quipHits = countMatches(text, QUIPS);
  const negParallelHits = [
    ...regexHits(text, /it'?s not (just |only )?[^,.]+,? (but|it'?s) /gi),
    ...regexHits(text, /\bnot (just|only) [^,.]+,? but\b/gi),
  ];
  const fromToHits = regexHits(text, /\bfrom [^,.]{3,40} to [^,.]{3,40}/gi);
  const transitionHits = countMatches(text, TRANSITIONS.map((w) => w + ',')).concat(
    countMatches(text, TRANSITIONS.map((w) => w + ' ')),
  );

  const mean = sentLens.reduce((a, b) => a + b, 0) / sentences;
  const variance = sentLens.reduce((a, b) => a + (b - mean) ** 2, 0) / sentences;
  const burstiness = Math.sqrt(variance);

  const per1k = (n: number) => (n / words) * 1000;
  const emDashPer1k = per1k(emDashes);
  const transitionsPer1k = per1k(transitionHits.length);

  // Weighted AI score. Density signals scaled per-1k; structural signals capped.
  let score = 0;
  score += Math.min(emDashPer1k * 6, 22);            // em-dash overuse
  score += Math.min(tricolonHits.length * 4, 16);     // rule-of-three
  score += Math.min(hedgeHits.length * 5, 15);
  score += Math.min(signpostHits.length * 6, 12);
  score += Math.min(aiVocabHits.length * 5, 20);
  score += Math.min(copulaHits.length * 4, 8);
  score += Math.min(quipHits.length * 6, 18);         // quip-tic flavor
  score += Math.min(negParallelHits.length * 6, 12);
  score += Math.min(fromToHits.length * 4, 8);
  score += Math.min(transitionsPer1k * 3, 10);
  if (sentences >= 4 && burstiness < 6) score += (6 - burstiness) * 2.5; // low burstiness penalty

  return {
    words, sentences,
    emDashPer1k: +emDashPer1k.toFixed(2),
    tricolons: tricolonHits.length,
    hedges: hedgeHits.length,
    signposts: signpostHits.length,
    aiVocab: aiVocabHits.length,
    copulaAvoid: copulaHits.length,
    quips: quipHits.length,
    negParallel: negParallelHits.length,
    fromXtoY: fromToHits.length,
    transitionsPer1k: +transitionsPer1k.toFixed(2),
    burstiness: +burstiness.toFixed(2),
    aiScore: Math.round(Math.min(score, 100)),
    hits: {
      emDash: emDashes ? [`${emDashes}×`] : [],
      tricolon: tricolonHits, hedges: hedgeHits, signposts: signpostHits,
      aiVocab: aiVocabHits, copulaAvoid: copulaHits, quips: quipHits, negParallel: negParallelHits,
      fromXtoY: fromToHits,
    },
  };
}
