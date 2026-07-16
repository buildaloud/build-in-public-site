---
title: "I Automated My Blog's Publishing Schedule"
description: "My blog's queue kept hitting zero, so I automated my blog's publishing schedule: freeze the past, re-slot the future four weeks out."
pubDate: "2026-07-20T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["automation", "content", "build-in-public", "typescript", "workflow"]
targetKeyword: "automate blog publishing schedule"
secondaryKeywords: ["schedule blog posts in advance", "content drip schedule", "content calendar automation", "evergreen content scheduling", "auto-publish blog posts"]
searchIntent: "informational"
audience: "bloggers and indie builders who want a steady publishing cadence without manual scheduling"
summary:
  lead: "My blog's publishing queue hit zero twice in one month, both times because I forgot to extend it. So I wrote about 220 lines of TypeScript to do the remembering instead: four weeks out, no reminders required."
  points:
    - "One rule never breaks: nothing dated today or earlier gets touched by the scheduler."
    - "A move that used to take about twenty minutes of manual grep-and-replace across the blog directory finishes in under a second now. `--apply` renames the file and rewrites the frontmatter date, then greps the whole directory for stale links and fixes those too."
    - "The coverage report tracks the queue against a 28-day target. At last check it read about 11 days, the exact warning that was missing the week the queue hit zero."
    - "Posts flagged `filler: true` in frontmatter sink to the tail of the queue automatically, so time-sensitive posts always get slotted first."
  whatYouGet: "The full ruleset and script live in the repo, so you can clone it and automate your own blog's publishing schedule in an afternoon."
heroImage: "/images/automate-blog-publishing-schedule.png"
heroImageAlt: "A receding timeline of calendar-day slots with glowing mint post-cards sliding along it and the nearest slot left empty, the cover image for automating a blog publishing schedule"
---

My blog's publishing queue hit zero twice in one month, both times because I forgot to extend it. So I wrote about 220 lines of TypeScript to do the remembering instead: four weeks out, no reminders required.

I automated my blog's publishing schedule with a script that keeps roughly four weeks of posts queued at all times. It sinks my evergreen filler posts to the back of that queue so time-sensitive posts go first. The engineering turned out to be a different job: it renames files and rewrites links across every other post in `content/blog` the moment something moves to a new date. The script remembers so I'm allowed to forget.

## Same failure, both times

Both dry spells followed the same shape. I'd schedule blog posts in advance, two or three weeks at a time, then get pulled into something else: a bug, a different post, whatever was loud that week. The queue never got extended. It just ran out, on some random Tuesday. The site stalled. No new post, no warning. My own memory failed on a chore with no deadline attached to it.

Extending the queue needed an owner who never gets pulled into anything else, and that's never been me. Handing it off matched the job to the worker that keeps showing up.

## The filename is the URL, and that's the catch

Astro content collections [take the slug from the filename](https://docs.astro.build/en/guides/content-collections/). Every post here lives in `src/content/blog/` as `YYYY-MM-DD-slug.md`, so `2026-07-14-dark-dashboard-design.md` renders at [my dark-dashboard post](/blog/2026-07-14-dark-dashboard-design/). The date is baked directly into the URL. Moving a post to a new date (say July 22 instead of July 14) means renaming the file and rewriting every inbound link from every other post that points at it, or parts of the site quietly 404. Before the scheduler existed, one manual rename broke two inbound links from earlier posts. I didn't notice for a week.

Astro documents a way around all of this: a `slug` field in frontmatter overrides the filename-derived id entirely, so the URL and the filename never have to match. I could have kept `pubDate` as the only thing that moves and never touched a filename or a link again. I built the rename-and-relink machinery instead: my own choice, built on top of an escape hatch Astro already offered. Baking the date into the URL turns every reschedule into a small refactor, and refactors deserve tooling.

## Freeze the past, re-slot the future

One rule is absolute: the scheduler won't touch anything dated today or earlier. Everything after today gets re-slotted: daily spacing for about four weeks out, then monthly beyond that horizon. And the evergreen stuff, anything marked `filler: true` in frontmatter, sinks to the tail of the queue automatically, filling whatever dates nothing else claims first.

Every run prints a coverage report before touching a single file. Run `npx tsx schedule.ts --status` yourself and it tells you exactly how many days of queue remain against a 28-day target. At the time of writing it reads about 11 days, under target. That's the warning that was missing the week the queue hit zero.

I considered giving every future post an exact date, the way a real editorial calendar would. I don't have the attention span to plan four weeks out precisely, so a scheduler that pretends I do would just be lying to me on a delay. Dates close in get exact placement: those posts are about to be real. Far out, it's just rough placement, because by the time they matter I'll have moved things around anyway.

## Dry-run first, apply second

Default mode is dry-run. Every move prints as the old date and the new date, plus the post's title. Nothing touches disk until I run it again with `--apply`. On `--apply` it rewrites the `pubDate` in frontmatter and renames the file. Then it greps the whole `content/blog` directory for anything linking to the old path and rewrites those links to match. A move that used to cost me about twenty minutes of manual grep-and-replace finishes in under a second now. The forgotten link from that earlier incident? Not a risk anymore. It's the one step the script can't skip. That's what auto-publish blog posts should feel like: safe by default, mutating nothing until I say so.

Printing the date move before anything touches disk catches the easy mistake: scheduling a post on top of one that's already there. It doesn't catch everything. The link rewrites hide inside `--apply`, with no preview step. That's why the script's own last line still tells me to verify links before I commit.

## A same-day post skips the queue entirely

The scheduler packs future posts tight, one per day starting tomorrow, no idle gap between runs. A same-day post doesn't need any of that machinery. Something I built and shipped this afternoon just publishes on its own date. The freeze rule was never going to reach forward and grab it. What moves is the future queue. That only happens when an already-queued post needs to jump toward the front instead: re-running the scheduler with `--apply` recomputes the whole plan from scratch and bumps every later post back a day to make room. That bump touches the entire future queue at once. Every run still prints the full move list (one line per post, old date to new date), so the content drip schedule stays visible instead of shifting quietly.

A schedule this automated still needs a way for something built today to ship today. The freeze rule already covers that: the scheduler never touches today's date, so the escape hatch is built directly into the same rule that protects the past.

## The cadence numbers say this beats hand-scheduling

The data backs up what felt like personal neurosis about a calendar. WordPress.com's own writeup on scheduling puts a number on it: about half of bloggers publish weekly or a few times a month, and very few sustain anything close to a daily cadence. Its case for content calendar automation is straightforward: a queue that runs on a plan leaves less room for a person to forget.

HubSpot's blogging-frequency benchmarks are narrower: 6 to 8 posts a month for blogs under a year old, organized around a handful of topic clusters. That's a steady cadence spread across the month.

Search Engine Journal is more blunt about what happens without that steadiness. Google rewards sites that update consistently, and publishing daily for weeks then going dark for months does more harm than a slower, steady pace held the whole way through. Those blank days would eventually show up on [the dashboard I built to measure whether any of this is working](/blog/2026-07-09-how-to-measure-blog-seo/), too.

All three of those pieces land on cadence over volume, which is exactly what those two dry spells cost me. Steadiness is the part I forget. It's also the part a script never does.

## Where the scheduler sits next to the pipeline

The scheduler only decides which day a finished post lands on. The writing happens upstream, in [the twelve-stage content pipeline I wrote up last week](/blog/2026-07-13-automate-blog-writing-with-ai-agents/), now packaged as [agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline). After all twelve of those stages, the scheduler (separate from the pipeline itself) keeps the runway clear, so there's always an open date waiting for whatever post the pipeline hands it next. [The full-stack writeup covers how research and drafting hand off to scheduling](/blog/2026-07-19-ai-automation-stack/) with me mostly out of the middle.

The scheduler stays about 220 lines. The hard part is the writing, and that happens upstream. A bigger scheduler would just be solving a problem I don't have.

## Steal the ruleset

The queue can still dip under target. It reads about 11 days right now, still short of the 28-day target. At this point, not having a scheduler is the harder thing to explain. The coverage report complains about that gap while there's still time to do something about it: the alarm that never sounded the week the queue hit zero.

Freeze anything already published. Keep about four weeks slotted at all times, and sink filler posts to the tail of the queue. A same-day post publishes on its own date without waiting on a reserved slot. Dry-run every change before you apply it. Clone [the scheduler's repo](https://github.com/buildaloud/build-in-public-site) and steal the ruleset: automate your own blog's publishing schedule the same way, and the code fits in an afternoon.

It's just a script I run with opinions about coverage.

## Sources

- [Astro: Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [How I Automate Blog Writing With AI Agents](https://buildaloud.ai/blog/2026-07-13-automate-blog-writing-with-ai-agents/)
- [The AI Automation Stack Running This Blog, End to End](https://buildaloud.ai/blog/2026-07-19-ai-automation-stack/)
- [How to Measure Blog SEO After It Ships](https://buildaloud.ai/blog/2026-07-09-how-to-measure-blog-seo/)
- [My Dark Dashboard Design Doesn't Fake Good News](https://buildaloud.ai/blog/2026-07-14-dark-dashboard-design/)
- [agentic-content-pipeline (GitHub)](https://github.com/buildaloud/agentic-content-pipeline)
- [build-in-public-site (GitHub)](https://github.com/buildaloud/build-in-public-site)
- [WordPress.com: How to Schedule and Automate WordPress Blog Post Publishing](https://wordpress.com/go/content-blogging/how-to-schedule-and-automate-wordpress-blog-post-publishing/)
- [HubSpot: Blogging Frequency Benchmarks](https://blog.hubspot.com/marketing/blogging-frequency-benchmarks)
- [Search Engine Journal: How Often Should You Blog? Tips for Ideal Posting Frequency](https://searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884/)
