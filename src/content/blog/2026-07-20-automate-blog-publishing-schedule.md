---
title: "I Automated My Blog's Publishing Schedule"
description: "I built a small TypeScript scheduler to automate my blog's publishing schedule, keeping four weeks queued and never running dry."
pubDate: "2026-07-20T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["automation", "content", "build-in-public", "typescript", "workflow"]
targetKeyword: "automate blog publishing schedule"
secondaryKeywords: ["schedule blog posts in advance", "content drip schedule", "content calendar automation", "evergreen content scheduling", "auto-publish blog posts"]
searchIntent: "informational"
audience: "bloggers and indie builders who want a steady publishing cadence without manual scheduling"
summary:
  lead: "My blog's queue ran dry twice in one month, so I built a scheduler that keeps four weeks queued and won't let me forget again."
  points:
    - "Renaming a post to a new date means renaming the file and rewriting every inbound link on the blog, since the filename is the URL in Astro."
    - "Default mode is dry-run, showing every move before touching disk. `--apply` is the only thing that commits it."
    - "One day in the queue always stays empty on purpose, so a same-day post can slot in without bumping everything else."
    - "The coverage report currently says I'm at 19 days against a 28-day target, the exact gap that used to go unnoticed until the queue hit zero."
  whatYouGet: "The rules the scheduler runs on and why one slot always stays empty on purpose."
heroImage: "/images/automate-blog-publishing-schedule.png"
heroImageAlt: "A receding timeline of calendar-day slots with glowing mint post-cards sliding along it and the nearest slot left empty, the cover image for automating a blog publishing schedule"
---

My blog's queue ran dry twice in one month, so I stopped scheduling posts by hand and wrote the scheduler instead. It's about 150 lines of TypeScript that keeps four weeks queued and sinks my evergreen filler posts to the back. It renames files and rewrites links across the whole site the moment I tell it to move something.

Same failure both times. I'd schedule two or three weeks of posts, get pulled into something else, then forget to extend the queue until it hit zero on a random Tuesday and the site just sat there with nothing new. So I automated my blog's publishing schedule instead of trusting myself to remember it, because I clearly can't.

## The filename is the URL, and that's the catch

Astro content collections use the filename as the slug. My posts live in `src/content/blog/` as `YYYY-MM-DD-slug.md`, so `2026-07-14-dark-dashboard-design.md` becomes `/blog/2026-07-14-dark-dashboard-design/`. The date isn't metadata sitting quietly in frontmatter. It's baked directly into the URL.

Which means re-dating a post is never just editing a `pubDate` field. Move a post from July 14 to July 22 and I have to rename the file to match, then find every other post that links to the old path and rewrite those links too, or I've quietly 404'd part of my own site. I found this out by hand, before the scheduler existed. Renaming one file broke two inbound links from earlier posts, and I didn't notice for a week.

## How this actually automates the publishing schedule

The rule is simple. Anything dated today or earlier is frozen. The scheduler won't touch it, full stop. Everything dated after today is fair game, and it re-slots those posts daily for about four weeks out, then switches to monthly spacing past that point. Near-term coverage is tight. Far-term coverage is loose, because it doesn't need to be exact yet.

Filler posts, the evergreen ones marked `filler: true` in frontmatter, get sunk to the tail of the queue automatically. Those are the posts that don't age, so they're the ones I'm happiest parking at the back, filling in whatever dates nothing else claims first.

Running the scheduler prints a coverage report before it touches anything: how many days out the queue actually reaches, and whether that clears my 28-day target. Right now it says I've got about 19 days of queue. Under target. That's exactly the warning that didn't exist the week the queue hit zero.

## Dry-run first, apply second

Default mode is dry-run. It shows me every move before making it: old date, new date, old filename, new filename, every inbound link it would rewrite. Nothing touches disk until I run it with `--apply`.

On `--apply` it rewrites the `pubDate` in frontmatter and renames the file. Then it greps the whole `content/blog` directory for any post linking to the old path, rewriting those links to match. That's the part that used to cost me twenty minutes of manual grep-and-replace per move. Now it's done in under a second, without me forgetting a link the way I did the first time.

## One slot stays open on purpose

The design goal is keeping about four weeks queued and leaving the very next open day empty. On purpose.

That gap exists so a same-day post, something I actually built or broke that day, can slot straight in without me bumping the whole queue by hand. When that happens, the scheduler pushes everything else back a day and the buffer holds. The open slot is why "automated" doesn't mean "rigid." A real experiment still gets to publish the day it happens.

## Whether this is more than my own annoyance

WordPress.com's own writeup on scheduling puts a number on the problem I kept hitting: half of all bloggers publish weekly or a few times a month, and very few manage a sustained daily cadence, because holding daily by hand is hard. Same piece makes the case for automating it at all. Instead of logging in every time a post should go live, an automated schedule just follows the plan, with less room for a person to forget.

HubSpot's guidance for blogs under a year old lands on 6 to 8 posts a month, organized around a few topic clusters. A steady queue, not sporadic bursts. That's roughly where I'd been aiming by feel before a script started enforcing it.

Search Engine Journal is blunt about what happens to sites that don't hold that rhythm. Google rewards sites that update consistently, and publishing daily for weeks and then going dark for months does more harm than a slower, steady pace would have. That's the actual stakes of a running-dry queue. A blank day breaks rhythm, and the dashboard I built to [measure whether any of this is working](/blog/2026-07-09-how-to-measure-blog-seo/) will eventually show that gap too, once enough of them stack up.

## Where this sits next to the rest of the pipeline

This scheduler doesn't write anything. It just decides when. The drafting still runs through [the eight-stage pipeline I wrote up last week](/blog/2026-07-13-automate-blog-writing-with-ai-agents/), where seven agents handle research through review before I ever see a draft. The scheduler sits after all of that, deciding which day a finished post lands on and keeping the runway clear so the pipeline always has somewhere to put its output.

There's a longer post coming on [the full automation stack](/blog/2026-07-19-ai-automation-stack/), how the research loop and the drafting pipeline hand off to this scheduler without me standing in the middle of most of it. This is one piece of that.

Subscribe to the RSS feed and you'll never miss a post, even the ones about keeping the queue from running dry. Or steal the approach. It's just a cron job with opinions about coverage.

---

*Sources: WordPress.com's guide on scheduling and automating blog post publishing, including the daily-cadence rarity among bloggers and the case for automated scheduling reducing human error (wordpress.com/go/content-blogging/how-to-schedule-and-automate-wordpress-blog-post-publishing/); HubSpot's blogging frequency benchmarks recommending 6-8 posts a month for blogs under a year old (blog.hubspot.com/marketing/blogging-frequency-benchmarks); and Search Engine Journal's piece on ideal posting frequency and the cost of an inconsistent publishing rhythm (searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884/).*
