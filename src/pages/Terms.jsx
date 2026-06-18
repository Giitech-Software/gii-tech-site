import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-gray-800">
    <h1 className="text-3xl font-extrabold text-primary mb-6">Terms of Service</h1>
    <div className="space-y-6 text-base leading-7">
      <p>
        By accessing or using any service provided by <strong>ASTEM Software Labs</strong>, you
        agree to abide by the terms and conditions outlined herein. These Terms of Service govern your
        relationship with us and define the rules of acceptable use, limitations of liability,
        intellectual property rights, and user responsibilities.
      </p>
      <p>
        You must be at least 18 years old to use our platform, or have parental consent if younger.
        You agree not to misuse our services, interfere with systems, distribute harmful software, or
        violate any applicable laws.
      </p>
      <p>
        We strive to maintain uptime and security, but we make no guarantees that the platform will be
        error-free or continuously available. ASTEM Software Labs is not liable for any indirect damages resulting
        from your use or inability to use the services.
      </p>
      <p>
        All content, branding, and intellectual property on the site remain the exclusive property of
        ASTEM Software Labs unless otherwise stated. Unauthorized reproduction or redistribution is strictly
        prohibited.
      </p>
      <p>
        We reserve the right to update or modify these terms at any time. Continued use of the
        platform after changes implies acceptance of the new terms.
      </p>
      <p>
        If you do not agree to any part of these Terms, please discontinue use of our services. Your
        understanding and cooperation are appreciated.
      </p>
    </div>

    <div className="mt-10">
      <Link
        to="/"
        className="inline-block bg-primary text-white px-5 py-2 rounded hover:bg-cta transition"
      >
        ← Back to Homepage
      </Link>
    </div>
  </div>
);

export default Terms;
