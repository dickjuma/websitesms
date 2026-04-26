export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SMA Systems",
    "description": "Enterprise software solutions including ERP, POS, Web Development, and AI for businesses across East Africa.",
    "url": "https://smassystems.com",
    "logo": "https://smassystems.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254719832719",
      "contactType": "sales",
      "email": "hello@smassystems.com",
      "areaServed": ["KE", "UG", "TZ", "RW", "CD"],
      "availableLanguage": ["en", "sw"]
    },
    "sameAs": [
      "https://twitter.com/smasystems",
      "https://linkedin.com/company/smasystems",
      "https://facebook.com/smasystems"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "serviceType": [
      "ERP Systems",
      "POS Systems",
      "Web Development",
      "Mobile Applications",
      "AI Solutions"
    ]
  };
}
