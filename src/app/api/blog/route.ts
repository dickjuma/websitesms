import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, createBlogPost, getBlogCategories } from '@/lib/blog';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status') as 'draft' | 'published' | 'archived' | 'all' | null;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');

    if (searchParams.get('categories')) {
      const categories = await getBlogCategories();
      return NextResponse.json({ success: true, data: categories });
    }

    const result = await getBlogPosts({
      status: status || 'all',
      category,
      search,
      limit,
      skip,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    
    const post = await createBlogPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      author: body.author,
      category: body.category,
      tags: body.tags,
      seo: body.seo,
      status: body.status,
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}