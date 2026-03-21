// components/NewsletterSignup.jsx
import React from 'react';

export default function NewsletterSignup() {
  return (
    <section className="mt-24 bg-accent text-white py-12 px-4 sm:px-10 text-center rounded-t-lg">
      <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
      <p className="text-md mb-6">
        Join our mailing list to get updates on new products, jobs, and helpful tech tips.
      </p>
      <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full sm:flex-1 px-4 py-2 rounded-md text-black outline-none"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-white hover:text-primary transition px-6 py-2 rounded-md font-semibold"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
