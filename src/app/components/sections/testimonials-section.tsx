import { testimonials } from "@/lib/site-data";
import { Star } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 md:px-6 py-12 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Client Feedback</p>
          <h2 className="mt-4 md:mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-slate-600">
            Don&apos;t just take our word for it. Hear from some of our most valued partners.
          </p>
        </div>

        <div className="grid gap-5 md:gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition"
            >
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-base md:text-lg font-medium leading-relaxed text-slate-900 mb-4 md:mb-6 italic">
                <span aria-hidden="true">&ldquo;</span>
                {testimonial.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>

              <div className="border-t border-slate-200 pt-4 md:pt-6 flex items-center gap-4">
                {testimonial.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 font-semibold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-950">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 md:px-8 py-5 md:py-6 text-center">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            Average Rating
          </p>
          <div className="mt-2 md:mt-3 flex items-center justify-center gap-2">
            <span className="text-3xl md:text-4xl font-bold text-slate-950">4.9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 md:h-6 w-5 md:w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600">Based on 50+ client partnerships</p>
        </div>
      </div>
    </section>
  );
}
