// components/NewsletterSignup.jsx
import React from 'react';

export default function NewsletterSignup() {
  return (
    <section className="mt-10 bg-accent px-4 py-8 text-center text-white sm:rounded-t-lg sm:px-8">
      <h3 className="mb-3 text-2xl font-bold">Stay Informed</h3>
      <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed">
        Join our mailing list to get updates on new products, jobs, and helpful tech tips.
      </p>
      <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full rounded-md px-4 py-3 text-black outline-none sm:flex-1 sm:py-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-6 py-3 font-semibold transition hover:bg-white hover:text-primary sm:w-auto sm:py-2"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
