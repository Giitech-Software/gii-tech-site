import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-gray-800">
    <h1 className="text-3xl font-extrabold text-primary mb-6">About Us</h1>
    <div className="space-y-6 text-base leading-7">
      <p>
        At <strong>GiiTech Software Systems</strong>, we are passionate about engineering future-ready
        solutions that empower businesses to thrive in a rapidly evolving digital world. Founded on
        the belief that technology should drive progress, we specialize in building intelligent,
        scalable, and secure systems tailored to your growth goals.
      </p>
      <p>
        Our core strengths lie in <strong>digital transformation</strong>, <strong>cloud-native
        development</strong>, <strong>AI and machine learning integration</strong>, and delivering
        reliable, long-term support. Whether you're a startup seeking a Minimum Viable Product (MVP) or an enterprise in
        need of complex infrastructure, we bring deep expertise and a collaborative mindset to every
        project.
      </p>
      <p>
        We take pride in crafting user-centric software that’s not only functional, but intuitive,
        performant, and built to last. Our approach combines agile development with strategic
        consulting to ensure we understand your unique challenges and opportunities.
      </p>
      <p>
        At GiiTech, innovation isn’t just a buzzword — it’s the foundation of everything we do.
        From developing mobile apps and enterprise platforms to automating workflows and integrating
        third-party services, we build with the future in mind.
      </p>
      <p>
        We are more than a service provider — we are your <strong>strategic technology partner</strong>. Let us help
        you unlock new possibilities, improve efficiency, and stay ahead of the curve in a connected,
        digital-first world.
      </p>
    </div>

    <div className="mt-10">
      <Link
        to="/"
        className="inline-block bg-primary text-white px-5 py-2 rounded hover:bg-cta transition"
      >
        ← Back to Homepage
      </Link>
    </div>
  </div>
);

export default AboutUs;
