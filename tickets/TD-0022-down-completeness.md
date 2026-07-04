---
id: TD-0022
title: 'lifecycle down: auth-user + Buttondown-tag cleanup'
status: open
priority: P2
rank: 22
area: build
pillars: []
blocked-by: []
created: 2026-07-04
---

# TD-0022 · lifecycle down: auth-user + Buttondown-tag cleanup

## Why

First real teardown (2026-07-04, demo) left two resource types behind:
Supabase auth.users identities (app_users rows die, the auth identities
survive) and Buttondown product tags/subscribers (module not wired). The
flush checklist covers both; the tool should too.

## What

supabase down: list auth users whose app_users rows carried this product_id
(capture user ids BEFORE deleting rows) and delete them via the auth admin
API with the secret key — only when the user has no app_users rows left for
OTHER products (multi-product users survive). buttondown down: export then
delete the product tag; unsubscribe tag-only subscribers (BUTTONDOWN_API_KEY
already in the ceremony).

## Acceptance

- [ ] down leaves zero product-scoped identities/tags across providers
- [ ] Multi-product users are never deleted
- [ ] flush/CHECKLIST.md rows 3.3 + 4.x marked as automated
