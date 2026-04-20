import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ siteName, tagline }) {
  return (
    <section className="px-6 sm:px-12 lg:px-20 pt-16 pb-20 text-center bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Main Title: Expanded width (max-w-6xl) to let the enterprise name breathe */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.15] tracking-tight">
          Welcome to Applied Systems &  <br className="hidden lg:block" />
          <span className="text-warm">Tech Evolution Models</span>
        </h2>

        {/* Description: Increased max-w-4xl so the text spans more of the screen width */}
        <p className="text-xl sm:text-2xl max-w-5xl mx-auto text-gray-200 mb-10 leading-relaxed font-medium">
          We build modern, scalable software solutions for businesses, schools, and organizations.
          Our systems prioritize performance, intuitive UX, and full customization.
        </p>

        {/* Tagline: Expanded width and sharper contrast */}
        <p className="text-2xl sm:text-4xl font-extrabold text-warm-amber italic max-w-4xl mx-auto mt-16 leading-snug">
          ASTEM — "{tagline}"
        </p>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-block bg-warm text-white font-bold px-10 py-3 rounded-lg text-xl hover:bg-warm-terracotta transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}