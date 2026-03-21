// components/CTABanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="mt-24 bg-cta text-white py-16 px-4 sm:px-10 text-center">
      <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Elevate Your Business?</h3>
      <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
        Let’s build something great together. From strategy to launch — we’re your tech partner for success.
      </p>
      <div className="space-x-4">
        <Link
          to="/contact"
          className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-accent hover:text-white transition"
        >
          Contact Us
        </Link>
        <Link
          to="/services"
          className="inline-block border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition"
        >
          Our Services
        </Link>
      </div>
    </section>
  );
}
