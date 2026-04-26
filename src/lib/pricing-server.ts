import { getPricingServices as dbGetPricingServices, getPricingServiceBySlug as dbGetPricingServiceBySlug, getAllServicePrices } from '@/lib/database';
import { PRICING_SERVICES, PricingService } from '@/lib/pricing-types';
import { ServicePrice } from '@/lib/database';

export async function getPricingServices(): Promise<PricingService[]> {
  try {
    console.log('Fetching services from database...');
    // Fetch all services
    const services = await dbGetPricingServices();
    console.log('Services fetched:', services?.length || 0);
    return services || [];
  } catch (error) {
    console.warn('Failed to fetch pricing services:', error);
    // Return empty array as fallback
    return [];
  }
}

export async function getServicePrices(): Promise<ServicePrice[]> {
  try {
    console.log('Fetching service prices from database...');
    const prices = await getAllServicePrices();
    console.log('Service prices fetched:', prices?.length || 0);
    return prices || [];
  } catch (error) {
    console.warn('Failed to fetch service prices:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<PricingService | undefined> {
  try {
    const service = await dbGetPricingServiceBySlug(slug);
    return service || undefined;
  } catch (error) {
    console.warn('Failed to fetch pricing service:', error);
    return undefined;
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await getPricingServices();
    return services.map(service => service.slug);
  } catch (error) {
    console.warn('Failed to fetch service slugs, using fallback:', error);
    return ['web-development', 'mobile-apps'];
  }
}
