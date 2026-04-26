import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, MessageCircle } from "lucide-react";
import { blogPreview } from "@/lib/site-data";

export function BlogPreviewSection() {
  const featuredPost = blogPreview[0];
  const regularPosts = blogPreview.slice(1);

  return (
    <section
      aria-labelledby="blog-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10 text-center md:mb-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Insights & Updates
        </p>
        <h2
          id="blog-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
        >
          Latest from the Blog
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Expert insights, industry trends, and best practices from our team –
          tailored for Kenyan businesses.
        </p>
      </div>

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-10 md:mb-16">
          <Link href={featuredPost.href} className="group block">
            <article className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md md:grid-cols-2 md:gap-8 md:p-6 md:p-8">
              {/* Content column */}
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 md:gap-4 md:text-sm">
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 md:px-3">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="hidden items-center gap-1 sm:flex">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>8 min read</span>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950 transition group-hover:text-blue-700 md:mt-6 md:text-2xl lg:text-3xl">
                  {featuredPost.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:mt-4 md:text-base">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 md:mt-6 md:pt-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white md:h-10 md:w-10 md:text-sm">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 md:text-base">
                        {featuredPost.author}
                      </p>
                      <p className="text-xs text-slate-500 md:text-sm">
                        Senior Technical Writer
                      </p>
                    </div>
                  </div>
                  <div className="hidden items-center gap-3 text-slate-500 md:flex">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm">12 comments</span>
                  </div>
                </div>
              </div>

              {/* Image placeholder - flat, no gradient */}
              <div className="relative hidden h-48 overflow-hidden rounded-xl bg-blue-100 md:block md:h-64">
                <div className="absolute inset-0 flex items-center justify-center text-blue-300">
                  <svg
                    className="h-16 w-16 md:h-20 md:w-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H17"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* Regular posts - semantic list */}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {regularPosts.map((post, index) => (
          <li key={index}>
            <Link href={post.href} className="group block">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 md:px-3">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="mt-3 text-base font-semibold text-slate-950 transition group-hover:text-blue-700 md:mt-4 md:text-xl">
                  {post.title}
                </h3>

                <p className="mt-2 flex-grow text-xs leading-relaxed text-slate-600 md:mt-3 md:text-sm">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 md:mt-6 md:pt-6">
                  <div className="flex items-center gap-1 text-xs text-slate-500 md:gap-2 md:text-sm">
                    <User className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 md:gap-3">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span className="text-xs">5 min read</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-blue-700 transition group-hover:translate-x-1 md:h-4 md:w-4"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {/* View all button */}
      <div className="mt-10 text-center md:mt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-6 md:py-3"
          aria-label="View all blog articles"
        >
          View All Articles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
