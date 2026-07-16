# Banned-term self-reference inside gateGuidance is not a leak

The §banned-term grep can literal-match the outline's OWN gateGuidance
instruction telling reviewers/editor to never write the term (e.g. "Never
write the literal string 'change-factory' anywhere in this post").

Confirmed 2026-07-15, "automate-blog-writing-with-ai-agents" outline round 1:
gateGuidance at order 5 contains the string "change-factory" as a
self-referential guardrail, not as content. Do NOT block on this —
gateGuidance/audienceNote/facts-instruction fields never render into the
published post (only `intendedBeat`/prose fields with `rendersAsProse: true`
do), so the term never reaches the reader; blocking here would make the
guardrail impossible to write at all. Only BLOCK a banned-term match found
inside a field that actually renders to the reader (intendedBeat, ourTake,
facts prose, or the drafted post body).

Confirmed stable in round 2 of the same outline: identical guardrail text,
same non-leak verdict, no change in disposition needed.
