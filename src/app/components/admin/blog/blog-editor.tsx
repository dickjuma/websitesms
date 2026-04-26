'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from './rich-text-editor';
import {
  ArrowLeft, Save, Eye, Trash2, Upload, X,
  Calendar, Clock, Image as ImageIcon, Link as LinkIcon,
  Share2, FileText,
  Sparkles, AlertCircle, CheckCircle, Loader2,
  Globe, Users, Tag, Hash, Plus, Minus, Settings
} from 'lucide-react';

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  galleryImages?: string[];
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonical?: string;
    noIndex?: boolean;
  };
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  featured?: boolean;
  readingTime?: number;
  views?: number;
  relatedPosts?: string[];
  socialImage?: string;
}

const defaultCategories = [
  'Technology', 'Software Development', 'AI & Machine Learning', 'Business',
  'Cloud & DevOps', 'Security', 'Mobile', 'Web Development', 'Startups', 'Data Science'
];

export function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showSocialPreview, setShowSocialPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const autoSaveTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    galleryImages: [],
    author: { name: 'Admin', bio: '' },
    category: 'Technology',
    tags: [],
    seo: {},
    status: 'draft',
    featured: false,
    readingTime: 0,
    views: 0,
  });
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${postId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setPost(data.data);
        calculateReadingTime(data.data.content);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const calculateReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    const minutes = Math.ceil(words / 200);
    setPost(prev => ({ ...prev, readingTime: minutes }));
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
    calculateReadingTime(content);

    // Auto-save draft every 30 seconds (only for existing posts)
    if (post._id && post.status === 'draft') {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => {
        autoSaveDraft();
      }, 30000);
    }
  };

  const autoSaveDraft = async () => {
    if (!post._id || post.status !== 'draft') return;
    setAutoSaveStatus('saving');
    try {
      const res = await fetch(`/api/blog/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status: 'draft' }),
      });
      if (res.ok) setAutoSaveStatus('saved');
      else setAutoSaveStatus('error');
    } catch {
      setAutoSaveStatus('error');
    }
  };

  const handleSave = async (status?: 'draft' | 'published' | 'scheduled') => {
    if (status === 'published' && wordCount < 500) {
      alert(`Content must be at least 500 words. Current: ${wordCount}`);
      return;
    }

    setSaving(true);
    try {
      const url = postId ? `/api/blog/${postId}` : '/api/blog';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status: status || post.status }),
      });

      const data = await res.json();
      if (data.success) {
        if (!postId && data.data?._id) {
          router.push(`/admin/blog/${data.data._id}/edit`);
        } else {
          router.push('/admin/blog');
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!postId || !confirm('Delete this post permanently?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
      if (res.ok) router.push('/admin/blog');
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const generateAiExcerpt = async () => {
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-excerpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: post.content.slice(0, 3000) }),
      });
      const data = await res.json();
      if (data.excerpt) setPost(prev => ({ ...prev, excerpt: data.excerpt }));
    } catch (error) {
      alert('AI generation failed');
    }
    setAiGenerating(false);
  };

  const generateAiTags = async () => {
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: post.content.slice(0, 2000), title: post.title }),
      });
      const data = await res.json();
      if (data.tags) setPost(prev => ({ ...prev, tags: [...new Set([...prev.tags, ...data.tags])] }));
    } catch (error) {
      alert('AI tag generation failed');
    }
    setAiGenerating(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setPost({ ...post, tags: post.tags.filter(t => t !== tag) });
  };

  const uploadImage = async (file: File, type: 'cover' | 'gallery') => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', type === 'cover' ? 'blog/covers' : 'blog/gallery');
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        if (type === 'cover') setPost({ ...post, coverImage: data.url });
        else setPost({ ...post, galleryImages: [...(post.galleryImages || []), data.url] });
      }
    } catch (err) {
      alert('Upload failed');
    }
    setUploadingImage(false);
  };

  const removeGalleryImage = (url: string) => {
    setPost({ ...post, galleryImages: post.galleryImages?.filter(img => img !== url) || [] });
  };

  const getSeoPreview = () => ({
    title: (post.seo?.metaTitle || post.title || 'Your Post Title').slice(0, 60),
    desc: (post.seo?.metaDescription || post.excerpt || 'Add a description').slice(0, 160),
  });

  const getSocialPreview = (platform: 'twitter' | 'facebook') => {
    const image = post.socialImage || post.coverImage;
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      image: image,
    };
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  }

  const seoPreview = getSeoPreview();
  const twitterPreview = getSocialPreview('twitter');
  const fbPreview = getSocialPreview('facebook');

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 sticky top-0 bg-white z-10 py-2 border-b">
        <button onClick={() => router.push('/admin/blog')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-2">
          {postId && <button onClick={() => window.open(`/blog/${post.slug}`, '_blank')} className="flex items-center gap-2 px-3 py-2 border rounded-lg"><Eye className="w-4 h-4" /> Preview</button>}
          <button onClick={() => handleSave('draft')} disabled={saving} className="flex items-center gap-2 px-3 py-2 border rounded-lg"><Save className="w-4 h-4" /> Save Draft</button>
          {post.status === 'scheduled' && (
            <button onClick={() => handleSave('scheduled')} disabled={saving} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg"><Calendar className="w-4 h-4" /> Schedule</button>
          )}
          <button onClick={() => handleSave('published')} disabled={saving || wordCount < 500} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"><Save className="w-4 h-4" /> Publish</button>
          {postId && <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg"><Trash2 className="w-4 h-4" /> Delete</button>}
        </div>
      </div>

      {/* Status + Auto-save indicator */}
      <div className="flex items-center gap-4 text-sm">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          post.status === 'published' ? 'bg-green-100 text-green-700' :
          post.status === 'scheduled' ? 'bg-purple-100 text-purple-700' :
          post.status === 'archived' ? 'bg-slate-100 text-slate-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {post.status.toUpperCase()}
        </span>
        {autoSaveStatus === 'saving' && <span className="text-slate-400 text-xs flex items-center gap-1"><Loader2 className="animate-spin h-3 w-3" /> Auto-saving...</span>}
        {autoSaveStatus === 'saved' && <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle className="h-3 w-3" /> All changes saved</span>}
        <span className="text-slate-500 text-xs">{wordCount} words • {post.readingTime || 0} min read</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,340px]">
        {/* Main Column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value, slug: generateSlug(e.target.value) })} className="w-full px-4 py-3 text-xl font-bold border rounded-lg" placeholder="Enter post title" />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">URL Slug</label>
            <div className="flex gap-2">
              <span className="text-slate-500 text-sm py-2">/blog/</span>
              <input type="text" value={post.slug} onChange={(e) => setPost({ ...post, slug: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" />
            </div>
          </div>

          {/* Excerpt with AI */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Excerpt</label>
              <button onClick={generateAiExcerpt} disabled={aiGenerating || !post.content} className="text-xs text-blue-600 flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI Generate</button>
            </div>
            <textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Brief summary for SEO and previews" />
          </div>

          {/* Cover Image with upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <div className="flex gap-3">
              <input type="url" value={post.coverImage} onChange={(e) => setPost({ ...post, coverImage: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" placeholder="https://..." />
              <label className="cursor-pointer px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-slate-50">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'cover')} />
              </label>
            </div>
            {post.coverImage && <div className="relative mt-2 h-40 rounded-lg overflow-hidden border"><img src={post.coverImage} alt="cover" className="w-full h-full object-cover" /><button onClick={() => setPost({ ...post, coverImage: '' })} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X className="w-4 h-4" /></button></div>}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium mb-1">Gallery Images (optional)</label>
            <div className="flex gap-2 mb-2">
              <label className="cursor-pointer px-4 py-2 border rounded-lg flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Add image<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'gallery')} /></label>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.galleryImages?.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded border overflow-hidden"><img src={img} className="w-full h-full object-cover" /><button onClick={() => removeGalleryImage(img)} className="absolute top-0 right-0 bg-black/50 text-white p-0.5"><X className="w-3 h-3" /></button></div>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Content *</label>
              <span className="text-xs text-slate-500">{wordCount} words (min 500 for publish)</span>
            </div>
            <RichTextEditor content={post.content} onChange={handleContentChange} maxWords={5000} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing options */}
          <div className="border rounded-lg p-4 space-y-3 bg-slate-50">
            <h3 className="font-medium flex items-center gap-2"><Settings className="w-4 h-4" /> Publishing</h3>
            <div>
              <label className="text-sm">Status</label>
              <select value={post.status} onChange={(e) => setPost({ ...post, status: e.target.value as any })} className="w-full mt-1 px-3 py-2 border rounded-lg">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            {post.status === 'scheduled' && (
              <div>
                <label className="text-sm">Schedule Date</label>
                <input type="datetime-local" value={post.scheduledAt?.slice(0,16) || ''} onChange={(e) => setPost({ ...post, scheduledAt: new Date(e.target.value).toISOString() })} className="w-full mt-1 px-3 py-2 border rounded-lg" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={post.featured} onChange={(e) => setPost({ ...post, featured: e.target.checked })} id="featured" />
              <label htmlFor="featured" className="text-sm">Feature this post (homepage highlight)</label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg">
              {defaultCategories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Tags with AI */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Tags</label>
              <button onClick={generateAiTags} disabled={aiGenerating || !post.content} className="text-xs text-blue-600 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Suggest tags</button>
            </div>
            <div className="flex gap-2 mb-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1 px-3 py-1.5 border rounded-lg text-sm" placeholder="Add tag" />
              <button onClick={addTag} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"><Hash className="w-3 h-3" />{tag}<button onClick={() => removeTag(tag)} className="hover:text-blue-900">×</button></span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium">Author</h3>
            <input type="text" value={post.author.name} onChange={(e) => setPost({ ...post, author: { ...post.author, name: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Author name" />
            <textarea value={post.author.bio || ''} onChange={(e) => setPost({ ...post, author: { ...post.author, bio: e.target.value } })} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Author bio" />
          </div>

          {/* SEO Settings with Google Preview */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium">SEO Settings</h3>
            <div>
              <label className="text-sm">Meta Title</label>
              <input type="text" value={post.seo?.metaTitle || ''} onChange={(e) => setPost({ ...post, seo: { ...post.seo, metaTitle: e.target.value } })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder={post.title} />
            </div>
            <div>
              <label className="text-sm">Meta Description</label>
              <textarea value={post.seo?.metaDescription || ''} onChange={(e) => setPost({ ...post, seo: { ...post.seo, metaDescription: e.target.value } })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder={post.excerpt} />
            </div>
            <div>
              <label className="text-sm">Canonical URL</label>
              <input type="url" value={post.seo?.canonical || ''} onChange={(e) => setPost({ ...post, seo: { ...post.seo, canonical: e.target.value } })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={post.seo?.noIndex || false} onChange={(e) => setPost({ ...post, seo: { ...post.seo, noIndex: e.target.checked } })} id="noindex" />
              <label htmlFor="noindex" className="text-sm">No-index this page</label>
            </div>
            <div className="mt-4 p-3 bg-slate-100 rounded-lg">
              <p className="text-xs font-medium text-slate-500 mb-2">Google Search Preview</p>
              <div className="font-sans">
                <p className="text-lg text-[#1a0dab] hover:underline cursor-pointer leading-tight">{seoPreview.title || 'Page Title'}</p>
                <p className="text-sm text-[#006621]">https://smassystems.com/blog/{post.slug}</p>
                <p className="text-sm text-[#545454]">{seoPreview.desc}</p>
              </div>
            </div>
          </div>

          {/* Social Media Preview */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Social Media Preview</h3>
              <button onClick={() => setShowSocialPreview(!showSocialPreview)} className="text-xs text-blue-600">{showSocialPreview ? 'Hide' : 'Show'}</button>
            </div>
            {showSocialPreview && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Social Image (optional)</label>
                  <input type="url" value={post.socialImage || ''} onChange={(e) => setPost({ ...post, socialImage: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="Override cover image for social" />
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Share2 className="w-4 h-4 text-blue-400" /> Twitter Card</div>
                  <div className="mt-2 border rounded overflow-hidden">
                    <div className="bg-slate-100 h-32 bg-cover bg-center" style={{ backgroundImage: `url(${twitterPreview.image})` }}></div>
                    <div className="p-2">
                      <p className="text-xs text-slate-500">smassystems.com</p>
                      <p className="text-sm font-semibold">{twitterPreview.title}</p>
                      <p className="text-xs text-slate-600">{twitterPreview.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          {postId && (
            <div className="border rounded-lg p-4 space-y-2 text-sm text-slate-600">
              <p><Globe className="inline w-4 h-4 mr-2" />Views: {post.views || 0}</p>
              <p><Calendar className="inline w-4 h-4 mr-2" />Created: {post._id ? 'Existing' : 'New'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
