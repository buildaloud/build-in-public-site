import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreText, type ToneMetrics } from './tone-grader.ts';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..', '..', '..');

function stripFrontmatter(md: string): string {
  const m = md.match(/^---\n[\s\S]*?\n---\n?/);
  return (m ? md.slice(m[0].length) : md).trim();
}

function mean(ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0) / (ns.length || 1);
}

// --- Human class: the private corpus (gitignored) ---
const corpusDir = join(here, 'corpus');
const humanScores: number[] = [];
const humanAgg: Record<string, number[]> = { emDashPer1k: [], tricolons: [], aiVocab: [], hedges: [], signposts: [] };
if (existsSync(corpusDir)) {
  for (const f of readdirSync(corpusDir).filter((f) => f.endsWith('.txt'))) {
    for (const line of readFileSync(join(corpusDir, f), 'utf8').split('\n')) {
      const t = line.trim();
      if (t.length < 25) continue;
      const m = scoreText(t);
      humanScores.push(m.aiScore);
      for (const k of Object.keys(humanAgg)) humanAgg[k].push((m as any)[k]);
    }
  }
}

// --- AI class: the current published drafts ---
const blogDir = join(repo, 'src', 'content', 'blog');
const drafts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md') && f >= '2026-06-16')
  .map((f) => {
    const body = stripFrontmatter(readFileSync(join(blogDir, f), 'utf8'));
    return { slug: f.replace(/\.md$/, ''), m: scoreText(body) };
  })
  .sort((a, b) => b.m.aiScore - a.m.aiScore);

console.log('\n=== AI-TONE EVAL ===\n');
console.log(`Human corpus (${humanScores.length} snippets)  avg aiScore: ${mean(humanScores).toFixed(1)}`);
console.log(`  em-dash/1k: ${mean(humanAgg.emDashPer1k).toFixed(2)}  tricolons: ${mean(humanAgg.tricolons).toFixed(2)}  ai-vocab: ${mean(humanAgg.aiVocab).toFixed(2)}`);
console.log(`\nDrafts (${drafts.length}) ranked most-AI first  avg aiScore: ${mean(drafts.map((d) => d.m.aiScore)).toFixed(1)}\n`);
console.log('score  emˣ/1k  tri  hedge  sign  aiVoc  neg  burst  post');
for (const { slug, m } of drafts) {
  console.log(
    `${String(m.aiScore).padStart(4)}  ${m.emDashPer1k.toFixed(1).padStart(5)}  ${String(m.tricolons).padStart(3)}  ${String(m.hedges).padStart(5)}  ${String(m.signposts).padStart(4)}  ${String(m.aiVocab).padStart(5)}  ${String(m.negParallel).padStart(3)}  ${m.burstiness.toFixed(1).padStart(5)}  ${slug.slice(11)}`,
  );
}
console.log('\nTop tells in the worst 3 drafts:');
for (const { slug, m } of drafts.slice(0, 3)) {
  const tells = Object.entries(m.hits).filter(([, v]) => v.length).map(([k, v]) => `${k}(${v.length})`).join(', ');
  console.log(`  ${slug.slice(11)}: ${tells || 'none'}`);
}
console.log('');
