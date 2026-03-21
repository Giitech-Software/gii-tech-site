import React, { useEffect } from 'react';
import { trackSiteVisit } from '../utils/trackVisit';
import useSiteSettings from '../hooks/useSiteSettings';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import ServiceGrid from '../components/ServiceGrid';
import Testimonials from '../components/Testimonials';
import ProjectsPreview from '../components/ProjectsPreview';
import TrustedLogos from '../components/TrustedLogos';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import BlogPreview from '../components/BlogPreview';
import NewsletterSignup from '../components/NewsletterSignup';
import CTABanner from '../components/CTABanner';
import CareerPreview from '../components/CareerPreview';

export default function Home() {
  useEffect(() => {
    trackSiteVisit();
  }, []);

  const { settings, loading } = useSiteSettings();
  if (loading) return <p className="text-center mt-10 text-lg">Loading…</p>;

  const siteName = settings?.siteName || 'GiiTech Software Systems';
  const tagline = settings?.tagline || 'Future Ready Software for a Smarter World';

  return (
    <>
      <Seo {...SeoConfig.home} />
      <div className="min-h-screen bg-background text-text flex flex-col">
        <main className="flex-grow">
          <HeroSection siteName={siteName} tagline={tagline} />

<TrustedLogos />           {/* Boosts credibility early */}
<FeatureGrid />
<ServiceGrid />
<Testimonials />
<ProjectsPreview />
<AboutSection />
<FAQSection />
<BlogPreview />
<CareerPreview />
<NewsletterSignup />       {/* Softer engagement */}
<CTABanner />        
        </main>
      
      </div>
    </>
  );
}
