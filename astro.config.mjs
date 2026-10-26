import { defineConfig } from 'astro/config';
import { site } from './src/site.config';
// Built locally or on a preview it lives under /<repo>/ on github.io; the deploy workflow sets
// PUBLIC_SITE_BASE="" and PUBLIC_SITE_URL for the live domain (stamps.psychedelicsandcontemplationlab.com).
const base = process.env.PUBLIC_SITE_BASE ?? site.base;
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? site.previewUrl,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
