import { Metadata } from 'next';
import { SiteShell } from '@/components/layout/site-shell';
import Hero from '@/components/homepage/Hero';
import { TrustSection as SocialProof } from '@/components/sections/trust-section';
import ServicesOverview from '@/components/homepage/ServicesOverview';
import { KenyaCoverage } from '@/components/sections/kenya-coverage';
import { ProcessSection as HowItWorks } from '@/components/sections/process-section';
import { FeaturedSolutions } from '@/components/sections/featured-solutions';
import WhySmaSystems from '@/components/homepage/WhySmaSystems';
import { TestimonialsSection as Testimonials } from '@/components/sections/testimonials-section';
import { PricingPreview } from '@/components/sections/pricing-preview';
import FinalCta from '@/components/homepage/FinalCta';

export const metadata: Metadata = {
  title: 'Business Software Solutions for Kenya | SMA Systems',
  description: 'Complete POS systems, ERP software, HR management, web development, and custom business software for companies across all 47 Kenya counties.',
  keywords: [
    'business software Kenya',
    'POS systems Kenya',
    'ERP software Kenya',
    'HR management systems Kenya',
    'web development Kenya',
    'custom software Kenya',
    'Kenya business automation',
    'SaaS Kenya',
    'business software Nairobi',
    'enterprise software Kenya',
  ],
  openGraph: {
    title: 'Business Software Solutions for Kenya | SMA Systems',
    description: 'Complete business software solutions for Kenyan companies - POS, ERP, HR, web development, and custom automation across all counties.',
    url: 'https://smassystems.com',
    siteName: 'SMA Systems',
    images: [
      {
        url: 'https://smassystems.com/og-image-homepage.png',
        width: 1200,
        height: 630,
        alt: 'SMA Systems - Business Software Solutions for Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Software Solutions for Kenya | SMA Systems',
    description: 'Complete business software solutions for Kenyan companies across all 47 counties.',
    images: ['https://smassystems.com/og-image-homepage.png'],
  },
};

export default function Home() {
  return (
    <SiteShell>
      <main className="bg-white">
        <Hero />
        <SocialProof />
        <ServicesOverview />
        <KenyaCoverage />
        <HowItWorks />
        <FeaturedSolutions />
        <WhySmaSystems />
        <Testimonials />
        <PricingPreview />
        <FinalCta />
      </main>
    </SiteShell>
  );
}
