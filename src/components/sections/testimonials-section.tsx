import { testimonials } from "@/lib/site-data";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Client Feedback</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Don&apos;t just take our word for it. Hear from some of our most valued partners.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg font-medium leading-relaxed text-slate-900 mb-6 italic">
                <span aria-hidden="true">&ldquo;</span>
                {testimonial.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>

              {/* Author */}
              <div className="border-t border-slate-200 pt-6">
                <p className="font-semibold text-slate-950">{testimonial.author}</p>
                <p className="text-sm text-slate-600">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust metric */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6 text-center">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            Average Rating
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-slate-950">4.9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600">Based on 50+ client partnerships</p>
        </div>
      </div>
    </section>
  );
}
