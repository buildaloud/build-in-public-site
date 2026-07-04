import 'dotenv/config';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { createSession, publishPost } from './bluesky';
import { dueItems, loadQueue, saveQueueItem, validatePost } from './queue';

const QUEUE_DIR = resolve(import.meta.dirname, '../../social/queue');

function factoryEnv(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  const envPath = join(homedir(), 'projects/micro-blueprint/.env');
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, 'utf8').split('\n').find((l) => l.startsWith(`${key}=`));
  return line?.slice(key.length + 1).trim();
}

const identifier = factoryEnv('BLUESKY_IDENTIFIER') ?? 'buildaloud.bsky.social';
const appPassword = factoryEnv('BLUESKY_APP_PASSWORD');
if (!appPassword) {
  console.error('BLUESKY_APP_PASSWORD not set — add it in the lifecycle console Configure tab.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const due = dueItems(loadQueue(QUEUE_DIR), today).filter((i) => i.platform === 'bluesky');
if (!due.length) {
  console.log('nothing approved and due.');
  process.exit(0);
}

const session = await createSession(identifier, appPassword);
for (const item of due) {
  const problems = validatePost(item.text);
  if (problems.length) {
    console.error(`✗ ${item.file}: ${problems.join('; ')}`);
    continue;
  }
  const uri = await publishPost(session, item.text, new Date().toISOString());
  item.status = 'posted';
  item.postedUri = uri;
  item.postedAt = new Date().toISOString();
  saveQueueItem(QUEUE_DIR, item);
  console.log(`✓ ${item.file} → ${uri}`);
}
