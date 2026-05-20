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

const ProofSpotlightSection = dynamic(
  () => import('./PortfolioComponents').then((module) => module.ProofSpotlightSection),
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
    const scheduleMount = () => setIsMounted(true);
    const timeoutId = window.setTimeout(scheduleMount, 3000);
    const idleCallbackId =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(scheduleMount, { timeout: 2500 })
        : null;

    return () => {
      window.clearTimeout(timeoutId);
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RecruiterWowStrip />
      <ProofSpotlightSection />
      <FeaturedProjects />
      <HumorSection />
      <AboutAndSkills />
      <ContactSection />
      <Footer />
    </>
  );
}
