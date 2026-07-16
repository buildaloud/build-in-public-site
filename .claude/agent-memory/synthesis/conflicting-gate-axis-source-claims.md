# Two gate-tier axes disagree on what an external source says — quote only what's directly cited

Confirmed 2026-07-14, "how-i-automate-blog-writing-with-ai-agents" draft,
rounds 3→4. On the Google spam-policy paragraph, round 3's `technical-honesty`
(GATE tier) said Google's page doesn't use "content spinning" and proposed
"automated rewriting used to dodge duplicate-content detection" instead;
round 4's `factual-accuracy` (GATE tier) said the actual page text is
"automated transformations like synonymizing, translating, or other
obfuscation techniques" and that "duplicate-content detection" is an invented
purpose-clause not in the source — implicitly contradicting round 3's fix.
Synthesis has no way to re-verify an external page mid-round. Resolution:
when two gate-tier axes disagree about a source's exact wording, don't referee
who WebFetched correctly — drop BOTH disputed specifics and keep only the
phrasing the more recent/specific reviewer directly quotes as source text.
Prefer a verifiable direct quote over either side's paraphrase or inferred
rationale, even if the resulting sentence reads slightly more generic.

**Second recurring instance (different post), "/stats/ dark-dashboard-design"
draft, now confirmed across rounds 2, 3, AND 4 (2026-07-15).** Round 2's
`link-integrity` (GATE) removed a webaim.org colorblindness citation as
unverifiable (not in the site's link index). Every round since,
`factual-accuracy`/fact-checker (GATE) re-proposes re-adding the exact same
webaim.org link plus a matching Sources-footer entry, without addressing why
round 2 called it unverifiable. Resolution held identically each time: keep
the no-link phrasing, drop the re-add (and drop `link-opportunity`'s dependent
"add it to Sources" elevation as superseded, same rounds). Four consecutive
rounds of the same GATE-axis re-raising a citation another GATE axis already
rejected confirms this isn't going to resolve itself — if a future round's
factual-accuracy finding on this exact span comes with a NEW justification
(e.g., citing a specific alternate URL already present in the site's link
index) treat that as new signal; a bare re-ask of the same webaim.org URL
should be dropped on sight without full re-analysis.
