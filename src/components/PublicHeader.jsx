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
    <Disclosure as="nav" className="sticky top-0 z-50 bg-primary text-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo + Brand */}
              <div className="flex min-w-0 items-center gap-2">
                <img src={logo} alt="ASTEM Software Labs logo" className="h-9 w-9 shrink-0 object-contain" />
                <Link to="/" className="min-w-0 truncate text-base font-bold tracking-wide text-white sm:text-xl">
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

                {user && (
                  <Link to="/dashboard" className="bg-white text-primary px-4 py-2 rounded hover:bg-accent hover:text-white">
                    Dashboard
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Disclosure.Button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10 hover:text-accent focus:outline-none focus:ring-2 focus:ring-white/60"
                  aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                >
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="md:hidden border-t border-white/10 bg-primary px-3 pb-4 pt-3 shadow-xl">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`block rounded-lg px-3 py-3 text-base font-semibold transition ${
                  isActive(to) ? 'bg-accent text-white' : 'text-white hover:bg-white hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            {user && (
              <Link to="/dashboard" className="mt-2 block rounded-lg bg-white px-3 py-3 text-center text-base font-bold text-primary">
                Dashboard
              </Link>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
