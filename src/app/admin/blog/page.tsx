'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}


export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);
      
      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>Blog Posts</h1>
          <p className='text-slate-600'>Manage your blog content</p>
        </div>
        <Link
          href='/admin/blog/new'
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
        >
          <Plus className='w-4 h-4' />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
          <input
            type='text'
            placeholder='Search posts...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className='px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500'
        >
          <option value='all'>All Status</option>
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
          <option value='archived'>Archived</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className='bg-white rounded-xl border border-slate-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='text-left px-4 py-3 text-sm font-medium text-slate-600'>Title</th>
                <th className='text-left px-4 py-3 text-sm font-medium text-slate-600'>Category</th>
                <th className='text-left px-4 py-3 text-sm font-medium text-slate-600'>Status</th>
                <th className='text-left px-4 py-3 text-sm font-medium text-slate-600'>Views</th>
                <th className='text-left px-4 py-3 text-sm font-medium text-slate-600'>Date</th>
                <th className='text-right px-4 py-3 text-sm font-medium text-slate-600'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='px-4 py-8 text-center text-slate-500'>
                    Loading...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-4 py-8 text-center text-slate-500'>
                    No posts found
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className='hover:bg-slate-50'>
                    <td className='px-4 py-3'>
                      <div className='font-medium text-slate-900 truncate max-w-xs'>
                        {post.title}
                      </div>
                      <div className='text-sm text-slate-500 truncate max-w-xs'>
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {post.category}
                    </td>
                    <td className='px-4 py-3'>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' ? 'bg-green-100 text-green-700' :
                        post.status === 'archived' ? 'bg-slate-100 text-slate-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {post.viewCount}
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center justify-end gap-1'>
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target='_blank'
                            className='p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg'
                            title='View'
                          >
                            <Eye className='w-4 h-4' />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post._id}/edit`}
                          className='p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg'
                          title='Edit'
                        >
                          <Edit className='w-4 h-4' />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg'
                          title='Delete'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}