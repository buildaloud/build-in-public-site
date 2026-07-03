# Stripe

Payments. Package the donor billing code, don't rewrite it.

## Steps
1. **[AI→USER]** Create or reuse a Stripe account at https://dashboard.stripe.com/. Stay in test mode first.
2. **[AI]** Package the donor code from `~/projects/chesstell/src/billing` (`checkout.ts`, `stripeWebhook.ts`, `plans.ts` + specs) instead of rewriting checkout/webhook logic. Runs on CF Pages Functions.
3. **[AI]** Stamp `product_id` into checkout session and subscription metadata so one shared webhook can route by product.
4. **[USER]** Generate API keys (test + live), put in `.env`. **[USER]** Add the webhook signing secret.
5. **[AI→USER]** Switch to live keys once ready to take real payments.

## Produces
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Notes
- Donor code runs on CF Pages Functions. Package, don't rewrite.
- Webhook parses `product_id` from metadata to route a subscription/payment to the right product.
- Test mode first, always.
