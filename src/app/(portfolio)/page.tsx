import { Suspense } from 'react';

import { Container } from '../components/Container';
import { DeferredHomepageSections } from '../components/DeferredHomepageSections';
import { Nav } from '../components/Nav';
import { StatsStatic } from '../components/StatsStatic';
import { TopHero } from '../components/TopShell';

export default function Home() {
  return (
    <main id="main-content" className="w-full bg-body">
      <Container>
        <Nav />
      </Container>
      <Container className="space-y-12 py-4">
        <TopHero />
        <StatsStatic />
        <Suspense fallback={null}>
          <DeferredHomepageSections />
        </Suspense>
      </Container>
    </main>
  );
}
