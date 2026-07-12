import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreText, type ToneMetrics } from './tone-grader.ts';
import { judgeText, type JudgeResult } from './judge.ts';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..', '..', '..');

function stripFrontmatter(md: string): string {
  const m = md.match(/^---\n[\s\S]*?\n---\n?/);
  return (m ? md.slice(m[0].length) : md).trim();
}

function mean(ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0) / (ns.length || 1);
}

export type JudgeOutcome = JudgeResult | { error: string } | null;

/**
 * Optional judge pass, gated on GEMINI_API_KEY. Mirrors judge.ts's own
 * defensive posture: no key -> null (regex-only, no network attempt); a
 * judge failure is caught and surfaced as { error } instead of thrown, so
 * it never takes down the regex scoring loop that calls it per post.
 */
export async function runJudgePass(
  body: string,
  opts: { key?: string; judge?: typeof judgeText } = {},
): Promise<JudgeOutcome> {
  const key = opts.key ?? process.env.GEMINI_API_KEY;
  if (!key) return null;
  const judge = opts.judge ?? judgeText;
  try {
    return await judge(body, key);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

async function main() {
  const geminiKey = process.env.GEMINI_API_KEY;

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
  const draftFiles = readdirSync(blogDir).filter((f) => f.endsWith('.md') && f >= '2026-06-16');
  const drafts: { slug: string; m: ToneMetrics; judge: JudgeOutcome }[] = [];
  for (const f of draftFiles) {
    const body = stripFrontmatter(readFileSync(join(blogDir, f), 'utf8'));
    const m = scoreText(body);
    const judge = await runJudgePass(body, { key: geminiKey });
    drafts.push({ slug: f.replace(/\.md$/, ''), m, judge });
  }
  drafts.sort((a, b) => b.m.aiScore - a.m.aiScore);

  console.log('\n=== AI-TONE EVAL ===\n');
  console.log(`Human corpus (${humanScores.length} snippets)  avg aiScore: ${mean(humanScores).toFixed(1)}`);
  console.log(`  em-dash/1k: ${mean(humanAgg.emDashPer1k).toFixed(2)}  tricolons: ${mean(humanAgg.tricolons).toFixed(2)}  ai-vocab: ${mean(humanAgg.aiVocab).toFixed(2)}`);
  console.log(`\nDrafts (${drafts.length}) ranked most-AI first  avg aiScore: ${mean(drafts.map((d) => d.m.aiScore)).toFixed(1)}\n`);
  if (geminiKey) console.log('Judge pass: ENABLED (GEMINI_API_KEY set) — Gemini score/emotion/crutches shown per post.\n');
  console.log('score  emˣ/1k  tri  hedge  sign  aiVoc  neg  burst  post');
  for (const { slug, m, judge } of drafts) {
    console.log(
      `${String(m.aiScore).padStart(4)}  ${m.emDashPer1k.toFixed(1).padStart(5)}  ${String(m.tricolons).padStart(3)}  ${String(m.hedges).padStart(5)}  ${String(m.signposts).padStart(4)}  ${String(m.aiVocab).padStart(5)}  ${String(m.negParallel).padStart(3)}  ${m.burstiness.toFixed(1).padStart(5)}  ${slug.slice(11)}`,
    );
    if (judge && 'error' in judge) {
      console.log(`       judge: ERROR — ${judge.error}`);
    } else if (judge) {
      const verdict = judge.would_a_human_type_this ? 'pass' : 'FAIL';
      console.log(`       judge: ${judge.score}/10  emotion ${judge.emotion_impact}/10  crutches ${judge.ai_crutches.length}  would-a-human-type-this: ${verdict}`);
      if (!judge.would_a_human_type_this || judge.emotion_impact <= 3) {
        const worst = judge.worst_lines[0];
        console.log(`       judge flag: low signal — worst line: ${worst ? `"${worst.quote}" (${worst.why})` : 'n/a'}`);
      }
    }
  }
  console.log('\nTop tells in the worst 3 drafts:');
  for (const { slug, m } of drafts.slice(0, 3)) {
    const tells = Object.entries(m.hits).filter(([, v]) => v.length).map(([k, v]) => `${k}(${v.length})`).join(', ');
    console.log(`  ${slug.slice(11)}: ${tells || 'none'}`);
  }
  console.log('');
}

if (process.argv[1]?.endsWith('run.ts')) {
  main();
}
