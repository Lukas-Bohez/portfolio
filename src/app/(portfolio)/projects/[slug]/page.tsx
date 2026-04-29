import Link from 'next/link';
import { notFound } from 'next/navigation';

import ImageLightbox from '@/app/components/ImageLightbox';

import { fallbackProjects } from '../constants/fallbackContent';

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = fallbackProjects.find((entry) => entry.slug === params.slug);
  if (!project) return { title: 'Project | Lukas Bohez' };
  return { title: `${project.title} Screenshots | Lukas Bohez` };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = fallbackProjects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-3xl border border-surface bg-surface shadow-lg">
        <div className="relative aspect-[16/9] w-full bg-secondary">
          <ImageLightbox
            src={project.imageUrl}
            alt={`Cover image for ${project.title}`}
            className="h-full w-full"
            fill
          />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-primary">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-default">{project.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/LukasBohez/projects/" className="btn-ui btn-ghost-ui">
              ← Back to all screenshots
            </Link>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ui btn-primary-ui"
              >
                Open project
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  );
}
