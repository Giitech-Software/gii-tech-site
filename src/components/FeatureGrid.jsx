import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  FaCogs,
  FaShieldAlt,
  FaUserFriends,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
} from 'react-icons/fa';
import { db } from '../firebase/config';
import LoadingSpinner from './LoadingSpinner';

const iconClass = 'text-3xl text-warm';

const fallbackFeatures = [
  {
    icon: <FaCogs className={iconClass} />,
    title: 'Tailored Software Solutions',
    text: 'We craft custom-built systems that align with your workflows, not generic templates.',
  },
  {
    icon: <FaShieldAlt className={iconClass} />,
    title: 'Security & Performance First',
    text: 'Every system is designed for speed, protection, reliability, and operational confidence.',
  },
  {
    icon: <FaUserFriends className={iconClass} />,
    title: 'Client-Centered Collaboration',
    text: 'We work closely with your team to turn business goals into real, usable digital systems.',
  },
  {
    icon: <FaLaptopCode className={iconClass} />,
    title: 'Modern, Maintainable Code',
    text: 'We build clean software foundations that can be extended, supported, and scaled over time.',
  },
  {
    icon: <FaMobileAlt className={iconClass} />,
    title: 'Optimized for Every Device',
    text: 'From smartphones to desktops, your users get consistent, responsive, intuitive experiences.',
  },
  {
    icon: <FaCloud className={iconClass} />,
    title: 'Cloud-Powered Infrastructure',
    text: 'We help teams launch, monitor, and scale systems without unnecessary server complexity.',
  },
];

export default function FeatureGrid() {
  const [features, setFeatures] = useState(fallbackFeatures);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const q = query(collection(db, 'enterpriseFeatures'), orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const data = snap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(feature => feature.title && feature.text);

        if (data.length > 0) {
          setFeatures(data);
        }
      } catch (error) {
        console.error('Error fetching enterprise features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section className="bg-white px-0 pb-12 pt-6 sm:px-8 sm:pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:px-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-warm sm:text-sm sm:tracking-[0.3em]">
            Enterprise Engineering
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Why Choose ASTEM?
          </h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Our technology blends smart engineering with real-world experience to help your organization grow efficiently.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading enterprise features" />
        ) : (
        <div className="grid gap-3 px-4 sm:gap-4 sm:px-0 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ id, icon, imageUrl, title, text }) => (
            <div
              key={id || title}
              className={`group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all duration-300 hover:border-warm/60 hover:bg-white hover:shadow-lg ${
                imageUrl ? '' : 'p-3 sm:p-4'
              }`}
            >
              {imageUrl ? (
                <div className="h-48 overflow-hidden bg-slate-100 sm:h-64 lg:h-72">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200 group-hover:ring-warm/40">
                  {icon}
                </div>
              )}
              <div className={imageUrl ? 'p-3 sm:p-4' : ''}>
                <h4 className="mb-2 text-base font-bold text-slate-950 sm:text-lg">{title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{text}</p>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
