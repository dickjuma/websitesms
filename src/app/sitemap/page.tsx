import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { kenyanCounties } from "@/lib/location-seo/counties";
import { coreServices } from "@/lib/kenya-programmatic-seo";

export const metadata = {
  title: "Sitemap | SMA Systems",
  description: "All pages and resources available on SMA Systems website.",
};

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Book Demo", href: "/book-demo" },
];

const serviceLinks = coreServices.map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
}));

export default function SitemapPage() {
  const countiesByRegion = kenyanCounties.reduce((acc, county) => {
    if (!acc[county.region]) acc[county.region] = [];
    acc[county.region].push(county);
    return acc;
  }, {} as Record<string, typeof kenyanCounties>);

  return (
    <SiteShell hideFooter>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-stone-900">Sitemap</h1>
        <p className="mt-2 text-stone-600">All available pages on SMA Systems - Kenya.</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Main Pages</h2>
            <ul className="mt-4 space-y-2">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-600 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900">Services</h2>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-600 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="sm:col-span-2">
            <h2 className="text-lg font-semibold text-stone-900">Kenya Locations</h2>
            <p className="mt-2 text-sm text-stone-500">
              IT services available in all 47 Kenyan counties.
            </p>
            {Object.entries(countiesByRegion).map(([region, counties]) => (
              <div key={region} className="mt-6">
                <h3 className="text-sm font-semibold text-stone-700">{region} Region</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {counties.map((county) => (
                    <li key={county.slug}>
                      <Link
                        href={`/kenya/${county.slug}`}
                        className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50"
                      >
                        {county.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
