import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { db } from '../firebase/config';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';
import LoadingSpinner from '../components/LoadingSpinner';
import { featuredOpenings } from '../data/careerOpenings';

export default function Jobs() {
  const [jobs, setJobs] = useState(featuredOpenings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
        const snap = await getDocs(q);
        const openJobs = snap.docs
          .filter(docSnap => (docSnap.data().status || '').toString().trim().toLowerCase() === 'open')
          .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        const featuredTitles = new Set(featuredOpenings.map(job => job.title.toLowerCase()));
        const additionalJobs = openJobs.filter(job => !featuredTitles.has(job.title.toLowerCase()));

        setJobs([...featuredOpenings, ...additionalJobs]);
      } catch (error) {
        console.error('Error loading open positions:', error);
        setJobs(featuredOpenings);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Seo {...SeoConfig.careers} />
      <div className="min-h-screen bg-white text-text">
        <section className="bg-slate-950 px-4 py-14 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-warm">Careers at ASTEM</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Build Meaningful Systems With Us
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Join a practical, ambitious engineering team delivering software that helps organizations work smarter.
            </p>
          </div>
        </section>

        <main className="mx-auto w-full max-w-7xl px-0 py-10 sm:px-8 sm:py-14">
          {loading ? (
            <LoadingSpinner label="Loading open positions" />
          ) : (
            <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map(job => (
                <article
                  key={job.id}
                  className="flex flex-col border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-lg sm:rounded-lg sm:p-6"
                >
                  <BriefcaseBusiness className="h-7 w-7 text-warm" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl font-black text-primary">{job.title}</h2>
                  <p className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-500">
                    <MapPin className="h-4 w-4 text-warm" aria-hidden="true" />
                    {job.location}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{job.type}</p>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-600">{job.description}</p>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-cta transition hover:text-primary"
                  >
                    View Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
