'use client'

import { useCardReveal } from './hooks/useCardReveal'

import {
  ContactSection,
  FeaturedProjects,
  Footer,
  Hero,
  HumorSection,
  Navbar,
  RecruiterWowStrip,
  Stats,
} from './components/PortfolioComponents';
import { Container } from './components/Container';

export default function Home() {
  useCardReveal();

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
        <RecruiterWowStrip />
        <Stats />
        <FeaturedProjects isDark={false} />
        <HumorSection />
        <ContactSection isDark={false} />
      </Container>
      <Container className="pb-4">
        <Footer />
      </Container>
    </main>
  );
}
