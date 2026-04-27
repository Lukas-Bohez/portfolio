'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Badge } from '@/app/components/ui/Badge';
import { Gallery, GalleryItem } from '@/app/components/ui/Gallery';
import { cloudinaryOptimized } from '@/lib/cloudinary';

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

type ProjectImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
};

type Props = {
  projects: CmsProject[];
};

export function CmsProjectsGallery({ projects }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const projectImages: ProjectImage[] = projects.map((project) => ({
    id: project._id,
    src: project.imageUrl,
    alt: `Project preview for ${project.title}`,
    title: project.title,
  }));

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((i) =>
      i !== null ? (i - 1 + projectImages.length) % projectImages.length : null
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((i) => (i !== null ? (i + 1) % projectImages.length : null));
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  return (
    <>
      <Gallery columns={2}>
        {projects.map((project, index) => {
          const cardImage = project.imageUrl
            ? cloudinaryOptimized(project.imageUrl, 900)
            : 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_900,h_506,c_fill,g_auto/v1693596382/samples/landscapes/girl-urban-view.jpg';

          return (
            <GalleryItem key={project._id}>
              <div
                className="relative aspect-[16/9] w-full overflow-hidden bg-secondary group cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('hover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('hover');
                }}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={cardImage}
                  alt={`Project preview for ${project.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Fullscreen button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-white flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(index);
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6v12h12v-6m0-6h6M4 20h16"
                      />
                    </svg>
                    Fullscreen
                  </button>
                </div>
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
                      <Badge key={`${project._id}-${tag.title}`} label={tag.title} variant="tag" />
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

      {/* Fullscreen modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={handleCloseModal}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            onClick={handleCloseModal}
            aria-label="Close"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={projectImages[selectedImageIndex].src}
              alt={projectImages[selectedImageIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />

            {/* Navigation buttons */}
            {projectImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImageIndex + 1} / {projectImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
