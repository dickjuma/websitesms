#!/usr/bin/env node

/**
 * Service Price Seeding Utility
 * Use this script to manage service pricing data in the database
 *
 * Usage:
 * npm run seed-prices preview  # Show what will be seeded
 * npm run seed-prices seed     # Insert seed data
 * npm run seed-prices clear    # Clear all existing data
 */

const SEED_DATA = [
  {
    serviceName: 'Web Development',
    description: 'Custom websites and web applications with modern design and functionality.',
    monthlyPrice: 15000,
    oneTimePrice: 150000,
    category: 'Web Development',
    features: [
      { name: 'Responsive Design', monthly: true, onetime: true, custom: true },
      { name: 'SEO Optimization', monthly: true, onetime: true, custom: true },
      { name: 'Content Management', monthly: true, onetime: true, custom: true },
      { name: 'Contact Forms', monthly: true, onetime: true, custom: true },
      { name: 'Analytics Integration', monthly: true, onetime: false, custom: true },
      { name: 'E-commerce Features', monthly: false, onetime: true, custom: true },
      { name: 'Custom Functionality', monthly: false, onetime: true, custom: true },
      { name: 'Ongoing Maintenance', monthly: true, onetime: false, custom: true },
      { name: '24/7 Support', monthly: true, onetime: false, custom: true },
      { name: 'Training Included', monthly: false, onetime: true, custom: true }
    ]
  },
  {
    serviceName: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android platforms.',
    monthlyPrice: 25000,
    oneTimePrice: 300000,
    category: 'Mobile App Development',
    features: [
      { name: 'iOS & Android Apps', monthly: true, onetime: true, custom: true },
      { name: 'Cross-platform Support', monthly: true, onetime: true, custom: true },
      { name: 'App Store Deployment', monthly: false, onetime: true, custom: true },
      { name: 'Push Notifications', monthly: true, onetime: true, custom: true },
      { name: 'In-app Purchases', monthly: true, onetime: true, custom: true },
      { name: 'Offline Mode', monthly: true, onetime: true, custom: true },
      { name: 'API Integration', monthly: true, onetime: true, custom: true },
      { name: 'User Authentication', monthly: true, onetime: true, custom: true },
      { name: 'App Maintenance', monthly: true, onetime: false, custom: true },
      { name: 'Source Code Delivery', monthly: false, onetime: true, custom: true }
    ]
  },
  {
    serviceName: 'ERP Systems',
    description: 'Comprehensive enterprise resource planning solutions for business management.',
    monthlyPrice: 50000,
    oneTimePrice: 750000,
    category: 'ERP Systems',
    features: [
      { name: 'Financial Management', monthly: true, onetime: true, custom: true },
      { name: 'Inventory Control', monthly: true, onetime: true, custom: true },
      { name: 'HR Management', monthly: true, onetime: true, custom: true },
      { name: 'Sales & CRM', monthly: true, onetime: true, custom: true },
      { name: 'Reporting & Analytics', monthly: true, onetime: true, custom: true },
      { name: 'Multi-branch Support', monthly: true, onetime: true, custom: true },
      { name: 'User Role Management', monthly: true, onetime: true, custom: true },
      { name: 'Data Backup & Recovery', monthly: true, onetime: true, custom: true },
      { name: 'Mobile Access', monthly: true, onetime: true, custom: true },
      { name: '24/7 Technical Support', monthly: true, onetime: false, custom: true }
    ]
  },
  {
    serviceName: 'POS Systems',
    description: 'Point of sale solutions with KRA compliance and inventory management.',
    monthlyPrice: 20000,
    oneTimePrice: 250000,
    category: 'POS Systems',
    features: [
      { name: 'KRA eTIMS Compliance', monthly: true, onetime: true, custom: true },
      { name: 'Inventory Management', monthly: true, onetime: true, custom: true },
      { name: 'Sales Tracking', monthly: true, onetime: true, custom: true },
      { name: 'Receipt Printing', monthly: true, onetime: true, custom: true },
      { name: 'M-Pesa Integration', monthly: true, onetime: true, custom: true },
      { name: 'Barcode Scanning', monthly: true, onetime: true, custom: true },
      { name: 'Customer Management', monthly: true, onetime: true, custom: true },
      { name: 'Sales Reports', monthly: true, onetime: true, custom: true },
      { name: 'Multi-store Support', monthly: false, onetime: true, custom: true },
      { name: 'Ongoing Updates', monthly: true, onetime: false, custom: true }
    ]
  },
  {
    serviceName: 'School Management',
    description: 'Complete school management system for fee collection and administration.',
    monthlyPrice: 30000,
    oneTimePrice: 400000,
    category: 'School Management',
    features: [
      { name: 'Student Registration', monthly: true, onetime: true, custom: true },
      { name: 'Fee Management', monthly: true, onetime: true, custom: true },
      { name: 'Attendance Tracking', monthly: true, onetime: true, custom: true },
      { name: 'Exam Management', monthly: true, onetime: true, custom: true },
      { name: 'Grade Management', monthly: true, onetime: true, custom: true },
      { name: 'Parent Portal', monthly: true, onetime: true, custom: true },
      { name: 'Staff Management', monthly: true, onetime: true, custom: true },
      { name: 'Timetable Management', monthly: true, onetime: true, custom: true },
      { name: 'Library Management', monthly: false, onetime: true, custom: true },
      { name: 'Mobile App Access', monthly: true, onetime: true, custom: true }
    ]
  },
  {
    serviceName: 'Hospital Management',
    description: 'Healthcare management system for clinics and hospitals.',
    monthlyPrice: 40000,
    oneTimePrice: 550000,
    category: 'Hospital Management',
    features: [
      { name: 'Patient Registration', monthly: true, onetime: true, custom: true },
      { name: 'Appointment Scheduling', monthly: true, onetime: true, custom: true },
      { name: 'Electronic Health Records', monthly: true, onetime: true, custom: true },
      { name: 'Billing & Insurance', monthly: true, onetime: true, custom: true },
      { name: 'Pharmacy Management', monthly: true, onetime: true, custom: true },
      { name: 'Lab Management', monthly: true, onetime: true, custom: true },
      { name: 'Staff Scheduling', monthly: true, onetime: true, custom: true },
      { name: 'Reporting & Analytics', monthly: true, onetime: true, custom: true },
      { name: 'Multi-location Support', monthly: false, onetime: true, custom: true },
      { name: 'HIPAA Compliance', monthly: true, onetime: true, custom: true }
    ]
  },
  {
    serviceName: 'API Integrations',
    description: 'API development and system integration services.',
    monthlyPrice: 10000,
    oneTimePrice: 80000,
    category: 'API Integrations',
    features: [
      { name: 'API Development', monthly: true, onetime: true, custom: true },
      { name: 'Third-party Integrations', monthly: true, onetime: true, custom: true },
      { name: 'Payment Gateway Setup', monthly: true, onetime: true, custom: true },
      { name: 'Webhook Configuration', monthly: true, onetime: true, custom: true },
      { name: 'Data Synchronization', monthly: true, onetime: true, custom: true },
      { name: 'Security Implementation', monthly: true, onetime: true, custom: true },
      { name: 'Documentation', monthly: true, onetime: true, custom: true },
      { name: 'Testing & Validation', monthly: true, onetime: true, custom: true },
      { name: 'Maintenance & Updates', monthly: true, onetime: false, custom: true },
      { name: 'Performance Monitoring', monthly: true, onetime: false, custom: true }
    ]
  },
  {
    serviceName: 'Hotel Management',
    description: 'Complete hotel and restaurant management system.',
    monthlyPrice: 35000,
    oneTimePrice: 450000,
    category: 'Hotel Management',
    features: [
      { name: 'Room Booking System', monthly: true, onetime: true, custom: true },
      { name: 'Guest Management', monthly: true, onetime: true, custom: true },
      { name: 'Housekeeping Management', monthly: true, onetime: true, custom: true },
      { name: 'Restaurant POS', monthly: true, onetime: true, custom: true },
      { name: 'Billing & Invoicing', monthly: true, onetime: true, custom: true },
      { name: 'Staff Management', monthly: true, onetime: true, custom: true },
      { name: 'Inventory Control', monthly: true, onetime: true, custom: true },
      { name: 'Reporting & Analytics', monthly: true, onetime: true, custom: true },
      { name: 'Online Booking Integration', monthly: false, onetime: true, custom: true },
      { name: 'Mobile Check-in', monthly: true, onetime: true, custom: true }
    ]
  }
];

async function makeRequest(method, endpoint = '', body = null) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/service-prices${endpoint}`;

  try {
    const options = { method };
    if (body) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return false;
    }

    return data;
  } catch (error) {
    console.error('Request failed:', error.message);
    return false;
  }
}

async function preview() {
  console.log('📋 Preview of seed data that will be inserted:\n');
  SEED_DATA.forEach((item, index) => {
    console.log(`${index + 1}. ${item.serviceName}`);
    console.log(`   Category: ${item.category}`);
    console.log(`   Monthly: KSh ${item.monthlyPrice.toLocaleString()}`);
    console.log(`   One-time: KSh ${item.oneTimePrice.toLocaleString()}`);
    console.log(`   Description: ${item.description}\n`);
  });
}

async function seed() {
  console.log('🌱 Seeding service prices...');

  for (const priceData of SEED_DATA) {
    const result = await makeRequest('POST', '', priceData);
    if (!result) {
      console.error('❌ Failed to seed', priceData.serviceName);
      return;
    }
  }

  console.log('✅ Successfully seeded', SEED_DATA.length, 'service prices');
}

async function clear() {
  console.log('🗑️  Clearing existing service prices...');
  const result = await makeRequest('DELETE', '/seed');

  if (result) {
    console.log('✅ Successfully cleared', result.message);
  }
}

async function list() {
  console.log('📊 Current service prices in database:');
  const result = await makeRequest('GET');

  if (result && Array.isArray(result)) {
    if (result.length === 0) {
      console.log('No service prices found in database.');
      return;
    }

    result.forEach((item, index) => {
      console.log(`${index + 1}. ${item.serviceName}`);
      console.log(`   Category: ${item.category}`);
      console.log(`   Monthly: KSh ${item.monthlyPrice.toLocaleString()}`);
      console.log(`   One-time: KSh ${item.oneTimePrice.toLocaleString()}`);
      console.log(`   Updated: ${new Date(item.updatedAt).toLocaleDateString()}\n`);
    });
  }
}

const command = process.argv[2];

switch (command) {
  case 'preview':
    preview();
    break;
  case 'seed':
    seed();
    break;
  case 'clear':
    clear();
    break;
  case 'list':
    list();
    break;
  default:
    console.log(`
Service Price Seeding Utility

Usage:
  npm run seed-prices preview  # Show what will be seeded
  npm run seed-prices seed     # Insert seed data
  npm run seed-prices clear    # Clear all existing data
  npm run seed-prices list     # Show current data in database

Note: Make sure your Next.js server is running on localhost:3000
    `);
}