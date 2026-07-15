import { homedir } from 'node:os';
import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JWT } from 'google-auth-library';
import { scanFrontmatter } from './frontmatter-scan';
import {
  shapePostStats, assertJoinHealth, slugFromFilename,
  lastNDates, ga4DateToIso, shapeDailySite, shapeDailySearch, joinDailyViewsBySlug, lastNIsoWeekStarts, shapeProductWeekly,
  joinCommentsBySlug, shapeTrafficSources, shapeOrganicSplit, shapeTopQueries,
  type GscPageRow, type GscQueryRow, type Ga4Row, type LikeRow, type Ga4DatePathRow,
  type DiscussionRow, type TrafficSourceRow, type TopQuery,
} from './post-stats';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '../../src/data/stats.json');
const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../src/content/blog');
const WINDOW = { startDate: '28daysAgo', endDate: 'today' };
const ALL_TIME_WINDOW = { startDate: '2020-01-01', endDate: 'today' }; // GA4 property created ~2026-06
const GA_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const SC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

// Same repo/category giscus is configured with client-side — see the
// data-repo/data-category-id attributes in src/layouts/BlogPost.astro.
const GISCUS_OWNER = 'buildaloud';
const GISCUS_REPO = 'build-in-public-site';
const GISCUS_CATEGORY_ID = 'DIC_kwDORVwLe84C282K';

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

type GscRawRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function querySearchConsole<T>(
  creds: ReturnType<typeof loadCredentials>,
  dimensions: string[],
  rowLimit: number,
  mapper: (row: GscRawRow) => T,
): Promise<{ available: true; rows: T[] } | { available: false; reason: string }> {
  const site = process.env.SEARCH_CONSOLE_SITE;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set' };
  if (!site) return { available: false, reason: 'SEARCH_CONSOLE_SITE not set (e.g. sc-domain:buildaloud.ai)' };
  const bearer = await token(creds, SC_SCOPE);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: daysAgo(28), endDate: daysAgo(0), dimensions, rowLimit }),
  });
  if (!res.ok) return { available: false, reason: `Search Console API ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const rawRows = ((await res.json())?.rows ?? []) as GscRawRow[];
  return { available: true, rows: rawRows.map(mapper) };
}

async function pullSearchConsole(creds: ReturnType<typeof loadCredentials>): Promise<Source> {
  const result = await querySearchConsole(creds, [], 1, (r) => ({
    clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, ctr: r.ctr ?? 0, position: r.position ?? 0,
  }));
  if (!result.available) return result;
  const totals = result.rows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return { available: true, window: { startDate: daysAgo(28), endDate: daysAgo(0) }, ...totals };
}

async function pullSearchConsolePerPage(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: GscPageRow[] }> {
  const result = await querySearchConsole(creds, ['page'], 5000, (r) => ({
    page: r.keys[0], clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, ctr: r.ctr ?? 0, position: r.position ?? 0,
  }));
  if (!result.available) return { ...result, rows: [] };
  return { available: true, window: { startDate: daysAgo(28), endDate: daysAgo(0) }, rows: result.rows };
}

// Per-page-per-query rows — used ONLY to feed computeScorecard. Raw queries are
// never written to stats.json (privacy: no keyword map published).
async function pullSearchConsolePerPageQuery(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: GscQueryRow[] }> {
  const result = await querySearchConsole(creds, ['page', 'query'], 5000, (r) => ({
    page: r.keys[0], query: r.keys[1], clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, position: r.position ?? 0,
  }));
  if (!result.available) return { ...result, rows: [] };
  return { available: true, window: { startDate: daysAgo(28), endDate: daysAgo(0) }, rows: result.rows };
}

async function pullGA4PerPath(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: Ga4Row[] }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set', rows: [] };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)', rows: [] };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [WINDOW],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
    limit: 5000,
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}`, rows: [] };
  const data = await res.json();
  const rawRows = (data?.rows ?? []) as { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  return {
    available: true,
    window: WINDOW,
    rows: rawRows.map((r) => ({ path: r.dimensionValues?.[0]?.value ?? '', pageviews: Number(r.metricValues?.[0]?.value ?? 0) })),
  };
}

type Ga4DailyRow = { date: string; pageViews: number; sessions: number };

async function pullGA4Daily(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: Ga4DailyRow[] }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set', rows: [] };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)', rows: [] };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [WINDOW],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}`, rows: [] };
  const data = await res.json();
  const rawRows = (data?.rows ?? []) as { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  return {
    available: true,
    window: WINDOW,
    rows: rawRows.map((r) => ({
      date: ga4DateToIso(r.dimensionValues?.[0]?.value ?? ''),
      pageViews: Number(r.metricValues?.[0]?.value ?? 0),
      sessions: Number(r.metricValues?.[1]?.value ?? 0),
    })),
  };
}

// Date+pagePath, unfiltered (all paths, not just /blog/) — feeds BOTH the
// per-post byPost[].dailyViews join (blog paths only, via isBlogPath inside
// joinDailyViewsBySlug) and productWeekly's "site" bucket, which needs
// non-blog paths too.
async function pullGA4PerPathDaily(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: Ga4DatePathRow[] }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set', rows: [] };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)', rows: [] };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [WINDOW],
    dimensions: [{ name: 'date' }, { name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    limit: 10000,
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}`, rows: [] };
  const data = await res.json();
  const rawRows = (data?.rows ?? []) as { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  return {
    available: true,
    window: WINDOW,
    rows: rawRows.map((r) => ({
      date: ga4DateToIso(r.dimensionValues?.[0]?.value ?? ''),
      path: r.dimensionValues?.[1]?.value ?? '',
      pageviews: Number(r.metricValues?.[0]?.value ?? 0),
    })),
  };
}

async function pullSearchConsoleDaily(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: { date: string; clicks: number; impressions: number }[] }> {
  const result = await querySearchConsole(creds, ['date'], 100, (r) => ({
    date: r.keys[0], clicks: r.clicks ?? 0, impressions: r.impressions ?? 0,
  }));
  if (!result.available) return { ...result, rows: [] };
  return { available: true, window: { startDate: daysAgo(28), endDate: daysAgo(0) }, rows: result.rows };
}

async function pullGA4TrafficSources(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: TrafficSourceRow[] }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set', rows: [] };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)', rows: [] };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [WINDOW],
    dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
    metrics: [{ name: 'sessions' }],
    limit: 1000,
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}`, rows: [] };
  const data = await res.json();
  const rawRows = (data?.rows ?? []) as { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  return {
    available: true,
    window: WINDOW,
    rows: rawRows.map((r) => ({
      source: r.dimensionValues?.[0]?.value ?? '',
      medium: r.dimensionValues?.[1]?.value ?? '',
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
    })),
  };
}

// Site-wide (no page dimension) query totals, computed directly by Search
// Console rather than aggregated locally from the page+query rows —
// pullSearchConsolePerPageQuery's per-page-query rows stay privacy-scoped to
// feeding computeScorecard only (see its comment); this is a separate,
// coarser fetch with no page attribution.
async function pullSearchConsoleQueries(creds: ReturnType<typeof loadCredentials>): Promise<Source & { rows: TopQuery[] }> {
  const result = await querySearchConsole(creds, ['query'], 10, (r) => ({
    query: r.keys[0], clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, position: r.position ?? 0,
  }));
  if (!result.available) return { ...result, rows: [] };
  return { available: true, window: { startDate: daysAgo(28), endDate: daysAgo(0) }, rows: result.rows };
}

// Giscus stores comments as GitHub Discussions (pathname mapping) — no
// GOOGLE_SERVICE_ACCOUNT_KEY needed, this reuses the machine's authenticated
// gh CLI token instead (same auth `gh api graphql` would use).
async function pullGiscusComments(): Promise<Source & { rows: DiscussionRow[] }> {
  let ghToken: string;
  try {
    const { execFileSync } = await import('node:child_process');
    ghToken = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim();
  } catch {
    return { available: false, reason: 'gh CLI not authenticated (gh auth token failed)', rows: [] };
  }
  if (!ghToken) return { available: false, reason: 'gh CLI not authenticated (gh auth token failed)', rows: [] };

  const query = `
    query($cursor: String) {
      repository(owner: "${GISCUS_OWNER}", name: "${GISCUS_REPO}") {
        discussions(first: 50, categoryId: "${GISCUS_CATEGORY_ID}", after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes { title comments { totalCount } }
        }
      }
    }`;

  const rows: DiscussionRow[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 10; page++) {
    const res: Response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${ghToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { cursor } }),
    });
    if (!res.ok) return { available: false, reason: `GitHub GraphQL API ${res.status}: ${(await res.text()).slice(0, 200)}`, rows: [] };
    const data: { errors?: unknown; data?: { repository?: { discussions?: { pageInfo?: { hasNextPage?: boolean; endCursor?: string }; nodes?: { title: string; comments: { totalCount: number } }[] } } } } = await res.json();
    if (data.errors) return { available: false, reason: `GitHub GraphQL errors: ${JSON.stringify(data.errors).slice(0, 200)}`, rows: [] };
    const discussions = data?.data?.repository?.discussions;
    const nodes = discussions?.nodes ?? [];
    rows.push(...nodes.map((n) => ({ title: n.title, comments: n.comments.totalCount })));
    if (!discussions?.pageInfo?.hasNextPage) break;
    cursor = discussions.pageInfo.endCursor ?? null;
  }
  return { available: true, rows };
}

async function pullGA4LifetimeTotal(creds: ReturnType<typeof loadCredentials>): Promise<Source & { pageViews: number; sessions: number }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!creds) return { available: false, reason: 'GOOGLE_SERVICE_ACCOUNT_KEY not set', pageViews: 0, sessions: 0 };
  if (!propertyId) return { available: false, reason: 'GA4_PROPERTY_ID not set (numeric property id, not the G- measurement id)', pageViews: 0, sessions: 0 };
  const bearer = await token(creds, GA_SCOPE);
  const body = {
    dateRanges: [ALL_TIME_WINDOW],
    metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
  };
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { available: false, reason: `GA4 API ${res.status}: ${(await res.text()).slice(0, 200)}`, pageViews: 0, sessions: 0 };
  const data = await res.json();
  const vals = data?.rows?.[0]?.metricValues?.map((v: { value: string }) => Number(v.value)) ?? [0, 0];
  return { available: true, window: ALL_TIME_WINDOW, pageViews: vals[0] ?? 0, sessions: vals[1] ?? 0 };
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

// Raw like rows (one per like) — grouping/counting per slug happens in
// shapePostStats, same as gsc/ga4 rows. Not paginated: post_likes rows are
// tiny (one text column) and volume is low at this stage.
async function pullPostLikes(): Promise<Source & { rows: LikeRow[] }> {
  const url = process.env.SUPABASE_URL ?? 'https://clweuvbzerykadyamdpw.supabase.co';
  const key = process.env.SUPABASE_SECRET_KEY ?? factorySecret('SUPABASE_SECRET_KEY');
  if (!key) return { available: false, reason: 'SUPABASE_SECRET_KEY not set', rows: [] };
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const res = await fetch(`${url}/rest/v1/post_likes?select=post_slug&limit=10000`, { headers });
  if (!res.ok) return { available: false, reason: `post_likes ${res.status}`, rows: [] };
  const rows = (await res.json()) as LikeRow[];
  return { available: true, rows };
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

  const [ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent, gscPage, gscPageQuery, ga4PerPath, postLikes, ga4Daily, ga4PerPathDaily, searchConsoleDaily, ga4LifetimeTotal, ga4TrafficSources, gscQueries, giscus] = await Promise.all([
    safe('ga4', () => pullGA4(creds)),
    safe('searchConsole', () => pullSearchConsole(creds)),
    safe('buttondown', () => pullButtondown()),
    safe('supabase', () => pullSupabase()),
    safe('stripe', () => pullStripe()),
    safe('spend', () => pullSpend()),
    safe('agentUsage', () => pullAgentUsage()),
    safe('timeSpent', () => pullTimeSpent()),
    safe('gscPage', () => pullSearchConsolePerPage(creds)),
    safe('gscPageQuery', () => pullSearchConsolePerPageQuery(creds)),
    safe('ga4PerPath', () => pullGA4PerPath(creds)),
    safe('postLikes', () => pullPostLikes()),
    safe('ga4Daily', () => pullGA4Daily(creds)),
    safe('ga4PerPathDaily', () => pullGA4PerPathDaily(creds)),
    safe('searchConsoleDaily', () => pullSearchConsoleDaily(creds)),
    safe('ga4LifetimeTotal', () => pullGA4LifetimeTotal(creds)),
    safe('ga4TrafficSources', () => pullGA4TrafficSources(creds)),
    safe('gscQueries', () => pullSearchConsoleQueries(creds)),
    safe('giscus', () => pullGiscusComments()),
  ]);

  const blogFiles = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: slugFromFilename(f), raw: readFileSync(join(BLOG_DIR, f), 'utf8') }));
  const eligiblePosts = scanFrontmatter(blogFiles);
  const gscPageRows = 'rows' in gscPage ? (gscPage.rows as GscPageRow[]) : [];
  const gscQueryRows = 'rows' in gscPageQuery ? (gscPageQuery.rows as GscQueryRow[]) : [];
  const ga4PathRows = 'rows' in ga4PerPath ? (ga4PerPath.rows as Ga4Row[]) : [];
  const likeRows = 'rows' in postLikes ? (postLikes.rows as LikeRow[]) : [];
  const shaped = shapePostStats(eligiblePosts, gscPageRows, gscQueryRows, ga4PathRows, likeRows);

  const dates = lastNDates(28);
  const weekStarts = lastNIsoWeekStarts(4);
  const ga4PerPathDailyRows = 'rows' in ga4PerPathDaily ? (ga4PerPathDaily.rows as Ga4DatePathRow[]) : [];
  const dailyViewsBySlug = joinDailyViewsBySlug(dates, ga4PerPathDailyRows);
  for (const slug of Object.keys(shaped.byPost)) {
    shaped.byPost[slug].dailyViews = dailyViewsBySlug[slug] ?? dates.map(() => 0);
  }

  const discussionRows = 'rows' in giscus ? (giscus.rows as DiscussionRow[]) : [];
  const commentsBySlug = joinCommentsBySlug(discussionRows);
  for (const slug of Object.keys(shaped.byPost)) {
    shaped.byPost[slug].comments = commentsBySlug[slug] ?? 0;
  }

  const ga4DailyRows = 'rows' in ga4Daily ? (ga4Daily.rows as { date: string; pageViews: number; sessions: number }[]) : [];
  const dailySite = ga4Daily.available ? shapeDailySite(dates, ga4DailyRows) : undefined;

  const searchConsoleDailyRows = 'rows' in searchConsoleDaily ? (searchConsoleDaily.rows as { date: string; clicks: number; impressions: number }[]) : [];
  const dailySearch = searchConsoleDaily.available ? shapeDailySearch(dates, searchConsoleDailyRows) : undefined;

  const productWeekly = ga4PerPathDaily.available ? shapeProductWeekly(weekStarts, ga4PerPathDailyRows) : undefined;

  const allTime = 'pageViews' in ga4LifetimeTotal && ga4LifetimeTotal.available
    ? { pageViews: ga4LifetimeTotal.pageViews as number, sessions: ga4LifetimeTotal.sessions as number }
    : undefined;

  const trafficSourceRows = 'rows' in ga4TrafficSources ? (ga4TrafficSources.rows as TrafficSourceRow[]) : [];
  const trafficSources = ga4TrafficSources.available ? shapeTrafficSources(trafficSourceRows) : undefined;
  const organicSplit = ga4TrafficSources.available ? shapeOrganicSplit(trafficSourceRows) : undefined;

  const gscQueryRowsSiteWide = 'rows' in gscQueries ? (gscQueries.rows as TopQuery[]) : [];
  const topQueries = gscQueries.available ? shapeTopQueries(gscQueryRowsSiteWide) : undefined;

  let postStats: Source & { window: typeof WINDOW; meta: { unmatchedRows: typeof shaped.unmatched; totalRows: number }; byPost: typeof shaped.byPost };
  try {
    assertJoinHealth(shaped.unmatched, shaped.totalRows);
    postStats = {
      available: true,
      window: { startDate: daysAgo(28), endDate: daysAgo(0) },
      meta: { unmatchedRows: shaped.unmatched, totalRows: shaped.totalRows },
      byPost: shaped.byPost,
    };
  } catch (e) {
    const reason = (e as Error).message;
    // A postStats join-miss is loud but must not take down the rest of the
    // snapshot — every other source already degrades via safe() instead of
    // throwing; this restores that same fault isolation for postStats.
    console.error(`\n!!! postStats DEGRADED — ${reason}\n`);
    postStats = {
      available: false,
      reason,
      window: { startDate: daysAgo(28), endDate: daysAgo(0) },
      meta: { unmatchedRows: shaped.unmatched, totalRows: shaped.totalRows },
      byPost: {},
    };
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent, postStats,
    dailySite, dailySearch, productWeekly, allTime, trafficSources, organicSplit, topQueries,
  };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`wrote ${OUT}`);
  for (const [k, v] of Object.entries({
    ga4, searchConsole, buttondown, supabase, stripe, spend, agentUsage, timeSpent, gscPage, gscPageQuery, ga4PerPath, postLikes,
    ga4Daily, ga4PerPathDaily, searchConsoleDaily, ga4LifetimeTotal, ga4TrafficSources, gscQueries, giscus,
  })) {
    console.log(v.available ? `  ${k}: ok` : `  ${k}: skipped — ${v.reason}`);
  }
  console.log(
    postStats.available
      ? `  postStats: ${Object.keys(shaped.byPost).length} posts, unmatched gsc=${shaped.unmatched.gsc} ga4=${shaped.unmatched.ga4} of ${shaped.totalRows} rows`
      : `  postStats: DEGRADED — ${postStats.reason}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
