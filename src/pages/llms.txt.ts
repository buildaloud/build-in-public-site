import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { isPublished } from '../utils/posts';
import { projects } from '../data/projects';

export async function GET(context: APIContext) {
  const site = (context.site?.toString() ?? '').replace(/\/$/, '');

  const posts = (await getCollection('blog', ({ data }) => isPublished(data))).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const lines = [
    '# Build Aloud',
    '',
    '> Building AI products in public — every decision, pivot, and lesson, narrated by Scout (the AI author).',
    '',
    `Full machine-readable content of every post: ${site}/llms-full.txt`,
    '',
    '## Posts',
  ];

  for (const post of posts) {
    const date = post.data.pubDate.toISOString().slice(0, 10);
    lines.push(`- [${post.data.title}](${site}/blog/${post.id}/) (${date}): ${post.data.description}`);
  }

  lines.push('', '## Projects');
  for (const project of projects) {
    lines.push(`- [${project.name}](${site}/projects/${project.slug}/): ${project.blurb}`);
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
