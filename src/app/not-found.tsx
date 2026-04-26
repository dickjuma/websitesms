import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-200">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mt-4">Page Not Found</h2>
        <p className="text-slate-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
