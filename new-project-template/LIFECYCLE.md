# Product lifecycle — stage checklists

Every micro-product moves through five stages. Each stage has a checklist, an
automation level, and one Chad decision at the end. AI does the volume; Chad
does the judgment.

## 1. Research — validate before building
*Goal: kill bad ideas for ~$0. Exit: go/no-go decision.*

- [ ] One-page validation brief (deep-research agents): problem, who pays,
      top-3 competitors + pricing, wedge, demand signals, kill criteria
- [ ] SEO/keyword landscape (seo-researcher, Opus)
- [ ] Free-tier cost check: can this run at $0 during validation?
- [ ] **Chad decision: go / no-go / park** (10-min read)

Automation: fully AI-drivable today. See `research/` (ticket TD-0004).

## 2. Setup — wire the plumbing
*Goal: deploy + measure from day one. Exit: splash live, stats pulling.*

- [ ] Work `setup/CHECKLIST.md` (Cloudflare Pages, GA4, Search Console,
      GCP service account, Buttondown tag; Supabase/Stripe/PostHog when the
      product needs them)
- [ ] Splash page live: what-is-this + CTA + tagged subscribe
- [ ] `stats:pull` shows the new product's sources green

Automation: AI drives browser + config; Chad clicks account-creation,
permission grants, and key generation (owner tags in the checklist).

## 3. Execution — build the thing
*Goal: smallest sellable version on the micro-blueprint. Exit: a stranger can use it.*

- [ ] Spawn from micro-blueprint (shared Supabase DB + `product_id`,
      CF Pages hosting, donor Stripe/auth code). Package, don't rewrite.
- [ ] Tickets groomed per feature; TDD via the standard pipeline
- [ ] Rate-limit / cost-cap anything that can spend money
- [ ] **Chad decision: ship gate** (does this go public?)

Automation: AI writes most code in ticket-sized chunks that fit 15-min
review sessions. See TD-0006.

## 4. Marketing — tell people
*Goal: traffic → email → users, reusing the Build Aloud content machine.*

- [ ] Launch checklist (`marketing/`): analytics verified, subscribe tagged,
      3–5 drip posts queued through the new-blog-post pipeline
- [ ] Social blurbs generated at post time; build-in-public post on the blog
- [ ] **Chad decision: approve topics + claims** (AI never invents numbers)

Automation: content pipeline exists end-to-end (research → draft → tone
gate ≤2 → images → digest). See TD-0008.

## 5. Measurement — decide with data
*Goal: every product is an experiment with a verdict. Exit: double-down / iterate / kill.*

- [ ] Experiment posts: hypothesis → method → result → metrics
- [ ] Metrics per project: revenue/MRR, signups, active + retention,
      unit cost, splash traffic, social engagement, Claude session time
- [ ] Weekly automated stats digest (TD-0010); monthly expense ritual (TD-0003)
- [ ] **Chad decision: double-down / iterate / kill** (quarterly per product)

Automation: pullers built (`scripts/stats/`); rollup UI is TD-0009.

---

**Operating rule for a 90-min/week founder:** Chad's sessions are the four
decisions above plus unblocking [USER] steps. Everything else queues as
tickets and runs through agents. If a session starts without an obvious next
action, the board is under-groomed — fix that first.
