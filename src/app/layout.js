import "./globals.css";
import { SITE } from '../lib/site';

import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

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
  metadataBase: new URL(SITE.url),
  title: "Legacy Marble",
  description: "Custom marble products and handcrafted stone surfaces from Makrana.",

  openGraph: {
    title: "Legacy Marble",
    description: "Custom marble products and handcrafted stone surfaces from Makrana.",
    url: "https://legacy-marble.com",
    siteName: "Legacy Marble",
    images: [
      {
        url: `${SITE.url}${SITE.defaultOgImage}`,
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
    images: [`${SITE.url}${SITE.defaultOgImage}`],
  }, 
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${Bevellier.variable} ${Nippo.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "LocalBusiness",
                                    "name": "Legacy Marble",
                                    "url": SITE.url,
                                    "logo": `${SITE.url}${SITE.logo}`,
                                    "image": `${SITE.url}${SITE.defaultOgImage}`,
                                    "description": "Custom marble products and handcrafted stone surfaces from Makrana.",
                                    "telephone": "+918949241616",
                                    "address": {
                                      "@type": "PostalAddress",
                                      "streetAddress": "Ward No 7, Bypass Road",
                                      "addressLocality": "Makrana",
                                      "addressRegion": "Rajasthan",
                                      "postalCode": "341505",
                                      "addressCountry": "IN"
                                        }
                                         }),
                                            }}
                                               />
      </body>

    </html>
  );
}
