import Link from 'next/link';
import { Suspense } from 'react';

import { Card } from '@/app/components/ui/Card';
import { ScreenshotLightbox } from '@/app/components/ui/ScreenshotLightbox';
import { Section } from '@/app/components/ui/Section';
import { SkeletonCard } from '@/app/components/ui/SkeletonCard';
import { withBasePath } from '@/lib/basePath';

import { ProjectsGallery, type Project } from './components/ProjectsGallery';
import { fallbackProfile, fallbackProjects, fallbackSettings } from './constants/fallbackContent';
import { GalleryMarquee } from './GalleryMarquee';
import { ProofSpotlightSection } from '../../components/PortfolioComponents';
import { ThemeToggle } from '../../components/ThemeToggle';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const appGalleryImages: GalleryImage[] = [
  {
    id: 'gallery-proof-100-plus',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/imagesPortfolio/additionalProof100%2Bvideos.png',
    alt: 'Proof screenshot showing 100+ playlist downloads supported',
  },
  {
    id: 'gallery-search',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/fullSearchFunctionality.png',
    alt: 'Search view with live results and queue actions',
  },
  {
    id: 'gallery-playlists',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/DownloadFullPlaylists.png',
    alt: 'Playlist download workflow for full sets of songs',
  },
  {
    id: 'gallery-quick-downloads',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/downloadNewSongsEassily.png',
    alt: 'Quick new-song downloads with active progress',
  },
  {
    id: 'gallery-settings',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/LotsOfSettingsForCustomization.png',
    alt: 'Settings panel with extensive customization options',
  },
  {
    id: 'gallery-guide',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/fullGuideWithInfo.png',
    alt: 'Built-in guide and product usage information',
  },
  {
    id: 'gallery-player',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/mediaPlayer.png',
    alt: 'Integrated media player with queue and controls',
  },
  {
    id: 'gallery-torrent',
    src: 'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images-app/fullTorrentingFunctionality.png',
    alt: 'Torrent workflow screen with legal use guidance',
  },
  {
    id: 'gallery-stats',
    src: withBasePath('/images-app/stats.png'),
    alt: 'Stats view showing 100+ converted playlists and usage totals',
  },
];

export const metadata = {
  title: 'Project Screenshots | Lukas Bohez',
  description:
    'Screenshots and visuals from SpireAI, Convert The Spire Reborn, SENTLE, and Industrial Empire.',
};

function ProjectsTopNavSection() {
  return (
    <nav className="sticky top-0 z-40 mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-surface bg-surface/95 p-3 shadow-lg backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {fallbackSettings.siteTitle}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/" className="btn-ui btn-ghost-ui text-sm">
          Back to Portfolio
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function ProjectsIntroSection() {
  const badges = ['TypeScript', 'Next.js 16.2', 'Apache'];

  return (
    <Card className="mb-8 rounded-3xl sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">SHOWCASE</p>
      <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
        Project Screenshots &amp; Visuals
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-default">
        A visual showcase of my work — real screenshots from SpireAI, Convert The Spire Reborn,
        SENTLE, and Industrial Empire. Built with Next.js 15.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-blue-400/40 bg-blue-400/10 px-3 py-1 text-xs font-medium text-default"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link
          href="https://github.com/Lukas-Bohez/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500 hover:text-blue-600"
        >
          View source on GitHub -&gt;
        </Link>
      </div>
    </Card>
  );
}

function ProjectsSpotlightSection() {
  return (
    <Card className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">
        Project snapshot
      </p>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-default">
        {fallbackSettings.spotlightText}
      </p>
    </Card>
  );
}

function ProjectsProfileSection() {
  return (
    <Card className="rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-primary">{fallbackProfile.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-default">{fallbackProfile.bio}</p>
    </Card>
  );
}

function ProjectsSection() {
  return (
    <Card className="rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-primary">Example Project Pictures</h2>
      <p className="mt-2 text-sm text-muted">
        Screenshots and visuals from my projects. Click any image to view fullscreen.
      </p>

      <div className="mt-6">
        <ProjectsGallery projects={fallbackProjects as unknown as Project[]} />
      </div>
    </Card>
  );
}

function ProjectsGallerySection() {
  return (
    <Card className="cms-cloud-gallery rounded-3xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        Product Screenshot Gallery
      </p>
      <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
        Real screenshots from Convert The Spire Reborn
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-default">
        Production screenshots from the Convert The Spire Reborn desktop app.
      </p>

      <div className="mt-6">
        <GalleryMarquee
          images={appGalleryImages}
          direction="left"
          speed={30}
          ariaLabel="App screenshots scrolling left"
        />
      </div>

      <div className="mt-4">
        <GalleryMarquee
          images={appGalleryImages}
          direction="right"
          speed={36}
          ariaLabel="App screenshots scrolling right"
        />
      </div>

      <div className="mt-6">
        <ScreenshotLightbox
          images={appGalleryImages.map((image) => ({
            id: image.id,
            src: image.src,
            alt: image.alt,
            caption: image.alt,
          }))}
        />
      </div>
    </Card>
  );
}

function ProjectsFooterSection() {
  return <p className="text-sm text-muted">{fallbackSettings.footerText}</p>;
}

function SuspenseCardFallback() {
  return (
    <Card className="rounded-3xl sm:p-8">
      <SkeletonCard />
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<SuspenseCardFallback />}>
        <ProjectsTopNavSection />
      </Suspense>

      <Section className="space-y-8 py-0">
        <ProjectsIntroSection />

        <Suspense fallback={<SuspenseCardFallback />}>
          <ProjectsSpotlightSection />
        </Suspense>

        <Suspense fallback={<SuspenseCardFallback />}>
          <ProjectsProfileSection />
        </Suspense>

        <Suspense fallback={<SuspenseCardFallback />}>
          <ProofSpotlightSection />
        </Suspense>

        <Suspense fallback={<SuspenseCardFallback />}>
          <ProjectsSection />
        </Suspense>

        <ProjectsGallerySection />

        <Suspense fallback={null}>
          <ProjectsFooterSection />
        </Suspense>
      </Section>
    </main>
  );
}
