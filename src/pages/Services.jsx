//path: src/pages/Services.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

import ReactMarkdown from 'react-markdown';
import { FaTimes } from 'react-icons/fa'; 
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      setServices(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const truncateText = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <>
      <Seo {...SeoConfig.services} />
      
      <div className="min-h-screen bg-white text-slate-900 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Our Services</h1>
            <div className="w-20 h-1.5 bg-warm mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => {
              const previewText = truncateText(service.description, 180);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 flex flex-col hover:border-warm transition-all duration-300 group"
                >
                  <div className="text-4xl mb-5">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <div className="text-[1rem] text-slate-600 leading-relaxed flex-1">
                    <ReactMarkdown>{previewText}</ReactMarkdown>
                  </div>
                  <button
                    onClick={() => setActiveService(service)}
                    className="mt-6 text-sm font-black uppercase tracking-widest text-warm hover:text-warm-terracotta flex items-center gap-2 transition-all"
                  >
                    Read Details <span className="text-xs">→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH MODAL OVERLAY */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm">
          <div 
            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200"
          >
            {/* Top-Right Close Icon */}
            <button 
              onClick={() => setActiveService(null)}
              className="absolute top-5 right-5 p-3 bg-white/10 hover:bg-warm md:bg-slate-100 md:text-slate-600 text-white rounded-full transition-all z-50 shadow-lg"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>

            {/* Modal Body: h-full and overflow-hidden on the parent to let the content scroll */}
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Modal Left Accent (Desktop: Full Height Sidebar | Mobile: Top Header) */}
              <div className="md:w-1/3 bg-slate-900 p-10 flex flex-col items-center justify-center text-center shrink-0">
                <div className="text-7xl text-warm mb-6">{activeService.icon}</div>
                <h2 className="text-3xl font-black text-white leading-tight">
                  {activeService.title}
                </h2>
              </div>

              {/* Modal Right Content: This part scrolls internally */}
              <div className="md:w-2/3 p-8 md:p-16 overflow-y-auto bg-white">
                <span className="text-warm-terracotta font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                  Service Overview
                </span>
                
                <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed mb-10">
                  <ReactMarkdown>{activeService.description}</ReactMarkdown>
                </div>

                {/* Footer area with extra bottom padding (pb-12) to prevent "cramping" */}
                <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8 pb-12">
                  <button 
                    onClick={() => setActiveService(null)}
                    className="px-10 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-primary transition-all shadow-md"
                  >
                    Close Overview
                  </button>
                  <a 
                    href="/contact"
                    className="px-10 py-4 border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all text-center"
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