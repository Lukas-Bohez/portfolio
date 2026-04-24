import { Container } from './components/Container';
import { DeferredHomepageSections } from './components/DeferredHomepageSections';
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
        <StatsStatic />
        <DeferredHomepageSections />
      </Container>
    </main>
  );
}
