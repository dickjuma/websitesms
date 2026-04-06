import { ArrowUpRight, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import { getSiteInfoSettings } from "@/lib/site-settings";

export default async function ContactPage() {
  const settings = await getSiteInfoSettings();
  const socialEntries = Object.entries(settings.socialLinks || {}).filter(([, value]) => value);

  return (
    <SiteShell>
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),radial-gradient(circle_at_bottom_right,#e0f2fe,transparent_26%),linear-gradient(180deg,#f8fbff,#ffffff)]">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-sky-700 backdrop-blur">
              Contact SMA
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Clear answers, direct contacts, and fast follow-up.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Reach our team for project scoping, quotes, support, or a deeper technical conversation. The details below are managed from your admin workspace, so this page stays aligned with the real business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["AI-guided chat", "Lead capture ready", "Human follow-up enabled"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-slate-950">Send a message</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use the form for new projects, quote requests, support questions, or introductions.
              </p>
            </div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Direct channels</h2>
              <div className="mt-6 space-y-4">
                <a href={`mailto:${settings.email}`} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50">
                  <Mail className="mt-1 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Primary email</p>
                    <p className="mt-1 font-medium text-slate-900">{settings.email}</p>
                  </div>
                </a>
                <a href={`mailto:${settings.salesEmail}`} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50">
                  <ArrowUpRight className="mt-1 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sales & quotes</p>
                    <p className="mt-1 font-medium text-slate-900">{settings.salesEmail}</p>
                  </div>
                </a>
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50">
                  <Phone className="mt-1 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</p>
                    <p className="mt-1 font-medium text-slate-900">{settings.phone}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Business details</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Address</p>
                    <p>{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Working hours</p>
                    <p>{settings.workingHours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-sky-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Support channel</p>
                    <p>{settings.supportEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {socialEntries.length > 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950">Social links</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialEntries.map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                    >
                      {key}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
