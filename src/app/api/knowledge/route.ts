import { NextRequest, NextResponse } from "next/server";
import { serviceTypes, kenyanLocations } from "@/lib/location-seo-data";

interface KnowledgeBaseEntry {
  id: string;
  type: 'service' | 'location' | 'pricing' | 'faq' | 'capability';
  title: string;
  content: string;
  keywords: string[];
  metadata: Record<string, any>;
}

// Generate comprehensive knowledge base
function generateKnowledgeBase(): KnowledgeBaseEntry[] {
  const entries: KnowledgeBaseEntry[] = [];

  // Service information
  serviceTypes.forEach(service => {
    entries.push({
      id: `service-${service.slug}`,
      type: 'service',
      title: service.name,
      content: `${service.description} ${service.name} includes: ${service.keywords.join(', ')}. Target industries: ${service.targetIndustries.join(', ')}.`,
      keywords: service.keywords,
      metadata: {
        pricingRange: service.pricingRange,
        targetIndustries: service.targetIndustries,
        shortName: service.shortName
      }
    });

    // Service FAQs
    entries.push({
      id: `faq-${service.slug}-cost`,
      type: 'faq',
      title: `${service.name} Cost`,
      content: `${service.name} pricing ranges from KES ${service.pricingRange.min.toLocaleString()} to KES ${service.pricingRange.max.toLocaleString()} depending on requirements.`,
      keywords: ['cost', 'pricing', 'price', service.name.toLowerCase()],
      metadata: {
        service: service.slug,
        pricing: service.pricingRange
      }
    });

    entries.push({
      id: `faq-${service.slug}-timeline`,
      type: 'faq',
      title: `${service.name} Implementation Time`,
      content: `${service.name} implementation typically takes 4-12 weeks depending on complexity and business size.`,
      keywords: ['timeline', 'implementation', 'duration', service.name.toLowerCase()],
      metadata: {
        service: service.slug,
        timeline: '4-12 weeks'
      }
    });
  });

  // Location information
  kenyanLocations.slice(0, 100).forEach(location => { // Limit to avoid huge response
    entries.push({
      id: `location-${location.slug}`,
      type: 'location',
      title: location.name,
      content: `${location.name} is a ${location.type} in Kenya${location.industries ? ` with key industries: ${location.industries.join(', ')}` : ''}. We provide software solutions tailored for businesses in this location.`,
      keywords: [location.name.toLowerCase(), 'kenya', location.type],
      metadata: {
        type: location.type,
        industries: location.industries || [],
        county: location.county
      }
    });
  });

  // Pricing information
  entries.push({
    id: 'pricing-overview',
    type: 'pricing',
    title: 'Software Development Pricing Overview',
    content: 'Our pricing is transparent and competitive. ERP systems: KES 500K-10M. POS systems: KES 100K-1M. Custom software: KES 200K-10M. All prices include implementation and support.',
    keywords: ['pricing', 'cost', 'quotes', 'budget'],
    metadata: {
      ranges: {
        erp: '500000-10000000',
        pos: '100000-1000000',
        custom: '200000-10000000'
      }
    }
  });

  // Company capabilities
  entries.push({
    id: 'company-capabilities',
    type: 'capability',
    title: 'SMAS Systems Capabilities',
    content: 'SMAS Systems is Kenya\'s leading software development company with 400+ projects delivered. We specialize in ERP, POS, school management, hospital systems, and custom software. Full-stack development, cloud solutions, mobile apps, web platforms.',
    keywords: ['capabilities', 'experience', 'expertise', 'services'],
    metadata: {
      projectsDelivered: 400,
      yearsExperience: 8,
      teamSize: 25,
      specializations: ['ERP', 'POS', 'HMS', 'SMS', 'Custom Software']
    }
  });

  // Common FAQs
  const commonFAQs = [
    {
      id: 'faq-free-quote',
      question: 'Do you offer free quotes?',
      answer: 'Yes, we provide free, detailed quotes for all projects. Contact us to discuss your requirements.'
    },
    {
      id: 'faq-support',
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including training, maintenance, security updates, and technical assistance.'
    },
    {
      id: 'faq-timeline',
      question: 'How long do projects take?',
      answer: 'Timelines vary: websites (2-4 weeks), mobile apps (4-8 weeks), ERP systems (8-16 weeks), custom software (8-24 weeks).'
    },
    {
      id: 'faq-payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, M-Pesa, card payments, and other local payment methods. Flexible payment terms available.'
    }
  ];

  commonFAQs.forEach(faq => {
    entries.push({
      id: faq.id,
      type: 'faq',
      title: faq.question,
      content: faq.answer,
      keywords: ['faq', 'question', faq.question.toLowerCase().split(' ').slice(0, 3).join(' ')],
      metadata: {}
    });
  });

  return entries;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();
    const type = searchParams.get('type') as KnowledgeBaseEntry['type'];
    const limit = parseInt(searchParams.get('limit') || '50');

    let knowledgeBase = generateKnowledgeBase();

    // Filter by type if specified
    if (type) {
      knowledgeBase = knowledgeBase.filter(entry => entry.type === type);
    }

    // Filter by query if specified
    if (query) {
      knowledgeBase = knowledgeBase.filter(entry =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query) ||
        entry.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Limit results
    knowledgeBase = knowledgeBase.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: knowledgeBase,
      total: knowledgeBase.length,
      query: query || null,
      type: type || null
    });

  } catch (error) {
    console.error('Knowledge base API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for chatbot to submit feedback
export async function POST(request: NextRequest) {
  try {
    const { action, query, response, userFeedback } = await request.json();

    // Log chatbot interactions for improvement
    console.log('Chatbot interaction:', {
      action,
      query,
      response,
      userFeedback,
      timestamp: new Date().toISOString()
    });

    // In production, you might want to store this in a database
    // for training and improvement purposes

    return NextResponse.json({
      success: true,
      message: 'Feedback recorded'
    });

  } catch (error) {
    console.error('Knowledge base feedback error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}