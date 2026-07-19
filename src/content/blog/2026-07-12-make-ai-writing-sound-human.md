---
title: "How to Make AI Writing Sound Human (My Actual Fix)"
description: "How to make AI writing sound human: I built a scorer that counts the tells and hard-gates my blog at a 15-point threshold. Here's what moved the number."
pubDate: "2026-07-12T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["ai-writing", "writing", "content", "build-in-public", "human-tone"]
targetKeyword: "how to make AI writing sound human"
secondaryKeywords: ["AI writing tells", "signs of AI writing", "make ChatGPT sound less like AI", "em dash AI writing", "why AI detectors are unreliable"]
searchIntent: "informational"
audience: "writers and devs drafting with AI who don't want the output to read as AI"
summary:
  lead: "I built a deterministic scorer that counts AI writing tells and hard-gates every post on it, including the posts I'd already shipped and liked. Rewriting five of them took the average score down: 5.2 before, 1.4 after, with the human corpus at 2.2."
  points:
    - "The em dash is the tell everyone remembers, and the weakest one on its own."
    - "A controlled study found Corrector flagging 30.4% of human-written articles as AI while GPTZero flagged zero of the same batch, so the gate counts tells instead of trusting detector verdicts."
    - "Breaking triples into two or four items and varying sentence length moved the score most, and both fixes were mechanical."
    - "Every draft here clears the 15-point gate before it ships, this post included."
  whatYouGet: "A countable way to make AI writing sound human, with the exact tells to strip and before-and-after scores from five real posts."
heroImage: "/images/make-ai-writing-sound-human.png"
heroImageAlt: "A stream of mint waveform-like text passing through a dark angular filter that catches a few repeating patterns, the AI-writing tone scorer"
---

I built a scorer that catches AI writing tells: em dashes and rule-of-three lists. It also traps a sneakier one, the sentence that negates itself before reframing its own claim. My blog hard-gates on all of it. Running the scorer across five of my own live posts this week dropped the average score to 1.4, down from 5.2, against a 2.2 human baseline. I got tired of trying to figure out how to make AI writing sound human by memorizing a style guide and hoping it stuck. I wanted a count I could act on at review time instead. A number turns rewriting into a checklist.

## The Tells the Scorer Counts, and Wikipedia's Own List

Wikipedia keeps a page literally titled ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), and most of what it catalogs is exactly what the scorer counts: excessive em dashes and the rule of three, three items stacked in a row where two would carry it just as well. The page names formatting tells too: heavy bullet use and the same word or phrase bolded again and again for emphasis. The list also includes curly quotation marks slipping in where the rest of the document uses straight ones. So does the negation-reframe sentence, and a handful of specific words the page names directly. The scorer only grades the words on the page. Bullets and bold don't factor into the score. Those words show up in clusters once a model leans on any of them, not scattered one at a time the way a person actually writes. None of it's damning alone. The tell is density: how often these tells stack per thousand words in a piece that never once breaks its own rhythm.

## The Em Dash Is the Tell Everyone Remembers, and the Weakest One

The em dash is the tell everyone talks about. OpenAI shipped a real fix for it in November 2025. [Sam Altman called it a "small-but-happy win"](https://techcrunch.com/2025/11/14/openai-says-its-fixed-chatgpts-em-dash-problem/) once users could tell ChatGPT not to use em dashes in their custom instructions and have it actually listen. That's a company patching its own model because readers learned to spot a punctuation mark. [Rolling Stone](https://www.rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/) asked ChatGPT about its own em dash. It answered that the em dash by itself is a weak tell. The real giveaway is flat, formulaic sentences, paragraphs that never had an idea in them to begin with. Punctuation is decoration here. A period writes a flat, empty sentence just as easily as a dash does.

## Why AI Detectors Are Unreliable

If the famous tell is weak, why not run everything through a detector instead? Because verdicts swing wildly by tool. [A controlled study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12331776/) ran the same 250 pre-ChatGPT-era human-written articles through three separate AI detectors. Corrector flagged 76 of those articles, 30.4%, above the 50% AI threshold. GPTZero flagged none of them at that same mark, and ZeroGPT landed in between at 40 of the same 250, 16%. The paper's own conclusion downgrades every detector verdict to a supplementary aid, since none of the three hit full reliability across the whole test. [Pangram's own writeup](https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai) names exactly where the mechanics break: most detectors lean on perplexity and burstiness, how predictable the word choices are and how much the rhythm varies. Text famous enough to be baked into a model's training data misfires that measure. Pangram's own example is the Declaration of Independence. Writing from a non-native English speaker trips it too. Both can register the same low perplexity a machine does without being AI-generated at all. That same blind spot is why AI detectors are unreliable as a stand-alone check. The detector's verdict tells me nothing about who wrote it, so I count tells instead.

## The Scorer: Counting AI Writing Tells Against 106 Real Human Snippets

So I built a scorer that counts. It runs a draft against a corpus of 106 human-written snippets collected by hand, real posts and real comments. Then it counts the AI writing tells directly: em dashes per thousand words, triples, the negation-reframe construction, the specific overused words, sentence-length variance. Human writing swings between a four-word fragment and a forty-word sentence in a way generated text doesn't; that swing is burstiness, the same signal the detectors from a few paragraphs back lean on. I'm just counting it directly instead of asking a black box to grade it for me. Every draft comes back with a single number, aiScore. Each axis in it is something I can name and fix; a verdict never told me which sentence to change. The scorer also counts register drift now: dramatic-sequencing openers and runs of stacked punch fragments. Sales speak gets counted too, each one capped so no single tic can dominate the total.

## The Gate: Nothing Ships at 15 or Higher

A draft scoring 15 or above out of 100, or hitting any permabanned phrase, doesn't ship. It goes back for a rewrite pass before it ever becomes a file in the blog's content folder. The check runs at the top of every review round and once more after the review loop exits; a dirty exit on that final pass triggers a tone-only cleanup pass, capped at two. It runs earlier, too, than everything I built for tracking a post after it goes live, [the SEO stats system](/blog/2026-07-09-how-to-measure-blog-seo/). There's no published post yet for that system to measure. Same draft in, same number out, every time. That's the only reason I trust the gate enough to let it block a post.

## The Review Army Around the Gate

The gate lives inside a larger loop. A dozen single-axis reviewers grade the outline first, in their own loop capped at five rounds. Then the draft goes through fifteen review agents, each one reading the whole thing but grading exactly one axis: one grades the hook, another checks every fact against a ledger. That loop caps at five rounds too. Ask one reviewer to grade everything and you get a shrug. Ask fifteen to each grade one thing and you get findings I can go fix. An assertion audit runs ahead of that whole review army, pulling every checkable claim out of the draft and web-checking the named entities, capped at two fix passes. The whole system runs as an open-source package, [agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline), and the gate is the one reviewer in that army that never gets talked out of a call.

## Five Posts, Before and After

Back to my own drafts. I ran the scorer backward across five live posts. Scores ranged 11 up to 21 before I touched a sentence. After a rewrite pass against each post's own flagged tells, the range dropped to 0 through 6, the average 5.2 down to 1.4. One of the five was the write-up on [the Cloudflare Pages Functions bug that had a stale worker squatting on my own custom domain](/blog/2026-07-08-cloudflare-pages-functions-404-custom-domain/). The human corpus itself averages 2.2, so the rewritten posts now score under human writing. Either the scorer is too aggressive or the rewrites landed. I'm betting on the second, and still watching for the first.

## What Actually Moved the Number

Breaking every triple into two items or four took the single biggest chunk off the score. The negation-reframe sentence went next: I deleted the setup clause and kept the claim it had been hiding. Sentence length did more work than expected going in. AI drafts cluster around the same medium length, and splitting one long line into a fragment beside a longer sentence moved the variance score almost every time I tried it. And em dashes became periods or parentheses. I cut qualifier phrases that hedge without saying anything, since either I was sure of the point or the claim didn't belong in the post. These are the same fixes whether you're trying to make ChatGPT sound less like AI or cleaning up another model's output. Mechanical edits moved the score more than any single insight did. That combination closed most of what was left.

## What the Total Means

aiScore is a tell count. A person can rack up a high score on a bad writing day too. The human corpus averages 2.2, well above zero, because real people slip triples into their own sentences constantly with no AI anywhere near the draft. The gate catches tells, not authorship. AI just produces those tells far more often than people do, and that gap is what makes a scorer like this useful at all. So which reading from the five-post run was right, an aggressive scorer or real rewrites? Prose that scores zero and still reads like something a person would say is the second. A gate that zeroed out an idea a person meant would be the first, and that's the failure mode I'm still watching for. The counted tells are gone. That says nothing about who typed the words. Even the axes borrowed from the same detectors I just called unreliable, burstiness included, are still counting a tell here.

This post ran the same gate as any other when I first shipped it. Its first pass flagged two things: an em dash left in without noticing, and a triple stacked without meaning to. Both got fixed, and the draft re-ran until it cleared under 15. A post about the aiScore gate failing its own check would have been a bad look, so I read it over before I shipped it. The gate runs on every post from here forward. The pipeline behind it, scorer and gate, is open source, along with every review loop running around them. Clone [agentic-content-pipeline](https://github.com/buildaloud/agentic-content-pipeline) from GitHub and run the same check I use for how to make AI writing sound human on your own drafts too.

## Sources

- ["Signs of AI writing" (Wikipedia)](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- ["OpenAI Says It's Fixed ChatGPT's Em Dash Problem" (TechCrunch)](https://techcrunch.com/2025/11/14/openai-says-its-fixed-chatgpts-em-dash-problem/)
- ["ChatGPT's Hyphen (Em Dash) Problem, Explained" (Rolling Stone)](https://www.rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/)
- ["Can we trust academic AI detective? Accuracy and limitations of AI-output detectors" (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12331776/) The paper's own words for that verdict: detectors are "supplementary tools rather than definitive solutions."
- ["Why Perplexity and Burstiness Fail to Detect AI" (Pangram)](https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai)
