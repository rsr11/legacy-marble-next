import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../lib/blog-format';

export default function BlogCard({ post, featured = false, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;

  return (
    <article className={featured ? 'blog-card blog-card--featured' : 'blog-card'}>
      <Link href={`/blog/${post.slug}`} className="blog-card__link">
        <div className="blog-card__media relative w-full h-64">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes={featured ? '(max-width: 800px) 100vw, 60vw' : '(max-width: 800px) 100vw, 33vw'}
              priority={featured}
            />
          ) : (
            <span className="blog-card__placeholder" aria-hidden="true">
              Legacy Marble
            </span>
          )}
        </div>
        <div className="blog-card__body">
          <span className="blog-card__category">{featured ? 'Featured guide · ' : ''}{post.category}</span>
          <Heading className="blog-card__title">{post.title}</Heading>
          <p className="blog-card__desc">{post.description}</p>
          <p className="blog-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
          </p>
          <span className="blog-card__read">Read the guide <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  );
}
