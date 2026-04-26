import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";
import type {
  CountyHubPageData,
  DirectoryPageData,
  LinkCard,
  ServicePageData,
} from "@/lib/kenya-programmatic-seo";

function JsonLdScripts({ items }: { items: Array<Record<string, unknown>> }) {
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

function LinkCardGrid({ cards }: { cards: LinkCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-green-300 hover:shadow-lg"
        >
          {card.image && (
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
          )}
          {card.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green-700">
              {card.eyebrow}
            </p>
          )}
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-green-700">
            {card.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{card.description}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-green-700 group-hover:text-green-800">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CountyHubPage({ page }: { page: CountyHubPageData }) {
  return (
    <SiteShell>
      <JsonLdScripts items={page.jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {page.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow={page.eyebrow}
              title={page.introTitle}
              description=""
            />
            {page.introParagraphs.map((paragraph, index) => (
              <p key={index} className="mt-6 text-lg leading-8 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {page.trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">✓</div>
                  <p className="mt-2 text-sm text-gray-600">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Services"
              title={page.servicesSection.title}
              description={page.servicesSection.description}
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <LinkCardGrid cards={page.servicesSection.cards} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="FAQ"
              title={page.faqTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              {page.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={page.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {page.primaryCtaLabel}
              </a>
              <Link
                href={page.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                {page.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export function ServicePage({ page }: { page: ServicePageData }) {
  return (
    <SiteShell>
      <JsonLdScripts items={page.jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-0">
                {page.heroSubtitle}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={page.image}
                alt={page.heroTitle}
                className="w-full max-w-md h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow={page.eyebrow}
              title={page.introTitle}
              description=""
            />
            {page.introParagraphs.map((paragraph, index) => (
              <p key={index} className="mt-6 text-lg leading-8 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
              {page.trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">✓</div>
                  <p className="mt-2 text-sm text-gray-600">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Benefits"
              title={page.benefitsTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid gap-4 md:grid-cols-2">
              {page.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Features"
              title={page.featuresTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {page.features.map((feature, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Industries"
              title={page.industriesTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {page.industries.map((industry, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-gray-700">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Process"
              title={page.processTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="FAQ"
              title={page.faqTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              {page.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Link Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Related Services"
              title={page.linkSection.title}
              description={page.linkSection.description}
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <LinkCardGrid cards={page.linkSection.cards} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={page.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {page.primaryCtaLabel}
              </a>
              <Link
                href={page.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                {page.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export function DirectoryPage({ page }: { page: DirectoryPageData }) {
  return (
    <SiteShell>
      <JsonLdScripts items={page.jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {page.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {page.sections?.map((section, index) => (
        <section key={index} className={`py-16 sm:py-20 lg:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <SectionTitle
                eyebrow={section.eyebrow || ""}
                title={section.title}
                description={section.description}
              />
            </div>
            <div className="mx-auto max-w-5xl">
              <LinkCardGrid cards={section.cards} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-green-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.ctaTitle || "Ready to Transform Your Business?"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
              {page.ctaDescription || "Contact our team today to discuss your software requirements."}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={page.primaryCtaHref || "https://wa.me/254719832719"}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-green-600 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {page.primaryCtaLabel || "Get Free Consultation"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

// Constituency Hub Page Component
export function ConstituencyHubPage({ page }: { page: CountyHubPageData }) {
  return (
    <SiteShell>
      <JsonLdScripts items={page.jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {page.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow={page.eyebrow}
              title={page.introTitle}
              description=""
            />
            {page.introParagraphs.map((paragraph, index) => (
              <p key={index} className="mt-6 text-lg leading-8 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {page.trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">✓</div>
                  <p className="mt-2 text-sm text-gray-600">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Services"
              title={page.servicesSection.title}
              description={page.servicesSection.description}
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <LinkCardGrid cards={page.servicesSection.cards} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="FAQ"
              title={page.faqTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              {page.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={page.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {page.primaryCtaLabel}
              </a>
              <Link
                href={page.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                {page.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

// Constituency Service Page Component
export function ConstituencyServicePage({ page }: { page: ServicePageData }) {
  return (
    <SiteShell>
      <JsonLdScripts items={page.jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-0">
                {page.heroSubtitle}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={page.image}
                alt={page.heroTitle}
                className="w-full max-w-md h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow={page.eyebrow}
              title={page.introTitle}
              description=""
            />
            {page.introParagraphs.map((paragraph, index) => (
              <p key={index} className="mt-6 text-lg leading-8 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
              {page.trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">✓</div>
                  <p className="mt-2 text-sm text-gray-600">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Benefits"
              title={page.benefitsTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid gap-4 md:grid-cols-2">
              {page.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Features"
              title={page.featuresTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {page.features.map((feature, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Industries"
              title={page.industriesTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {page.industries.map((industry, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-gray-700">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Process"
              title={page.processTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="FAQ"
              title={page.faqTitle}
              description=""
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              {page.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Link Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Related Services"
              title={page.linkSection.title}
              description={page.linkSection.description}
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <LinkCardGrid cards={page.linkSection.cards} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={page.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {page.primaryCtaLabel}
              </a>
              <Link
                href={page.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                {page.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}