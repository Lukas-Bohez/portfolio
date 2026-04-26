import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Gallery, GalleryItem } from '@/app/components/ui/Gallery';
import { Section } from '@/app/components/ui/Section';
import { SkeletonCard } from '@/app/components/ui/SkeletonCard';
import { cloudinaryOptimized } from '@/lib/cloudinary';
import { env } from '@/lib/env';
import { sanityFetch } from '@/lib/sanity';

import { CmsGalleryMarquee } from './CmsGalleryMarquee';
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
};

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const fallbackProfile: CmsProfile = {
  title: 'About This CMS Demo',
  bio: 'Sanity content is temporarily unavailable. Please retry in a moment.',
};

const fallbackSettings: CmsSettings = {
  siteTitle: 'CMS Demo',
  footerText: 'Powered by Next.js + Sanity',
};

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

const appGalleryPrimary = appGalleryImages;

const appGallerySecondary = appGalleryImages.slice().reverse();

async function getSettings(): Promise<CmsSettings> {
  const query = `*[_type == "settings"][0]{
    "siteTitle": coalesce(siteTitle, "CMS Demo"),
    footerText
  }`;

  const result = await sanityFetch<CmsSettings | null>({
    query,
    tags: ['settings'],
    revalidate: 3600,
  });

  return result ?? fallbackSettings;
}

async function getCmsProfile(): Promise<CmsProfile> {
  const query = `*[_type in ["profileDemo", "author"]][0]{
    "title": coalesce(title, name, "About This CMS Demo"),
    "bio": coalesce(bio, about, description, "")
  }`;

  const result = await sanityFetch<Partial<CmsProfile> | null>({
    query,
    tags: ['profile'],
    revalidate: 300,
  });

  if (!result || !result.bio) {
    return fallbackProfile;
  }

  return {
    title: result.title || fallbackProfile.title,
    bio: result.bio,
  };
}

async function getCmsProjects(): Promise<CmsProject[]> {
  const query = `*[_type in ["projectDemo", "project"]] | order(coalesce(order, _createdAt) asc) {
    _id,
    title,
    "slug": slug.current,
    "summary": coalesce(summary, description, excerpt, "No summary yet."),
    "stack": coalesce(stack, techStack, technologies, []),
    "imageUrl": coalesce(imageUrl, mainImage.asset->url, image.asset->url, ""),
    "demoUrl": coalesce(demoUrl, url, link),
    author->{"name": coalesce(name, title, "Unknown author"), "bio": coalesce(bio, about, description, "")},
    "tags": tags[]->{title}
  }`;

  const projects = await sanityFetch<CmsProject[]>({
    query,
    tags: ['projects'],
    revalidate: 3600,
  });

  return projects ?? [];
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
          href={env.NEXT_PUBLIC_SANITY_STUDIO_URL}
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
  return (
    <Card className="rounded-3xl sm:p-8">
      <Badge label="Separate CMS Demo" variant="status" />
      <h1 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
        Next.js + Sanity + Cloudinary
      </h1>
      <p className="mt-3 max-w-3xl text-base text-default sm:text-lg">
        This route uses server-side Sanity fetching with cache tags, draft-aware perspective
        support, and webhook revalidation.
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

  if (projects.length === 0) {
    return (
      <Card className="rounded-3xl sm:p-8">
        <h2 className="text-2xl font-bold text-primary">CMS Projects</h2>
        <p className="mt-3 text-base text-default">
          No projects are published yet. Add a project in Sanity Studio to populate this section.
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-primary">CMS Projects</h2>
      <p className="mt-2 text-sm text-muted">
        Data is server-rendered and cache-tagged for webhook revalidation.
      </p>

      <div className="mt-6">
        <Gallery columns={2}>
          {projects.map((project) => {
            const cardImage = project.imageUrl
              ? cloudinaryOptimized(project.imageUrl, 900)
              : 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_900,h_506,c_fill,g_auto/v1693596382/samples/landscapes/girl-urban-view.jpg';

            return (
              <GalleryItem key={project._id}>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                  <Image
                    src={cardImage}
                    alt={`Project preview for ${project.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-default">{project.summary}</p>

                  {project.author ? (
                    <p className="mt-3 text-xs text-muted">
                      Author:{' '}
                      <span className="font-semibold text-default">{project.author.name}</span>
                    </p>
                  ) : null}

                  {project.tags && project.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={`${project._id}-${tag.title}`}
                          label={tag.title}
                          variant="tag"
                        />
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge key={`${project._id}-${item}`} label={item} variant="tech" />
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.slug ? (
                      <Link
                        href={`/cms-demo/projects/${project.slug}`}
                        className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                      >
                        Open details ↗
                      </Link>
                    ) : null}
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-semibold text-emerald-500 hover:text-emerald-600"
                      >
                        External demo ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </GalleryItem>
            );
          })}
        </Gallery>
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
          images={appGalleryPrimary}
          ariaLabel="Primary scrolling product screenshot gallery"
        />
      </div>

      <div className="mt-4">
        <CmsGalleryMarquee
          images={appGallerySecondary}
          compact
          phaseOffsetSeconds={29}
          ariaLabel="Secondary scrolling product screenshot gallery"
        />
      </div>

      <div className="mt-6">
        <Gallery columns={3}>
          {appGalleryImages.map((image) => (
            <GalleryItem key={`cms-gallery-grid-${image.id}`} caption={image.alt}>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </GalleryItem>
          ))}
        </Gallery>
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
