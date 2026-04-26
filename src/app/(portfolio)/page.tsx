import { Container } from '../components/Container';
import { DeferredHomepageSections } from '../components/DeferredHomepageSections';
import { StatsStatic } from '../components/StatsStatic';
import { TopHero, TopNavbar } from '../components/TopShell';

export default function Home() {
  return (
    <main id="main-content" className="w-full bg-body">
      <Container>
        <TopNavbar />
      </Container>
      <Container className="space-y-12 py-4">
        <TopHero />
        <StatsStatic />
        <DeferredHomepageSections />
      </Container>
    </main>
  );
}
