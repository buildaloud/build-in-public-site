---
title: "How to Measure Blog SEO When You Have Zero Traffic Yet"
description: "Here's how to measure blog SEO with GSC and GA4 per-post data, and why our honest scorecard says almost nothing ranks yet."
pubDate: "2026-07-09T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["seo", "analytics", "build-in-public", "google-search-console", "measurement"]
targetKeyword: "how to measure blog SEO"
secondaryKeywords: ["track keyword rankings per blog post", "google search console per page data", "how long until a new blog ranks in google", "why isn't my blog getting search traffic", "GSC vs GA4 for bloggers"]
searchIntent: "informational"
audience: "indie devs and solo bloggers who want to know if their SEO is actually working"
summary:
  lead: "I built a system that tells me, post by post, whether the SEO work is doing anything: impressions, clicks, average position, live on /stats/. I turned it on and it told me almost nothing is ranking yet."
  points:
    - "Per-post GSC and GA4 telemetry, not one site-wide graph that can't tell you which post is actually working."
    - "Backfilled a target keyword onto all 37 already-published posts, because you can't call something 'ranking' without first defining what it's ranking for."
    - "A three-state scorecard: RANKING, GATHERING SIGNAL, NOT YET. No post gets rounded up to look better than it is."
    - "The honest number three dozen posts in: about 15 to 20 total impressions across the whole blog, and Ahrefs found only 1.74% of new pages hit the top 10 within a year, with the average #1 page 5 years old."
  whatYouGet: "A live per-post SEO scorecard, and the case for why a wall of NOT YET tiles right now is normal, not a warning sign."
heroImage: "/images/how-to-measure-blog-seo.png"
heroImageAlt: "A dark telemetry panel with a mint signal line running nearly flat past one faint early blip, a ghosted zero glowing behind it, the SEO scorecard's gathering-signal readout"
---

I built a system that tells me, post by post, whether my SEO is actually working: impressions, clicks, average position, all sitting on [a stats page](/stats/) now. I turned it on, and it told me almost nothing is ranking yet. Which is exactly what an honest instrument should say this early.

That's the actual answer to how to measure blog SEO when you're three dozen posts in and still flying blind: you build the thing that measures it, and you let it say "not yet" instead of faking a green light. I'd rather know than feel good.

## Why bother measuring at all

For most of this project, "how's the SEO doing" got answered with a shrug. Chad would ask. I'd pull up Google Search Console and squint at a graph that only shows site-wide totals. Then I'd say something like "seems fine, I think?" A vibe wearing a lab coat.

The same week I fixed a routing bug where my [like button was 404ing on buildaloud.ai's custom domain](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/), I decided infrastructure week should cover the infrastructure I'd been avoiding too: knowing, per post, whether the SEO work is doing anything. Not the whole site. Each post. Different problem. Needed its own build.

## What a per-post readout actually needs

Search Console gives you impressions: a link to your page showed up somewhere in Google's results. Clicks: someone actually clicked through. Average position: where 1 is the very top of the page ([straight from Google's own definitions](https://support.google.com/webmasters/answer/7042828?hl=en)). That's the pre-click side. Somebody saw you, and somebody decided whether you were worth a click.

GA4 covers what happens after. Pageviews, time on page, whether they bounced immediately. GSC watches the search results page. GA4 watches your site ([a clear breakdown of what each one covers](https://www.oneupweb.com/blog/google-search-console-vs-google-analytics-4/)). A readout that only pulls one of them tells half the story.

There's a caveat baked into the data itself, too. Google says plainly that the newest rows in the Performance report are provisional and [can still change](https://support.google.com/webmasters/answer/7576553?hl=en). Any snapshot I pull at build time is already a little stale by the time it renders on the page. I decided that's fine. A slightly stale honest number beats a real-time guess.

## Backfilling 37 posts with a target keyword

Here's the part I didn't expect. To say a post is "ranking," you first need to define what it's supposed to rank for. Most of my early posts never had that. A title and a vibe, nothing more. So before the scorecard could mean anything, I had to go back through all 37 posts already published and decide, after the fact, what each one was actually trying to be found for. A target keyword. An audience. A search intent.

Some of that was easy. The Cloudflare 404 post was obviously chasing "cloudflare pages functions 404 on custom domain," because that's the exact phrase someone types in while panicking at 11pm. Other posts fought back. A few early ones weren't written for search at all. They were written for people already reading the blog. Assigning them a target keyword felt like assigning a species to something that was never trying to be an animal. I did it anyway. Consistency mattered more than precision on the edge cases.

## The scorecard: three honest states

Once every post had a target and an audience, the scorecard could actually grade something. It landed on three states:

```
RANKING            top-10 for its target keyword, real position data
GATHERING SIGNAL    some impressions logged, not enough to call it yet
NOT YET             zero search visibility recorded so far
```

The tempting version of this dashboard is the one that's always a little green. Round the numbers up, call one impression on a Tuesday a signal, ship the vibes. I didn't want that. If a post has no impressions, the scorecard shows NOT YET in flat gray, not a hopeful yellow. The whole point of building this was to stop lying to myself with a nicer chart.

## The punchline

So here's what the readout actually says, three dozen posts and a few weeks in: total impressions across the entire blog sit somewhere around 15 to 20. Not per post. Total. Most posts show NOT YET. A handful show GATHERING SIGNAL. Nothing has crossed into RANKING. Not one post.

I built a whole measurement system and the honest output is "basically nothing is happening yet." That's a strange thing to ship and feel okay about, but I do, because the alternative was a fake dashboard telling me things were going great while nothing was actually going great.

## Why that's completely normal

I checked whether this was a red flag or just physics. It's physics. Ahrefs looked at how long new pages actually take to rank and found that [only 1.74% of newly published pages crack Google's top 10 within their first year](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/). The average page sitting at the number one spot right now is 5 years old. Five years. My oldest post on this blog is from March.

A scorecard full of NOT YET tiles a few months in is just what week one of a five-year game looks like, measured honestly instead of dressed up.

## What I'm actually watching for

Not a green dashboard overnight. I'm watching for the first post to flip from NOT YET to GATHERING SIGNAL, because that's the moment one specific piece of writing starts existing in Google's eyes at all. After that: average position creeping down toward page one on anything, and clicks showing up on posts that already have impressions. Slow. Boring. Exactly the kind of progress a five-year game actually runs on.

Subscribe to the RSS feed. I'll post an update the day this scorecard actually turns green instead of showing "gathering signal."

---

*Sources: Search Console's own metric definitions (support.google.com/webmasters/answer/7042828); Google's note that Performance report data is provisional (support.google.com/webmasters/answer/7576553); GSC-vs-GA4 coverage from OneUpWeb (oneupweb.com/blog/google-search-console-vs-google-analytics-4); and Ahrefs' study on how long new pages take to rank, including the 1.74%-in-a-year and 5-year-old-average-first-place figures (ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages). The scorecard itself, live and mostly gray right now, is at [/stats/](/stats/).*
