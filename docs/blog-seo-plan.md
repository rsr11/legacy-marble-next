# Legacy Marble blog implementation and keyword map

Prepared 18 November 2026 from the client's supplied keyword list. Search volumes and ranking difficulty have not been supplied or independently measured.

## Workspace finding

The selected `lagacy-marble - Copy` checkout initially had all tracked `src/` and `public/` files deleted. The owner authorised restoring this checkout; its files were present again on resuming work, including recent homepage changes, which were preserved. The existing blog read `content/blog`, while its only article was in `src/content/blog`, leaving the listing empty. Navigation and sitemap did not link the blog, and the default social image used a missing `.jpg` instead of the tracked `.png`.

Eight MDX articles are integrated in this checkout's `content/blog`. The existing care article's slug and original date are retained, with revised content and an explicit updated date. Its old `src/content/blog` copy was consolidated into the publishing directory. Product links use existing product URLs, and cover images use existing assets.

Validation: `npm run check:blog` passed for all eight articles (5,086 body words total), including MDX rendering, required frontmatter, unique SEO metadata, cross-article links, product/contact links, actual local cover images and matching contents anchors.

`npm run build -- --webpack` passed, including TypeScript and all 19 generated static pages. Generated HTML was checked for one H1 per article, the canonical URL, BlogPosting, breadcrumbs and article body. The sitemap contains all eight articles, the blog index and the existing site URLs (24 total).

Final verification completed after the owner authorised testing:

- All eight article URLs return HTTP 200, have a single H1, the expected canonical URL, valid BlogPosting and breadcrumb JSON-LD, and working cover images.
- The homepage, blog index, four linked product categories, contact page and robots.txt return HTTP 200. An unknown article slug returns HTTP 404. The live XML sitemap includes every article.
- Search for "price" returns two guides. Combining it with "Home temples" returns one guide. An unmatched search shows the empty state, and reset restores all eight guides.
- Featured-card navigation opens the article. Contents links match rendered heading IDs; clicking a contents link updates the URL fragment and positions the heading with its intended scroll margin.
- The final Arial reading font is confirmed in-browser. Index and article layouts were inspected at 1280px desktop and 390px mobile widths with no horizontal overflow.
- Mobile navigation opens, its Journal link returns to the index, and the menu closes after navigation. No browser warnings or errors were captured during the checks.

Temporary browser viewport settings were reset and the test tab and preview server were closed after verification. No application changes were needed during this final test pass.

## Article map

| Article slug | Main intent | Supporting client terms |
| --- | --- | --- |
| marble-water-fountain-buying-guide | Choose a marble water fountain | garden, indoor, outdoor, tiered, wall, bowl, lotus, cascade fountains |
| marble-fountain-price-in-india | Understand fountain price and quotation | marble fountain cost in India, 2/3/4 tier, fountain with tank and lights |
| marble-fountain-installation-and-care | Plan installation and maintenance | marble fountain installation, garden, hotel, large marble fountain |
| marble-home-temple-design-guide | Plan a marble home temple | modern/traditional mandir, jali, pillars, dome, storage, doors, flats, living room |
| marble-temple-price-in-india | Compare temple quotations | marble temple price, marble mandir price in India, custom marble temple |
| white-marble-for-temples-and-fountains | Evaluate marble samples | Makrana White, Vietnam White, Rajnagar White, Kumari, Pink, Albeta, Semi Albeta |
| ordering-custom-marble-from-makrana | Assess a manufacturer and order process | custom marble temple/fountain manufacturer, Makrana, Rajasthan, CNC, carving, inlay |
| how-to-clean-marble-mandir | Maintain a home mandir | marble home mandir care, white marble mandir cleaning |

## Integrated blog improvements

- One content directory, draft filtering, required metadata/date checks and stable sorting.
- Responsive cream, charcoal and gold index with featured article, topic filters, search and empty-result reset.
- Static article routes with heading anchors, contents lists, related posts and product/WhatsApp enquiry links.
- Unique titles, descriptions, canonical URLs, social previews, BlogPosting and breadcrumb structured data.
- Published posts in the XML sitemap, using actual article update dates and local images. The existing non-www canonical origin is retained consistently; live domain redirects could not be independently verified from this environment.
- Journal links in desktop/mobile navigation, footer and homepage navigation.
- A single generated robots.txt route, replacing the conflicting static duplicate.
- Correct inherited social-image/logo paths and business contact structured data using the site's existing contact details.

## Commercial keyword ownership

The main product pages should own purchase terms such as "marble water fountain", "marble home temple", "manufacturer", and "buy". Blog titles qualify those topics with buying, price, design, installation or care intent, and link visitors back to product pages. This avoids making multiple near-identical articles compete for the same intent.

Do not create a separate article for each product keyword or city. Add dedicated product/style pages only when actual offerings, original photographs and useful specifications support them. Location claims must reflect real supply or installation coverage; no article establishes a branch in another city.

## Editorial checks before public release

Have the business verify material availability, manufacturing descriptions, destination services and installation responsibilities. Obtain actual current prices before publishing numerical ranges. Confirm the image subjects and usage rights. Add real project examples and original installation photographs when available. No invented projects, testimonials, awards or delivery guarantees have been used.

These articles do not establish export, wholesale or contractor services; confirm those before targeting the corresponding client terms. Drafting the articles and adding technical SEO cannot guarantee a Google position.

## Maintaining the blog

Add a trusted local `.mdx` file to `content/blog`; use the included frontmatter as a starting point. Set `draft: true` to keep an unfinished article out of listings, static routes and sitemap. Preserve the original publication date when editing and add `updated` for a substantive revision. Do not compile untrusted visitor-supplied MDX.

## References

- [Google: helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Article and BlogPosting structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Natural Stone Institute: stone care and cleaning](https://www.naturalstoneinstitute.org/consumers/care/)
