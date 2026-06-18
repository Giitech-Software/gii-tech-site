import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BriefcaseBusiness,
  FolderKanban,
  HelpCircle,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from 'lucide-react';

const sessionKey = 'astem-guided-assistant-shown';
const whatsappUrl =
  'https://wa.me/233247754531?text=Hi%20ASTEM%20Software%20Labs%2C%20I%20need%20assistance.';

const options = [
  {
    label: 'Explore Services',
    description: 'Review our solution portfolio.',
    to: '/services',
    icon: BriefcaseBusiness,
  },
  {
    label: 'View Projects',
    description: 'See selected delivery outcomes.',
    to: '/projects',
    icon: FolderKanban,
  },
  {
    label: 'Start a Consultation',
    description: 'Tell us what you need to build.',
    to: '/contact',
    icon: Send,
  },
  {
    label: 'Read FAQs',
    description: 'Find quick answers and guidance.',
    to: '/faqs',
    icon: HelpCircle,
  },
];

export default function GuidedAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(sessionKey)) return undefined;
    } catch (error) {
      console.warn('sessionStorage not available:', error);
    }

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const hasReachedTrigger = scrollableHeight > 0 && window.scrollY / scrollableHeight >= 0.25;

      if (!hasReachedTrigger) return;

      try {
        sessionStorage.setItem(sessionKey, 'true');
      } catch (error) {
        console.warn('sessionStorage not available:', error);
      }

      setIsOpen(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="ASTEM guided assistant"
          className="mb-3 w-[calc(100vw-2rem)] max-w-[20rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
        >
          <div className="flex items-start justify-between bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-warm/15 p-1.5 text-warm-amber ring-1 ring-warm/30">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-warm-amber">
                  ASTEM Connect
                </p>
                <p className="mt-0.5 text-xs text-slate-300">How can we help?</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="p-2.5">
            <p className="px-1.5 pb-2 text-xs font-bold leading-relaxed text-slate-600">
              Explore our capabilities or start a conversation with our team.
            </p>

            <div className="space-y-1">
              {options.map(option => {
                const Icon = option.icon;

                return (
                  <Link
                    key={option.label}
                    to={option.to}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-2.5 rounded-lg border border-transparent px-2 py-2 transition hover:border-slate-200 hover:bg-slate-50"
                  >
                    <span className="rounded-md bg-slate-950 p-1.5 text-warm-amber transition group-hover:bg-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-black text-slate-900">{option.label}</span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                        {option.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-warm px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-warm-terracotta"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open ASTEM assistant"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-white shadow-xl shadow-slate-950/20 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-primary focus:outline-none focus:ring-4 focus:ring-warm/30"
        >
          <MessageCircle className="h-5 w-5 text-warm-amber" aria-hidden="true" />
          <span className="text-xs font-black uppercase tracking-[0.12em]">Let's Chat</span>
        </button>
      )}
    </div>
  );
}
