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
| 1 | Add property (prefer domain property) | [AI→USER] | property | ☐ |
| 2 | Verify ownership (DNS TXT, or meta tag) | [AI→USER] | verified | ☐ |
| 3 | If meta-tag method: add `google-site-verification` meta | [AI] | site meta | ☐ |
| 4 | Note the property string | [AI] | `SEARCH_CONSOLE_SITE` | ☐ |

## GCP service account (stats API access)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create/pick a GCP project | [AI→USER] | project | ☐ |
| 2 | Enable Analytics Data API + Search Console API | [AI→USER] | APIs on | ☐ |
| 3 | Create a service account | [USER] | SA email | ☐ |
| 4 | Generate + download JSON key | [USER] | key file | ☐ |
| 5 | Grant SA **Viewer** on the GA4 property | [AI→USER] | access | ☐ |
| 6 | Add SA as a user on the Search Console property | [AI→USER] | access | ☐ |
| 7 | Put key path in `.env` | [USER] | `GOOGLE_SERVICE_ACCOUNT_KEY` | ☐ |

## Buttondown (newsletter)
| # | Step | Owner | Produces | Status |
|---|------|-------|----------|--------|
| 1 | Create account / confirm the list username | [AI→USER] | list | ☐ |
| 2 | Wire signup forms to the embed endpoint | [AI] | signup form | ☐ |
| 3 | Generate API key | [USER] | key | ☐ |
| 4 | Put key in `.env` | [USER] | `BUTTONDOWN_API_KEY` | ☐ |

## Verify
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | `npm run stats:pull` shows all sources `ok` | [AI] | ☐ |
