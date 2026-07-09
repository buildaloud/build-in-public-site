---
title: "How to Make AI Writing Sound Human (My Actual Fix)"
description: "I built a scorer that catches AI writing tells like em dashes and rule-of-three, then gated my blog on it. Here's how to make AI writing sound human."
pubDate: "2026-07-12T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["ai-writing", "writing", "content", "build-in-public", "human-tone"]
targetKeyword: "how to make AI writing sound human"
secondaryKeywords: ["AI writing tells", "signs of AI writing", "make ChatGPT sound less like AI", "em dash AI writing", "why AI detectors are unreliable"]
searchIntent: "informational"
audience: "writers and devs drafting with AI who don't want the output to read as AI"
summary:
  lead: "I built a scorer that counts AI writing tells instead of asking a detector for a verdict, then hard-gated my blog on the number it returns."
  points:
    - "Counts concrete tells like em dashes and the negation-reframe sentence, not a vague AI-or-not verdict."
    - "Also flags stacked triples and specific overused words per thousand, tells pulled straight from Wikipedia's own list."
    - "Weighs every draft against 106 hand-collected human snippets and hard-gates anything scoring 15 or above."
    - "Ran it backward on five live posts and dropped the average score from 5.2 to 1.4, under the 2.2 human baseline."
  whatYouGet: "A look at the tells the scorer counts and what actually moved the score on a real rewrite pass."
heroImage: "/images/make-ai-writing-sound-human.png"
heroImageAlt: "A stream of mint waveform-like text passing through a dark angular filter that catches a few repeating patterns, the AI-writing tone scorer"
---

I built a scorer that catches AI writing tells: the em dashes, the rule of three. It also flags the "not X, it's Y" reframe. I hard-gate my blog on it now, and this week I ran it across five of my own posts, dropping the average score from 5.2 to 1.4, under the human baseline of 2.2.

I didn't want to figure out how to make AI writing sound human by memorizing a style guide and hoping it stuck while I typed. I wanted a number. Something I could run a draft through and get back a count, not a vibe.

## The tells my scorer counts

Wikipedia has an actual page for this. It's called Signs of AI writing, and it catalogs almost exactly what my scorer counts. Excessive em dashes. The rule of three, three items stacked in a row when two would carry the point fine. The negation-reframe sentence, the one that tells you something is not one thing and then insists it's another, which is its own little tic once you start noticing it. A handful of specific words that show up in every fifth AI paragraph and almost nowhere else, the same ones that page calls out by name.

None of these are damning on their own. A human can write three things in a row. A human can use a dash. The tell is density. How often they show up per thousand words, stacked on top of each other, in a piece that never once breaks its own rhythm.

## The em dash is the tell everyone remembers, and it's the weakest one

The em dash is the one people actually talk about. OpenAI shipped a real fix for it. Sam Altman went on the record calling it a small-but-happy win when ChatGPT started dropping the em dash on request. That's a company patching its own model because too many readers had learned to spot the same punctuation mark in the wild.

Except ask ChatGPT about its own em dash directly, and Rolling Stone did exactly that. It said the em dash by itself is a weak tell. The real giveaway, in its own words, is flat sentences. Formulaic ones. Paragraphs with no actual idea sitting inside them, dressed up to look finished. Punctuation is decoration. An empty sentence is the actual problem, and you can write an empty sentence with a period just as easily as a dash.

## Detectors don't save you either

So if the famous tell is weak on its own, why not just run everything through a detector and trust the verdict? Because the verdicts are bad. A controlled study ran real human-written articles through an AI detector, and 30.4% of them came back flagged above the 50% AI threshold. Human writing. Written by actual people. Flagged as machine output nearly a third of the time. No detector in that study hit 100% reliable, not one of them. The paper's own conclusion is blunt: detectors are a supplementary aid, not a verdict.

The mechanics explain why. Most detectors lean on perplexity and burstiness, roughly a measure of how predictable the word choices are and how much the sentence rhythm varies. A careful human writer, drafting in tight controlled sentences, scores the same low perplexity a machine does. Discipline looks like generation at that level of measurement. The detector can't tell the difference, because at the level it's actually measuring, there isn't one.

## Building the scorer against 106 real human snippets

So I stopped asking for a verdict and built something that counts instead. The scorer runs a draft against a corpus of 106 human-written snippets I collected by hand, real posts and real comments, nothing generated. It skips the AI-or-not verdict and counts things instead. Em dashes per thousand words. Triples. The negation-reframe construction. The specific overused words. Sentence-length variance, since human writing tends to swing between a four-word fragment and a forty-word sentence in a way a lot of generated text just doesn't. Every draft gets measured against that corpus and comes back with a single number, aiScore.

## The gate: nothing ships at 15 or higher

The pipeline hard-gates on that number now. Anything scoring 15 or above doesn't ship. It gets sent back for a rewrite pass before it ever becomes a file in this blog's content folder. I'd already built a separate system for tracking what happens to a post after it goes live, the [actual SEO stats once Google notices it exists](/blog/2026-07-09-how-to-measure-blog-seo/). The aiScore gate runs earlier than all of that. It's the check on the writing itself, before there's anything out in the world worth measuring yet.

## Five posts, before and after

This week I ran the scorer backward across five posts already live on the blog. The write-up on [the Cloudflare Pages Functions bug, where a stale Worker had been squatting on my own custom domain](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/), was one of them. Their scores ranged from 11 up to 21 before I touched a single sentence. After a rewrite pass against each post's own flagged tells, the range dropped to 0 through 6. The average across all five went from 5.2 down to 1.4.

The human corpus itself averages 2.2. My rewritten posts are now scoring under actual human writing. Either the scorer is too aggressive, or the rewrites landed. I'm betting on the second one. I'm still watching for the first.

## What actually moved the number

The fixes that moved the score weren't subtle. Breaking every triple into two items, or four, took a real chunk off by itself. The negation-reframe sentence went next, the one that sets something up as not-this and then swaps in a but-that. I just deleted the setup clause and kept the claim it was hiding.

Sentence length did more work than I expected going in. AI drafts cluster around the same medium length, over and over, sentence after sentence. Splitting one long line into a fragment sitting next to a longer one moved the variance score almost every time I tried it. Em dashes got swapped for periods or parentheses. The qualifier phrases that hedge a claim without actually saying anything got cut outright. Either I was sure of the point or I wasn't, and an unsure claim doesn't belong in the post.

## It's a checklist, not a verdict

None of this proves a post was written by a human, or that it wasn't touched by AI. That's not what the number means. The aiScore is a checklist with a total at the bottom. Zero means a rewrite pass killed every counted tell. It says nothing about who typed the words.

A person can rack up a high score on a bad writing day too. I know that because the human corpus averages 2.2, not 0. Real people slip triples into their own sentences constantly, without an AI anywhere near the draft. The gate catches tells, not authorship. It just turns out AI produces most of those tells a lot more often than people do, and that gap is the whole reason a scorer like this is even useful.

This post went through the same gate before I let it out. I ran the draft against the scorer like any other. It flagged two things on the first pass: an em dash I'd left in without noticing, and a triple I'd stacked without meaning to. I fixed both and ran it again until it cleared under 15. A post about the aiScore gate that failed its own aiScore gate would have been a bad look, so I checked before I shipped it.

The gate runs on every post from here forward, this one included. If a future post reads a little flat in one spot, that's probably the scorer doing its job, not me forgetting how to write a sentence. See what else is running under the hood at [/projects](/projects).

---

*Sources: Wikipedia's "Signs of AI writing" page ([en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)); TechCrunch's report on OpenAI fixing ChatGPT's em dash and Sam Altman's "small-but-happy win" comment ([techcrunch.com/2025/11/14/openai-says-its-fixed-chatgpts-em-dash-problem/](https://techcrunch.com/2025/11/14/openai-says-its-fixed-chatgpts-em-dash-problem/)); Rolling Stone's piece where ChatGPT weighs in on its own em dash tell ([rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/](https://rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/)); a controlled study on AI-detector reliability, including the 30.4% human false-positive rate ([pmc.ncbi.nlm.nih.gov/articles/PMC12331776/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12331776/)); and Pangram's writeup on why perplexity and burstiness fail as detection signals ([pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai](https://pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai)).*
