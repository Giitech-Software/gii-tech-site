// src/config/SeoConfig.js

const baseUrl = 'https://giitech-software-systems.web.app';
const siteName = 'GiiTech Software Systems';
const siteAuthor = 'GiiTech Team';
const sitePublisher = 'GiiTech Software Systems';

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
    description: 'Modern, scalable software & IT services delivered by GiiTech.',
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
    description: 'Insights, updates, and industry news from GiiTech.',
    path: '/blog',
    url: `${baseUrl}/blog`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  contact: {
    title: `Contact Us | ${siteName}`,
    description: 'Reach out to GiiTech Software Systems for support or collaboration.',
    path: '/contact',
    url: `${baseUrl}/contact`,
    author: siteAuthor,
    publisher: sitePublisher,
  },
  careers: {
    title: `Careers | ${siteName}`,
    description: 'Join our innovative team at GiiTech Software Systems.',
    path: '/jobs',
    url: `${baseUrl}/jobs`,
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
