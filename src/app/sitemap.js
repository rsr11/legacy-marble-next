export default async function sitemap() {
  const products = [
    {
      slug: "diya"
    },
    {
      slug: "fountain"
    },
    {
      slug: "temple"
    },
    {
      slug: "Tulsipot"
    },
    {
      slug: "wash-basin"
    },
    {
      slug: "inlay-work"
    },
    {
      slug: "carving-work"
    },
    {
      slug: "marble-slab"
    },
    {
      slug: "mini-items"
    },
    {
      slug: "pedestal-basin"
    }
  ];

  const productUrls = products.map((product) => ({
    url: `https://legacy-marble.com/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://legacy-marble.com",
      lastModified: new Date(),
    },
    {
      url: "https://legacy-marble.com/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://legacy-marble.com/contact-us",
      lastModified: new Date(),
    },
    {
      url: "https://legacy-marble.com/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://legacy-marble.com/terms-condition",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}