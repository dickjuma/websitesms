import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from './config';

export { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME };

export const generateAlternateLanguages = (path: string) => {
  const languages: Record<string, string> = {
    'en-KE': `${SITE_URL}${path}`,
    'sw-KE': `${SITE_URL}/sw${path}`,
  };
  return languages;
};

export const generateBreadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateLocalBusiness = () => ({
  '@type': ['LocalBusiness', 'ProfessionalService', 'SoftwareApplication'] as const,
  '@id': `${SITE_URL}/#business`,
  name: 'SMA Systems',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    'East Africa\'s leading ERP and POS provider. Custom ERP systems, POS software, inventory management, CRM, websites, mobile apps, and enterprise software.',
  telephone: '+254719832719',
  email: 'hello@smassystems.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-1.286389',
    longitude: '36.817223',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: 'KSh',
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Uganda' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Rwanda' },
    { '@type': 'Country', name: 'Democratic Republic of the Congo' },
    { '@type': 'Country', name: 'South Sudan' },
  ],
});

export const generateOrganization = () => ({
  '@type': 'Organization',
  '@id': `${SITE_URL}/#org`,
  name: 'SMA Systems',
  alternateName: 'SMA Systems and Softwares',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description:
    'SMA Systems is East Africa\'s leading ERP & POS provider. We build custom ERP systems, POS software, inventory management, CRM, and business automation solutions.',
  sameAs: [
    'https://facebook.com/smassystems',
    'https://twitter.com/smassystems',
    'https://linkedin.com/company/smassystems',
    'https://instagram.com/smassystems',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+254-719-832719',
    contactType: 'customer service',
    areaServed: ['KE', 'UG', 'TZ', 'RW', 'CD', 'SS'],
    availableLanguage: ['English', 'Swahili', 'French', 'Arabic', 'Luganda', 'Kinyarwanda'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nairobi, Kenya',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  foundingDate: '2020',
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Uganda' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Rwanda' },
    { '@type': 'Country', name: 'Democratic Republic of the Congo' },
    { '@type': 'Country', name: 'South Sudan' },
  ],
});

export const generateWebsite = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'SMA Systems - ERP & POS Provider East Africa',
  publisher: { '@id': `${SITE_URL}/#org` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['en', 'sw', 'fr'],
});

export const generateProductSchema = (productName: string, description: string, rating?: string, reviewCount?: string, price?: string, imageUrl?: string) => ({
  '@type': 'Product',
  name: productName,
  description,
  image: imageUrl || `${SITE_URL}/favicon.ico`,
  brand: {
    '@type': 'Brand',
    name: 'SMA Systems',
  },
  areaServed: [
    { '@type': 'Country', name: 'Kenya', url: `${SITE_URL}/kenya` },
    { '@type': 'Country', name: 'Uganda', url: `${SITE_URL}/uganda` },
    { '@type': 'Country', name: 'Tanzania', url: `${SITE_URL}/tanzania` },
    { '@type': 'Country', name: 'Rwanda', url: `${SITE_URL}/rwanda` },
    { '@type': 'Country', name: 'DRC', url: `${SITE_URL}/drc` },
    { '@type': 'Country', name: 'South Sudan', url: `${SITE_URL}/south-sudan` },
    { '@type': 'Country', name: 'Burundi', url: `${SITE_URL}/burundi` },
    { '@type': 'Country', name: 'Ethiopia', url: `${SITE_URL}/ethiopia` },
  ],
  offers: {
    '@type': 'Offer',
    price: price || '0',
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: ['KE', 'UG', 'TZ', 'RW', 'CD', 'SS'],
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        businessDays: {
          '@type': 'PartialDayWeek',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        cutoffTime: '17:00',
      },
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      name: 'SMA Systems Return Policy',
      returnPolicyCategory: 'https://schema.org/ReturnDamaged',
      returnFees: 'https://schema.org/ReturnShippingFees',
      returnWithin: 'https://schema.org/ThirtyDayReturn',
    },
  },
  aggregateRating: rating ? {
    '@type': 'AggregateRating',
    ratingValue: rating,
    reviewCount: reviewCount || '100',
  } : undefined,
});

export const generateServiceSchema = (serviceName: string, description: string, areaServed: string[]) => ({
  '@type': 'Service',
  name: serviceName,
  description,
  provider: {
    '@type': 'Organization',
    name: 'SMA Systems',
    url: SITE_URL,
  },
  areaServed: areaServed.map(country => ({ '@type': 'Country', name: country })),
  serviceType: 'Software Development',
});

export const generateFAQ = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
