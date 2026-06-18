// src/components/AboutSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="bg-slate-50 px-0 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="px-4 sm:px-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-warm sm:text-sm sm:tracking-[0.3em]">
            Who We Are
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Software partners for organizations that need systems to work.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            ASTEM Software Labs is a forward-thinking software company delivering intelligent, scalable, and future-ready digital solutions.
            We help businesses, schools, and organizations grow with practical systems built around their real operations.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-warm hover:shadow-lg sm:w-auto"
          >
            Learn More About Us
          </Link>
        </div>

        <div className="grid gap-3 px-4 sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-1">
          {[
            ['Strategy', 'Discovery, planning, and solution mapping before we build.'],
            ['Delivery', 'Clean development cycles with usable milestones and review points.'],
            ['Support', 'Ongoing improvements, training, and care after launch.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-lg font-black text-slate-950">{title}</h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
