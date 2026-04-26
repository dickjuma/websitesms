'use client';

import { use } from 'react';
import { BlogEditor } from '@/components/admin/blog/blog-editor';

export default function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BlogEditor postId={id} />;
}