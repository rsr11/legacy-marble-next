import Link from 'next/link';
import { getAllPosts, getPostSummary } from '../../lib/blog';
import { SITE } from '../../lib/site';
import BlogCard from '../../components/blog/BlogCard';
import BlogExplorer from '../../components/blog/BlogExplorer';

const title = 'Marble Temple & Fountain Guides | Legacy Marble Journal';
const description = 'Explore marble home temple designs, fountain prices, stone selection and practical care guides from Legacy Marble, Makrana, Rajasthan.';

export const metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: { type: 'website', url: `${SITE.url}/blog`, title, description, siteName: SITE.name, images: [{ url: `${SITE.url}${SITE.defaultOgImage}` }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${SITE.url}${SITE.defaultOgImage}`] },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured) || posts[0];
  return (
    <div className="blog-container">
      <header className="blog-hero">
        <div><p className="blog-eyebrow">The Legacy Journal <span aria-hidden="true">—</span> Makrana, Rajasthan</p>
          <h1>Good stone.<br /><em>Considered choices.</em></h1></div>
        <div className="blog-hero__intro"><p>From a quiet corner for prayer to a garden shaped by water. Practical guides to choosing, commissioning and caring for marble.</p>
          <a href="#library-heading" className="blog-text-link">Explore the guides <span aria-hidden="true">↓</span></a></div>
      </header>
      {featured && <BlogCard post={featured} featured />}
      <BlogExplorer posts={posts.map(getPostSummary)} />
      <aside className="blog-project-note"><div><p className="blog-eyebrow">Your space. Your piece.</p><h2>Have something in mind?</h2><p>Share your measurements, a reference and your location. Let’s talk through the marble, design and details.</p></div><Link href="/contact-us" className="blog-btn blog-btn--primary">Discuss your project <span aria-hidden="true">↗</span></Link></aside>
    </div>
  );
}
