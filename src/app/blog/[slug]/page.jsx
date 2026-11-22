import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from '../../../lib/blog';
import { formatDate } from '../../../lib/blog-format';
import { extractHeadings, rehypeHeadingIds } from '../../../lib/blog-headings';
import { SITE } from '../../../lib/site';
import { mdxComponents } from '../../../components/blog/MdxComponents';
import BlogCard from '../../../components/blog/BlogCard';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;
  const image = `${SITE.url}${post.image ?? SITE.defaultOgImage}`;
  const title = post.seoTitle ?? `${post.title} | ${SITE.name}`;

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: post.description,
      siteName: SITE.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
      images: [image],
    },
  };
}

const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const headings = extractHeadings(post.content).filter((heading) => heading.level === 2);
  const url = `${SITE.url}/blog/${post.slug}`;
  const image = `${SITE.url}${post.image ?? SITE.defaultOgImage}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    articleSection: post.category,
    inLanguage: 'en-IN',
    headline: post.title,
    description: post.description,
    image: [image],
    datePublished: `${post.date}T00:00:00+05:30`,
    dateModified: `${post.updated ?? post.date}T00:00:00+05:30`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}${SITE.logo}` },
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }}
      />

      <article className="blog-article blog-container">
        <nav aria-label="Breadcrumb" className="blog-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="blog-article__header">
          <p className="blog-eyebrow">The Legacy Journal <span aria-hidden="true">—</span> {post.category}</p>
          <h1>{post.title}</h1>
          <p className="blog-article__lead">{post.description}</p>
          <p className="blog-meta">
            <span>By Legacy Marble</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
            {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
          </p>
        </header>

        {post.image && (
          <div className="blog-article__hero">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1400px) 90vw, 1280px"
            />
          </div>
        )}

        <div className="blog-reading-layout">
          <nav className="blog-toc" aria-label="Article contents">
            <h2>In this guide</h2>
            <ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol>
          </nav>
          <div>
            <div className="blog-prose">
              <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { rehypePlugins: [rehypeHeadingIds] } }} />
            </div>

        <aside className="blog-cta">
          <h2>Planning a marble piece for your home?</h2>
          <p>
            Share your measurements, location and design references with our
            Makrana team to discuss material options and a project quotation.
          </p>
          <div className="blog-cta__actions">
            <a
              className="blog-btn blog-btn--primary bg-green-500"
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            {post.productLink && (
              <Link className="blog-btn" href={post.productLink}>
                {post.productLabel}
              </Link>
            )}
          </div>
        </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="blog-related blog-container" aria-labelledby="related-heading">
          <h2 id="related-heading">More guides</h2>
          <div className="blog-grid">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} headingLevel={3} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
