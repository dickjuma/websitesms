import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/database';

export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  _id: string | ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    image?: string;
  };
  category: string;
  tags: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  status: BlogStatus;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

export interface BlogCategory {
  _id: string | ObjectId;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface GetBlogPostsOptions {
  status?: BlogStatus | 'all';
  category?: string;
  limit?: number;
  skip?: number;
  search?: string;
}

export async function getBlogPosts(options?: GetBlogPostsOptions): Promise<{
  posts: BlogPost[];
  total: number;
}> {
  try {
    const { db } = await connectToDatabase();
    
    const query: Record<string, unknown> = {};
    
    if (options?.status && options.status !== 'all') {
      query.status = options.status;
    }
    
    if (options?.category) {
      query.category = options.category;
    }
    
    if (options?.search) {
      query.$or = [
        { title: { $regex: options.search, $options: 'i' } },
        { excerpt: { $regex: options.search, $options: 'i' } },
      ];
    }

    const limit = options?.limit || 10;
    const skip = options?.skip || 0;

    const [posts, total] = await Promise.all([
      db
        .collection<BlogPost>('blogs')
        .find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection<BlogPost>('blogs').countDocuments(query),
    ]);

    return { posts, total };
  } catch (error) {
    console.warn('Database unavailable, returning empty blog posts:', error);
    return { posts: [], total: 0 };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    
    const post = await db
      .collection<BlogPost>('blogs')
      .findOne({ slug, status: 'published' });

    if (post) {
      await db.collection<BlogPost>('blogs').updateOne(
        { _id: post._id },
        { $inc: { viewCount: 1 } }
      );
    }

    return post;
  } catch (error) {
    console.warn('Database unavailable:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    
    try {
      const objectId = new ObjectId(id);
      return await db.collection<BlogPost>('blogs').findOne({ _id: objectId });
    } catch {
      return null;
    }
  } catch (error) {
    console.warn('Database unavailable:', error);
    return null;
  }
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  try {
    const { db } = await connectToDatabase();
    
    const now = new Date();
    const post: Omit<BlogPost, '_id'> = {
      title: data.title || 'Untitled',
      slug: data.slug || generateSlug(data.title || 'Untitled'),
      excerpt: data.excerpt || '',
      content: data.content || '',
      coverImage: data.coverImage || '',
      author: data.author || { name: 'Admin' },
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      seo: data.seo || {},
      status: data.status || 'draft',
      publishedAt: data.status === 'published' ? now : undefined,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
    };

    const result = await db.collection<BlogPost>('blogs').insertOne(post as BlogPost);
    
    return { ...post, _id: result.insertedId };
  } catch (error) {
    console.warn('Database unavailable:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    
    try {
      const objectId = new ObjectId(id);
      
      const updateFields: Record<string, unknown> = {
        ...data,
        updatedAt: new Date(),
      };

      if (data.status === 'published' && !data.publishedAt) {
        updateFields.publishedAt = new Date();
      }

      await db.collection<BlogPost>('blogs').updateOne(
        { _id: objectId },
        { $set: updateFields }
      );

      return await getBlogPostById(id);
    } catch {
      return null;
    }
  } catch (error) {
    console.warn('Database unavailable:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    
    try {
      const objectId = new ObjectId(id);
      const result = await db.collection<BlogPost>('blogs').deleteOne({ _id: objectId });
      return result.deletedCount === 1;
    } catch {
      return false;
    }
  } catch (error) {
    console.warn('Database unavailable:', error);
    return false;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { db } = await connectToDatabase();
    
    const categories = await db.collection<BlogPost>('blogs').aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]).toArray();

    return categories.map((cat) => ({
      _id: cat._id,
      name: cat._id,
      slug: generateSlug(cat._id as string),
      postCount: cat.count,
    }));
  } catch (error) {
    console.warn('Database unavailable:', error);
    return [];
  }
}

export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  try {
    const { db } = await connectToDatabase();
    
    return db
      .collection<BlogPost>('blogs')
      .find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();
  } catch (error) {
    console.warn('Database unavailable:', error);
    return [];
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}