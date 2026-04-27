'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Badge } from './Badge';

export type ProjectCardImage = {
  id: string;
  src: string;
  alt: string;
};

type Author = {
  name: string;
  bio?: string;
};

type Tag = {
  title: string;
};

type Props = {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  author?: Author | null;
  tags?: Tag[];
  onImageClick?: (image: ProjectCardImage) => void;
  children?: React.ReactNode;
};

export function ProjectCard({
  id,
  title,
  summary,
  imageSrc,
  imageAlt,
  author,
  tags,
  onImageClick,
  children,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick({
        id,
        src: imageSrc,
        alt: imageAlt,
      });
    }
  };

  return (
    <div>
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-secondary group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleImageClick}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Fullscreen button overlay */}
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
            <button
              type="button"
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-white flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick();
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
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-default">{summary}</p>

        {author ? (
          <p className="mt-3 text-xs text-muted">
            Author: <span className="font-semibold text-default">{author.name}</span>
          </p>
        ) : null}

        {tags && tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={`${id}-${tag.title}`} label={tag.title} variant="tag" />
            ))}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
}
