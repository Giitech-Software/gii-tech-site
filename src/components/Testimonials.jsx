// src/components/Testimonials.jsx
import React from 'react';

const testimonials = [
  {
    quote: 'GiiTech transformed our school operations. The system is fast, user-friendly, and reliable.',
    name: 'Mrs. Adjoa K.',
    role: 'School Administrator',
    image: '/images/clients/adjoa.jpg',
  },
  {
    quote: 'Our business now runs smarter thanks to GiiTech’s analytics tools. Highly recommended!',
    name: 'Kwame B.',
    role: 'CEO, TechFarm GH',
    image: '/images/clients/kwame.jpg',
  },
  {
    quote: 'Their customer support is top-notch. GiiTech delivers exactly what you need.',
    name: 'Anita D.',
    role: 'NGO Director',
    image: '/images/clients/anita.jpg',
  },
  {
    quote: 'From consultation to deployment, GiiTech was professional, efficient, and exceeded expectations.',
    name: 'Pastor Yaw M.',
    role: 'Church Planter',
    image: '/images/clients/yaw.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 px-4 sm:px-10">
      <h3 className="text-2xl font-bold text-primary mb-12 text-center">What Our Clients Say</h3>
      <div className="space-y-10 max-w-5xl mx-auto">
        {testimonials.map(({ quote, name, role, image }, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-accent"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-700 italic mb-2">“{quote}”</p>
              <p className="text-sm font-semibold text-primary">— {name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
