# Project setup checklist

Legend: **[AI]** Claude does it · **[AI→USER]** Claude guides, you click · **[USER]** you only.
Fill `Status`: ☐ todo · ◐ in progress · ☑ done.

## Cloudflare Pages (deploy)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create Pages project, connect the GitHub repo | [AI→USER] | — | ☐ |
| 2 | Set build command / output dir, prod branch = `main` | [AI] | build config | ☐ |
| 3 | Add custom domain + DNS records | [AI→USER] | live domain | ☐ |

## Google Analytics 4 (traffic)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create GA4 property for the domain | [AI→USER] | property | ☐ |
| 2 | Read Measurement ID (`G-…`) | [AI] | `G-…` | ☐ |
| 3 | Add the gtag snippet to the site `<head>` | [AI] | site tag | ☐ |
| 4 | Read numeric Property ID (for the Data API) | [AI] | `GA4_PROPERTY_ID` | ☐ |

## Google Search Console (search)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Add property (URL-prefix ok) | [AI→USER] | property | ☐ |
| 2 | If GA4 gtag already live + same Google login: auto-verifies via Google Analytics method | [AI] | verified | ☐ |
| 3 | Otherwise verify via DNS TXT or meta tag | [AI→USER] | verified | ☐ |
| 4 | Grant the stats service-account email as a user | [AI→USER] | access | ☐ |
| 5 | Note the property string | [AI] | `SEARCH_CONSOLE_SITE` | ☐ |

## GCP service account (stats API access)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Reuse one GCP project across all products | [AI→USER] | project | ☐ |
| 2 | Enable Analytics Data API + Search Console API | [AI] | APIs on | ☐ |
| 3 | Create a service account named `<product>-stats` | [USER] | SA email | ☐ |
| 4 | Generate + download JSON key to `<repo>/secrets/`, `chmod 600` | [USER] | key file | ☐ |
| 5 | Grant SA **Viewer** on the GA4 property | [AI→USER] | access | ☐ |
| 6 | Add SA as a user on the Search Console property | [AI→USER] | access | ☐ |
| 7 | Put key path in `.env` | [USER] | `GOOGLE_SERVICE_ACCOUNT_KEY`, `GA4_PROPERTY_ID` | ☐ |

## Buttondown (newsletter)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create account / confirm the list username | [AI→USER] | list | ☐ |
| 2 | Wire signup forms to the embed endpoint | [AI] | signup form | ☐ |
| 3 | Generate API key | [USER] | key | ☐ |
| 4 | Put key in `.env` | [USER] | `BUTTONDOWN_API_KEY` | ☐ |

## Vercel (alternative host, optional)
When to use: Next.js-native features (ISR, image optimization, edge middleware) or per-PR preview envs. Otherwise default to Cloudflare Pages.
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Link repo, set framework preset + build config | [AI→USER] | project | ☐ |
| 2 | Upgrade to Pro ($20/mo) before Stripe transactions flow (Hobby = non-commercial) | [USER] | — | ☐ |

## Supabase (shared DB + auth, optional)
When to use: product needs a database or user accounts.
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create/reuse one shared Supabase project across products | [AI→USER] | project | ☐ |
| 2 | Add tables with `product_id` on every table, enable RLS | [AI] | schema | ☐ |
| 3 | Enable Supabase Auth (OAuth + magic links) if accounts are needed | [AI→USER] | auth | ☐ |
| 4 | Put keys in `.env` | [USER] | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | ☐ |

## Stripe (payments, optional)
When to use: product charges money.
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create/reuse Stripe account, test mode first | [AI→USER] | account | ☐ |
| 2 | Package donor billing code (`~/projects/chesstell/src/billing`) | [AI] | checkout + webhook | ☐ |
| 3 | Generate API keys + webhook signing secret | [USER] | keys | ☐ |
| 4 | Put keys in `.env` | [USER] | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | ☐ |
| 5 | Switch to live keys once ready for real payments | [AI→USER] | live | ☐ |

## Resend (transactional email, optional)
When to use: product sends magic links, receipts, or other code-triggered mail (newsletter stays Buttondown).
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create/reuse one Resend account | [AI→USER] | account | ☐ |
| 2 | Verify a sending domain/subdomain per product | [AI→USER] | domain | ☐ |
| 3 | Package donor auth code (`~/projects/pet/packages/auth`) | [AI] | magic-link flow | ☐ |
| 4 | Generate API key, put in `.env` | [USER] | `RESEND_API_KEY` | ☐ |

## PostHog (product analytics, optional)
When to use: product needs event/funnel analytics beyond GA4 traffic numbers.
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create/reuse one shared PostHog project across products | [AI→USER] | project | ☐ |
| 2 | Wire `posthog-js`, tag every event with `app_name`/`product` | [AI] | events flowing | ☐ |
| 3 | Copy API key into `.env` | [USER] | `POSTHOG_KEY` | ☐ |

## Verify
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | `npm run stats:pull` shows all sources `ok` | [AI] | ☐ |
