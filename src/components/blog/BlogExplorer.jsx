'use client';

import { useState } from 'react';
import BlogCard from './BlogCard';

export default function BlogExplorer({ posts }) {
  const [category, setCategory] = useState('All guides');
  const [query, setQuery] = useState('');
  const categories = ['All guides', ...new Set(posts.map((post) => post.category))];
  const normalizedQuery = query.trim().toLowerCase();
  const visible = posts.filter((post) =>
    (category === 'All guides' || post.category === category) &&
    `${post.title} ${post.description} ${post.category} ${post.searchText}`.toLowerCase().includes(normalizedQuery));
  const reset = () => { setQuery(''); setCategory('All guides'); };

  return (
    <section className="blog-library" aria-labelledby="library-heading">
      <div className="blog-section-top">
        <div><p className="blog-eyebrow">The knowledge library</p><h2 id="library-heading">A little knowledge. A lasting choice.</h2></div>
        <label className="blog-search">
          <span className="blog-sr-only">Search marble guides</span><span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search the journal…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>
      <div className="blog-filters" role="group" aria-label="Filter guides by topic">
        {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="blog-result-count" role="status">{visible.length} {visible.length === 1 ? 'guide' : 'guides'}{category !== 'All guides' ? ` in ${category.toLowerCase()}` : ' to explore'}</p>
      {visible.length ? <div className="blog-grid">{visible.map((post) => <BlogCard key={post.slug} post={post} />)}</div> :
        <div className="blog-empty"><h3>No guides found</h3><p>Try a different search or explore all topics.</p><button type="button" className="blog-btn" onClick={reset}>Show all guides</button></div>}
    </section>
  );
}
