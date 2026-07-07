// Astro's content collections use their own bundled zod (v3), while bare tsx
// scripts (scripts/stats/frontmatter-scan.ts) use the project's zod (v4) — the
// two major versions are not structurally compatible (mixing schema instances
// throws). So the SEO fields are NOT a shared ZodType: each consumer builds its
// own small zod object from these plain-TS primitives, keeping one canonical
// definition of the field names + intent values without forcing a shared
// ZodType instance across incompatible zod versions.
export const SEARCH_INTENT_VALUES = ['informational', 'navigational', 'commercial'] as const;

export type SeoFields = {
  targetKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: (typeof SEARCH_INTENT_VALUES)[number];
};
