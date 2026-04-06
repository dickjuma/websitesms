'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />}>
      <AdminLoginContent />
    </Suspense>
  );
}

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminEmail', data.admin.email);
        localStorage.setItem('adminId', data.admin.id);
        router.push(searchParams?.get('next') || '/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* Left column – info */}
          <div className="border-b border-slate-200 bg-gradient-to-br from-white via-blue-50/20 to-white p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Enterprise Admin
              </span>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Central operations dashboard
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Manage leads, content, AI configuration, and live support — all from one secure workspace.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Operational visibility</p>
                  <p className="text-sm text-slate-600">Lead pipeline, AI knowledge, content, and inbox workflows in one place.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Secure admin access</p>
                  <p className="text-sm text-slate-600">Protected workspace for internal users managing live business operations.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Human + AI coordination</p>
                  <p className="text-sm text-slate-600">Jump from automated qualification into live takeover without losing context.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column – login form */}
          <div className="flex items-center p-8 sm:p-10">
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Enter your credentials to access the admin workspace.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue to workspace
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs uppercase tracking-wider text-slate-500">
                Authorized internal users only
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
