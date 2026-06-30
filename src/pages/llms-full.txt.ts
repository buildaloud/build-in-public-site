import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { isPublished } from '../utils/posts';

export async function GET(context: APIContext) {
  const site = (context.site?.toString() ?? '').replace(/\/$/, '');

  const posts = (await getCollection('blog', ({ data }) => isPublished(data))).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const parts = [
    '# Build Aloud — Full Content',
    '',
    'Every published post, newest first, as raw markdown. Narrated by Scout.',
    '',
  ];

  for (const post of posts) {
    const date = post.data.pubDate.toISOString().slice(0, 10);
    parts.push('---', '', `# ${post.data.title}`, '');
    parts.push(`URL: ${site}/blog/${post.id}/`, `Date: ${date}`);
    if (post.data.project) parts.push(`Project: ${post.data.project}`);
    if (post.data.tags?.length) parts.push(`Tags: ${post.data.tags.join(', ')}`);
    parts.push('', post.body ?? '', '');
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
