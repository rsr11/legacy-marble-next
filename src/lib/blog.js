import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// The single publishing source. Drafts never produce routes or sitemap entries.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function isoDate(value, field, filename) {
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso) ||
      Number.isNaN(Date.parse(iso)) || new Date(iso).toISOString().slice(0, 10) !== iso) {
    throw new Error(`${filename}: ${field} must be a valid YYYY-MM-DD date`);
  }
  return iso;
}

function parsePost(filename) {
  const slug = filename.replace(/\.mdx?$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${filename}: use a lowercase, hyphenated filename`);
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8'));
  if (data.draft === true) return null;
  for (const field of ['title', 'description', 'category']) {
    if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`${filename}: missing ${field}`);
  }
  const date = isoDate(data.date, 'date', filename);
  const updated = data.updated ? isoDate(data.updated, 'updated', filename) : null;
  if (updated && updated < date) throw new Error(`${filename}: updated precedes date`);
  return {
    slug, content, date, updated, title: data.title,
    seoTitle: data.seoTitle || data.title, description: data.description, category: data.category,
    image: data.image || null, imageAlt: data.imageAlt || data.title,
    productLink: data.productLink || null, productLabel: data.productLabel || 'Explore the collection',
    featured: data.featured === true, primaryKeyword: data.primaryKeyword || '',
    readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
  };
}

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts = fs.readdirSync(POSTS_DIR).filter((filename) => /\.mdx?$/.test(filename))
    .map(parsePost).filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  const slugs = new Set();
  for (const post of posts) {
    if (slugs.has(post.slug)) throw new Error(`Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
  }
  return posts;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getRelatedPosts(post, limit = 3) {
  return getAllPosts().filter((other) => other.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, limit);
}

export function getPostSummary(post) {
  const { content, primaryKeyword, ...summary } = post;
  // Article bodies stay on the server. Search uses descriptive metadata.
  return { ...summary, searchText: primaryKeyword.toLowerCase() };
}
