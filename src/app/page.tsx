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
      <Navbar
        onThemeToggle={() => {}}
        isDark={false}
        onScrollTo={(id) => {
          const elem = document.getElementById(id);
          if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <Hero isDark={false} onScrollToProjects={() => {
        const elem = document.getElementById('projects');
        if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }} />
      <Stats />
      <AboutAndSkills isDark={false} />
      <FeaturedProjects isDark={false} />
      <ContactSection isDark={false} />
    </main>
  );
}
