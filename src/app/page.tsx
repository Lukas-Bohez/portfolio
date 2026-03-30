'use client'

import { useCardReveal } from './hooks/useCardReveal'
import { useEffect, useState } from 'react'

import {
  AboutAndSkills,
  ContactSection,
  FeaturedProjects,
  Hero,
  Navbar,
  Stats,
} from './components/PortfolioComponents';

export default function Home() {

  useCardReveal();

  // Show button to jump to top or loop to top if at bottom
  const [showToTop, setShowToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setShowToTop(scrollTop > 200);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>
      {/* Hero — rendered ONCE, never repeated, no data-reveal */}
      <Hero isDark={false} onScrollToProjects={() => {
        const elem = document.getElementById('projects');
        if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }} />

      {/* Single copy of the sections */}
      <Stats />
      <AboutAndSkills isDark={false} />
      <FeaturedProjects isDark={false} />
      <ContactSection isDark={false} />

      {/* Single "to top" button with loop logic */}
        // ...button removed as requested...
    </main>
  );
}
