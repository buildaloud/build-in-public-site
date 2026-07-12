-- Phase 2C engagement: per-post like counter.
--
-- HUMAN-GATED ACTIVATION (Chad only) — none of this is automatic:
-- 1. Apply this migration by hand in the Supabase SQL editor / dashboard,
--    then CONFIRM row level security shows as ON for post_likes with ZERO
--    policies for the anon/authenticated roles. Only the service_role key
--    (used server-side by functions/api/like.ts) can read or write this
--    table; the anon key ships client-side and must never reach it directly.
-- 2. Set SUPABASE_URL, SUPABASE_SECRET_KEY, and LIKE_SALT in the
--    Cloudflare Pages dashboard env (Settings -> Environment variables).
--    The endpoint stays inert (503) until all three are set.
-- 3. Add a Cloudflare rate-limit rule (or Turnstile) on POST /api/like.
--    The app-level global-per-minute cap is only a circuit breaker, not a
--    real per-IP abuse gate — that's what the Cloudflare rule provides.

-- Dedup keys on device_hash — the HMAC of a per-device identity (a client audio
-- fingerprint, or a cookie-token fallback), NOT the IP. An IP is shared across a
-- household/office/CGNAT, so IP-dedup blocks everyone behind one address after
-- the first like. The raw fingerprint is never stored, only its HMAC. ip_hash
-- exists ONLY for the per-voter abuse rate-limit window (functions/api/like.ts),
-- never for dedup.
create table if not exists post_likes (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  device_hash text not null,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  unique (post_slug, device_hash)
);

create index if not exists post_likes_slug_idx on post_likes (post_slug);
create index if not exists post_likes_iphash_idx on post_likes (ip_hash, created_at);
create index if not exists post_likes_created_idx on post_likes (created_at);

-- Deny-all: RLS on, no policies. anon/authenticated get zero access;
-- only service_role (which bypasses RLS) can read/write.
alter table post_likes enable row level security;
