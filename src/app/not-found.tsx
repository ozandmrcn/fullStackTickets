/**
 * @file not-found.tsx
 * @description Custom 404 page. 
 *              Marked as dynamic because the global Layout/Header 
 *              contains dynamic statistics.
 */

import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h2 className="text-4xl font-bold text-gray-100">404 - Page Not Found</h2>
      <p className="text-gray-400">The page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
