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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${Bevellier.variable} ${Nippo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
