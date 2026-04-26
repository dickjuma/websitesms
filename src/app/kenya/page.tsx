import { Metadata } from 'next';
import Hero from '@/components/kenya-homepage/Hero';
import Services from '@/components/kenya-homepage/Services';
import HowItConnects from '@/components/kenya-homepage/HowItConnects';
import CountyPreview from '@/components/kenya-homepage/CountyPreview';
import KenyaMap from '@/components/kenya-homepage/KenyaMap';
import CountyStats from '@/components/kenya-homepage/CountyStats';
import CountyDirectory from '@/components/kenya-homepage/CountyDirectory';
import Testimonials from '@/components/kenya-homepage/Testimonials';
import WhyChoose from '@/components/kenya-homepage/WhyChoose';
import Industries from '@/components/kenya-homepage/Industries';
import SEOExplanation from '@/components/kenya-homepage/SEOExplanation';
import FinalCTA from '@/components/kenya-homepage/FinalCTA';

export const metadata: Metadata = {
  title: 'Business Software Solutions in Kenya | SMA Systems - All 47 Counties',
  description: 'Complete business software solutions for all 47 Kenya counties. POS systems, ERP software, HR management, web development, and custom automation for Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and every county across Coast, North Eastern, Eastern, Central, Rift Valley, Western, Nyanza regions.',
  keywords: [
    'business software Kenya',
    'POS systems Kenya',
    'ERP software Kenya',
    'HR management systems Kenya',
    'web development Kenya',
    'custom software Kenya',
    'business automation Kenya',
    'Kenya counties software',
    'software Nairobi',
    'POS Mombasa',
    'ERP Kisumu',
    'HR Nakuru',
    'web development Eldoret',
    'business systems all Kenya counties',
    'Nairobi business software',
    'Mombasa POS systems',
    'Kisumu ERP software',
    'Nakuru HR management',
    'Eldoret web development',
    'Kenya business automation',
    'county specific software',
    'local business solutions Kenya',
    'software Mombasa county',
    'ERP Kwale',
    'POS Kilifi',
    'HR Tana River',
    'web development Lamu',
    'business software Taita-Taveta',
    'software Garissa',
    'POS Wajir',
    'ERP Mandera',
    'HR Marsabit',
    'web development Isiolo',
    'business software Meru',
    'software Tharaka-Nithi',
    'POS Embu',
    'ERP Kitui',
    'HR Machakos',
    'web development Makueni',
    'business software Nyandarua',
    'software Nyeri',
    'POS Kirinyaga',
    'ERP Muranga',
    'HR Kiambu',
    'web development Turkana',
    'business software West Pokot',
    'software Samburu',
    'POS Trans-Nzoia',
    'ERP Uasin Gishu',
    'HR Elgeyo-Marakwet',
    'web development Nandi',
    'business software Baringo',
    'software Laikipia',
    'POS Kericho',
    'ERP Bomet',
    'HR Kakamega',
    'web development Vihiga',
    'business software Bungoma',
    'software Busia',
    'POS Siaya',
    'ERP Homa Bay',
    'HR Migori',
    'web development Kisii',
    'business software Nyamira',
  ],
  openGraph: {
    title: 'Business Software Solutions in Kenya | SMA Systems',
    description: 'Complete business software solutions for companies across Kenya - POS, ERP, HR, web development, and custom systems.',
    url: 'https://smassystems.com/kenya',
    siteName: 'SMA Systems',
    images: [
      {
        url: 'https://smassystems.com/og-image-kenya.png',
        width: 1200,
        height: 630,
        alt: 'Business Software Solutions in Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Software Solutions in Kenya | SMA Systems',
    description: 'POS systems, ERP software, HR management systems, web development, and custom software for businesses across all Kenya counties.',
    images: ['https://smassystems.com/og-image-kenya.png'],
  },
};

export default function KenyaHomepage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <HowItConnects />
      <CountyStats />
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KenyaMap />
        </div>
      </div>
      <CountyDirectory />
      <Testimonials />
      <WhyChoose />
      <Industries />
      <SEOExplanation />
      <FinalCTA />
    </div>
  );
}
