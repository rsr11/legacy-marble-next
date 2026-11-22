# LEGACY MARBLE

Next.js website for Legacy Marble, Makrana, Rajasthan.

## Local development

Run `npm install`, then `npm run dev`. The journal is at `/blog`.
Run `npm run build` for a production build. Development and production builds explicitly use Webpack to avoid the observed Windows Turbopack crash, which resolved Tailwind from the parent directory and failed during hot reload. No dependency reinstall is needed for this workaround. The existing Google font in the root layout requires network access during a fresh build.

After changing these scripts, stop an already-running dev server with Ctrl+C and run `npm run dev` again. A running process keeps its original bundler until restarted.

## Writing an article

The only publishing directory is `content/blog`. Create a trusted `.mdx` file with a lowercase, hyphenated filename; the filename becomes its `/blog/filename` URL. Use an existing article as a template.

```yaml
---
title: "A useful, specific article title"
seoTitle: "Search title | Legacy Marble"
description: "A unique description of what the reader will learn."
date: "2026-11-18"
category: "Home temples"
image: "/images/mini-temple-cover.jpeg"
imageAlt: "Describe what the photograph actually shows"
productLink: "/products/temple"
productLabel: "Explore marble home temples"
primaryKeyword: "marble home temple design"
draft: true
---
```

Remove `draft: true` when ready for publication. Drafts are omitted from listings, article routes and sitemap. Keep the original `date` and set `updated: "YYYY-MM-DD"` for a substantive revision. Use `##` and `###` headings; second-level headings form the article contents list automatically. Set `featured: true` on the preferred index feature.

Run `npm run check:blog` to check MDX compilation, unique SEO metadata, cover images, internal links and heading anchors. Rebuild and redeploy the website to publish content changes; there is no external CMS. Only repository-authored content should be compiled as MDX.

Articles receive canonical URLs, social metadata, BlogPosting and breadcrumb structured data, related guides and product enquiry links. Published article URLs and actual modification dates are included in `/sitemap.xml`. The canonical origin and default images are configured once in `src/lib/site.js`; hosting-level domain redirects must agree with that origin.

See [the keyword map and editorial notes](docs/blog-seo-plan.md) for topic ownership and business facts to confirm before public release.
