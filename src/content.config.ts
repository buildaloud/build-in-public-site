import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    project: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    targetKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),
    searchIntent: z.enum(['informational', 'navigational', 'commercial']).optional(),
    summary: z
      .object({
        lead: z.string(),
        points: z.array(z.string()),
        whatYouGet: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
