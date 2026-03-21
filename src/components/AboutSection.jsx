// src/components/AboutSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="mt-8 px-4 sm:px-10 text-center max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-primary mb-4">Who We Are</h3>
      <p className="text-gray-700 text-lg mb-4">
        GiiTech is a forward-thinking software company delivering intelligent, scalable, and future-ready digital solutions.
        We help businesses, schools, and organizations grow in the digital age.
      </p>
      <Link
        to="/about"
        className="inline-block bg-primary text-white px-6 py-3 font-semibold rounded-md hover:bg-accent transition"
      >
        Learn More About Us
      </Link>
    </section>
  );
}
