'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const RecruiterWowStrip = dynamic(() =>
  import('./PortfolioComponents').then((module) => module.RecruiterWowStrip)
);

const FeaturedProjects = dynamic(
  () => import('./PortfolioComponents').then((module) => module.FeaturedProjects),
  { ssr: false }
);

const HumorSection = dynamic(
  () => import('./PortfolioComponents').then((module) => module.HumorSection),
  { ssr: false }
);

const AboutAndSkills = dynamic(() =>
  import('./PortfolioComponents').then((module) => module.AboutAndSkills)
);

const ContactSection = dynamic(
  () => import('./PortfolioComponents').then((module) => module.ContactSection),
  { ssr: false }
);

const Footer = dynamic(() => import('./PortfolioComponents').then((module) => module.Footer), {
  ssr: false,
});

export function DeferredHomepageSections() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsMounted(true), 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RecruiterWowStrip />
      <FeaturedProjects />
      <HumorSection />
      <AboutAndSkills />
      <ContactSection />
      <Footer />
    </>
  );
}
