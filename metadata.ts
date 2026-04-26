import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://smassystems.com'),
  title: {
    default: 'SMA Systems - ERP & POS Provider in Kenya',
    template: '%s | SMA Systems - ERP & POS Solutions',
  },
  description: 'SMA Systems is Kenya\'s leading ERP and POS provider. We build custom ERP systems, POS software, inventory management, CRM, and business automation solutions for enterprises across Africa.',
  keywords: [
    'ERP provider Kenya',
    'POS system Kenya',
    'inventory management Kenya',
    'CRM Kenya',
    'business automation Kenya',
    'enterprise software Kenya',
    'POS developers Kenya',
  ],
  openGraph: {
    type: 'website',
    siteName: 'SMA Systems',
    url: 'https://smassystems.com',
    title: 'SMA Systems - ERP & POS Provider in Kenya',
    description: 'Kenya\'s leading ERP and POS provider. Custom ERP, POS, inventory management, and business automation solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SMAS Systems - Software Development Kenya',
      },
    ],
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMAS Systems - Software Development Company in Kenya',
    description: 'Custom software, ERP, and POS systems for businesses in Kenya and Africa.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://smassystems.com',
  },
  verification: {
    google: 'google-search-console-placeholder',
    other: { 'msvalidate.01': 'bing-webmaster-placeholder' },
  },
};
