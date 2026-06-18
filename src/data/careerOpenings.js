export const featuredOpenings = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    location: 'Remote / Accra',
    type: 'Full-time',
    description:
      'Build polished, responsive web interfaces for modern business platforms and digital products.',
    requirements:
      'Strong React, JavaScript, HTML, CSS, responsive design, API integration, and Git workflow experience.',
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    location: 'Accra / Hybrid',
    type: 'Full-time',
    description:
      'Design reliable APIs, data services, and secure backend systems that support business-critical workflows.',
    requirements:
      'Experience with server-side development, REST APIs, databases, authentication, cloud deployment, and Git.',
  },
  {
    id: 'python-programming-expert',
    title: 'Python Programming Expert',
    location: 'Remote / Accra',
    type: 'Full-time',
    description:
      'Develop robust Python solutions for automation, integrations, analytics, and scalable software services.',
    requirements:
      'Advanced Python skills with experience in APIs, data processing, testing, databases, and production-ready code.',
  },
  {
    id: 'react-native-expert',
    title: 'React Native Expert',
    location: 'Remote / Accra',
    type: 'Contract / Full-time',
    description:
      'Create high-quality cross-platform mobile applications with a strong focus on performance and usability.',
    requirements:
      'Strong React Native, JavaScript or TypeScript, API integration, mobile UI, debugging, and app release experience.',
  },
  {
    id: 'seo-engineer',
    title: 'SEO Engineer',
    location: 'Accra / Hybrid',
    type: 'Full-time',
    description:
      'Improve technical SEO, discoverability, and measurable organic performance across client platforms.',
    requirements:
      'Experience with technical audits, analytics, search optimization, structured data, and performance reporting.',
  },
];

export const findFeaturedOpening = id => featuredOpenings.find(opening => opening.id === id);
