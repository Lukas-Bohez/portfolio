'use client'

import { useCardReveal } from './hooks/useCardReveal'

import {
  AboutAndSkills,
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
import AdUnit from './components/AdUnit';

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
        <AdUnit slot="6531017850" format="auto" className="ad-unit--horizontal" />
        <RecruiterWowStrip />
        <Stats />
        <AdUnit slot="7822007431" format="auto" className="ad-unit--square" />
        <AboutAndSkills isDark={false} />
        <FeaturedProjects isDark={false} />
        <AdUnit slot="6382844046" format="fluid" layout="in-article" className="ad-unit--article" />
        <HumorSection />
        <AdUnit slot="7221282993" format="autorelaxed" className="ad-unit--multiplex" label="Sponsored" />
        <ContactSection isDark={false} />
      </Container>
      <Container className="pb-4">
        <Footer />
      </Container>
    </main>
  );
}
