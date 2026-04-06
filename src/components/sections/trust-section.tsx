import { trustLogos } from "@/lib/site-data";

export function TrustSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold text-slate-600">Trusted by growth-focused companies</p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {trustLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <span className="text-xs font-semibold text-slate-600">{logo}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-700">
              <strong>400+</strong> projects delivered
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-700">
              <strong>98%</strong> client satisfaction
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-700">
              <strong>12+ years</strong> delivering excellence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
