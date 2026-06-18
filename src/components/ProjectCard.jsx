import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ProjectCard({ project, onClick, index, id }) {
  return (
    <div
      id={id}
      onClick={() => onClick(project)}
      className="group flex cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:rounded-lg"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-60">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">No Preview</div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-black uppercase text-slate-900">
          {project.category || 'System'}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
        <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-warm sm:text-2xl">
          {project.title}
        </h3>
        
        <div className="text-slate-600 line-clamp-3 text-base leading-relaxed prose max-w-none">
          <ReactMarkdown allowedElements={['p', 'strong', 'em', 'text']}>
            {project.description}
          </ReactMarkdown>
        </div>

        <div className="flex items-center pt-3 text-sm font-black uppercase tracking-[0.16em] text-warm transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          Read More &rarr;
        </div>
      </div>
    </div>
  );
}
