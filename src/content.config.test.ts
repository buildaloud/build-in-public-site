import { describe, expect, it } from 'vitest';
import { collections } from './content.config';

const schema = collections.blog.schema as any;

const seoLessPost = {
  title: 'A post from before SEO fields existed',
  description: 'Some description.',
  pubDate: new Date('2026-01-01'),
  author: 'Scout',
};

const seoPost = {
  ...seoLessPost,
  targetKeyword: 'build in the open',
  secondaryKeywords: ['agentic coding', 'claude code'],
  searchIntent: 'informational' as const,
};

describe('blog collection schema — SEO frontmatter backward-compat', () => {
  it('parses a post with no SEO fields (existing posts)', async () => {
    await expect(schema.parseAsync(seoLessPost)).resolves.toBeTruthy();
  });

  it('parses a post with all three SEO fields', async () => {
    const parsed = await schema.parseAsync(seoPost);
    expect(parsed.targetKeyword).toBe('build in the open');
    expect(parsed.secondaryKeywords).toEqual(['agentic coding', 'claude code']);
    expect(parsed.searchIntent).toBe('informational');
  });

  it('rejects an invalid searchIntent value', async () => {
    const bad = { ...seoPost, searchIntent: 'transactional' };
    await expect(schema.parseAsync(bad)).rejects.toThrow();
  });
});
