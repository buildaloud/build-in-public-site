---
id: TD-0005
title: finish new-project-template setup folders
status: open
priority: P1
rank: 40
area: build
pillars: []
blocked-by: []
created: 2026-07-03
---

# TD-0005 · finish new-project-template setup folders

## Why

The setup run-sheet proved itself live (GA/GSC/Buttondown for buildaloud) but only google-analytics/ got documented before we pivoted. The learnings from the real session are fresh and should be captured before they rot.

## What

Write the remaining service CLAUDE.mds: search-console (GA auto-verify path), gcp-service-account (reuse one GCP project, SA per concern, keys to secrets/), buttondown (free tier = one list, tag per product), cloudflare-pages. Backfill vercel, resend, stripe, posthog, supabase folders with free-tier limits + donor-code pointers (chesstell Stripe, pet Resend auth).

## Acceptance

- [ ] Every service folder has a CLAUDE.md with owner tags ([AI] / [AI->USER] / [USER])
- [ ] CHECKLIST.md covers all services incl. the new ones
