import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { ScreenshotLightbox } from '@/app/components/ui/ScreenshotLightbox';
import { Section } from '@/app/components/ui/Section';
import { SkeletonCard } from '@/app/components/ui/SkeletonCard';
import { withBasePath } from '@/lib/basePath';
import { sanityFetch } from '@/lib/sanity';

import { CmsGalleryMarquee } from './CmsGalleryMarquee';
import { CmsProjectsGallery } from './components/CmsProjectsGallery';
import { fallbackProfile, fallbackProjects, fallbackSettings } from './constants/fallbackContent';
import { ThemeToggle } from '../../components/ThemeToggle';

type CmsAuthor = {
  name: string;
  bio?: string;
};

type CmsTag = {
  title: string;
};

type CmsProject = {
  _id: string;
  title: string;
  slug?: string;
  summary: string;
  stack: string[];
  imageUrl: string;
  demoUrl?: string;
  author?: CmsAuthor | null;
  tags?: CmsTag[];
};

type CmsProfile = {
  title: string;
  bio: string;
};

type CmsSettings = {
  siteTitle: string;
  footerText?: string;
  spotlightText?: string;
};

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const sanityStudioHref = withBasePath('/sanity/');

const appGalleryImages: GalleryImage[] = [
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
];

async function getSettings(): Promise<CmsSettings> {
  try {
    const result = await sanityFetch<CmsSettings | null>({
      query: `*[_type == "settings"][0]{
      "siteTitle": coalesce(siteTitle, "CMS Demo"),
      spotlightText,
      footerText
    }`,
      tags: ['settings'],
      revalidate: 3600,
    });

    return result ?? fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

async function getCmsProfile(): Promise<CmsProfile> {
  try {
    const result = await sanityFetch<Partial<CmsProfile> | null>({
      query: `*[_type in ["profileDemo", "author"]][0]{
      "title": coalesce(title, name, "About Lukas Bohez"),
      "bio": coalesce(bio, about, description, "")
    }`,
      tags: ['profile'],
      revalidate: 300,
    });

    if (!result?.bio) {
      return fallbackProfile;
    }

    return {
      title: result.title || fallbackProfile.title,
      bio: result.bio,
    };
  } catch {
    return fallbackProfile;
  }
}

async function getCmsProjects(): Promise<CmsProject[]> {
  try {
    const projects = await sanityFetch<CmsProject[]>({
      query: `*[_type in ["projectDemo", "project"]] | order(_createdAt asc) {
      _id,
      title,
      "slug": slug.current,
      "summary": coalesce(summary, description, excerpt, ""),
      "stack": coalesce(stack, techStack, technologies, []),
      "imageUrl": coalesce(imageUrl, mainImage.asset->url, image.asset->url, ""),
      "demoUrl": coalesce(demoUrl, url, link),
      author->{"name": coalesce(name, title, "Unknown author"), "bio": coalesce(bio, about, description, "")},
      "tags": tags[]->{title}
    }`,
      tags: ['projects'],
      revalidate: 3600,
    });

    if (!projects || projects.length === 0) {
      return fallbackProjects as unknown as CmsProject[];
    }

    return projects;
  } catch {
    return fallbackProjects as unknown as CmsProject[];
  }
}

async function CmsTopNavSection() {
  const settings = await getSettings();

  return (
    <nav className="sticky top-0 z-40 mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-surface bg-surface/95 p-3 shadow-lg backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {settings.siteTitle}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button href="/" variant="ghost" className="text-sm">
          Back to Portfolio
        </Button>
        <a
          href={sanityStudioHref}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ui btn-secondary-ui text-sm"
          aria-label="Open Sanity Studio"
        >
          Open Sanity Studio
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function CmsIntroSection() {
  const badges = [
    'Server Components',
    'ISR + Webhooks',
    'Draft Preview',
    'Portable Text',
    'Compound Components',
    'Zod Env Validation',
    'TypeScript',
  ];

  return (
    <Card className="mb-8 rounded-3xl sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
        Technical Demo
      </p>
      <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
        Next.js 15 + Sanity CMS + Cloudinary
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-default">
        This page demonstrates a production-grade headless CMS integration. Content is fetched
        server-side using React Server Components with tagged cache invalidation, on-demand
        revalidation via Sanity webhook, and draft preview mode. Images are optimized through
        Cloudinary with AVIF delivery.
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
        <a
          href="https://github.com/Lukas-Bohez/portfolio"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-500 hover:text-blue-600"
        >
          View source on GitHub -&gt;
        </a>
        <a
          href={sanityStudioHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-emerald-500 hover:text-emerald-600"
        >
          Open Sanity Studio -&gt;
        </a>
      </div>
    </Card>
  );
}

async function CmsSpotlightSection() {
  const settings = await getSettings();

  if (!settings.spotlightText) {
    return null;
  }

  return (
    <Card className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">
        Sanity-controlled spotlight
      </p>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-default">
        {settings.spotlightText}
      </p>
    </Card>
  );
}

async function CmsProfileSection() {
  const profile = await getCmsProfile();

  return (
    <Card className="rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-primary">{profile.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-default">{profile.bio}</p>
    </Card>
  );
}

async function CmsProjectsSection() {
  const projects = await getCmsProjects();

  return (
    <Card className="rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-primary">CMS Projects</h2>
      <p className="mt-2 text-sm text-muted">
        Data is server-rendered and cache-tagged for webhook revalidation. Click on any image to
        view fullscreen.
      </p>

      <div className="mt-6">
        <CmsProjectsGallery projects={projects} />
      </div>
    </Card>
  );
}

function CmsGallerySection() {
  return (
    <Card className="cms-cloud-gallery rounded-3xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        Product Screenshot Gallery
      </p>
      <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
        Real screenshots from Convert The Spire Reborn
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-default">
        The same production screenshots shown on the main product site, mirrored here for CMS and
        content testing.
      </p>

      <div className="mt-6">
        <CmsGalleryMarquee
          images={appGalleryImages}
          direction="left"
          speed={30}
          ariaLabel="App screenshots scrolling left"
        />
      </div>

      <div className="mt-4">
        <CmsGalleryMarquee
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

async function CmsFooterSection() {
  const settings = await getSettings();

  if (!settings.footerText) {
    return null;
  }

  return <p className="text-sm text-muted">{settings.footerText}</p>;
}

function SuspenseCardFallback() {
  return (
    <Card className="rounded-3xl sm:p-8">
      <SkeletonCard />
    </Card>
  );
}

/**
 * Hybrid strategy:
 * - settings/projects use tag-based cache with 1h revalidation and webhook invalidation
 * - profile uses short revalidation for faster content refresh
 * - sections stream independently with Suspense fallbacks
 */
export default function CmsDemoPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<SuspenseCardFallback />}>
        <CmsTopNavSection />
      </Suspense>

      <Section className="space-y-8 py-0">
        <CmsIntroSection />

        <Suspense fallback={<SuspenseCardFallback />}>
          <CmsSpotlightSection />
        </Suspense>

        <Suspense fallback={<SuspenseCardFallback />}>
          <CmsProfileSection />
        </Suspense>

        <Suspense fallback={<SuspenseCardFallback />}>
          <CmsProjectsSection />
        </Suspense>

        <CmsGallerySection />

        <Suspense fallback={null}>
          <CmsFooterSection />
        </Suspense>
      </Section>
    </main>
  );
}
