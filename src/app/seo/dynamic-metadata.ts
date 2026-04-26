import { Metadata } from 'next';
import { getSiteInfoSettings } from '@/lib/site-settings';

export async function generateDynamicMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfoSettings();
  
  const defaultMetadata: Metadata = {
    metadataBase: new URL(siteInfo.websiteUrl || 'https://smassystems.com'),
    
    title: {
      default: `${siteInfo.companyName} - Software Development Company in Kenya`,
      template: `%s | ${siteInfo.companyName}`,
    },
    
    description: siteInfo.tagline || 'Leading software development company in Kenya. Custom websites, mobile apps, ERP, POS, and AI solutions for African businesses.',
    
    keywords: [
      'software development Kenya',
      'ERP systems Kenya',
      'POS systems Kenya',
      'mobile app developers Kenya',
      'custom software Africa',
      'AI development Kenya',
      'enterprise software Kenya',
      'web development Kenya',
      'Nairobi software company',
      'IT services Africa',
    ],
    
    authors: [{ name: siteInfo.companyName, url: siteInfo.websiteUrl }],
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: siteInfo.websiteUrl,
    },
    
    openGraph: {
      type: 'website',
      locale: 'en_KE',
      url: siteInfo.websiteUrl,
      siteName: siteInfo.companyName,
      title: `${siteInfo.companyName} - Software Development Company in Kenya`,
      description: siteInfo.tagline || 'Leading software development company in Kenya.',
      images: siteInfo.logoUrl ? [
        {
          url: siteInfo.logoUrl,
          width: 1200,
          height: 630,
          alt: siteInfo.companyName,
        },
      ] : [],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${siteInfo.companyName} - Software Development Company in Kenya`,
      description: siteInfo.tagline || 'Leading software development company in Kenya.',
      images: siteInfo.logoUrl ? [siteInfo.logoUrl] : [],
    },
    
    icons: {
      icon: '/images/favicon.ico',
      shortcut: '/images/favicon.ico',
      apple: '/images/favicon.ico',
    },
  };

  return defaultMetadata;
}

export { metadata as defaultMetadata } from './metadata';
export { generateJsonLd } from './jsonld';