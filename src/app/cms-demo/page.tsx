import { CmsGalleryMarquee } from './CmsGalleryMarquee';
import Link from 'next/link';
import { ThemeToggle } from '../components/ThemeToggle';

type CmsAuthor = {
  name: string;
  bio: string;
};

type CmsProject = {
  _id: string;
  title: string;
  summary: string;
  stack: string[];
  imageUrl: string;
  demoUrl?: string;
  author?: CmsAuthor | null;
};

type CmsProfile = {
  title: string;
  bio: string;
};

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type RawCmsProject = {
  _id?: string;
  title?: string;
  summary?: string;
  stack?: unknown;
  imageUrl?: string;
  demoUrl?: string;
  author?: CmsAuthor | null;
};

type CmsDemoBanner = {
  title: string;
  message: string;
};

const sanityProjectId = process.env.SANITY_PROJECT_ID || '3a5uodlw';
const sanityDataset = process.env.SANITY_DATASET || 'production';
const sanityApiVersion = process.env.SANITY_API_VERSION || '2025-02-19';
const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

const fallbackProfile: CmsProfile = {
  title: 'About This CMS PoC',
  bio: 'This page is a separate CMS playground for the portfolio assignment. It uses Server Components and fetches data from Sanity. If no CMS documents exist yet, fallback content is shown so the page still works locally.',
};

const fallbackProjects: CmsProject[] = [
  {
    _id: 'fallback-1',
    title: 'Sanity Content Pipeline',
    summary:
      'Structured content model in Sanity. The title, summary, stack, and image URL are editable in the CMS and show up here without code edits.',
    stack: ['Sanity', 'Next.js 16', 'Server Components'],
    imageUrl:
      'https://res.cloudinary.com/dmefzpaea/image/upload/v1776524472/portfolio/cms-demo/ai-workspace-preview.svg',
    demoUrl: 'http://localhost:3333',
  },
  {
    _id: 'fallback-2',
    title: 'Cloudinary Image Delivery',
    summary:
      'Project images are resolved from Cloudinary URLs and rendered via Next Image with remotePatterns configured for res.cloudinary.com.',
    stack: ['Cloudinary', 'next/image', 'Image Transformations'],
    imageUrl:
      'https://res.cloudinary.com/dmefzpaea/image/upload/v1776524475/portfolio/cms-demo/ai-roadmap-preview.svg',
  },
];

const cloudGalleryImages: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/landscapes/girl-urban-view.jpg',
    alt: 'Cloud city skyline at dusk',
  },
  {
    id: 'gallery-2',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/landscapes/architecture-signs.jpg',
    alt: 'Colorful urban architecture signage',
  },
  {
    id: 'gallery-3',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/ecommerce/car-interior-design.jpg',
    alt: 'Modern automotive interior closeup',
  },
  {
    id: 'gallery-4',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/people/smiling-man.jpg',
    alt: 'Portrait with cinematic lighting',
  },
  {
    id: 'gallery-5',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/food/fish-vegetables.jpg',
    alt: 'Editorial-style plated food photo',
  },
  {
    id: 'gallery-6',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/food/spices.jpg',
    alt: 'Spice market style still life',
  },
  {
    id: 'gallery-7',
    src: 'https://res.cloudinary.com/demo/image/upload/v1693596382/samples/animals/three-dogs.jpg',
    alt: 'Studio photo of three dogs',
  },
];

const cloudGalleryPrimary = cloudGalleryImages.map((image) => ({
  ...image,
  src: withCloudinaryTransform(image.src, 'f_auto,q_auto,w_900,h_540,c_fill,g_auto'),
}));

const cloudGallerySecondary = cloudGalleryImages
  .slice()
  .reverse()
  .map((image) => ({
    ...image,
    src: withCloudinaryTransform(image.src, 'f_auto,q_auto,w_900,h_540,c_fill,g_auto'),
  }));

function withCloudinaryTransform(url: string, transform: string): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  if (url.includes('/upload/' + transform + '/')) {
    return url;
  }

  return url.replace('/upload/', `/upload/${transform}/`);
}

async function querySanity<T>(query: string, revalidateSeconds: number): Promise<T | null> {
  const endpoint = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    next: { revalidate: revalidateSeconds },
    headers: sanityReadToken ? { Authorization: `Bearer ${sanityReadToken}` } : undefined,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { result?: T };
  return payload.result ?? null;
}

async function getCmsProjects(): Promise<CmsProject[]> {
  const query = `*[_type in ["projectDemo", "project", "portfolioProject", "cmsProject"]] | order(coalesce(order, _createdAt) asc){
    _id,
    title,
    "summary": coalesce(summary, description, excerpt, "No summary yet."),
    "stack": coalesce(stack, techStack, technologies, []),
    "imageUrl": coalesce(imageUrl, mainImage.asset->url, image.asset->url, ""),
    "demoUrl": coalesce(demoUrl, url, link),
    author->{
      "name": coalesce(name, title, "Unknown author"),
      "bio": coalesce(bio, about, description, "")
    }
  }`;

  const result = await querySanity<RawCmsProject[]>(query, 3600);
  if (!result || result.length === 0) {
    return fallbackProjects;
  }

  const normalized = result
    .filter((item) => Boolean(item.title))
    .map((item, index) => ({
      _id: item._id || `cms-${index}`,
      title: item.title || 'Untitled Project',
      summary: item.summary || 'No summary yet.',
      stack: Array.isArray(item.stack)
        ? item.stack.filter((token): token is string => typeof token === 'string')
        : typeof item.stack === 'string'
          ? item.stack
              .split(',')
              .map((token) => token.trim())
              .filter(Boolean)
          : [],
      imageUrl: item.imageUrl || fallbackProjects[index % fallbackProjects.length].imageUrl,
      demoUrl: item.demoUrl,
      author: item.author
        ? {
            name: item.author.name,
            bio: item.author.bio,
          }
        : null,
    }));

  return normalized.length > 0 ? normalized : fallbackProjects;
}

async function getCmsProfile(): Promise<CmsProfile> {
  const query = `*[_type in ["profileDemo", "aboutPage", "author", "portfolioProfile"]][0]{
    "title": coalesce(title, name, "About This CMS PoC"),
    "bio": coalesce(bio, about, description, "")
  }`;

  const result = await querySanity<Partial<CmsProfile>>(query, 300);
  if (!result || !result.bio) {
    return fallbackProfile;
  }

  return {
    title: result.title || fallbackProfile.title,
    bio: result.bio,
  };
}

function renderCmsDemoPage(projects: CmsProject[], profile: CmsProfile, banner?: CmsDemoBanner) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="sticky top-0 z-40 mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-surface bg-surface/95 p-3 shadow-lg backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">CMS Demo</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-blue-400/60 px-3 py-1.5 text-sm font-semibold text-default transition hover:bg-blue-400/10"
            aria-label="Go back to portfolio home"
          >
            Back to Portfolio
          </Link>
          <a
            href="https://quizthespire.com/"
            className="rounded-full border border-emerald-400/60 px-3 py-1.5 text-sm font-semibold text-default transition hover:bg-emerald-400/10"
            aria-label="Go back to Quiz The Spire"
          >
            Back to Quiz The Spire
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {banner ? (
        <section
          className="mb-8 rounded-3xl border border-amber-400/40 bg-amber-400/10 p-5 shadow-md"
          role="alert"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {banner.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-default">{banner.message}</p>
        </section>
      ) : null}

      <section className="mb-8 rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Separate CMS Demo
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
          Next.js + Sanity + Cloudinary PoC
        </h1>
        <p className="mt-3 max-w-3xl text-base text-default sm:text-lg">
          This route is isolated from the regular portfolio landing page. Content below is loaded in
          a Server Component from Sanity, and project images are expected as Cloudinary URLs.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="http://localhost:3333"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-emerald-400/70 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-emerald-400/20"
          >
            Open Sanity Studio Login
          </a>
          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-blue-400/70 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
          >
            Sanity Docs
          </a>
        </div>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-surface bg-surface p-5 shadow-md">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Caching Strategy
          </p>
          <p className="mt-2 text-sm text-default">
            Project list uses server-side fetch with <strong>revalidate: 3600</strong> because this
            content changes rarely.
          </p>
        </article>
        <article className="rounded-2xl border border-surface bg-surface p-5 shadow-md">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Dynamic Strategy
          </p>
          <p className="mt-2 text-sm text-default">
            Profile text uses a shorter fetch window (<strong>revalidate: 300</strong>) so edits
            appear quickly while keeping route performance stable.
          </p>
        </article>
      </section>

      <section className="mb-8 rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <h2 className="text-2xl font-bold text-primary">{profile.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-default">{profile.bio}</p>
      </section>

      <section className="mb-8 rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Recruiter + Investor Signals
        </p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          Why this portfolio is built to stand out
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
          This demo is intentionally optimized for rapid iteration, measurable delivery, and
          polished storytelling, three qualities that matter in recruiter screens, investor
          conversations, and innovation tracks like Red Bull Basement.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-blue-400/40 bg-blue-400/10 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Execution Speed
            </p>
            <p className="mt-2 text-sm text-default">
              Release-linked portfolio updates and deployment verification are integrated directly
              into the workflow.
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Product Clarity
            </p>
            <p className="mt-2 text-sm text-default">
              Content model, technical stack, and user-facing outcomes are visible in one clean
              narrative.
            </p>
          </article>
          <article className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Innovation Readiness
            </p>
            <p className="mt-2 text-sm text-default">
              Cloud media, motion-rich UI, and CMS-driven updates support fast prototyping and
              public demo quality.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <h2 className="text-2xl font-bold text-primary">CMS Projects</h2>
        <p className="mt-2 text-sm text-muted">
          Edit project documents in Sanity and refresh this page to see updates without modifying
          code.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            return (
              <article
                key={project._id}
                className="overflow-hidden rounded-2xl border border-surface bg-surface shadow-md"
              >
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-default">{project.summary}</p>
                  {project.author ? (
                    <div className="mt-3 rounded-2xl border border-surface bg-muted/20 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                        Author
                      </p>
                      <p className="mt-1 text-sm font-semibold text-default">
                        {project.author.name}
                      </p>
                      {project.author.bio ? (
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {project.author.bio}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={`${project._id}-${item}`}
                        className="rounded-full border border-blue-400/40 bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-500"
                    >
                      Open linked resource ↗
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cms-cloud-gallery mt-10 rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Cloudinary Gallery
        </p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          Cloud-loaded visual examples
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          High-impact sample imagery served from Cloudinary with progressive transforms, designed as
          a recruiter-facing showcase strip.
        </p>

        <div className="mt-6">
          <CmsGalleryMarquee
            images={cloudGalleryPrimary}
            ariaLabel="Scrolling cloud image gallery"
          />
        </div>

        <div className="mt-4">
          <CmsGalleryMarquee
            images={cloudGallerySecondary}
            compact
            phaseOffsetSeconds={29}
            ariaLabel="Secondary scrolling cloud image gallery"
          />
        </div>
      </section>
    </main>
  );
}

export default async function CmsDemoPage() {
  try {
    const [projects, profile] = await Promise.all([getCmsProjects(), getCmsProfile()]);
    return renderCmsDemoPage(projects, profile);
  } catch (error) {
    console.error('Failed to load CMS demo content', error);
    return renderCmsDemoPage(fallbackProjects, fallbackProfile, {
      title: 'CMS content temporarily unavailable',
      message:
        'Sanity is unreachable right now, so the page is showing fallback content. Refresh after the CMS is available again to load live documents.',
    });
  }
}
