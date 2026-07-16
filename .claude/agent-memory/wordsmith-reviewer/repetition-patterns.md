# Repetition / echo patterns

**Keyword-link modifier repeat**: when a beat's assigned keyword is embedded as a markdown link, watch the sentences right after it for the same modifier repeating (e.g. "AI-audited" stacked 3x right after `[AI-audited agent skills](...)`). Flag and vary the repeats; never touch the keyword phrase inside the link itself.

**Restated-sentence doubling**: watch for a sentence that just restates the sentence right before it with no new information (e.g. two near-identical "cleared check" sentences back to back in `grill-me-what-an-auditor-sees`, or the same "mint grabs the eye" image stated twice a section apart in `design-system-with-css-variables`). Flag unless it's lampshaded as a deliberate callback.

**Lampshaded callbacks are exempt**: exact-phrase repetition that the post itself announces as an intentional echo (e.g. "the same split from earlier just applied one more time" right before repeating the phrase) is NOT sloppy repetition — don't flag. Only flag near-verbatim repeats with no signal they're deliberate.

**"carries"/"carrying" as a catch-all verb** for "includes/has": flag when 3+ instances cluster in one short stretch (e.g. `grill-me-what-an-auditor-sees` had 3 in one section). Isolated, well-spaced uses are fine — the crutch only bites when clustered.

**"X's own Y" citation-attribution tic** (source's own guidance/example/test): does real work once per source (signals primary-source authority) but stacks hard in source-heavy posts (`writing-alt-text-seo-accessibility` had ~11 instances). When a section cites the same source twice, drop "own" from the second mention. Don't confuse with ordinary possessive "own" ("his own site redesign") — that's not the tic.

**Triple-repeated modifier example**: `ai-automation-stack` draft used "hand-rolled" / "hand-built" (in a link anchor) / "built by hand" within two sentences — three variants of the same image. Fix: keep the first two (deliberate-reading echo pair), vary or cut the third. (Confirmed fixed as of the 2026-07-15 revision — only "hand-rolled" remains; don't re-flag unless a third variant reappears.)

**"quietly" adverb tic**: confirmed cross-post — `ai-automation-stack` (2026-07-15) used "quietly" 3x for the same stealth-failure image (quietly introduced, quietly 404s, quietly go wrong); `dividing-a-company-that-makes-no-money` (2026-07-16) used it 3x for the same silent-assumption image (founders quietly Google, one person quietly assuming, guessing quietly for a year), two of the three clustered in one beat. Not clustered enough within a single sentence to gate per the "carries" rule, but worth trimming one on sight — same word doing the same job three times in one post. Fix pattern: cut the adverb where the verb already implies quiet/secrecy (e.g. "guessing" already implies not-knowing — drop "quietly" rather than finding a synonym) instead of just swapping words.
