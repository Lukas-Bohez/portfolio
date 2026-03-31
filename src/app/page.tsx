'use client'

import { useCardReveal } from './hooks/useCardReveal'
import { useEffect, useState } from 'react'

import {
  AboutAndSkills,
  ContactSection,
  FeaturedProjects,
  Footer,
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
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <Navbar
        onThemeToggle={() => {}}
        isDark={false}
        onScrollTo={(id) => {
          const elem = document.getElementById(id);
          if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <div className="space-y-8">
        <Hero isDark={false} onScrollToProjects={() => {
          const elem = document.getElementById('projects');
          if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} />
        <Stats />
        <AboutAndSkills isDark={false} />
        <FeaturedProjects isDark={false} />
        <ContactSection isDark={false} />
        <Footer />
      </div>
    </main>
  );
}
