'use client';

import Link from 'next/link';

import ImageLightbox from '@/app/components/ImageLightbox';
import { Badge } from '@/app/components/ui/Badge';
import { Gallery, GalleryItem } from '@/app/components/ui/Gallery';

type ProjectAuthor = {
  name: string;
  bio?: string;
};

type ProjectTag = {
  title: string;
};

export type Project = {
  _id: string;
  title: string;
  slug?: string;
  summary: string;
  stack: string[];
  imageUrl: string;
  demoUrl?: string;
  author?: ProjectAuthor | null;
  tags?: ProjectTag[];
};

type Props = {
  projects: Project[];
};

export function ProjectsGallery({ projects }: Props) {
  return (
    <>
      <Gallery columns={2}>
        {projects.map((project) => {
          return (
            <GalleryItem key={project._id}>
              <div className="space-y-3">
                <ImageLightbox
                  src={project.imageUrl}
                  alt={`Project preview for ${project.title}`}
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary"
                  imgClassName="object-cover transition-transform duration-300 hover:scale-105"
                  fill
                />

                <div className="px-1">
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

                  {project.stack && project.stack.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <Badge key={`${project._id}-${item}`} label={item} variant="tech" />
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.slug ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                      >
                        View screenshots →
                      </Link>
                    ) : null}
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-emerald-500 hover:text-emerald-600"
                      >
                        External demo ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </GalleryItem>
          );
        })}
      </Gallery>
    </>
  );
}
