import { describe, expect, it } from 'vitest';
import { scanFrontmatter } from './frontmatter-scan';

function post(frontmatter: string): string {
  return `---\n${frontmatter}\n---\n\nSome body content.\n`;
}

describe('scanFrontmatter', () => {
  it('parses secondaryKeywords as a real array, not a mangled scalar', () => {
    const files = [
      {
        slug: 'a-post',
        raw: post(
          [
            'title: "A post"',
            'pubDate: "2020-01-01"',
            'targetKeyword: "build in the open"',
            'secondaryKeywords:',
            '  - "agentic coding"',
            '  - "claude code"',
          ].join('\n'),
        ),
      },
    ];
    const eligible = scanFrontmatter(files);
    expect(eligible).toHaveLength(1);
    expect(eligible[0].secondaryKeywords).toEqual(['agentic coding', 'claude code']);
  });

  it('throws when a post violates the shared SEO schema (bad searchIntent enum)', () => {
    const files = [
      {
        slug: 'bad-post',
        raw: post(['title: "Bad post"', 'pubDate: "2020-01-01"', 'searchIntent: "transactional"'].join('\n')),
      },
    ];
    expect(() => scanFrontmatter(files)).toThrow();
  });

  it('excludes a draft post', () => {
    const files = [
      { slug: 'draft-post', raw: post(['title: "Draft"', 'pubDate: "2020-01-01"', 'draft: true'].join('\n')) },
    ];
    expect(scanFrontmatter(files)).toHaveLength(0);
  });

  it('excludes a future-dated post', () => {
    const files = [{ slug: 'future-post', raw: post(['title: "Future"', 'pubDate: "2099-01-01"'].join('\n')) }];
    expect(scanFrontmatter(files)).toHaveLength(0);
  });

  it('includes a published past-dated non-draft post', () => {
    const files = [{ slug: 'past-post', raw: post(['title: "Past"', 'pubDate: "2020-01-01"'].join('\n')) }];
    const eligible = scanFrontmatter(files);
    expect(eligible).toHaveLength(1);
    expect(eligible[0].slug).toBe('past-post');
  });
});
