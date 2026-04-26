// Content generation and variation engine for programmatic SEO
export interface ContentTemplate {
  intro: string[];
  benefits: string[];
  challenges: string[];
  useCases: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export class ContentVariationEngine {
  private synonyms = {
    business: ['company', 'enterprise', 'organization', 'firm'],
    software: ['system', 'platform', 'solution', 'application'],
    implement: ['deploy', 'install', 'set up', 'integrate'],
    custom: ['tailored', 'bespoke', 'customized', 'personalized'],
    efficient: ['effective', 'productive', 'streamlined', 'optimized'],
    local: ['regional', 'area', 'community', 'district'],
    industry: ['sector', 'field', 'market', 'niche']
  };

  private sentenceVariations = {
    intro: [
      "We provide {service} solutions for businesses in {location}.",
      "Our {service} is designed specifically for {location} companies.",
      "{location} businesses can benefit from our comprehensive {service}.",
      "Transform your {location} business with our advanced {service}."
    ],
    benefit: [
      "Streamlined operations for {location} businesses",
      "Enhanced efficiency in {industry} workflows",
      "Cost-effective solutions tailored to {location}",
      "Scalable systems that grow with your {location} business"
    ]
  };

  getRandomSynonym(word: string): string {
    const synonyms = this.synonyms[word as keyof typeof this.synonyms];
    if (!synonyms) return word;
    return synonyms[Math.floor(Math.random() * synonyms.length)];
  }

  generateIntro(service: any, location: any): string {
    const templates = this.sentenceVariations.intro;
    const template = templates[Math.floor(Math.random() * templates.length)];

    return template
      .replace('{service}', service.name.toLowerCase())
      .replace('{location}', location.name);
  }

  generateBenefits(service: any, location: any, industries: string[]): string[] {
    const benefits = [];
    const templates = this.sentenceVariations.benefit;

    for (let i = 0; i < 4; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const industry = industries[Math.floor(Math.random() * industries.length)] || 'business';

      benefits.push(
        template
          .replace('{location}', location.name)
          .replace('{industry}', industry)
          .replace('{service}', service.name.toLowerCase())
      );
    }

    return [...new Set(benefits)]; // Remove duplicates
  }

  generateChallenges(service: any, location: any, industries: string[]): string[] {
    const challenges = [
      `Managing complex operations in ${location.name}'s competitive market`,
      `Adapting to local business regulations and compliance requirements`,
      `Integrating with existing systems used in ${industries[0] || 'local'} industries`,
      `Scaling operations as businesses in ${location.name} grow and expand`,
      `Maintaining data security and privacy in ${location.name} operations`,
      `Training staff on new ${service.name.toLowerCase()} systems`
    ];

    // Shuffle and return random subset
    return this.shuffleArray(challenges).slice(0, 4);
  }

  generateUseCases(service: any, location: any, industries: string[]): string[] {
    const useCases = industries.map(industry =>
      `${service.shortName} for ${industry} businesses in ${location.name}`
    );

    // Add some general use cases
    const generalCases = [
      `${service.shortName} for retail operations in ${location.name}`,
      `${service.shortName} for service providers in ${location.name}`,
      `${service.shortName} for manufacturing companies in ${location.name}`,
      `${service.shortName} for healthcare facilities in ${location.name}`
    ];

    return this.shuffleArray([...useCases, ...generalCases]).slice(0, 6);
  }

  generateFAQs(service: any, location: any): Array<{ question: string; answer: string }> {
    const baseFAQs = [
      {
        question: `What is ${service.name} in ${location.name}?`,
        answer: `${service.description} tailored for businesses in ${location.name}, Kenya. Our solutions incorporate local market insights and regulatory compliance specific to the region.`
      },
      {
        question: `How much does ${service.name} cost in ${location.name}?`,
        answer: `Pricing ranges from KES ${service.pricingRange.min.toLocaleString()} to KES ${service.pricingRange.max.toLocaleString()} depending on your specific requirements, business size, and implementation complexity.`
      },
      {
        question: `What industries benefit from ${service.name} in ${location.name}?`,
        answer: `${service.name} is ideal for ${service.targetIndustries.join(', ')} businesses operating in ${location.name}. Each industry has unique requirements that our solutions address.`
      },
      {
        question: `How long does it take to implement ${service.name} in ${location.name}?`,
        answer: `Implementation typically takes 4-12 weeks depending on complexity, business size, and existing systems. We provide milestone-based delivery with regular progress updates and training sessions.`
      },
      {
        question: `Do you provide support for ${service.name} in ${location.name}?`,
        answer: `Yes, we provide comprehensive support including training, maintenance, security updates, and technical assistance for all our clients in ${location.name}. Support packages are available monthly or per-project.`
      },
      {
        question: `Can ${service.name} integrate with existing systems in ${location.name}?`,
        answer: `Absolutely. Our solutions are designed for seamless integration with popular business systems, payment gateways, and local software commonly used in ${location.name}. We handle all integration work.`
      }
    ];

    // Randomly select 5 FAQs to vary content
    return this.shuffleArray(baseFAQs).slice(0, 5);
  }

  generateUniqueContent(service: any, location: any): ContentTemplate {
    const industries = location.industries || ['business', 'commerce'];

    return {
      intro: [this.generateIntro(service, location)],
      benefits: this.generateBenefits(service, location, industries),
      challenges: this.generateChallenges(service, location, industries),
      useCases: this.generateUseCases(service, location, industries),
      faqs: this.generateFAQs(service, location)
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Content quality assurance
export function validateContentQuality(content: ContentTemplate, service: any, location: any): boolean {
  const checks = [
    // Minimum word count
    content.intro[0].length > 100,
    content.benefits.length >= 4,
    content.challenges.length >= 3,
    content.useCases.length >= 4,
    content.faqs.length >= 5,

    // Keyword inclusion
    content.intro[0].toLowerCase().includes(service.name.toLowerCase().split(' ')[0]),
    content.intro[0].toLowerCase().includes(location.name.toLowerCase()),

    // Uniqueness (basic check)
    content.benefits.every((benefit, index, arr) =>
      arr.findIndex(b => b === benefit) === index
    )
  ];

  return checks.every(check => check === true);
}

// SEO content optimization
export function optimizeContentForSEO(content: ContentTemplate, service: any, location: any) {
  // Ensure primary keywords appear naturally
  const primaryKeywords = [
    `${service.name} ${location.name}`,
    `${service.name} Kenya`,
    `${service.shortName} ${location.name}`,
    `software development ${location.name}`
  ];

  // Add keywords to intro if missing
  if (!content.intro[0].toLowerCase().includes(service.name.toLowerCase())) {
    content.intro[0] = content.intro[0].replace(
      service.name.toLowerCase(),
      `${service.name} solutions`
    );
  }

  return {
    ...content,
    primaryKeywords,
    secondaryKeywords: service.keywords,
    locationKeywords: [`${location.name} business`, `${location.name} companies`]
  };
}