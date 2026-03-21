import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

import ReactMarkdown from 'react-markdown';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

const Services = () => {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which service is expanded

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      setServices(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const truncateText = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <>
      <Seo {...SeoConfig.services} />
      <div className="min-h-screen bg-background text-text p-6">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const isExpanded = expanded[idx];
            const displayedText = isExpanded
              ? service.description
              : truncateText(service.description, 150);

            return (
              <div
                key={idx}
                className="bg-white rounded p-4 shadow border border-gray-100"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {service.title}
                </h2>

                <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                  <ReactMarkdown>{displayedText}</ReactMarkdown>
                </div>

                {service.description.length > 150 && (
                  <button
                    onClick={() => toggleReadMore(idx)}
                    className="mt-2 text-cta hover:text-primary transition"
                  >
                    {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
