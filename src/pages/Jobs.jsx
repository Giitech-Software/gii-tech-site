// src/pages/Jobs.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const q    = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
      const snap = await getDocs(q);

      // 🐞 DEBUG: log every doc’s status value
      console.log('Raw jobs:', snap.docs.map(d => d.data().status));

      const openJobs = snap.docs
        .filter(d =>
          (d.data().status || '')
            .toString()
            .trim()
            .toLowerCase() === 'open'
        )
        .map(d => ({ id: d.id, ...d.data() }));

      console.log(
  'Statuses received:',
  snap.docs.map(d => JSON.stringify(d.data().status))
);
      setJobs(openJobs);
    })();
  }, []);

  return (
    <>
    <Seo {...SeoConfig.careers} />
    <div className="min-h-screen bg-background text-text flex flex-col">
      
      {/* Main */}
      <main className="flex-grow p-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">
          🚀 Open Positions
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">
            We’re not hiring right now. Check back soon!
          </p>
        ) : (
          <div className="space-y-6">
            {jobs.map(job => (
              <article key={job.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-semibold text-primary">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {job.location} · {job.type}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {job.description}
                </p>
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-cta hover:underline mt-3 inline-block"
                >
                  View Details →
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
