// components/ProjectsPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Default placeholder image
const defaultImage = "https://via.placeholder.com/600x300?text=Project+Preview";

const projects = [
  {
    image: defaultImage,
    title: "EduSmart School Manager",
    desc: "A robust school management system used by over 20 institutions.",
  },
  {
    image: defaultImage,
    title: "E-Commerce App",
    desc: "Modern online store platform with secure payments and inventory tracking.",
  },
  {
    image: defaultImage,
    title: "Business Analytics App",
    desc: "Helps startups and SMEs track performance and make data-driven decisions.",
  },
  {
    image: defaultImage,
    title: "Custom Healthcare App",
    desc: "Built for hospitals, clinics and pharmacies with smart appointment scheduling.",
  },
  {
    image: defaultImage,
    title: "Hotel Management System",
    desc: "Complete hotel automation: bookings, billing, staff, and analytics.",
  },
  {
    image: defaultImage,
    title: "Church Leadership Platform",
    desc: "A tool for church planting, event planning, and member follow-up.",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="mt-10 px-4 sm:px-10">
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">Our Featured Projects</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ image, title, desc }, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/projects"
          className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-accent transition"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
