'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, User } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Get CSRF token from cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrf_token='))
      ?.split('=')[1];

    if (token) {
      setCsrfToken(token);
    }

    // Check if we're authenticated by making a request to a protected endpoint
    checkAuthStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = async () => {
    try {
      // This will be protected by middleware, so if we get a response, we're authenticated
      const response = await fetch('/api/admin/me', {
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else {
        // Not authenticated, redirect will be handled by middleware
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect anyway
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect via middleware
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Secure Admin Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{admin.name || admin.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Admin Portal</h2>
              <p className="text-gray-600">
                This is a protected admin page demonstrating secure JWT-based authentication with HTTP-only cookies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold text-green-800">Secure Authentication</h3>
                </div>
                <p className="text-sm text-green-700">
                  JWT tokens stored in HTTP-only, Secure, SameSite cookies
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="font-semibold text-blue-800">Session Management</h3>
                </div>
                <p className="text-sm text-blue-700">
                  30-minute token expiry with optional refresh tokens
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h3 className="font-semibold text-purple-800">Rate Limiting</h3>
                </div>
                <p className="text-sm text-purple-700">
                  5 failed attempts trigger 15-minute temporary block
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Current Session Info</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Admin ID:</strong> {admin.id}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Name:</strong> {admin.name || 'Not provided'}</p>
                <p><strong>CSRF Token:</strong> {csrfToken ? 'Present' : 'Not available'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}