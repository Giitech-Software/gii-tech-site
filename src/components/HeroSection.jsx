import React from 'react';
import { Link } from 'react-router-dom';

const heroBanner = '/images/hero-banner.jpg';

export default function HeroSection({ tagline }) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <img
        src={heroBanner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/10" />

      <div className="mx-auto flex min-h-[calc(78svh-4rem)] max-w-6xl flex-col justify-center px-4 py-10 sm:min-h-[calc(82vh-4rem)] sm:px-10 lg:px-16">
        <div className="max-w-4xl text-left">
         
          <h1 className="mt-3 text-[2.35rem] font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Welcome to Applied Systems & <br className="hidden lg:block" />
            <span className="text-warm">Tech Evolution Models</span>
          </h1>
           <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-warm-amber sm:text-sm sm:tracking-[0.16em]">
            Enterprise Software Delivery
          </p>
          <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-slate-100 sm:text-xl">
            We build modern, scalable software solutions for businesses, schools, and organizations.
            Our systems prioritize performance, intuitive UX, and full customization.
          </p>
          {tagline && (
            <p className="mt-5 max-w-2xl text-xl font-extrabold italic leading-snug text-warm-amber sm:text-3xl">
              ASTEM - "{tagline}"
            </p>
          )}
          <Link
            to="/services"
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-warm px-6 py-3 text-base font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-warm-terracotta active:scale-95 sm:w-auto sm:px-8 sm:text-lg"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
