import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { featuredOpenings } from '../data/careerOpenings';

export default function CareerPreview() {
  return (
    <section className="bg-slate-950 px-0 py-12 text-white sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:px-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-warm sm:text-sm sm:tracking-[0.3em]">Careers at ASTEM</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Join Our Team</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Work with a focused engineering team building useful, scalable software for growing organizations.
          </p>
        </div>

        <div className="grid gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-0 lg:grid-cols-4">
          {featuredOpenings.slice(0, 4).map(job => (
            <article
              key={job.id}
              className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-warm/60 hover:bg-white/10"
            >
              <BriefcaseBusiness className="h-7 w-7 text-warm" aria-hidden="true" />
              <h4 className="mt-4 text-lg font-black leading-snug text-white">{job.title}</h4>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {job.location}
              </p>
              <p className="mt-2 text-sm font-bold text-slate-200">{job.type}</p>
              <Link
                to={`/jobs/${job.id}`}
                className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-accent transition hover:text-white"
              >
                View Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 px-4 text-center sm:px-0">
          <Link
            to="/jobs"
            className="inline-flex w-full justify-center rounded-lg bg-warm px-6 py-3 font-bold text-white shadow-lg transition hover:bg-warm-terracotta sm:w-auto"
          >
            Explore All Openings
          </Link>
        </div>
      </div>
    </section>
  );
}
