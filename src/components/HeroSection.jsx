// components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ siteName, tagline }) {
  return (
    <section className="px-4 sm:px-10 pt-0 pb-12 text-center">
  <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 leading-tight">
    Welcome to Global Intelligent Innovation Technology!
  </h2>
  <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-800 mb-8">
    We build modern, scalable software solutions for businesses, schools, and organizations.
    Our systems prioritize performance, intuitive UX, and full customization.
  </p>
  <p className="text-2xl sm:text-3xl font-bold text-cta italic max-w-2xl mx-auto mt-12">
    GiiTech — "{tagline}"
  </p>
  <div className="mt-4">
    <Link
      to="/services"
      className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-md text-lg hover:bg-primary transition"
    >
      Explore Our Services
    </Link>
  </div>
</section>
  );
}
