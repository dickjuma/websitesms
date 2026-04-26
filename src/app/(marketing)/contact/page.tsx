export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import { getSiteInfoSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch | SMA Systems Kenya",
  description: "Contact SMA Systems for custom software development, ERP systems, and web development services in Kenya. Reach our Nairobi office for a free consultation.",
  keywords: ["contact SMA Systems", "contact software company Kenya", "get in touch", "Nairobi software company", "consultation"],
  openGraph: {
    title: "Contact Us | Get in Touch | SMA Systems Kenya",
    description: "Contact SMA Systems for custom software development services in Kenya.",
  },
};

export default async function ContactPage() {
  let settings;
  try {
    settings = await getSiteInfoSettings();
  } catch (error) {
    console.warn("Failed to load site settings:", error);
    settings = {
      email: "hello@smassystems.com",
      salesEmail: "sales@smassystems.com",
      phone: "+254 719 832 719",
      address: "Nairobi, Kenya",
      workingHours: "Mon-Fri: 9AM-6PM EAT",
      supportEmail: "support@smassystems.com",
      socialLinks: {},
    };
  }

  const socialEntries = Object.entries(settings.socialLinks || {}).filter(([, value]) => value);

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section – flat, no gradient or blur */}
        <section aria-labelledby="contact-hero-title" className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Contact SMA</p>
              <h1 id="contact-hero-title" className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                Clear answers, direct contacts, and fast follow‑up.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Reach our team for project scoping, quotes, support, or a deeper technical conversation.
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {["AI‑guided chat", "Lead capture ready", "Human follow‑up enabled"].map((item) => (
                  <li key={item} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Main content – contact form and details */}
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Contact Form */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-950">Send a message</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Use the form for new projects, quote requests, support questions, or introductions.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Direct channels */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">Direct channels</h2>
                <ul className="mt-5 space-y-3">
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Primary email</p>
                        <p className="mt-1 font-medium text-slate-900">{settings.email}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${settings.salesEmail}`}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sales &amp; quotes</p>
                        <p className="mt-1 font-medium text-slate-900">{settings.salesEmail}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                        <p className="mt-1 font-medium text-slate-900">{settings.phone}</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Business details */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">Business details</h2>
                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <address className="not-italic text-sm text-slate-700">{settings.address}</address>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-slate-900">Working hours</p>
                      <p className="text-sm text-slate-700">{settings.workingHours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-slate-900">Support channel</p>
                      <p className="text-sm text-slate-700">{settings.supportEmail}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social links (if any) */}
              {socialEntries.length > 0 && (
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950">Social links</h2>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {socialEntries.map(([key, value]) => (
                      <li key={key}>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <img 
                            src={`/${key === 'tiktok' ? 'tik-tok' : key}.png`} 
                            alt={key}
                            className="h-6 w-6 object-contain"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
