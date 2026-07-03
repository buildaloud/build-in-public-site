# Resend

Transactional email: magic links, receipts, notifications. Not the newsletter.

## Steps
1. **[AI→USER]** Create or reuse one Resend account at https://resend.com/.
2. **[AI→USER]** Verify a sending domain (or subdomain) per product. The "from" address varies per product even on a shared account.
3. **[AI]** Package the donor code from `~/projects/pet/packages/auth` (Auth.js Resend provider magic-link flow + tests) instead of rewriting the send flow.
4. **[USER]** Generate an API key, put in `.env`.

## Produces
- `RESEND_API_KEY`.

## Notes
- 3,000 emails/mo free, one account across products.
- Transactional only (magic links, receipts, notifications). The newsletter stays on Buttondown.
