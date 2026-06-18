//src/pages/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';
import PublicHeader from '../components/PublicHeader';
import LoadingSpinner from '../components/LoadingSpinner';

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

  if (!project) return <LoadingSpinner label="Loading project" fullPage />;

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

        <main className="mx-auto w-full max-w-4xl flex-grow space-y-5 px-0 py-5 sm:p-8">
          <Link to="/projects" className="px-4 text-cta hover:underline sm:px-0">
            ← Back to Projects
          </Link>

          <h2 className="px-4 text-4xl font-bold text-primary sm:px-0">{project.title}</h2>

          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-60 w-full object-cover sm:rounded-lg"
            />
          )}

          <section className="prose max-w-none px-4 sm:px-0">
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
