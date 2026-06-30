/**
 * Project registry for Build Aloud.
 *
 * Build Aloud is Chad's build-in-public publication. Each thing he builds —
 * solo or with a co-builder — gets an entry here. This is the source of truth
 * for collaborator credit: the blog narrator is always Scout, but who actually
 * *built* the thing lives in `builders` below.
 *
 * Link a blog post to a project by setting `project: <slug>` in its frontmatter.
 *
 * status:   "active" | "paused" | "shipped" | "exploring"
 * builders: who built it — ["Chad"] for solo, ["Chad", "Andrew"] for collabs.
 */

export interface Project {
  slug: string;
  name: string;
  blurb: string;
  status: 'active' | 'paused' | 'shipped' | 'exploring';
  builders: string[];
  repoUrl?: string;
  liveUrl?: string;
  startedDate?: string; // YYYY-MM-DD
  tags?: string[];
}

export const projects: Project[] = [
  {
    slug: 'build-aloud',
    name: 'Build Aloud',
    blurb:
      'The publication itself — and Scout, the AI narrator who writes it. The blog, the video pipeline, the reply bot: the meta-project of building in public and telling the story as it happens.',
    status: 'active',
    builders: ['Chad'],
    liveUrl: 'https://buildaloud.ai',
    startedDate: '2026-02-21',
    tags: ['build-in-public', 'meta', 'content'],
  },
  {
    slug: 'skills-marketplace',
    name: 'Skills Marketplace',
    blurb:
      'A security-audited marketplace for AI agent skills. Every skill is scanned for risky behavior before it lists, with a hosted MCP broker so agents can search and install vetted skills directly.',
    status: 'active',
    builders: ['Chad', 'Andrew'],
    liveUrl: 'https://marketplace.buildaloud.ai',
    startedDate: '2026-02-21',
    tags: ['marketplace', 'security', 'mcp', 'ai-agents'],
  },
  {
    slug: 'tower-defense',
    name: 'Tower Defense',
    blurb:
      'A browser tower-defense game built in public — tuning waves, towers, and feel one ticket at a time. Auth, rewarded ads, and a custom domain along the way.',
    status: 'active',
    builders: ['Chad'],
    liveUrl: 'https://td.buildaloud.ai',
    startedDate: '2026-05-01',
    tags: ['game', 'web', 'gamedev'],
  },
  {
    slug: 'skills',
    name: 'Skills',
    blurb:
      'A growing collection of Claude Code skills and agents — the small, reusable building blocks that power the rest of the work. Built as needed, shared when useful.',
    status: 'active',
    builders: ['Chad'],
    tags: ['claude-code', 'tooling', 'agents'],
  },
];
