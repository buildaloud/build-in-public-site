---
title: "I Fell Down a CSS Glow Animation Rabbit Hole"
description: "I redesigned my own site and one CSS glow animation ate an entire evening. Here's the breathing-glow build and the migration mess underneath it."
pubDate: "2026-06-19T15:00:00Z"
summary:
  lead: "I redesigned my personal site and burned an evening on one glow animation that breathes card to card. What was supposed to be a quick refresh turned into a rabbit hole."
  points:
    - "The centerpiece: a four-card engineering-creed band where the glow travels tile to tile."
    - "Keyboard focus rings and reduced-motion support underneath. Nobody notices it. Everybody feels it if it's missing."
    - "Two personas are living in one repo right now: the new AI/SRE portfolio next to an old WordPress services funnel I haven't killed yet."
  whatYouGet: "How far I went for one animation detail, and why the unglamorous accessibility work mattered more."
author: "Chad"
project: "build-aloud"
tags: ["css-animation", "build-in-public", "frontend", "accessibility"]
draft: false
heroImage: "/images/hero-composite-chads.png"
---

The plan was modest: redesign my site, ship it, move on. Four hours later I was tuning the timing on a CSS glow no visitor will ever consciously notice. Hadn't touched a single line of the copy I sat down to write.

This is a post about a rabbit hole. The site is the excuse.

## The reframe

The old site was a service funnel. The new one is an identity: **Chad Furman | Applied AI & SRE**, tagline "Engineering Manager · Applied AI & SRE," with a hero line about bridging old-school systems engineering and the AI work I do now.

Rebuilt the nav too. Home, Ask AI, Experience, Projects, Contact, plus a Search (⌘K) field and a Resume button. The hero carries two status chips, "vulnerable dependency → healthy · fossabot · auto-healing" and "Now building · [buildaloud.ai](https://buildaloud.ai)." Under that sits a marquee skill ticker scrolling Kubernetes, Terraform, Anthropic, Rust, Go, Kafka, OpenSearch. It even throws in "Emmy Winning Tech."

All of that came together fast. Then I hit the creed band.

## The centerpiece

The creed band is four tiles, **Ships**, **Scales**, **Works**, **Lasts**, each a glass card stating one engineering principle. On paper it's a static grid. I did not build a static grid.

I gave each card an `aria-label` explainer and made it keyboard-focusable with a `focus-visible:ring-brand` outline. Named the class `creed-breathe`. The idea: an organic glow that breathes and travels card to card, so the band feels alive without anyone having to touch it.

That last sentence is where the evening went.

## The evening I spent on a glow

My iteration log, honestly:

- Started as an interactive creed with synced section reveals. Hover a card, the page responds.
- Felt fussy, so I made it auto-cycle through the four principles, pausing on hover or tap.
- Auto-cycling looked mechanical. Rebuilt it as an organic breathing glow that travels card to card.
- Too fast. Slowed it to 10 seconds per card.
- 10 seconds felt sleepy. Landed on a 5-second auto-breathe.

I spent an evening on a glow. Not the highest-leverage thing on the board, and I know it. But a portfolio's job is to make someone feel like the person behind it sweats the details, and the breathing band does exactly that.

## What the glow taught me about performance

A card-to-card glow can run forever without tanking the page because I kept it on properties the browser animates cheaply. Per web.dev's animation guide, you should "restrict animations to `opacity` and `transform` to keep animations on the compositing stage." Their measured example dropped 1% of frames animating `transform` versus 50% animating `top`/`left`. So the glow is opacity and transform, never layout.

The other half is restraint I'd have skipped if I were being sloppy. The `prefers-reduced-motion` media feature, per MDN, detects whether a user "has enabled a setting on their device to minimize the amount of non-essential motion," and the recommended practice is to remove, reduce, or replace the motion when they have. A breathing glow is non-essential by definition. Under reduced-motion it stops breathing and just sits there, lit. The `aria-label`s and focus rings mean the same content works for keyboard and screen-reader users who never see the glow at all.

A glow is a vanity feature. Shipping it accessibly is not.

## The honest part: two sites in one repo

Here's the mess I'm not hiding. The redesign isn't a clean cutover. Two personas currently coexist in the build: the new Applied AI & SRE portfolio, and an older "WordPress & E-Commerce Solutions" service funnel still living at `/services/*`.

I'm migrating my own site in public, which means for a while the front door says "AI and SRE" while a back hallway still sells WordPress builds. That tension is real, and pretending it isn't would make this a worse dev log.

The Career Trajectory timeline is part of the reframe. Year anchors at 2024, 2021, 2016, plus Earlier, each role tagged with pills and rewritten in first person. FOSSA, Engineering Manager for Agentic AI (fossabot, a kops→EKS migration). Klaviyo, Senior Python SWE, billions of emails a day. Clevertech, tech lead on Evercast, helped raise $4M and earned an Engineering Emmy® for 4K/60fps 10-bit 4:4:4 video over the web. UAlbany, ML research on PHI de-identification with SVMs. Rewriting all of that from résumé third-person into first person was its own quiet edit.

## The deploy gotcha

One thing worth saving you the hour I lost: Vercel builds one artifact per commit SHA. If you squash or rebase such that the SHA you push doesn't match what you tested, you can ship a build you never saw. The fix was to merge with `--no-ff` to main so the SHA that builds is the SHA I reviewed.

## Where this leaves it

The site isn't done. The two personas still overlap. The `/services` funnel still needs a decision. I have opinions about the marquee ticker I haven't acted on yet, too. But the creed band breathes, and it's accessible. That's what a portfolio centerpiece should do: make you look twice.

If you want to watch the rest of this migration happen in public, including whatever I do about the WordPress hallway, subscribe to the RSS feed. The other things we're building are over at [/projects](/projects).

---

*Written by Chad, 2026-06-19, mid-migration. Performance and accessibility claims sourced from [web.dev's animation guide](https://web.dev/articles/animations-guide) and [MDN on prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).*
