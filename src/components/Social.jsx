// src/components/Social.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    icon: <FaFacebook />,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: <FaTwitter />,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    icon: <FaInstagram />,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: <FaTiktok />,
    href: 'https://www.tiktok.com',
    label: 'TikTok',
  },
  {
    icon: <FaWhatsapp />,
    href: 'https://wa.me/233247754531?text=Hi%20ASTEM%20Software%20Labs%2C%20I%20need%20assistance.',
    label: 'WhatsApp',
  },
];

export default function Social() {
  return (
    <div className="flex justify-center gap-4 mt-2">
      {socialLinks.map(({ icon, href, label }, idx) => (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${label}`}
          title={label}
          className="text-white text-xl hover:text-accent transition-colors duration-200"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
