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
  const [ga4, searchConsole, buttondown] = await Promise.all([
    safe('ga4', () => pullGA4(creds)),
    safe('searchConsole', () => pullSearchConsole(creds)),
    safe('buttondown', () => pullButtondown()),
  ]);
  const snapshot = { generatedAt: new Date().toISOString(), ga4, searchConsole, buttondown };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`wrote ${OUT}`);
  for (const [k, v] of Object.entries({ ga4, searchConsole, buttondown })) {
    console.log(v.available ? `  ${k}: ok` : `  ${k}: skipped — ${v.reason}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
