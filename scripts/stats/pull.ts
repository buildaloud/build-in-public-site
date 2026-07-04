import { homedir } from 'node:os';
import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JWT } from 'google-auth-library';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '../../src/data/stats.json');
const WINDOW = { startDate: '28daysAgo', endDate: 'today' };
const GA_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const SC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

type Source = { available: boolean; reason?: string; [k: string]: unknown };

// Service-account key: a path in GOOGLE_SERVICE_ACCOUNT_KEY, or raw/base64 JSON.
function loadCredentials(): { client_email: string; private_key: string } | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const text = existsSync(raw)
      ? readFileSync(raw, 'utf8')
      : raw.trim().startsWith('{')
        ? raw
        : Buffer.from(raw, 'base64').toString('utf8');
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function token(creds: { client_email: string; private_key: string }, scope: string) {
  const client = new JWT({ email: creds.client_email, key: creds.private_key, scopes: [scope] });
  const { token } = await client.getAccessToken();
  if (!token) throw new Error('no access token');
  return token;
}

async function pullGA4(creds: ReturnType<typeof loadCredentials>): Promise<Source> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set' };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)' };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [WINDOW],
    metrics: [
      { name: 'sessions' }, { name: 'totalUsers' }, { name: 'activeUsers' },
      { name: 'screenPageViews' }, { name: 'engagementRate' }, { name: 'averageSessionDuration' },
    ],
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const data = await res.json();
  const names = body.metrics.map((m) => m.name);
  const vals = data?.rows?.[0]?.metricValues?.map((v: { value: string }) => v.value) ?? [];
  const metrics = Object.fromEntries(names.map((n, i) => [n, Number(vals[i] ?? 0)]));
  return { available: true, window: WINDOW, metrics };
}

async function pullSearchConsole(creds: ReturnType<typeof loadCredentials>): Promise<Source> {
  const site = process.env.SEARCH_CONSOLE_SITE;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set' };
  if (!site) return { available: false, reason: 'SEARCH_CONSOLE_SITE not set (e.g. sc-domain:buildaloud.ai)' };
  const bearer = await token(creds, SC_SCOPE);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const totals = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: daysAgo(28), endDate: daysAgo(0), dimensions: [] }),
  });
  if (!totals.ok) return { available: false, reason: `Search Console API ${totals.status}: ${(await totals.text()).slice(0, 200)}` };
  const row = (await totals.json())?.rows?.[0] ?? {};
  return {
    available: true,
    window: { startDate: daysAgo(28), endDate: daysAgo(0) },
    clicks: row.clicks ?? 0, impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0, position: row.position ?? 0,
  };
}

async function pullButtondown(): Promise<Source> {
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) return { available: false, reason: 'BUTTONDOWN_API_KEY not set' };
  const res = await fetch('https://api.buttondown.email/v1/subscribers?type=regular', {
    headers: { Authorization: `Token ${key}` },
  });
  if (!res.ok) return { available: false, reason: `Buttondown API ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const data = await res.json();
  return { available: true, subscribers: data?.count ?? 0 };
}

function daysAgo(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function safe(label: string, fn: () => Promise<Source>): Promise<Source> {
  try {
    return await fn();
  } catch (e) {
    return { available: false, reason: `${label} failed: ${(e as Error).message}` };
  }
}

async function main() {
  const creds = loadCredentials();

async function pullStripe() {
  const key = process.env.STRIPE_SECRET_KEY ?? factorySecret('STRIPE_SECRET_KEY');
  if (!key) return { available: false, reason: 'STRIPE_SECRET_KEY not set' };
  const headers = { Authorization: `Bearer ${key}` };
  const earned: Record<string, { paidCents: number; sessions: number }> = {};
  let url = 'https://api.stripe.com/v1/checkout/sessions?limit=100';
  for (let page = 0; page < 5; page++) {
    const res = await fetch(url, { headers });
    if (!res.ok) return { available: false, reason: `stripe ${res.status}` };
    const body = (await res.json()) as { data: { payment_status: string; amount_total: number | null; metadata?: Record<string, string>; id: string }[]; has_more: boolean };
    for (const sess of body.data) {
      if (sess.payment_status !== 'paid') continue;
      const pid = sess.metadata?.product_id ?? 'untagged';
      earned[pid] ??= { paidCents: 0, sessions: 0 };
      earned[pid].paidCents += sess.amount_total ?? 0;
      earned[pid].sessions += 1;
    }
    if (!body.has_more) break;
    url = `https://api.stripe.com/v1/checkout/sessions?limit=100&starting_after=${body.data[body.data.length - 1].id}`;
  }
  const testMode = key.startsWith('sk_test');
  return { available: true, testMode, earned };
}

async function pullSpend() {
  try {
    const csv = readFileSync(join(homedir(), 'projects/bizops/expenses.csv'), 'utf8');
    const rows = csv.trim().split('\n').slice(1);
    let monthlyUSD = 0;
    for (const row of rows) {
      const cols = row.match(/("[^"]*"|[^,]+)/g) ?? [];
      if (cols[4]?.trim() === 'monthly') monthlyUSD += parseFloat(cols[3] ?? '0') || 0;
    }
    return { available: true, monthlyBurnUSD: Math.round(monthlyUSD * 100) / 100 };
  } catch {
    return { available: false, reason: 'bizops expenses.csv not readable' };
  }
}

async function pullAgentUsage() {
  try {
    const { execFileSync } = await import('node:child_process');
    const raw = execFileSync('npx', ['-y', 'ccusage@latest', 'monthly', '--json'], {
      encoding: 'utf8', timeout: 120000, stdio: ['ignore', 'pipe', 'ignore'],
    });
    const data = JSON.parse(raw) as { monthly?: Record<string, unknown>[]; totals?: Record<string, unknown> };
    const months = data.monthly ?? [];
    const latest = months[months.length - 1] ?? {};
    return {
      available: true,
      currentMonth: { tokens: latest.totalTokens ?? 0, apiEquivalentUSD: latest.totalCost ?? 0 },
      allTime: { tokens: data.totals?.totalTokens ?? 0, apiEquivalentUSD: data.totals?.totalCost ?? 0 },
      note: 'API-equivalent pricing; actual cost is the flat subscription in spend.monthlyBurnUSD',
    };
  } catch {
    return { available: false, reason: 'ccusage failed' };
  }
}

async function pullTimeSpent() {
  const token = process.env.RIZE_API_TOKEN ?? envFrom(join(homedir(), 'projects/rize-data/.env'), 'RIZE_API_TOKEN');
  if (!token) return { available: false, reason: 'RIZE_API_TOKEN not set' };
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const res = await fetch('https://api.rize.io/api/v1/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: `{ summaries(startDate: "${start}", endDate: "${end}", bucketSize: "day") { trackedTime focusTime workHours } }` }),
  });
  if (!res.ok) return { available: false, reason: `rize ${res.status}` };
  const body = (await res.json()) as { data?: { summaries?: { trackedTime: number; focusTime: number; workHours: number } } };
  const sum = body.data?.summaries;
  if (!sum) return { available: false, reason: 'rize returned no summary' };
  const hrs = (secs: number) => Math.round((secs / 3600) * 10) / 10;
  return { available: true, last7d: { trackedHours: hrs(sum.trackedTime), focusHours: hrs(sum.focusTime), workHours: hrs(sum.workHours) } };
}

function envFrom(path: string, name: string): string | undefined {
  try {
    return readFileSync(path, 'utf8').split('\n').find((l) => l.startsWith(`${name}=`))?.slice(name.length + 1).trim();
  } catch {
    return undefined;
  }
}

async function pullSupabase() {
  const url = process.env.SUPABASE_URL ?? 'https://clweuvbzerykadyamdpw.supabase.co';
  const key = process.env.SUPABASE_SECRET_KEY ?? factorySecret('SUPABASE_SECRET_KEY');
  if (!key) return { available: false, reason: 'SUPABASE_SECRET_KEY not set' };
  const headers = { apikey: key, Authorization: `Bearer ${key}`, Prefer: 'count=exact' };
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const count = async (path: string): Promise<number> => {
    const res = await fetch(`${url}/rest/v1/${path}&select=id&limit=1`, { headers });
    return Number(res.headers.get('content-range')?.split('/')[1] ?? 0);
  };
  const products: Record<string, { users: number; signups7d: number; signins7d: number; paidOrders: number }> = {};
  const listRes = await fetch(`${url}/rest/v1/products?select=id`, { headers });
  for (const { id } of (await listRes.json()) as { id: string }[]) {
    products[id] = {
      users: await count(`app_users?product_id=eq.${id}`),
      signups7d: await count(`app_users?product_id=eq.${id}&created_at=gte.${weekAgo}`),
      signins7d: await count(`events?product_id=eq.${id}&name=eq.signin&created_at=gte.${weekAgo}`),
      paidOrders: await count(`orders?product_id=eq.${id}&status=eq.paid`),
    };
  }
  return { available: true, products };
}

function factorySecret(name: string): string | undefined {
  try {
    const line = readFileSync(join(homedir(), 'projects/micro-blueprint/.env'), 'utf8')
      .split('\n')
      .find((l) => l.startsWith(`${name}=`));
    return line?.slice(name.length + 1).trim();
  } catch {
    return undefined;
  }
}

  const [ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent] = await Promise.all([
    safe('ga4', () => pullGA4(creds)),
    safe('searchConsole', () => pullSearchConsole(creds)),
    safe('buttondown', () => pullButtondown()),
    safe('supabase', () => pullSupabase()),
    safe('stripe', () => pullStripe()),
    safe('spend', () => pullSpend()),
    safe('agentUsage', () => pullAgentUsage()),
    safe('timeSpent', () => pullTimeSpent()),
  ]);
  const snapshot = { generatedAt: new Date().toISOString(), ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`wrote ${OUT}`);
  for (const [k, v] of Object.entries({ ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent })) {
    console.log(v.available ? `  ${k}: ok` : `  ${k}: skipped — ${v.reason}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
