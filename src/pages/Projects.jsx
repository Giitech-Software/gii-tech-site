// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchProjects();
  }, []);

  return (
    <>
 <Seo {...SeoConfig.services} />
       <div className="min-h-screen bg-background text-text flex flex-col">
        {/* Main Content */}
        <main className="flex-grow p-10 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-10">
            Our Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-center text-gray-600">No projects showcased yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="rounded-t-xl w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-2">
                    <h3 className="text-xl font-semibold text-primary">
                      {p.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
