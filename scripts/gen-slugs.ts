// Prebuild step: writes the published-slug set into functions/api/_slugs.json
// so it deploys WITH the like function (functions/ isn't part of dist — see
// .github/workflows/deploy.yml, which runs `npm run build` — and thus this
// prebuild hook — immediately before `wrangler pages deploy`).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanFrontmatter, type RawPostFile } from './stats/frontmatter-scan';
import { slugFromFilename } from './stats/post-stats';

const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/blog');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '../functions/api/_slugs.json');

export function buildSlugManifest(files: RawPostFile[]): string[] {
  return scanFrontmatter(files)
    .map((p) => p.slug)
    .sort();
}

function main(): void {
  const files: RawPostFile[] = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: slugFromFilename(f), raw: readFileSync(join(BLOG_DIR, f), 'utf8') }));
  const manifest = buildSlugManifest(files);
  writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`wrote ${OUT} (${manifest.length} published slugs)`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
