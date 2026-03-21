import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSchool, FaChartLine, FaLaptopCode, FaHeartbeat,
  FaUsersCog, FaCloud, FaHotel, FaChurch,
} from 'react-icons/fa';

function IconCircle({ icon }) {
  return (
    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary text-white text-2xl">
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
        We build secure, scalable <strong>web</strong> and <strong>mobile applications</strong> tailored to your needs—from e-commerce to internal tools. Built with modern stacks and responsive design.{' '}
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
    <section className="mt-8 px-4 sm:px-10">
      <h3 className="text-3xl font-bold text-primary text-center mb-10">Our Top Solutions</h3>
      <div className="flex flex-col gap-8">
        {services.map(({ title, icon, text }, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start gap-6 p-6 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            <IconCircle icon={icon} />
            <div>
              <h4 className="text-xl font-semibold text-primary mb-2">{title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
