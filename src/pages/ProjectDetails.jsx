import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';
import PublicHeader from '../components/PublicHeader';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      const snap = await getDoc(doc(db, 'projects', id));
      if (snap.exists()) setProject(snap.data());
    };
    fetchProject();
  }, [id]);

  if (!project) return <p className="p-10">Loading…</p>;

  // Slice excerpt for meta description
  const excerpt =
    project.description?.length > 150
      ? project.description.slice(0, 150) + '…'
      : project.description;

  return (
    <>
      <Seo
        {...SeoConfig.dynamic.projectDetails({
          title: project.title,
          excerpt,
          id,
        })}
      />

      <div className="min-h-screen bg-background text-text flex flex-col">
        <PublicHeader />

        <main className="flex-grow p-10 max-w-4xl mx-auto space-y-8">
          <Link to="/projects" className="text-cta hover:underline">
            ← Back to Projects
          </Link>

          <h2 className="text-4xl font-bold text-primary">{project.title}</h2>

          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          <section className="prose max-w-none">
            <h3>Description</h3>
            <p>{project.description}</p>

            {project.technologies && (
              <>
                <h3>Technologies Used</h3>
                <ul>
                  {project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </>
            )}

            {project.features && (
              <>
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </main>

      </div>
    </>
  );
}