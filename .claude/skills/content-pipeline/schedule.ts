/**
 * Drip scheduler — keeps the blog's future queue on a steady cadence.
 *
 * Cadence: daily for the next DAILY_DAYS (4 weeks), then monthly for MONTHLY_SLOTS.
 * Timely posts take the earliest slots; posts marked `filler: true` sink to the tail.
 * Posts dated today-or-earlier are frozen (already published/publishing); only future
 * posts are re-slotted. Renames rewrite the pubDate, the file, and every internal
 * /blog/<slug> link that points at a moved post.
 *
 *   npx tsx .claude/skills/content-pipeline/schedule.ts            # dry-run plan + coverage
 *   npx tsx .claude/skills/content-pipeline/schedule.ts --apply    # write the changes
 *   npx tsx .claude/skills/content-pipeline/schedule.ts --status   # coverage only, no plan
 */
import fs from 'node:fs';
import path from 'node:path';

const DAILY_DAYS = 28;
const MONTHLY_SLOTS = 2;
const MONTHLY_GAP = 30;
const PUBLISH_TIME = 'T15:00:00Z';

const BLOG_DIR = path.join(import.meta.dirname, '..', '..', '..', 'src', 'content', 'blog');
const APPLY = process.argv.includes('--apply');
const STATUS_ONLY = process.argv.includes('--status');

type Post = {
  file: string; // basename with .md
  date: string; // YYYY-MM-DD from filename
  body: string; // slug minus the date prefix
  title: string;
  filler: boolean;
  raw: string;
};

const DATE_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, n: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function loadPosts(): Post[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => DATE_RE.test(f))
    .map((f) => {
      const [, date, body] = f.match(DATE_RE)!;
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const title = raw.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? body;
      const filler = /^filler:\s*true\s*$/m.test(raw);
      return { file: f, date, body, title, filler, raw };
    });
}

function assignSlots(future: Post[], today: string): Map<string, string> {
  // filler sinks to the tail; timely posts keep their relative order otherwise.
  const ordered = [...future].sort(
    (a, b) => Number(a.filler) - Number(b.filler) || a.date.localeCompare(b.date),
  );
  const plan = new Map<string, string>();
  ordered.forEach((post, i) => {
    let slot: string;
    if (i < DAILY_DAYS) {
      slot = addDays(today, i + 1);
    } else {
      const m = i - DAILY_DAYS; // 0-based overflow index
      slot = addDays(today, DAILY_DAYS + (m + 1) * MONTHLY_GAP);
    }
    plan.set(post.file, slot);
  });
  return plan;
}

function coverage(scheduled: string[], today: string): { dailyOut: number; last: string } {
  const set = new Set(scheduled);
  let dailyOut = 0;
  for (let d = 1; d <= 400; d++) {
    if (set.has(addDays(today, d))) dailyOut = d;
    else break;
  }
  const last = scheduled.length ? scheduled.slice().sort().at(-1)! : today;
  return { dailyOut, last };
}

function apply(future: Post[], plan: Map<string, string>) {
  const renames = new Map<string, string>(); // old slug -> new slug (no .md)
  for (const post of future) {
    const newDate = plan.get(post.file)!;
    if (newDate === post.date) continue;
    const oldSlug = post.file.replace(/\.md$/, '');
    const newSlug = `${newDate}-${post.body}`;
    renames.set(oldSlug, newSlug);

    let raw = post.raw.replace(
      /^pubDate:\s*.*$/m,
      `pubDate: "${newDate}${PUBLISH_TIME}"`,
    );
    fs.writeFileSync(path.join(BLOG_DIR, post.file), raw);
    fs.renameSync(path.join(BLOG_DIR, post.file), path.join(BLOG_DIR, `${newSlug}.md`));
  }

  if (renames.size === 0) return;

  // Rewrite every internal link that points at a moved post.
  for (const f of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
    const p = path.join(BLOG_DIR, f);
    let raw = fs.readFileSync(p, 'utf8');
    let changed = false;
    for (const [oldSlug, newSlug] of renames) {
      if (raw.includes(`/blog/${oldSlug}`)) {
        raw = raw.split(`/blog/${oldSlug}`).join(`/blog/${newSlug}`);
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(p, raw);
  }
}

function main() {
  const today = todayUTC();
  const posts = loadPosts();
  const future = posts.filter((p) => p.date > today);
  const plan = assignSlots(future, today);
  const scheduled = [...plan.values()];
  const { dailyOut, last } = coverage(scheduled, today);

  console.log(`today            ${today}`);
  console.log(`published        ${posts.length - future.length}`);
  console.log(`future (queued)  ${future.length}  (${future.filter((p) => p.filler).length} filler)`);
  console.log(`daily coverage   ${dailyOut} day(s) out${dailyOut >= DAILY_DAYS ? '  ✓ 4 weeks' : `  ⚠ under ${DAILY_DAYS}`}`);
  console.log(`last scheduled   ${last}`);
  if (dailyOut < DAILY_DAYS) {
    console.log(`\n⚠ queue runs dry before 4 weeks — write more posts or add filler (filler: true), then re-run.`);
  }
  if (STATUS_ONLY) return;

  const moves = future
    .filter((p) => plan.get(p.file) !== p.date)
    .sort((a, b) => plan.get(a.file)!.localeCompare(plan.get(b.file)!));
  console.log(`\n${moves.length} post(s) move:`);
  for (const p of moves) {
    console.log(`  ${p.date} → ${plan.get(p.file)}  ${p.filler ? '[filler] ' : ''}${p.title}`);
  }

  if (!APPLY) {
    console.log(`\n(dry-run — re-run with --apply to write)`);
    return;
  }
  apply(future, plan);
  console.log(`\n✓ applied. Rebuild + verify links before committing.`);
}

main();
