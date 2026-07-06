import { z } from 'zod/v4';

export const BriefSchema = z.object({
  topic: z.string(),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).min(2).max(5),
  searchIntent: z.enum(['informational', 'navigational', 'commercial']),
  seoTitle: z.string().max(60),
  headlineVariants: z.array(z.string()).optional(),
  metaDescription: z.string().max(155),
  slug: z.string().optional(),
  hook: z.string(),
  outline: z.array(z.string()).min(4),
  internalLinks: z.array(z.string()).min(2),
  cta: z.string(),
  socialBlurb: z.string().max(280),
  imageConcept: z.string(),
  marketResearch: z.array(
    z.object({
      claim: z.string(),
      sourceUrl: z.url(),
    })
  ).min(1),
  keywordRationale: z.string(),
});

export type Brief = z.infer<typeof BriefSchema>;
