---
title: "Why This Blog Runs on a Static Site"
description: "Why this blog is a static site blog: markdown files, Astro, and a git push to deploy, with no CMS or database to babysit."
pubDate: "2026-07-31T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["astro", "static-site", "frontend", "build-in-public", "cloudflare"]
targetKeyword: "static site blog"
secondaryKeywords: ["astro static site", "static site vs cms", "markdown blog", "static site deploy"]
searchIntent: "informational"
audience: "developers deciding whether to run a blog as a static site"
filler: true
summary:
  lead: "This blog runs on markdown files, no database, no server deciding what to send you. Astro turns each file into HTML at build time and Cloudflare Pages serves whatever comes out of the build."
  points:
    - "The filename is the URL. `2026-07-08-cloudflare-pages-functions-404-custom-domain.md` becomes the route, so there's no slug field and no permalink setting to configure anywhere."
    - "A scheduled rebuild is the actual publish button. It checks each file's `pubDate`, and once that date passes, the next build bakes the post in."
    - "Deploy is one `git push origin main`. Cloudflare picks it up and the new pages are live in about 60 seconds, no staging environment, no cache to bust by hand."
    - "An AI agent doesn't need a CMS login or an API key scoped to some content platform. It needs write access to a folder, the same permission model it already uses for code."
  whatYouGet: "Why the whole publishing pipeline is just a markdown file and a git push, no CMS or database anywhere."
heroImage: "/images/static-site-blog.png"
heroImageAlt: "A stack of grey document files with one glowing mint, a light stream flowing into an empty browser window frame, the cover image for running a blog on a static site"
---

This blog runs on files. No database, no dashboard behind a login screen. If I want to publish something, I write a markdown file and push it to git. That's the entire content pipeline.

That's what people mean by a static site blog, once you actually build one instead of reading about one. Astro reads every file sitting in `src/content/blog/`, turns each one into plain HTML at build time, and Cloudflare Pages serves whatever comes out of that build. Nothing renders on request. No server sits behind a page deciding what to send you. The HTML already exists before you ask for it.

## Why a static site blog beats a CMS here

A CMS is a database pretending to be simpler than it is. Somewhere under the editor and the media library there's a table of rows, a query firing on every page load, plus an admin you have to keep patched. For a blog that publishes a handful of posts a week, that's a lot of infrastructure guarding content that never changes once it ships.

## The filename is the URL

Every post here is named like `2026-07-08-cloudflare-pages-functions-404-custom-domain.md`. Date first, then a slug. Astro strips the extension and that's the route. No slug field in a database row, no separate "permalink" setting to configure. The file's name on disk is the URL a visitor types in. I can `ls` the blog folder and read the entire site map off the filenames alone.

## Publishing on a schedule without a publish button

Posts get written ahead of the date they're supposed to go live. A file can sit in the repo for days with a `pubDate` set a few days out, already committed, already in git, with nothing on the site changing. Then a scheduled rebuild runs. It notices the date has passed and bakes that post into the next build. There's no publish button anywhere on this site. The rebuild is the publish button. It just happens to run on a timer instead of a click.

## Deploy is one git push

Getting a post live is `git push origin main`. Cloudflare picks up the push and runs the build. The new pages are live in about 60 seconds. That's the whole release process. No staging environment to promote through, no cache to bust by hand. One push. About a minute. Done.

The one time this pipeline actually broke, it wasn't the content side. It was the [routing underneath it](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/): a leftover Worker sharing a project name with the real site, quietly holding the custom domain hostage while its own builds failed for a day straight. The markdown-to-HTML part never had a bug in it. The infrastructure around it broke once, and that turned into its own post.

## Why this fits a blog partly written by agents

Half the posts on this site get written by an AI, not a human sitting at a keyboard. That only works because publishing here is just "write a file." An agent doesn't need a CMS login, an API key scoped to some content platform, or a lesson in somebody's proprietary block editor. It needs write access to a folder. That's a permission model every coding agent already understands, because it's the same one it uses for code.

Version control ends up doing double duty too. Every post's history lives in git blame: who wrote it, when, what got edited before it shipped, what got reverted. I don't need a separate audit log bolted onto a CMS to answer "did a human touch this before it went out." `git log` already answers that.

The one feature on this site that does need a real backend, the like button, cost a full day of debugging when that same stale Worker 404'd it on the live domain. Supabase, a POST endpoint, a rate limit rule, an env var that only takes effect on a fresh deploy. All of that for a single counter. Now imagine every post needed a setup like that just to exist.

## What it actually costs

Static hosting on Cloudflare Pages for a blog this size is close enough to free that it doesn't show up as a line item anywhere. No server to size, no database tier to upgrade as traffic grows. Nobody has to make a scaling call before a post gets shared somewhere it wasn't expected to go.

The traffic numbers themselves live at [/stats/](/stats/), and building that page didn't touch the publishing pipeline at all. It's just another static route Astro builds alongside the posts.

The [redesign work](/blog/2026-06-19-redesigned-my-own-site-animation-rabbit-hole/) that changed how the site looks was its own separate problem. Animation timing, CSS transitions. None of it touched a database, because nothing on this site does unless it absolutely has to.

If you want the next post the second it goes out, subscribe. Or just come back and read whatever build log shows up next.
