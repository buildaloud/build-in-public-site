// Claude and Codex agent formats are incompatible: Claude reads YAML-frontmatter
// markdown in .claude/agents/*.md, Codex reads TOML in .codex/agents/*.toml.
// Source of truth is the .md files; this regenerates the Codex .toml from them so
// one edit stays in sync. Run: npx tsx scripts/gen-codex-agents.ts
//
// MODEL MAP: Codex model IDs move fast — confirm these against your installed
// Codex before relying on them, and edit the map if they've changed.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = '.claude/agents';
const OUT = '.codex/agents';

// Codex 5.6 model tiers (Chad's mapping): opus→Sol (top), sonnet→Terra (mid),
// haiku→Luna (cheap). fable has no distinct Codex tier → Terra.
const MODEL_MAP: Record<string, string> = {
  opus: 'sol',
  sonnet: 'terra',
  haiku: 'luna',
  fable: 'terra',
};
// Codex reasoning effort tops out lower than Claude's; clamp the extra tiers.
const EFFORT_MAP: Record<string, string> = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  xhigh: 'high',
  max: 'high',
};

type Front = { name?: string; description?: string; model?: string; effort?: string; tools?: string };

function parse(md: string): { front: Front; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(md);
  if (!m) return { front: {}, body: md };
  const front: Front = {};
  for (const line of m[1].split('\n')) {
    const kv = /^([a-zA-Z]+):\s*(.*)$/.exec(line);
    if (kv) (front as Record<string, string>)[kv[1]] = kv[2].trim();
  }
  return { front, body: m[2].trim() };
}

function toml(front: Front, body: string): string {
  const model = MODEL_MAP[front.model ?? 'sonnet'] ?? MODEL_MAP.sonnet;
  const effort = EFFORT_MAP[front.effort ?? 'medium'] ?? 'medium';
  // A write-capable agent needs a writable sandbox; a read-only reviewer doesn't.
  const writes = /Write|Edit/.test(front.tools ?? '');
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const bodyEsc = body.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"');
  return [
    `# Generated from ${SRC}/${front.name}.md — do not edit by hand. Run scripts/gen-codex-agents.ts.`,
    `name = "${esc(front.name ?? '')}"`,
    `description = "${esc(front.description ?? '')}"`,
    `model = "${model}"`,
    `model_reasoning_effort = "${effort}"`,
    `sandbox_mode = "${writes ? 'workspace-write' : 'read-only'}"`,
    ``,
    `[instructions]`,
    `text = """`,
    bodyEsc,
    `"""`,
    ``,
  ].join('\n');
}

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.md'));
let n = 0;
for (const f of files) {
  const { front, body } = parse(readFileSync(join(SRC, f), 'utf8'));
  if (!front.name) {
    console.warn(`skip ${f}: no name in frontmatter`);
    continue;
  }
  writeFileSync(join(OUT, `${front.name}.toml`), toml(front, body));
  n++;
}
console.log(`generated ${n} Codex agent(s) → ${OUT}/`);
