# A `links` array collision can be a false conflict: self-promo trim vs. citation add

Confirmed 2026-07-15, "grill-me" outline, round 4. seo proposed shrinking a
CTA paragraph's `links` array down to a single marketplace link (PLAYBOOK §6
bans a second "also check out my other stuff" CTA — the same paragraph's
existing buildaloud.ai + /projects entries are exactly that pattern).
link-opportunity, same round, proposed ADDING two entries to that same array
(Mitiga + Obot) to back a footer-disclosure attribution the paragraph's own
`intendedBeat`/`gateGuidance` already promises ("with links" / "Include the
bulleted Sources footer per post-formulas rules (TD-0029): Mitiga, Obot,
marketplace"). These read like a direct add-vs-remove collision on the same
field, but aren't: the two axes are policing different semantic categories of
link inside one array — generic self-promotion (banned) vs. required source
citation (mandated elsewhere in the same node). Resolution isn't tier
arbitration, it's a merge: drop the self-promo entries, keep/add the citation
entries. Before treating a same-field `links`-array collision as a forced
pick-one, check whether each proposed entry is citing a claim made elsewhere
in the node (keep) vs. plugging an unrelated destination (cut) — the
correct list is usually the union of "keep" minus "cut," not either
reviewer's literal proposed array.
