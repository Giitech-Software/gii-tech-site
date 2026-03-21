import React from 'react';
import { Link } from 'react-router-dom';
import useSiteSettings from '../hooks/useSiteSettings';

export default function NotFound() {
  const { settings } = useSiteSettings();
  const siteName = settings?.siteName || 'GiiTech Software Systems';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-cta transition"
      >
        ← Back to {siteName}
      </Link>
    </div>
  );
}
