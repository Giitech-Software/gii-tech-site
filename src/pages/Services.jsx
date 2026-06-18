//path: src/pages/Services.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

import ReactMarkdown from 'react-markdown';
import { FaTimes } from 'react-icons/fa'; 
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';
import LoadingSpinner from '../components/LoadingSpinner';

const serviceHashAliases = {
  'school-management-system': 'school-management',
  'business-analytics-system': 'business-analytics',
  'web-mobile-app-development': 'web-mobile-apps',
  'healthcare-management-systems': 'healthcare',
  'enterprise-solutions': 'enterprise',
  'cloud-hosting-devops': 'cloud-devops',
  'hotel-management-system': 'hotel-management',
  'church-leadership-ministry-tools': 'church-tools',
};

const getServiceSlug = (title = '') => title
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const getServiceHashId = service => {
  const slug = getServiceSlug(service.title);
  return serviceHashAliases[slug] || slug || service.id;
};

const Services = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'services'));
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!location.hash || services.length === 0) return;

    const targetId = location.hash.slice(1);
    const targetService = services.find(service => getServiceHashId(service) === targetId || service.id === targetId);

    if (targetService) {
      setActiveService(targetService);
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }, [location.hash, services]);

  const truncateText = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <>
      <Seo {...SeoConfig.services} />
      
      <div className="min-h-screen bg-white px-0 py-8 text-slate-900 sm:px-5 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 px-4 sm:px-0">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Our Services</h1>
            <div className="w-20 h-1.5 bg-warm mt-3 rounded-full"></div>
          </div>
          
          {loading ? (
            <LoadingSpinner label="Loading services" />
          ) : (
          <div className="grid gap-3 px-4 sm:gap-6 sm:px-0 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const previewText = truncateText(service.description, 180);
              return (
                <div
                  key={service.id || idx}
                  id={getServiceHashId(service)}
                  className="group flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-warm sm:p-5"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <div className="text-[1rem] text-slate-600 leading-relaxed flex-1">
                    <ReactMarkdown>{previewText}</ReactMarkdown>
                  </div>
                  <button
                    onClick={() => setActiveService(service)}
                    className="mt-4 flex min-h-11 items-center gap-2 text-sm font-black uppercase tracking-widest text-warm transition-all hover:text-warm-terracotta"
                  >
                    Read Details <span className="text-xs">-&gt;</span>
                  </button>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>

      {/* FULL-WIDTH MODAL OVERLAY */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-3 backdrop-blur-sm sm:p-6">
          <div 
            className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            {/* Top-Right Close Icon */}
            <button 
              onClick={() => setActiveService(null)}
              className="absolute right-3 top-3 z-50 rounded-full bg-white/90 p-2.5 text-slate-700 shadow-lg transition-all hover:bg-warm hover:text-white md:right-4 md:top-4"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>

            {/* Modal Body: h-full and overflow-hidden on the parent to let the content scroll */}
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Modal Left Accent (Desktop: Full Height Sidebar | Mobile: Top Header) */}
              <div className="flex shrink-0 flex-col items-center justify-center bg-slate-900 p-5 text-center md:w-1/3 lg:p-8">
                <div className="mb-3 text-4xl text-warm sm:text-5xl">{activeService.icon}</div>
                <h2 className="text-xl font-black leading-tight text-white sm:text-2xl">
                  {activeService.title}
                </h2>
              </div>

              {/* Modal Right Content: This part scrolls internally */}
              <div className="overflow-y-auto bg-white p-5 md:w-2/3 md:p-8">
                <span className="text-warm-terracotta font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Service Overview
                </span>
                
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed mb-6">
                  <ReactMarkdown>{activeService.description}</ReactMarkdown>
                </div>

                {/* Footer area with extra bottom padding (pb-12) to prevent "cramping" */}
                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5 pb-6">
                  <button 
                    onClick={() => setActiveService(null)}
                    className="w-full rounded-lg bg-slate-900 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-primary sm:w-auto"
                  >
                    Close Overview
                  </button>
                  <a 
                    href="/contact"
                    className="w-full rounded-lg border-2 border-slate-200 px-6 py-3 text-center font-bold text-slate-900 transition-all hover:bg-slate-50 sm:w-auto"
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
