import Link from 'next/link';

function MdxLink({ href = '', children, ...props }) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

function MdxImage({ src, alt = '', ...props }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" {...props} />;
}

function MdxTable({ children, ...props }) {
  return <div className="blog-table-scroll" tabIndex={0} role="region" aria-label="Scrollable comparison table"><table {...props}>{children}</table></div>;
}

export const mdxComponents = { a: MdxLink, img: MdxImage, table: MdxTable };
