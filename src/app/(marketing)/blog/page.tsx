export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories } from '@/lib/blog';
import { getSiteInfoSettings } from '@/lib/site-settings';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ArrowRight, Search, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog – Expert Insights on Software Development, AI & Tech | SMA Systems Kenya',
  description: 'Read expert insights on software development, AI solutions, cloud computing, ERP systems, and digital transformation for Kenyan and African businesses.',
  keywords: ['software development blog', 'AI insights Kenya', 'tech articles Africa', 'cloud computing guides', 'ERP implementation tips', 'digital transformation Africa', 'mobile app development', 'enterprise software Kenya'],
  openGraph: {
    title: 'Blog – Expert Insights on Software Development, AI & Tech | SMA Systems Kenya',
    description: 'Read expert insights on software development, AI, and digital transformation for African businesses.',
    type: 'website',
    url: 'https://smassystems.com/blog',
    siteName: 'SMA Systems',
  },
  alternates: {
    canonical: 'https://smassystems.com/blog',
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const page = parseInt(params.page || '1');
  const limit = 12;
  const skip = (page - 1) * limit;

  const [{ posts, total }, categories, siteInfo] = await Promise.all([
    getBlogPosts({ status: 'published', category, search, limit, skip }),
    getBlogCategories(),
    getSiteInfoSettings(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const companyName = siteInfo.companyName || 'SMA Systems';

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section – flat, solid */}
      <section aria-labelledby="blog-hero-title" className="border-b border-slate-200 bg-slate-900 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {total} Articles Published
            </p>
            <h1 id="blog-hero-title" className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Insights & <span className="text-blue-400">Articles</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300 max-w-2xl">
              Expert perspectives on software development, AI, cloud computing, and digital transformation for modern businesses in Kenya and Africa.
            </p>
          </div>

          {/* Search form */}
          <div className="mt-8 max-w-xl">
            <form method="GET" className="relative" role="search">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-11 pr-28 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Filter – flat, sticky */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav aria-label="Blog categories" className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            <Link
              href="/blog"
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !category
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === cat.slug
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">({cat.postCount})</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-slate-200 bg-slate-50">
              <Search className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">No articles found</h2>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or browse all categories.</p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View All Posts
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post._id.toString()}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  {post.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {Math.ceil((post.content?.length || 1000) / 1000)} min read
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                      <div className="flex items-center gap-2">
                        {post.author.image ? (
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-medium text-slate-700">{post.author.name}</span>
                      </div>
                       <time className="text-slate-400" dateTime={(post.publishedAt || post.createdAt).toISOString().split('T')[0]}>
                         {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                       </time>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="border-t border-slate-200 bg-slate-50 py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <nav aria-label="Pagination" className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                    className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    ← Previous
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;
                    const isActive = pageNum === page;
                    return (
                      <Link
                        key={pageNum}
                        href={`/blog?page=${pageNum}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>
                {page < totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                    className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    Next →
                  </Link>
                )}
              </div>
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages} • {total} total articles
              </p>
            </nav>
          </div>
        </section>
      )}

      {/* Newsletter CTA – flat, solid */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Stay Updated with Our Latest Insights</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
            Get the latest articles, tutorials, and insights delivered directly to your inbox. No spam, just valuable content.
          </p>
          <form
            method="POST"
            action="/api/newsletter"
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
