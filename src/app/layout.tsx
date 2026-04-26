import type { Metadata } from 'next';
import { BrowserFixes } from '@/components/system/browser-fixes';
import ChatInterface from '@/components/chatbot/chat-interface';
import { Toaster } from '@/components/ui/toast';
import { metadata } from './seo/metadata';
import { generateJsonLd } from './seo/jsonld';
import './globals.css';

export const dynamicParams = true;
export const revalidate = 0;

export { metadata };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLd("home");

  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <link
          rel="preload"
          href="/images/favicon.ico"
          as="image"
        />
        {/* Hreflang for international targeting */}
        <link rel="alternate" hrefLang="en-KE" href="https://smassystems.com" />
        <link rel="alternate" hrefLang="sw-KE" href="https://smassystems.com" />
        <link rel="alternate" hrefLang="en-UG" href="https://smassystems.com/uganda" />
        <link rel="alternate" hrefLang="en-TZ" href="https://smassystems.com/tanzania" />
        <link rel="alternate" hrefLang="sw-TZ" href="https://smassystems.com/tanzania" />
        <link rel="alternate" hrefLang="en-RW" href="https://smassystems.com/rwanda" />
        <link rel="alternate" hrefLang="fr-RW" href="https://smassystems.com/rwanda" />
        <link rel="alternate" hrefLang="en-CD" href="https://smassystems.com/drc" />
        <link rel="alternate" hrefLang="fr-CD" href="https://smassystems.com/drc" />
        <link rel="alternate" hrefLang="en-SS" href="https://smassystems.com/south-sudan" />
        <link rel="alternate" hrefLang="en-BI" href="https://smassystems.com/burundi" />
        <link rel="alternate" hrefLang="fr-BI" href="https://smassystems.com/burundi" />
        <link rel="alternate" hrefLang="en-ET" href="https://smassystems.com/ethiopia" />
        <link rel="alternate" hrefLang="en" href="https://smassystems.com" />
        
        {/* Open Graph */}
        <meta property="og:locale" content="en_KE" />
        <meta property="og:locale:alternate" content="sw_KE" />
        
        {/* Geo metadata for local SEO */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.286389;36.817223" />
        <meta name="ICBM" content="-1.286389,36.817223" />
        
        {/* Business metadata */}
        <meta name="author" content="SMA Systems" />
        <meta name="creator" content="SMA Systems" />
        <meta name="publisher" content="SMA Systems" />
        
        {/* Verify ownership for search engines */}
        <meta name="google-site-verification" content="googleefccca4f7ecc93d9" />

        {/* Google Analytics GA4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BPVRXQVXJ9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BPVRXQVXJ9', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });

              // Enhanced tracking for programmatic SEO pages
              gtag('event', 'page_view_enhanced', {
                page_title: document.title,
                page_location: window.location.href,
                content_group: window.location.pathname.includes('-') ? 'programmatic-seo' : 'main-pages',
                custom_map: {'dimension1': 'page_type'}
              });
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <ChatInterface />
        <BrowserFixes />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
