# Service Price Seeding Guide

This guide explains how to manage the dynamic pricing system for your Next.js application.

## Overview

The system uses a `ServicePrice` collection in MongoDB with the following structure:
- `serviceName`: Display name of the service
- `description`: Brief description of what the service offers
- `monthlyPrice`: Monthly subscription price in KES
- `oneTimePrice`: One-time purchase price in KES
- `category`: Service category for grouping
- `updatedAt`: Automatic timestamp of last update

## Seeding Commands

Use the built-in npm script to manage pricing data:

```bash
# Preview what will be seeded
npm run seed-prices preview

# Seed the database with sample data
npm run seed-prices seed

# List current prices in database
npm run seed-prices list

# Clear all existing pricing data
npm run seed-prices clear
```

## Sample Data Included

The seeding includes pricing for 8 core services:

1. **Web Development** - KSh 15,000/mo, KSh 150,000 one-time
2. **Mobile App Development** - KSh 25,000/mo, KSh 300,000 one-time
3. **ERP Systems** - KSh 50,000/mo, KSh 750,000 one-time
4. **POS Systems** - KSh 20,000/mo, KSh 250,000 one-time
5. **School Management** - KSh 30,000/mo, KSh 400,000 one-time
6. **Hospital Management** - KSh 40,000/mo, KSh 550,000 one-time
7. **API Integrations** - KSh 10,000/mo, KSh 80,000 one-time
8. **Hotel Management** - KSh 35,000/mo, KSh 450,000 one-time

## Admin Interface

Visit `/admin/service-prices` to manage pricing through the web interface:

- **Add new prices** with the "Add Price" button
- **Edit existing prices** by clicking the edit icon
- **Delete prices** using the delete icon
- All changes are automatically audited

## API Endpoints

- `GET /api/service-prices` - Fetch all prices
- `POST /api/service-prices` - Create new price
- `PUT /api/service-prices/[id]` - Update price
- `DELETE /api/service-prices/[id]` - Delete price
- `POST /api/service-prices/seed` - Seed database
- `DELETE /api/service-prices/seed` - Clear database

## Client Integration

The pricing page (`/pricing`) automatically fetches and displays prices using SWR for caching and real-time updates every 30 seconds.

## Audit Logging

All price changes are logged in the `price_change_audits` collection, tracking:
- What changed (create/update/delete)
- Old vs new values
- Timestamp and user information

## Customization

To modify the seed data, edit the `SEED_DATA` array in `scripts/seed-prices.mjs` and run:

```bash
npm run seed-prices clear  # Clear existing data
npm run seed-prices seed   # Insert updated data
```