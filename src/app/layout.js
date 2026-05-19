import "./globals.css";

import localFont from "next/font/local";

const Bevellier = localFont({
  src: [
    {
      path: "../../public/fonts/Bevellier/Bevellier-Medium.woff2",
      // weight: "600",
    },
    {
      path: "../../public/fonts/Bevellier/Bevellier-Bold.woff2",
      // weight: "700",
    },
    {
      path: "../../public/fonts/Bevellier/Bevellier-Black.woff2",
      // weight: "900",
    }
  ],
  variable: "--font-bevellier",
});


const Nippo = localFont({
  src: [
    {
      path: "../../public/fonts/Nippo/Nippo-Medium.woff2",
    },
    {
      path: "../../public/fonts/Nippo/Nippo-Bold.woff2",
    },
    {
      path: "../../public/fonts/Nippo/Nippo-Extralight.woff2",
    },
        {
      path: "../../public/fonts/Nippo/Nippo-Light.woff2",
    }
  ],
  variable: "--font-Nippo",
});



export const metadata = {
  title: "Legacy Marble",
  description: "Custom marble products and handcrafted stone surfaces from Makrana.",

  openGraph: {
    title: "Legacy Marble",
    description: "Custom marble products and handcrafted stone surfaces from Makrana.",
    url: "https://legacy-marble.com",
    siteName: "Legacy Marble",
    images: [
      {
        url: "https://legacy-marble.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Legacy Marble - Custom Marble Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Legacy Marble",
    description: "Custom marble products and handcrafted stone surfaces from Makrana.",
    images: ["https://legacy-marble.com/og-image.jpg"],
  }, 
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${Bevellier.variable} ${Nippo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>

  <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "LocalBusiness",
                                    "name": "Legacy Marble",
                                    "url": "https://legacy-marble.com",
                                    "logo": "https://legacy-marble.com/logo.png",
                                    "image": "https://legacy-marble.com/og-image.jpg",
                                    "description": "Premium marble supplier and luxury marble collection.",
                                    "telephone": "+91XXXXXXXXXX",
                                    "address": {
                                      "@type": "PostalAddress",
                                      "addressCountry": "IN"
                                        }
                                         }),
                                            }}
                                               />

    </html>
  );
}
