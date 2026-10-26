import { defineConfig } from 'astro/config';
import { site } from './src/site.config';
// Three homes: GitHub Pages (preview, under /<repo>/), Vercel (the live site at stamps-website.vercel.app,
// detected through Vercel's build-time VERCEL env — no dashboard setting needed) and, if the workflow sets
// PUBLIC_SITE_BASE / PUBLIC_SITE_URL, whatever those say.
const onVercel = !!process.env.VERCEL;
const base = process.env.PUBLIC_SITE_BASE ?? (onVercel ? '' : site.base);
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? (onVercel ? 'https://stamps-website.vercel.app' : site.previewUrl),
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
