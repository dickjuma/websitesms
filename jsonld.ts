export function generateJsonLd(page?: string) {
  const organization = {
    '@type': 'Organization',
    '@id': 'https://smassystems.com/#org',
    name: 'SMAS Systems',
    url: 'https://smassystems.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://smassystems.com/logo.png',
    },
    sameAs: [
      'https://www.linkedin.com/company/smassystems',
      'https://www.facebook.com/smassystems',
      'https://twitter.com/smassystems',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-XXX-XXXXXX',
      contactType: 'customer service',
      areaServed: 'KE',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressLocality: 'Nairobi',
    },
    foundingDate: '2020',
  };

  const website = {
    '@type': 'WebSite',
    '@id': 'https://smassystems.com/#website',
    url: 'https://smassystems.com',
    name: 'SMAS Systems',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://smassystems.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const professionalService = {
    '@type': 'ProfessionalService',
    '@id': 'https://smassystems.com/#service',
    name: 'SMAS Systems',
    url: 'https://smassystems.com',
    priceRange: '$$',
    areaServed: ['Kenya', 'Africa'],
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'ERP Systems',
      'POS Systems',
      'AI Solutions',
      'Custom Software',
    ],
  };

  const graph: any[] = [organization, website, professionalService];

  if (page) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://smassystems.com',
        },
        { '@type': 'ListItem', position: 2, name: page },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
