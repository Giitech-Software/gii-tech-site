import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, image, path, author, publisher }) {
  const fullTitle = title || 'ASTEM Software Labs';
  const fullDescription = description || 'Innovative software solutions from ASTEM Software Labs.';
  const url = `https://giitech-software-systems.web.app
${path || ''}`;

  console.log('SEO rendered:', fullTitle, fullDescription);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />

      {/* Open Graph (Facebook) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Cards */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Optional author/publisher */}
      {author && <meta name="author" content={author} />}
      {publisher && <meta name="publisher" content={publisher} />}
    </Helmet>
  );
}
