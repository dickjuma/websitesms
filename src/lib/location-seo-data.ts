// Kenyan locations data for programmatic SEO
export interface KenyanLocation {
  slug: string;
  name: string;
  type: 'county' | 'city' | 'town' | 'sub-location';
  county?: string; // For cities/towns within counties
  population?: number;
  industries?: string[]; // Key industries in this location
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ServiceType {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
  targetIndustries: string[];
  pricingRange: {
    min: number;
    max: number;
    currency: string;
  };
}

// Kenyan counties and major locations
export const kenyanLocations: KenyanLocation[] = [
  // Counties
  { slug: 'nairobi', name: 'Nairobi', type: 'county', population: 4397073, industries: ['technology', 'finance', 'commerce', 'media'] },
  { slug: 'mombasa', name: 'Mombasa', type: 'county', population: 1208333, industries: ['shipping', 'tourism', 'manufacturing', 'logistics'] },
  { slug: 'kisumu', name: 'Kisumu', type: 'county', population: 1155574, industries: ['fishing', 'agriculture', 'manufacturing', 'tourism'] },
  { slug: 'nakuru', name: 'Nakuru', type: 'county', population: 2162202, industries: ['agriculture', 'manufacturing', 'tourism', 'education'] },
  { slug: 'machakos', name: 'Machakos', type: 'county', population: 1419090, industries: ['agriculture', 'manufacturing', 'education'] },
  { slug: 'kiambu', name: 'Kiambu', type: 'county', population: 2417735, industries: ['agriculture', 'commerce', 'education', 'technology'] },
  { slug: 'kakamega', name: 'Kakamega', type: 'county', population: 1867578, industries: ['agriculture', 'education', 'manufacturing'] },
  { slug: 'meru', name: 'Meru', type: 'county', population: 1555992, industries: ['agriculture', 'tourism', 'education'] },
  { slug: 'nyeri', name: 'Nyeri', type: 'county', population: 759164, industries: ['agriculture', 'tourism', 'tea', 'education'] },
  { slug: 'kirinyaga', name: 'Kirinyaga', type: 'county', population: 610411, industries: ['agriculture', 'education', 'commerce'] },
  // Add more counties as needed...

  // Major cities (subset for demonstration)
  { slug: 'nairobi-cbd', name: 'Nairobi CBD', type: 'city', county: 'nairobi', industries: ['finance', 'corporate', 'technology'] },
  { slug: 'westlands-nairobi', name: 'Westlands Nairobi', type: 'city', county: 'nairobi', industries: ['technology', 'media', 'hospitality'] },
  { slug: 'kilimani-nairobi', name: 'Kilimani Nairobi', type: 'city', county: 'nairobi', industries: ['residential', 'education', 'healthcare'] },
  { slug: 'kisumu-cbd', name: 'Kisumu CBD', type: 'city', county: 'kisumu', industries: ['commerce', 'finance', 'technology'] },
  { slug: 'mombasa-cbd', name: 'Mombasa CBD', type: 'city', county: 'mombasa', industries: ['shipping', 'commerce', 'tourism'] },
  { slug: 'eldoret-cbd', name: 'Eldoret CBD', type: 'city', county: 'uasin-gishu', industries: ['education', 'agriculture', 'commerce'] },
  { slug: 'nakuru-cbd', name: 'Nakuru CBD', type: 'city', county: 'nakuru', industries: ['commerce', 'education', 'tourism'] },

  // Towns and sub-locations (subset for demonstration)
  { slug: 'thika', name: 'Thika', type: 'town', county: 'kiambu', industries: ['manufacturing', 'commerce', 'agriculture'] },
  { slug: 'limuru', name: 'Limuru', type: 'town', county: 'kiambu', industries: ['agriculture', 'tourism', 'education'] },
  { slug: 'ruiru', name: 'Ruiru', type: 'town', county: 'kiambu', industries: ['residential', 'commerce', 'manufacturing'] },
  { slug: 'kitengela', name: 'Kitengela', type: 'town', county: 'kajiado', industries: ['residential', 'logistics', 'commerce'] },
  { slug: 'syokimau', name: 'Syokimau', type: 'town', county: 'machakos', industries: ['logistics', 'residential', 'commerce'] },
];

// Service types
export const serviceTypes: ServiceType[] = [
  {
    slug: 'erp-system',
    name: 'ERP System',
    shortName: 'ERP',
    description: 'Enterprise Resource Planning software for comprehensive business management',
    keywords: ['ERP software', 'enterprise resource planning', 'business management system', 'ERP Kenya'],
    targetIndustries: ['manufacturing', 'retail', 'distribution', 'healthcare', 'education'],
    pricingRange: { min: 500000, max: 5000000, currency: 'KES' }
  },
  {
    slug: 'pos-system',
    name: 'POS System',
    shortName: 'POS',
    description: 'Point of Sale systems for retail and hospitality businesses',
    keywords: ['POS system', 'point of sale', 'retail software', 'POS Kenya'],
    targetIndustries: ['retail', 'hospitality', 'restaurants', 'supermarkets'],
    pricingRange: { min: 100000, max: 1000000, currency: 'KES' }
  },
  {
    slug: 'school-management-system',
    name: 'School Management System',
    shortName: 'SMS',
    description: 'Comprehensive school administration and learning management software',
    keywords: ['school management system', 'education software', 'school ERP', 'SMS Kenya'],
    targetIndustries: ['education', 'schools', 'universities', 'training centers'],
    pricingRange: { min: 300000, max: 2000000, currency: 'KES' }
  },
  {
    slug: 'hospital-system',
    name: 'Hospital Management System',
    shortName: 'HMS',
    description: 'Healthcare management software for hospitals and clinics',
    keywords: ['hospital management system', 'healthcare software', 'medical ERP', 'HMS Kenya'],
    targetIndustries: ['healthcare', 'hospitals', 'clinics', 'medical centers'],
    pricingRange: { min: 800000, max: 8000000, currency: 'KES' }
  },
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    shortName: 'Custom Software',
    description: 'Tailored software solutions for unique business requirements',
    keywords: ['custom software development', 'bespoke software', 'software development Kenya', 'custom applications'],
    targetIndustries: ['technology', 'finance', 'logistics', 'all'],
    pricingRange: { min: 200000, max: 10000000, currency: 'KES' }
  }
];

// Generate all service + location combinations
export function generateServiceLocationCombinations(): Array<{
  service: ServiceType;
  location: KenyanLocation;
  urlSlug: string;
}> {
  const combinations = [];

  for (const service of serviceTypes) {
    for (const location of kenyanLocations) {
      combinations.push({
        service,
        location,
        urlSlug: `${service.slug}-${location.slug}`
      });
    }
  }

  return combinations;
}

// Get nearby locations for internal linking
export function getNearbyLocations(locationSlug: string): KenyanLocation[] {
  const location = kenyanLocations.find(loc => loc.slug === locationSlug);
  if (!location) return [];

  // For cities/towns, return locations in same county
  if (location.county) {
    return kenyanLocations
      .filter(loc => loc.county === location.county && loc.slug !== locationSlug)
      .slice(0, 5);
  }

  // For counties, return nearby counties
  const countyIndex = kenyanLocations.findIndex(loc => loc.slug === locationSlug);
  const nearbyLocations = [];

  // Get 3 locations before and after (simplified proximity)
  for (let i = Math.max(0, countyIndex - 3); i < Math.min(kenyanLocations.length, countyIndex + 4); i++) {
    if (i !== countyIndex) {
      nearbyLocations.push(kenyanLocations[i]);
    }
  }

  return nearbyLocations.slice(0, 5);
}

// Get location-specific content variations
export function getLocationContent(location: KenyanLocation, service: ServiceType) {
  const industries = location.industries || [];
  const industryText = industries.length > 0
    ? industries.slice(0, 3).join(', ')
    : 'various industries';

  return {
    intro: `We provide ${service.name.toLowerCase()} solutions for businesses in ${location.name}, Kenya. Our software is designed to meet the unique needs of ${industryText} companies operating in this dynamic region.`,

    benefits: [
      `Streamlined operations for ${location.name} businesses`,
      `Local market insights and compliance`,
      `Support for ${industryText} workflows`,
      `Scalable solutions for growing companies`,
      `Integration with local payment systems`
    ],

    useCases: industries.map(industry =>
      `${service.shortName} for ${industry} businesses in ${location.name}`
    ),

    challenges: [
      `Managing complex operations in ${location.name}'s competitive market`,
      `Adapting to local business regulations and practices`,
      `Integrating with existing systems used in ${industryText}`,
      `Scaling operations as businesses in ${location.name} grow`
    ]
  };
}