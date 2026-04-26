import type { Metadata } from 'next';
import { baseMetadata } from './metadata';
import { generateJsonLd } from './jsonld';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { ChatWidget } from './components/chat-widget';
import './globals.css';

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLd();

  return (
    <html lang="en-KE">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <div aria-hidden="true" className="h-16" />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
