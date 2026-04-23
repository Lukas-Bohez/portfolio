import {
  AboutAndSkills,
  ContactSection,
  FeaturedProjects,
  Footer,
  HumorSection,
  RecruiterWowStrip,
} from './components/PortfolioComponents';
import { Container } from './components/Container';
import { TopHero, TopNavbar } from './components/TopShell';
import { StatsStatic } from './components/StatsStatic';

export default function Home() {
  return (
    <main className="w-full bg-body">
      <Container>
        <TopNavbar />
      </Container>
      <Container className="space-y-12 py-4">
        <TopHero />
        <RecruiterWowStrip />
        <StatsStatic />
        <AboutAndSkills />
        <FeaturedProjects />
        <HumorSection />
        <ContactSection />
      </Container>
      <Container className="pb-4">
        <Footer />
      </Container>
    </main>
  );
}
