import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const socialLinks = [
  { icon: <FaFacebookF />, label: 'Facebook', url: 'https://facebook.com' },
  { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com' },
  { icon: <FaInstagram />, label: 'Instagram', url: 'https://instagram.com' },
  { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: <FaTiktok />, label: 'TikTok', url: 'https://tiktok.com' },
  {
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
    url: 'https://wa.me/233247754531?text=Hi%20ASTEM%20Software%20Labs%2C%20I%20need%20assistance.',
  },
];

const PublicFooter = () => {
  return (
    <footer className="bg-primary text-white px-4 sm:px-6 py-8 mt-10 text-sm">
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold mb-1">ASTEM Software Labs</h3>
          <p className="text-accent mb-4">Future Ready Software for a Smarter World</p>
          <div className="space-y-1 text-xs">
            <p><strong>Office:</strong> 23 Innovation Lane, Accra, Ghana</p>
            <p><strong>Hours:</strong> Mon - Fri, 8:00 AM - 5:00 PM</p>
            <p><strong>GPS:</strong> GA-123-4567</p>
            <p className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-accent" />
              <a
                href="https://maps.google.com/?q=23+Innovation+Lane,+Accra,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-white"
              >
                View on Google Maps
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
          <ul className="space-y-1">
            {socialLinks.map(({ icon, label, url }) => (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent"
                >
                  {icon} {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <p className="text-sm mb-3">Get updates straight to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full text-black rounded text-sm"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-white hover:text-primary px-4 py-2 rounded text-sm font-medium w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 border-t border-white/20 pt-4 text-center text-xs px-4">
        &copy; {new Date().getFullYear()} ASTEM Software Labs. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
