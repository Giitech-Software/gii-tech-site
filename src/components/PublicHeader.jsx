// src/components/PublicHeader.jsx
//import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Add your logo in src/assets

export default function PublicHeader() {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/jobs' },
    { label: 'Contact', to: '/contact' },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <Disclosure as="nav" className="bg-primary text-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo + Brand */}
              <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-8 w-8" />
                <Link to="/" className="text-xl font-bold tracking-wide text-white">
                  ASTEM Software Labs
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`hover:text-accent transition ${
                      isActive(to) ? 'text-accent font-semibold' : 'text-white'
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                {user ? (
                  <Link to="/dashboard" className="bg-white text-primary px-4 py-2 rounded hover:bg-accent hover:text-white">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="bg-white text-primary px-4 py-2 rounded hover:bg-accent hover:text-white">
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Disclosure.Button className="text-white inline-flex items-center justify-center p-2 hover:text-accent focus:outline-none">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="md:hidden px-4 pb-4 space-y-2">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`block py-2 px-3 rounded transition ${
                  isActive(to) ? 'bg-accent text-white' : 'text-white hover:bg-white hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            {user ? (
              <Link to="/dashboard" className="block py-2 px-3 bg-white text-primary rounded">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="block py-2 px-3 bg-white text-primary rounded">
                Login
              </Link>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
