// src/components/BlogPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLightbulb, FaLaptopCode, FaChartPie, FaShieldAlt
} from 'react-icons/fa';

const posts = [
  {
    icon: <FaLightbulb size={24} className="text-accent" />,
    title: 'How Smart Apps Are Reshaping African Education',
    snippet: 'Discover how platforms like GiiTech Smart School Manager are revolutionizing teaching and learning in Africa.',
    link: '/blog/smart-apps-africa',
  },
  {
    icon: <FaLaptopCode size={24} className="text-accent" />,
    title: 'Building Scalable Web & Mobile Solutions',
    snippet: 'Learn the modern tech stack powering GiiTech’s apps and how we ensure performance and reliability.',
    link: '/blog/scalable-solutions',
  },
  {
    icon: <FaChartPie size={24} className="text-accent" />,
    title: 'Making Data Work For Your Business',
    snippet: 'Explore practical ways small businesses are using data and analytics to grow smarter with GiiTech BAS.',
    link: '/blog/data-driven-growth',
  },
  {
    icon: <FaShieldAlt size={24} className="text-accent" />,
    title: 'Top 5 Ways to Secure Your App in 2025',
    snippet: 'Security matters. Here are key tips GiiTech follows to protect user data and app integrity.',
    link: '/blog/app-security-2025',
  },
];

export default function BlogPreview() {
  return (
    <section className="mt-16 px-4 sm:px-10">
      <h3 className="text-2xl font-bold text-primary mb-10 text-center">Latest From Our Blog</h3>

      <div className="space-y-8 max-w-4xl mx-auto">
        {posts.map(({ icon, title, snippet, link }, i) => (
          <div key={i} className="flex items-start gap-4 border-b pb-6">
            <div className="pt-1">{icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600 mt-1">{snippet}</p>
              <Link
                to={link}
                className="text-sm text-accent font-medium mt-2 inline-block hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
