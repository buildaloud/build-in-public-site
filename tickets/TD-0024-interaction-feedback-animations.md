---
id: TD-0024
title: 'blueprint: immediate animated feedback on all non-pageload interactions'
status: open
priority: P2
rank: 24
area: build
pillars: []
blocked-by: []
created: 2026-07-10
---

# TD-0024 · blueprint: immediate animated feedback on all non-pageload interactions

## Why

The blueprint's email capture / user-entry boxes (splash waitlist subscribe,
/app magic-link form, panel sign-in — all AJAX) give no visual feedback on
submit. Chad (2026-07-10): every user interaction that doesn't result in a
pageload should trigger immediate visual feedback with nice animations that
do not suffer from animation cancelling.

## What

In micro-blueprint:

1. A design-conventions doc (`docs/DESIGN.md` or similar) codifying the rule:
   any non-pageload interaction (submit, click, toggle) triggers immediate
   visual feedback; animations must be cancel-proof (state-machine or
   Web-Animations-API driven, not class-toggle races — no half-played or
   restarted transitions when a response lands mid-animation).
2. Reference the doc from micro-blueprint's `CLAUDE.md` so agents follow it
   on every product.
3. Retrofit the existing surfaces: splash subscribe box, /app auth island,
   panel sign-in + task Complete button (button → pending → success/error
   states with animation).
4. Ships in the template + kit so every spawned product inherits it.

## Acceptance

- [ ] Design doc exists and CLAUDE.md points at it
- [ ] Splash subscribe shows animated pending/success/error, no cancelled animations under fast responses
- [ ] /app + panel forms follow the same pattern
- [ ] Spawned products inherit via TEMPLATE_PATHS/kit
