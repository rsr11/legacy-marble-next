import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import { getAllPosts, getPostBySlug, getRelatedPosts, getPostSummary } from '../src/lib/blog.js';
import { extractHeadings, rehypeHeadingIds } from '../src/lib/blog-headings.js';

const posts = getAllPosts();
assert.ok(posts.length, 'No published blog articles found');
assert.equal(getPostBySlug('this-article-does-not-exist'), null);
const slugs = new Set(posts.map((post) => post.slug));
const titles = new Set();
const descriptions = new Set();
const productSlugs = new Set(['diya', 'fountain', 'temple', 'Tulsipot', 'wash-basin', 'inlay-work', 'carving-work', 'marble-slab', 'mini-items', 'pedestal-basin']);
const pages = new Set(['/', '/blog', '/contact-us', '/about-us', '/privacy-policy', '/terms-condition']);

function checkLink(href, label) {
  if (!href.startsWith('/')) return;
  const pathname = href.split('#')[0];
  if (pathname.startsWith('/blog/')) assert.ok(slugs.has(pathname.slice(6)), `${label}: broken article link ${href}`);
  else if (pathname.startsWith('/products/')) assert.ok(productSlugs.has(pathname.slice(10)), `${label}: unknown product ${href}`);
  else assert.ok(pages.has(pathname), `${label}: unknown page ${href}`);
}

for (const post of posts) {
  assert.ok(!titles.has(post.seoTitle), `${post.slug}: duplicate SEO title`);
  assert.ok(!descriptions.has(post.description), `${post.slug}: duplicate description`);
  titles.add(post.seoTitle); descriptions.add(post.description);
  assert.ok(post.image && post.imageAlt, `${post.slug}: missing cover image or alt text`);
  assert.ok(fs.existsSync(path.join(process.cwd(), 'public', post.image)), `${post.slug}: cover image not found`);
  const headings = extractHeadings(post.content);
  assert.ok(headings.length, `${post.slug}: no headings`);
  assert.equal(new Set(headings.map((heading) => heading.id)).size, headings.length, `${post.slug}: repeated heading IDs`);
  const rendered = await compileMDX({ source: post.content, options: { mdxOptions: { rehypePlugins: [rehypeHeadingIds] } } });
  const html = renderToStaticMarkup(rendered.content);
  for (const heading of headings) assert.ok(html.includes(`id="${heading.id}"`), `${post.slug}: unmatched contents anchor ${heading.id}`);
  for (const match of post.content.matchAll(/\]\((\/[^)]+)\)/g)) checkLink(match[1], post.slug);
  checkLink(post.productLink, post.slug);
  const related = getRelatedPosts(post);
  assert.ok(related.every((other) => other.slug !== post.slug));
  assert.ok(!Object.hasOwn(getPostSummary(post), 'content'), 'Article body leaked into client card data');
  console.log(`PASS ${post.slug}`);
}
console.log(`Validated ${posts.length} articles: MDX compilation, metadata, images, links, headings and related guides.`);
