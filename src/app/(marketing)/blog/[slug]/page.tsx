export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, ChevronLeft, Share2, Link as LinkIcon } from 'lucide-react';
import { getBlogPostBySlug, getRecentBlogPosts, getBlogCategories } from '@/lib/blog';
import { getSiteInfoSettings } from '@/lib/site-settings';


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | SMAS Systems',
      description: 'The requested blog post could not be found.',
    };
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | SMAS Systems Blog`;
  const metaDesc = post.seo?.metaDescription || post.excerpt;
  const canonicalUrl = `https://smassystems.com/blog/${post.slug}`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      type: 'article',
      url: canonicalUrl,
      siteName: 'SMAS Systems',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name],
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: post.coverImage ? [post.coverImage] : [],
    },
    other: {
      'article:published_time': post.publishedAt?.toISOString() || '',
      'article:modified_time': post.updatedAt?.toISOString() || '',
      'article:author': post.author.name,
      'article:section': post.category,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [recentPosts, categories, siteInfo] = await Promise.all([
    getRecentBlogPosts(5),
    getBlogCategories(),
    getSiteInfoSettings(),
  ]);

  const companyName = siteInfo.companyName || 'SMAS Systems';
  const readTime = Math.ceil(post.content.length / 1000) || 5;
  const shareUrl = `https://smassystems.com/blog/${post.slug}`;

  return (
    <main className='min-h-screen bg-white'>
      {/* Back Navigation */}
      <div className='border-b border-slate-200 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-40'>
        <div className='mx-auto max-w-4xl px-4 py-3 md:px-8'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className='py-8 md:py-12'>
        <div className='mx-auto max-w-4xl px-4 md:px-8'>
          {/* Breadcrumb */}
          <div className='flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-6'>
            <Link href='/blog' className='hover:text-blue-600'>Blog</Link>
            <span>/</span>
            <span className='font-medium text-blue-600'>{post.category}</span>
          </div>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight'>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className='mt-4 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl'>
              {post.excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className='mt-8 flex flex-wrap items-center gap-6'>
            {/* Author */}
            <div className='flex items-center gap-3'>
              {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className='rounded-full'
                />
              ) : (
                <div className='w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg'>
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className='font-semibold text-slate-900'>{post.author.name}</p>
                <p className='text-sm text-slate-500'>{companyName}</p>
              </div>
            </div>

            {/* Separator */}
            <div className='hidden sm:block w-px h-10 bg-slate-200' />

            {/* Date & Read Time */}
            <div className='flex items-center gap-4 text-sm text-slate-500'>
              <span className='flex items-center gap-1.5'>
                <Calendar className='w-4 h-4' />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className='flex items-center gap-1.5'>
                <Clock className='w-4 h-4' />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className='mt-6 flex items-center gap-3'>
            <span className='text-sm font-medium text-slate-500'>Share:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition'
              title='Share on Facebook'
            >
              <Share2 className='w-4 h-4' />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg bg-sky-100 text-sky-600 hover:bg-sky-200 transition'
              title='Share on Twitter'
            >
              <Share2 className='w-4 h-4' />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition'
              title='Share on LinkedIn'
            >
              <Share2 className='w-4 h-4' />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
              }}
              className='p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition'
              title='Copy Link'
            >
              <LinkIcon className='w-4 h-4' />
            </button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className='mx-auto max-w-5xl px-4 md:px-8'>
          <div className='relative aspect-[2/1] overflow-hidden rounded-2xl shadow-xl'>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className='object-cover'
              priority
              sizes='(max-width: 1024px) 100vw, 1200px'
              unoptimized
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className='mx-auto max-w-4xl px-4 py-10 md:px-8'>
        <article 
          className='prose prose-slate prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-headings:mt-12 prose-headings:mb-4
            prose-p:text-slate-700 prose-p:leading-loose
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:text-blue-600 prose-code:font-medium
            prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:marker:text-blue-500
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:marker:text-blue-500
            prose-li:text-slate-700 prose-li:leading-relaxed
            prose-hr:border-slate-200 prose-hr:my-12'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className='mt-12 pt-8 border-t border-slate-200'>
            <h3 className='text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4'>Tags</h3>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${tag}`}
                  className='px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors'
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Related Posts */}
      {recentPosts.filter(p => p._id.toString() !== post._id.toString()).length > 0 && (
        <section className='border-t border-slate-200 bg-slate-50/50 py-16'>
          <div className='mx-auto max-w-5xl px-4 md:px-8'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-slate-900'>Related Articles</h2>
              <Link
                href='/blog'
                className='text-blue-600 font-medium hover:underline'
              >
                View All →
              </Link>
            </div>
            <div className='grid gap-6 md:grid-cols-3'>
              {recentPosts
                .filter(p => p._id.toString() !== post._id.toString())
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost._id.toString()}
                    href={`/blog/${relatedPost.slug}`}
                    className='group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300'
                  >
                    {relatedPost.coverImage && (
                      <div className='relative aspect-video overflow-hidden'>
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          className='object-cover transition duration-500 group-hover:scale-105'
                          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          unoptimized
                        />
                      </div>
                    )}
                    <div className='p-5'>
                      <div className='text-xs font-semibold text-blue-600 mb-2'>
                        {relatedPost.category}
                      </div>
                      <h3 className='font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight'>
                        {relatedPost.title}
                      </h3>
                      <p className='mt-2 text-xs text-slate-500'>
                        {new Date(relatedPost.publishedAt || relatedPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className='py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'>
        <div className='mx-auto max-w-4xl px-4 md:px-8 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
            Ready to Build Something Great?
          </h2>
          <p className='text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed'>
            Let&apos;s discuss your project and how we can help bring your vision to life with custom software solutions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 font-semibold text-slate-900 hover:bg-blue-50 transition-colors'
            >
              Get in Touch
            </Link>
            <Link
              href='/services'
              className='inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors'
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
