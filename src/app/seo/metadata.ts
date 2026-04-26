import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://smassystems.com"),

  title: {
    default: "Software Development Kenya | SMAS Systems",
    template: "%s | SMAS Systems",
  },

  description:
    "Custom software development in Kenya. We build web platforms, mobile apps, ERP systems, POS software, and AI solutions. 400+ projects delivered. Get a free quote today.",

  keywords: [
    "software development Kenya",
    "ERP systems Kenya",
    "POS software Kenya",
    "custom software development",
    "web development Nairobi",
    "mobile app development Kenya",
    "business automation Kenya",
    "enterprise software Kenya",
    "AI solutions Kenya",
    "inventory management Kenya",
    "CRM Kenya",
    "IT company Nairobi",
    "software company Kenya",
  ],

  authors: [{ name: "SMAS Systems", url: "https://smassystems.com" }],

  category: "technology",



  alternates: {
    canonical: "https://smassystems.com",
    languages: {
      "en-KE": "https://smassystems.com",
      "sw-KE": "https://smassystems.com",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    alternateLocale: "sw_KE",
    url: "https://smassystems.com",
    siteName: "SMAS Systems",
    title: "Software Development Kenya | SMAS Systems",
    description:
      "Custom software development in Kenya. We build web platforms, mobile apps, ERP systems, POS software, and AI solutions. 400+ projects delivered.",
    images: [
      {
        url: "https://smassystems.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SMAS Systems - Software Development Company in Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Software Development Kenya | SMAS Systems",
    description:
      "Custom software development in Kenya. Web platforms, mobile apps, ERP, POS, and AI solutions for African businesses.",
    images: ["https://smassystems.com/og-image.png"],
    creator: "@smassystems",
  },

  other: {
    "fb:app_id": "",
    "og:type": "website",
  },

  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },

  verification: {
    google: "googleefccca4f7ecc93d9",
  },
};