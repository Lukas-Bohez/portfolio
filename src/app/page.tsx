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
import { Container } from './components/Container';

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
    <main className="w-full bg-body">
      <Container>
        <Navbar
          onThemeToggle={() => {}}
          isDark={false}
          onScrollTo={(id) => {
            const elem = document.getElementById(id);
            if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      </Container>
      <Container className="space-y-12 py-4">
        <Hero isDark={false} onScrollToProjects={() => {
          const elem = document.getElementById('projects');
          if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} />
        <Stats />
        <AboutAndSkills isDark={false} />
        <FeaturedProjects isDark={false} />
        <ContactSection isDark={false} />
      </Container>
      <Container className="pb-4">
        <Footer />
      </Container>
    </main>
  );
}
