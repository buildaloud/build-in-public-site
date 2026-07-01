import { readFileSync } from 'node:fs';
import { scoreText } from '../.claude/skills/human-tone/eval/tone-grader.ts';

const file = process.argv[2];
if (!file) {
  console.error('usage: npx tsx scripts/score-post.ts <path-to-post.md>');
  process.exit(1);
}
const body = readFileSync(file, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
const m = scoreText(body);
console.log(JSON.stringify(m, null, 2));
console.log(`aiScore: ${m.aiScore}`);
