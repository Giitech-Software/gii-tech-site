// src/config/SeoConfig.js

const baseUrl = 'https://giitech-software-systems.web.app';
const siteName = 'ASTEM Software Labs';
const siteAuthor = 'ASTEM Team';
const sitePublisher = 'ASTEM Software Labs';

// Static Pages
const staticPages = {
  home: {
    title: siteName,
    description: 'Innovative software solutions tailored for growth-focused organizations.',
    path: '/',
    url: `${baseUrl}/`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  services: {
    title: `Services | ${siteName}`,
    description: 'Modern, scalable software and IT services delivered by ASTEM Software Labs.',
    path: '/services',
    url: `${baseUrl}/services`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  projects: {
    title: `Our Projects | ${siteName}`,
    description: 'Explore our portfolio of completed software and web projects.',
    path: '/projects',
    url: `${baseUrl}/projects`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  blog: {
    title: `Blog & News | ${siteName}`,
    description: 'Insights, updates, and industry news from ASTEM Software Labs.',
    path: '/blog',
    url: `${baseUrl}/blog`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  contact: {
    title: `Contact Us | ${siteName}`,
    description: 'Reach out to ASTEM Software Labs for support or collaboration.',
    path: '/contact',
    url: `${baseUrl}/contact`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  careers: {
    title: `Careers | ${siteName}`,
    description: 'Join our innovative team at ASTEM Software Labs.',
    path: '/jobs',
    url: `${baseUrl}/jobs`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  clientConfidence: {
    title: `Client Confidence | ${siteName}`,
    description: 'Read what clients say about working with ASTEM Software Labs.',
    path: '/client-confidence',
    url: `${baseUrl}/client-confidence`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  faqs: {
    title: `Frequently Asked Questions | ${siteName}`,
    description: 'Find answers to common questions about ASTEM Software Labs and our services.',
    path: '/faqs',
    url: `${baseUrl}/faqs`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
};

// Dynamic Pages
const dynamicPages = {
  blogPost: ({ title, excerpt, id }) => ({
    title: `${title} | Blog | ${siteName}`,
    description: excerpt,
    path: `/blog/${id}`,
    url: `${baseUrl}/blog/${id}`,
    author: siteAuthor,
    publisher: sitePublisher,
  }),
  jobPost: ({ title, excerpt, id }) => ({
    title: `${title} | Careers | ${siteName}`,
    description: excerpt,
    path: `/jobs/${id}`,
    url: `${baseUrl}/jobs/${id}`,
    author: siteAuthor,
    publisher: sitePublisher,
  }),
  projectDetails: ({ title, excerpt, id }) => ({
    title: `${title} | Projects | ${siteName}`,
    description: excerpt,
    path: `/projects/${id}`,
    url: `${baseUrl}/projects/${id}`,
    author: siteAuthor,
    publisher: sitePublisher,
  }),
};

// Final Export
const SeoConfig = {
  ...staticPages,
  dynamic: dynamicPages,
};

export default SeoConfig;
