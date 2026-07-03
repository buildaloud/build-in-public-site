# Supabase

Shared DB + auth for validation-stage products.

## Steps
1. **[AI→USER]** Create or reuse one shared Supabase project for all validation-stage products at https://supabase.com/.
2. **[AI]** Add tables with a `product_id` column on every table. One shared DB, partitioned by product, not a project per product.
3. **[AI]** Turn on Row Level Security (RLS) and scope policies by `product_id`.
4. **[AI→USER]** Enable Supabase Auth (OAuth + magic links) if the product needs accounts. Batteries-included at $0.

## Produces
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY` if server-side writes are needed).

## Notes
- Free tier: 2 active projects, 500MB DB, 50k MAU auth. A project per product burns through the 2-project cap fast.
- Strategy: one shared project, every table carries `product_id`, RLS on.
