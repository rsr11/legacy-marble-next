import { getAllPosts } from '../lib/blog';
import { SITE } from '../lib/site';

export default function sitemap() {
  const products = ['diya', 'fountain', 'temple', 'Tulsipot', 'wash-basin', 'inlay-work', 'carving-work', 'marble-slab', 'mini-items', 'pedestal-basin'];
  const posts = getAllPosts();
  const latest = posts.map((post) => post.updated || post.date).sort().at(-1);
  return [
    ...['', '/about-us', '/contact-us', '/privacy-policy', '/terms-condition'].map((pathname) => ({ url: `${SITE.url}${pathname}` })),
    ...products.map((slug) => ({ url: `${SITE.url}/products/${slug}` })),
    { url: `${SITE.url}/blog`, ...(latest ? { lastModified: latest } : {}) },
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: post.updated || post.date,
      ...(post.image ? { images: [`${SITE.url}${post.image}`] } : {}),
    })),
  ];
}
