// src/components/CareerPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CareerPreview() {
  return (
    <section className="mt-20 px-4 sm:px-10">
      <h3 className="text-2xl font-bold text-primary mb-8 text-center">Join Our Team</h3>

      <div className="space-y-6 max-w-xl mx-auto">
        {/* Frontend Developer */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Frontend Developer</h4>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Location:</strong> Remote / Accra
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Type:</strong> Full-Time
          </p>
          <Link to="/careers" className="text-sm text-accent hover:underline font-medium">
            View Details
          </Link>
        </div>

        {/* Backend Developer */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Backend Developer</h4>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Location:</strong> Accra Only
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Type:</strong> Full-Time
          </p>
          <Link to="/careers" className="text-sm text-accent hover:underline font-medium">
            View Details
          </Link>
        </div>

        {/* SEO Engineer */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">SEO Engineer</h4>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Location:</strong> Accra Only
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Type:</strong> Full-Time
          </p>
          <Link to="/careers" className="text-sm text-accent hover:underline font-medium">
            View Details
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/careers"
          className="inline-block bg-accent text-white hover:bg-white hover:text-primary border border-accent px-6 py-2 rounded transition font-semibold"
        >
          Explore All Openings
        </Link>
      </div>
    </section>
  );
}
