import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSchool, FaChartLine, FaLaptopCode, FaHeartbeat,
  FaUsersCog, FaCloud, FaHotel, FaChurch,
} from 'react-icons/fa';

function IconCircle({ icon }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-warm-amber text-2xl ring-1 ring-white/15">
      {icon}
    </div>
  );
}

const services = [
  {
    title: 'School Management System',
    icon: <FaSchool />,
    text: (
      <>
        Empower your school with a complete digital suite for <strong>academics</strong>, <strong>administration</strong>, and <strong>e-learning</strong>. From admissions to communication, our system streamlines everything. Ideal for <em>basic, secondary, and tertiary</em> institutions.{' '}
        <Link to="/services#school-management" className="text-accent underline">Learn More</Link>.
      </>
    ),
  },
  {
    title: 'Business Analytics System',
    icon: <FaChartLine />,
    text: (
      <>
        Make <strong>data-driven decisions</strong> with real-time dashboards and performance tracking. Gain insights, identify trends, and grow smarter. Perfect for SMEs and service providers looking to scale.{' '}
        <Link to="/services#business-analytics" className="text-accent underline">Explore Analytics</Link>.
      </>
    ),
  },
  {
    title: 'Web & Mobile App Development',
    icon: <FaLaptopCode />,
    text: (
      <>
        We build secure, scalable <strong>web</strong> and <strong>mobile applications</strong> tailored to your needs, from e-commerce to internal tools. Built with modern stacks and responsive design.{' '}
        <Link to="/services#web-mobile-apps" className="text-accent underline">View Projects</Link>.
      </>
    ),
  },
  {
    title: 'Healthcare Management Systems',
    icon: <FaHeartbeat />,
    text: (
      <>
        Streamline <strong>patient care</strong>, appointments, and records with our secure, e-health solutions. Ideal for clinics, hospitals, and pharmacies seeking efficient, digital operations.{' '}
        <Link to="/services#healthcare" className="text-accent underline">See Healthcare Tools</Link>.
      </>
    ),
  },
  {
    title: 'Enterprise Solutions',
    icon: <FaUsersCog />,
    text: (
      <>
        From <strong>HRMS</strong> to <strong>CRM</strong>, automate and integrate your business processes. Gain control with custom-built enterprise tools designed to scale with you.{' '}
        <Link to="/services#enterprise" className="text-accent underline">Enterprise Tools</Link>.
      </>
    ),
  },
  {
    title: 'Cloud Hosting & DevOps',
    icon: <FaCloud />,
    text: (
      <>
        Migrate, scale, and maintain your systems on modern <strong>cloud infrastructure</strong>. Includes backups, CI/CD pipelines, and performance tuning. Powered by AWS, Azure, or DigitalOcean.{' '}
        <Link to="/services#cloud-devops" className="text-accent underline">View Cloud Solutions</Link>.
      </>
    ),
  },
  {
    title: 'Hotel Management System',
    icon: <FaHotel />,
    text: (
      <>
        Manage bookings, rooms, guests, and payments from one intuitive system. Designed for hotels, lodges, and guesthouses looking for end-to-end control.{' '}
        <Link to="/services#hotel-management" className="text-accent underline">Hotel Software</Link>.
      </>
    ),
  },
  {
    title: 'Church Leadership & Ministry Tools',
    icon: <FaChurch />,
    text: (
      <>
        Strengthen your church with tools for <strong>membership</strong>, <strong>donations</strong>, and <strong>branch management</strong>. Built for ministries and church plants ready to grow with technology.{' '}
        <Link to="/services#church-tools" className="text-accent underline">Ministry Platform</Link>.
      </>
    ),
  },
];

export default function ServiceGrid() {
  return (
    <section className="bg-slate-950 px-0 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl px-4 sm:px-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-warm-amber sm:text-sm sm:tracking-[0.3em]">
            Solution Portfolio
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Our Top Solutions
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Practical software systems for institutions that need dependable operations, better data, and room to grow.
          </p>
        </div>

        <div className="grid gap-3 px-4 sm:gap-4 sm:px-0 lg:grid-cols-2">
          {services.map(({ title, icon, text }, i) => (
            <article
              key={i}
              className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-warm/50 hover:bg-white/[0.07] sm:flex-row sm:p-5"
            >
              <IconCircle icon={icon} />
              <div>
                <h4 className="mb-2 text-lg font-bold text-white sm:text-xl">{title}</h4>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base [&_a]:font-bold [&_a]:text-warm-amber [&_a]:no-underline [&_a:hover]:text-white">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 px-4 text-center sm:px-0">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-lg bg-warm px-8 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-warm-terracotta hover:shadow-2xl"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
