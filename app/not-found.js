"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 select-none mb-6">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page not found.</h2>
      <p className="max-w-md text-gray-600 mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
