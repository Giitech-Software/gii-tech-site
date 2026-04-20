import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      
      // THE FIX: Strict filtering to ignore "Ghost" documents
      const validProjects = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => 
          p.title && p.title.trim() !== "" && 
          p.description && p.description.trim() !== ""
        );
      
      setProjects(validProjects);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Seo {...SeoConfig.services} />
      
      <div className="min-h-screen bg-white text-slate-900 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 text-left">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Portfolio of Excellence</h1>
            <div className="w-20 h-1.5 bg-warm mt-4 rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl text-lg">
              Explore how ASTEM Software Labs is transforming industries through bespoke digital architecture and scalable engineering.
            </p>
          </div>

          {/* This correctly checks if we have valid projects after filtering */}
          {projects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 font-medium">No projects showcased yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-warm transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        No Preview Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                        View Project Details <FaExternalLinkAlt size={12} />
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-3 flex-1">
                    <div className="text-warm font-bold text-xs uppercase tracking-widest mb-2">
                      {p.category || 'Software Solution'}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-3 bg-slate-100 text-slate-600 hover:bg-warm hover:text-white rounded-full transition-all z-50 shadow-lg"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              <div className="md:w-1/3 bg-slate-900 relative shrink-0 flex items-center justify-center p-6 border-r border-slate-800">
                {activeProject.imageUrl ? (
                  <img 
                    src={activeProject.imageUrl} 
                    alt={activeProject.title} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                  />
                ) : (
                  <div className="text-slate-700 italic">No image provided</div>
                )}
              </div>

              <div className="md:w-2/3 p-8 md:p-16 overflow-y-auto bg-white flex flex-col">
                <div className="mb-10">
                   <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                    {activeProject.title}
                  </h2>
                  {activeProject.category && (
                    <p className="text-warm font-bold mt-3 uppercase tracking-[0.2em] text-xs">
                      {activeProject.category}
                    </p>
                  )}
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed flex-1">
                  <ReactMarkdown>{activeProject.description}</ReactMarkdown>
                </div>

                <div className="border-t border-slate-100 pt-8 mt-10 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-10 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-warm transition-all shadow-md"
                  >
                    Close Portfolio
                  </button>
                  {activeProject.link && (
                    <a 
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                      Visit Project <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}