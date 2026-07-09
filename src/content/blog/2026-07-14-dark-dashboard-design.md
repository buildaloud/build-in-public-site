---
title: "My Dark Dashboard Design Doesn't Fake Good News"
description: "How I approached dark dashboard design for my stats page: matte charcoal, tabular numbers, and empty states that never lie about missing data."
pubDate: "2026-07-14T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["design", "dashboard", "frontend", "ui", "build-in-public"]
targetKeyword: "dark dashboard design"
secondaryKeywords: ["dashboard empty state design", "data dashboard typography", "analytics dashboard UI design", "telemetry dashboard design"]
searchIntent: "informational"
audience: "frontend devs and designers building an honest analytics dashboard"
summary:
  lead: "I built /stats/ to look like a spacecraft instrument panel instead of a SaaS dashboard, because an instrument panel isn't allowed to lie about the numbers."
  points:
    - "The background sits at #0c0e12, a matte charcoal, with panels a shade lighter at #13161c. Text runs light grey instead of stark white. Mint (#a3f7bf) shows up exactly once per panel, on the one number that's actually the point."
    - "The hero number on each panel runs in a big serif, Instrument Serif, so there's one thing to notice first. Below it, a JetBrains Mono grid keeps every column of digits lined up, so 124.17 sits under 680.90 without the columns drifting."
    - "When a post has no search data yet, the panel says 'gathering signal' in plain grey and stops there. No inflated zero, no soft yellow glow. It won't say 'no data' either, since that reads as permanent when collection is actually still running."
  whatYouGet: "The design logic behind /stats/, from the muted color palette down to the empty state that refuses to fake a number when there's nothing to report yet."
heroImage: "/images/dark-dashboard-design.png"
heroImageAlt: "A dark instrument panel with one large mint-glowing metric standing out among muted grey ones, the honest dark dashboard design"
---

I designed my blog's stats page to look like a spacecraft instrument panel, and that wasn't just for style. A dashboard that always looks positive is lying to you, so mine is built to say "no signal" when there's no signal.

That's the whole case for the dark dashboard design behind /stats/. It decides what the page is allowed to claim, and it refuses to round anything up to make me feel better about the numbers.

## Every dashboard looks like the same template

Open ten analytics tools and you'll see the same page redrawn ten times. Bright white background. A cheerful blue gradient near the top. Everything trending up and to the right, or close enough that nobody notices when it isn't. Green badges on numbers that barely moved. The design language of a SaaS marketing page, wearing a chart as a costume.

None of that is neutral. A page built to look encouraging will find a way to look encouraging even when the underlying number is flat or bad. Round a figure up a little. Pick a color that reads as "good" regardless of what it's actually attached to. The dashboard turns into a mood instead of a measurement.

I wanted a page whose only job was reporting what's true.

## Built like an instrument panel

/stats/ is the panel I actually check to see what's happening with each post. Whether it's getting impressions at all. Whether any of those impressions turn into a click.

An instrument panel doesn't try to make the pilot feel good. It reports altitude. It reports fuel level. If fuel runs low, the needle doesn't ease toward the middle to soften the blow. That's the model I built toward: a page whose only job is telling me what's true, even when what's true is nothing yet.

## Color discipline: charcoal, one accent, everything else quiet

The background sits at #0c0e12, a matte charcoal rather than true black. Panels sit on a slightly lighter #13161c, lifting them off the base without turning shiny. Text runs light grey rather than pure white, since full white against full black is the pairing that tires eyes fastest and reads harsh instead of calm.

That lines up with actual guidance for dark-mode dashboards: dark grey backgrounds instead of true black, and cards a shade lighter than the page sitting behind them. The same source recommends light grey text over stark white for the same reason, keeping most of the data muted and saving strong color for the handful of numbers that actually matter.

So mint (#a3f7bf) shows up exactly once per panel, on the one metric that's the actual point of that panel. Everything else on the page stays grey. The color works because it's rare. If every number on the page glowed mint, none of them would mean anything.

## A serif number, then a grid that lines up

The hero number on each panel is set in Instrument Serif, big enough to read from across the room, doing the job a headline does on a page: here's the one thing to notice first.

Below it sits a grid of supporting metrics in JetBrains Mono. Monospace solves a real alignment problem. When every digit is the same width, a column of numbers lines up, ones under ones, decimals under decimals. That's the case for tabular figures in a data display, where a number like 124.17 needs to sit directly under 680.90 without the columns drifting sideways just because a "1" is narrower than an "8" in most fonts. A grid where the numbers wander makes the reader work to compare two rows that should compare instantly.

Serif for the one number that matters most. Mono for the rows meant to be scanned side by side.

## The part I care about most: an empty state that won't lie

Here's the piece I'd defend hardest. When a post has no search data yet, the panel doesn't hide that or dress it up. It says "gathering signal," in flat grey, and stops there.

It would be easy to fake this. A soft yellow "warming up" glow, or a zero rounded up to look like a trend that hasn't started yet. Worse, and this is the exact mistake the research calls out, showing "no data" on a panel that's actually still loading, so a temporary system state reads to the visitor as permanent fact. That specific failure, an empty state lying about whether data exists versus whether it simply hasn't arrived yet, is exactly what destroys trust in an interface, according to Nielsen Norman Group's writeup on empty state design. Lie once on a dashboard and every other number on it stops being trusted too.

Data collection is running. Nothing has come back yet. That's all "gathering signal" claims, and all it should claim. I've already written up [the data behind this dashboard](/blog/2026-07-09-how-to-measure-blog-seo/): the per-post SEO scorecard where most tiles currently read that same grey status, because a few weeks of impressions isn't enough to call anything yet. What's on /stats/ right now is the visual skin sitting on top of that same honesty.

## The signature: a mint line and a mono label

Every panel on the page carries the same two marks. A thin mint top-border, one pixel of color along the top edge of an otherwise grey card. And a label set in mono, prefixed with //, the way a comment reads in code. // IMPRESSIONS. // AVG POSITION.

Take the mint border away and the panels blur into a wall of identical grey cards. Put it back and each one reads as its own instrument, reporting its own single number.

## Go look at it yourself

None of this means much as a description. Pull up [the live dashboard](/stats/) and find a post that hasn't picked up any search traffic yet. Watch the panel say "gathering signal" in plain grey instead of inventing a number to make me feel better about it. That's the whole design, working exactly as intended, on a post that currently has nothing to report.

---

*Sources: dark-dashboard color guidance on background depth and reserved accent color from Wendy Zhou (wendyzhou.se/blog/dark-dashboard-ui-design-inspiration); Nielsen Norman Group's writeup on empty state interface design and the trust cost of misleading "no data" messaging (nngroup.com/articles/empty-state-interface-design); and Datawrapper's piece on tabular figures for data typography (datawrapper.de/blog/fonts-for-data-visualization).*
