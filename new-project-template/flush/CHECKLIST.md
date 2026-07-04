# Product flush checklist

The mirror of `setup/`: remove a product completely — no leftover cost, DNS,
data, or keys. Shared infra (the Supabase project, Buttondown account, GCP
project, PostHog org) SURVIVES; everything product-scoped goes. Same owner
tags: **[AI]** drives · **[AI→USER]** AI drives, you click · **[USER]** you only
(destructive type-to-confirm deletes are always yours).

## Order: outside-in (traffic first, data last)

## 1. DNS + hosting
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Remove custom domain from the Pages project | [AI→USER] | ☐ |
| 2 | Delete the CNAME from the CF zone | [AI→USER] | ☐ |
| 3 | Delete the Pages project (`wrangler pages project delete <name>`) | [USER confirm] | ☐ |

## 2. Payments (Stripe)
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Disable/delete the webhook event destination | [AI→USER] | ☐ |
| 2 | Archive the product's prices + products (test AND live mode) | [AI→USER] | ☐ |
| 3 | If live payments ever ran: refund/void open items first, keep records (tax!) — do NOT purge financial history | [USER] | ☐ |

## 3. Shared DB (Supabase — project stays!)
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Export product rows if worth keeping (orders/events to bizops archive) | [AI] | ☐ |
| 2 | `delete from events/orders/app_users where product_id='<id>'; delete from products where id='<id>';` | [USER runs] | ☐ |
| 3 | Delete the product's auth users (Supabase Auth → users created via this product) | [AI→USER] | ☐ |
| 4 | Remove the product's redirect URLs from Auth → URL Configuration | [AI] | ☐ |

## 4. Email (Buttondown — account stays)
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Export subscribers carrying the product tag | [AI→USER] | ☐ |
| 2 | Delete the tag; delete/unsubscribe tag-only subscribers | [AI→USER] | ☐ |

## 5. Analytics + search
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Delete the GA4 property (or data stream if property is shared) | [AI→USER] | ☐ |
| 2 | Remove the Search Console property | [AI→USER] | ☐ |
| 3 | Remove product events/dashboards filter in PostHog (project stays) | [AI] | ☐ |
| 4 | Revoke the stats service-account grants that were product-specific | [AI→USER] | ☐ |

## 6. Socials + external
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Archive/close product social accounts; export anything worth keeping | [USER] | ☐ |
| 2 | Remove product API keys from third-party dashboards (X, etc.) | [USER] | ☐ |

## 7. Secrets + config
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Delete the product's CF Pages env secrets (dies with the project, verify) | [AI→USER] | ☐ |
| 2 | Rotate any shared keys the product's deploys ever held, if compromised-in-doubt | [USER] | ☐ |
| 3 | Remove the entry from `products.ts` (or archive the repo if product-per-repo) | [AI] | ☐ |
| 4 | Archive (don't delete) the GitHub repo; delete only if truly disposable | [AI→USER] | ☐ |

## 8. Books
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Mark recurring ledger rows `cancelled` in bizops with end date | [AI] | ☐ |
| 2 | Note the experiment verdict (kill/park) + final metrics in the project log | [AI] | ☐ |

## Verify flush
| # | Step | Owner | Status |
|---|------|-------|--------|
| 1 | Domain NXDOMAIN/404s; pages.dev project gone | [AI] | ☐ |
| 2 | `select count(*) ... where product_id='<id>'` = 0 across all tables | [AI] | ☐ |
| 3 | stats:pull shows no trace; no recurring charges next statement | [AI]/[USER] | ☐ |
