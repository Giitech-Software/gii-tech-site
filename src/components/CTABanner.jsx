// components/CTABanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="bg-slate-950 px-0 py-12 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-0 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-warm-amber sm:text-sm sm:tracking-[0.3em]">
            Start Your Next System
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">
            Ready to elevate your business?
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Let us build something practical, scalable, and reliable together. From strategy to launch, we are your technology partner for success.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-warm px-7 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-warm-terracotta hover:shadow-xl sm:w-auto"
          >
            Contact Us
          </Link>
          <Link
            to="/services"
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/30 px-7 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-slate-950 sm:w-auto"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
