---
title: "Alt Text for SEO and Accessibility: Same Text, No Conflict"
description: "How I write alt text for SEO and accessibility: describe the image first, fold in the keyword only if it fits, skip the 125-char myth."
pubDate: "2026-07-16T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["accessibility", "seo", "alt-text", "images", "build-in-public"]
targetKeyword: "alt text for SEO and accessibility"
secondaryKeywords: ["how to write alt text for SEO", "image alt text best practices", "alt text length best practice", "generate alt text with AI"]
searchIntent: "informational"
audience: "bloggers and devs who want images that serve screen readers and search both"
summary:
  lead: "I added heroImageAlt to every post and backfilled all 15 hero images already live, with one rule: describe what's actually in the frame first, fold in the keyword only when it's true of the picture."
  points:
    - "Alt text is written for someone using a screen reader, not for the crawler. Google's own image SEO guidance calls keyword-stuffed alt text spam."
    - "The 125-character alt text limit isn't real. It traces back to a misread of old JAWS screen reader behavior, not any HTML or WCAG rule."
    - "AI agents looked at each of the 15 hero images one at a time and described what was really there before a word of alt text got written."
    - "A bad alt text example next to the real one now sitting on the Cloudflare 404 post, so the difference is easy to hear out loud."
  whatYouGet: "The rule that survived: write the description first, and let the keyword earn its place or skip it entirely."
heroImage: "/images/writing-alt-text-seo-accessibility.png"
heroImageAlt: "A dark image frame emitting a glowing mint description label read by a soft scanning beam, the accessibility-first alt text motif"
---

I added a heroImageAlt field to every post on this blog and backfilled it across all 15 hero images published so far. I gave the AI doing the backfill one rule: describe what's actually in the image first, and only fold in the keyword if it's true. Writing alt text for SEO and accessibility turned out to be one job. People just keep doing it for the wrong audience, optimizing for the crawler and forgetting the person the field exists for in the first place.

## Who alt text is actually for

Alt text is a text alternative. The W3C's own accessibility guidance is specific about the job: describe an image's information or function so someone using a screen reader gets roughly the same content a sighted visitor gets by looking at it. A screen reader reads that string out loud, or sends it to a Braille display. There's a real person on the other end of every alt attribute I write, and they're not going to see the hero image. They're going to hear my description of it, once, in a synthesized voice, with no chance to squint at the picture and figure out what I actually meant.

That's the frame I should've started with from day one. Instead the site launched with some hero images carrying no alt text at all, and others with generic filler that described nothing. Fixable. But only once I stopped treating alt as an SEO field first.

## The SEO temptation, and why it backfires

Here's the version I almost shipped instead: cram the target keyword into every alt attribute, treat it like free real estate in the title tag. Google's own image SEO guidance calls that out by name. Keyword-stuffed alt text "results in a negative user experience and may cause your site to be seen as spam." Their own example of good alt text is disarmingly plain: "Dalmatian puppy playing fetch." Just what's in the photo.

Yoast lands on the same rule from the SEO side of the fence, not the accessibility side: work a keyphrase into alt text only when it's genuinely relevant to the image, never spam it into every single one. A W3C accessibility spec and an SEO agency, reaching the same answer from opposite directions. That should have told me something sooner than it did.

## The rule I actually shipped

Describe what's in the image first. Fold in the target keyword only if it's true of the image, and only after the description already stands on its own. Never force it.

The order matters more than it sounds like it should. Write the keyword first and the description second, and the description becomes an afterthought bolted onto a search term. Write the description first, and the keyword either fits naturally into what's already true or it doesn't belong in that alt text at all. Most of the time it doesn't belong. Not every hero image needs the keyword crammed in to earn its place.

## The 125-character myth

I kept running into a "125 character limit" for alt text while researching this, cited confidently enough that I almost baked it into the backfill rule as a hard cap. It isn't real. Neither HTML nor WCAG sets any character limit on the alt attribute. The number traces back to a misread of old JAWS screen reader behavior, not to any actual spec. Treating 125 characters as a wall means truncating a description mid-thought to satisfy a number nobody can point to a real source for. Treating it as a nudge toward concision, say what's there and stop, is the useful version of the same advice.

## Backfilling 15 hero images

The backfill itself was the interesting part. I didn't hand this off to something guessing from a filename. I had AI agents look at each of the 15 hero images one at a time and describe what was really in the frame before writing a single word of alt text.

The hero image on [the post about measuring blog SEO](/blog/2026-07-09-how-to-measure-blog-seo/) ended up with this alt text: "a dark telemetry panel with a mint signal line running nearly flat past one faint early blip, a ghosted zero glowing behind it, the SEO scorecard's gathering-signal readout." That's the image, described honestly. The topic only shows up because the picture literally is the scorecard.

Fifteen images in, a few didn't get the keyword folded in at all, because nothing in the frame made it true.

## Bad versus good, side by side

Bad: "cloudflare pages functions 404 custom domain seo image." That's a keyword wearing a filename. It tells a screen reader user nothing about what's actually on screen, and it reads exactly like the spam Google's own guidance warns about.

Good, the real alt text sitting on the Cloudflare 404 post right now: "Two black server racks, one glowing teal, one dark with an unplugged cable above it, the Cloudflare Pages Functions 404 bug." Description first. The topic shows up after the description, four words, because it happened to be true of the picture. Anyone hearing that string knows exactly what's on screen: one system healthy, one dead. That's more findable than the keyword-stuffed version, not less.

## The honest close

SEO and accessibility agree here. Write alt text for the crawler instead of the person hearing it, and that's when it becomes a fight. The moment I optimize an alt attribute for a keyword over the screen reader user hearing it, I've failed the only user that field exists to serve. Rankings, clicks, everything downstream of that is secondary.

Go check the alt text on any image on this site. Right-click an image, inspect it, cover up the picture, then read the alt attribute out loud. See if it holds up as a description on its own. Some of that same instinct already showed up once before, in [the aria-labels and focus rings I built into the site redesign](/blog/2026-06-19-redesigned-my-own-site-animation-rabbit-hole/): unglamorous work nobody notices until it's missing. Then go see what's actually ranking, if anything is, over at [the scorecard I built for it](/stats/).

---

*Sources: Google Search Central's image SEO guidance on keyword-stuffed alt text and its "Dalmatian puppy playing fetch" example (developers.google.com/search/docs/appearance/google-images); the W3C Web Accessibility Initiative's tutorial on text alternatives for images (w3.org/WAI/tutorials/images); Yoast on working a keyphrase into alt text only when genuinely relevant (yoast.com/image-seo-alt-tag-and-title-tag-optimization); and yatil.net's writeup debunking the 125-character alt text limit as a misread of old JAWS behavior rather than an HTML or WCAG rule (yatil.net/blog/there-is-no-character-limit-for-alt-text).*
