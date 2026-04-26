import { NextResponse } from 'next/server';
import { createServicePrice, getAllServicePrices, deleteServicePrice } from '@/lib/database';

const SEED_DATA = [
  {
    serviceName: 'Web Development',
    description: 'Custom websites and web applications with modern design and functionality.',
    monthlyPrice: 15000,
    oneTimePrice: 150000,
    category: 'Web Development'
  },
  {
    serviceName: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android platforms.',
    monthlyPrice: 25000,
    oneTimePrice: 300000,
    category: 'Mobile App Development'
  },
  {
    serviceName: 'ERP Systems',
    description: 'Comprehensive enterprise resource planning solutions for business management.',
    monthlyPrice: 50000,
    oneTimePrice: 750000,
    category: 'ERP Systems'
  },
  {
    serviceName: 'POS Systems',
    description: 'Point of sale solutions with KRA compliance and inventory management.',
    monthlyPrice: 20000,
    oneTimePrice: 250000,
    category: 'POS Systems'
  },
  {
    serviceName: 'School Management',
    description: 'Complete school management system for fee collection and administration.',
    monthlyPrice: 30000,
    oneTimePrice: 400000,
    category: 'School Management'
  },
  {
    serviceName: 'Hospital Management',
    description: 'Healthcare management system for clinics and hospitals.',
    monthlyPrice: 40000,
    oneTimePrice: 550000,
    category: 'Hospital Management'
  },
  {
    serviceName: 'API Integrations',
    description: 'API development and system integration services.',
    monthlyPrice: 10000,
    oneTimePrice: 80000,
    category: 'API Integrations'
  },
  {
    serviceName: 'Hotel Management',
    description: 'Complete hotel and restaurant management system.',
    monthlyPrice: 35000,
    oneTimePrice: 450000,
    category: 'Hotel Management'
  }
];

export async function GET() {
  return NextResponse.json({
    message: 'Preview of seed data that will be inserted',
    data: SEED_DATA
  });
}

export async function DELETE() {
  try {
    const existingPrices = await getAllServicePrices();

    if (existingPrices.length === 0) {
      return NextResponse.json({ message: 'No data to clear' });
    }

    let deletedCount = 0;
    for (const price of existingPrices) {
      if (price._id) {
        const deleted = await deleteServicePrice(price._id);
        if (deleted) deletedCount++;
      }
    }

    return NextResponse.json({
      message: `Cleared ${deletedCount} service prices`
    });
  } catch (error) {
    console.error('Failed to clear service prices:', error);
    return NextResponse.json({ error: 'Failed to clear service prices' }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Check if data already exists
    const existingPrices = await getAllServicePrices();
    if (existingPrices.length > 0) {
      return NextResponse.json({
        error: 'Database already contains pricing data. Clear existing data first or use update endpoints.'
      }, { status: 400 });
    }

    // Seed the data
    const createdPrices = [];
    for (const priceData of SEED_DATA) {
      const created = await createServicePrice(priceData);
      createdPrices.push(created);
    }

    return NextResponse.json({
      message: `Successfully seeded ${createdPrices.length} service prices`,
      data: createdPrices
    });
  } catch (error) {
    console.error('Failed to seed service prices:', error);
    return NextResponse.json({ error: 'Failed to seed service prices' }, { status: 500 });
  }
}