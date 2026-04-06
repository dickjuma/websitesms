import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, MessageCircle } from "lucide-react";
import { blogPreview } from "@/lib/site-data";

export function BlogPreviewSection() {
  // Assuming the first item is the featured post, or we can take a separate featured field
  const featuredPost = blogPreview[0];
  const regularPosts = blogPreview.slice(1);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Insights & Updates
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Latest from the Blog
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Expert insights, industry trends, and best practices from our team.
        </p>
      </div>

      {/* Featured Post - Large Card */}
      {featuredPost && (
        <Link href={featuredPost.href} className="group block mb-16">
          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-xl md:grid-cols-2 md:p-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {featuredPost.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  8 min read
                </div>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-950 group-hover:text-blue-700 transition md:text-3xl">
                {featuredPost.title}
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{featuredPost.author}</p>
                    <p className="text-sm text-slate-500">Senior Technical Writer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">12 comments</span>
                </div>
              </div>
            </div>
            <div className="relative hidden h-64 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 md:block">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-blue-400">
                <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H17" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Regular Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {regularPosts.map((post, i) => (
          <Link key={i} href={post.href} className="group block">
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-xl">
              {/* Category and metadata */}
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-blue-700 transition">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 flex-grow text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author and read time */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">5 min read</span>
                  <ArrowRight className="h-4 w-4 text-blue-700 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
        >
          View All Articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
