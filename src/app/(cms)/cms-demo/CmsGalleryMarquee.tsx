'use client';

import Image from 'next/image';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type CmsGalleryMarqueeProps = {
  images: GalleryImage[];
  className?: string;
  compact?: boolean;
  ariaLabel?: string;
  phaseOffsetSeconds?: number;
};

export function CmsGalleryMarquee({
  images,
  className,
  compact = false,
  ariaLabel,
  phaseOffsetSeconds = 0,
}: CmsGalleryMarqueeProps) {
  const duplicatedImages = [...images];

  return (
    <div
      className={`cms-gallery-marquee is-ready ${className ?? ''}`.trim()}
      aria-label={ariaLabel}
    >
      <div
        className={`cms-gallery-track ${compact ? 'cms-gallery-track--compact' : ''}`}
        style={{
          ['--cms-gallery-duration' as never]: compact ? '58s' : '68s',
          ['--cms-gallery-delay' as never]: `${-phaseOffsetSeconds}s`,
        }}
      >
        <div className="cms-gallery-group">
          {images.map((image, index) => {
            const isPriority = index < 2;
            return (
              <figure
                key={`cms-gallery-primary-${image.id}`}
                className={`cms-gallery-card ${compact ? 'cms-gallery-card--compact' : ''}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={540}
                  sizes={
                    compact
                      ? '(min-width: 1280px) 460px, (min-width: 640px) 38vw, 82vw'
                      : '(min-width: 1280px) 540px, (min-width: 640px) 46vw, 90vw'
                  }
                  className="cms-gallery-image"
                  priority={isPriority}
                  loading={isPriority ? 'eager' : 'eager'}
                />
              </figure>
            );
          })}
        </div>
        <div className="cms-gallery-group" aria-hidden="true">
          {duplicatedImages.map((image, index) => (
            <figure
              key={`cms-gallery-duplicate-${image.id}-${index}`}
              className={`cms-gallery-card ${compact ? 'cms-gallery-card--compact' : ''}`}
            >
              <Image
                src={image.src}
                alt=""
                width={900}
                height={540}
                sizes={
                  compact
                    ? '(min-width: 1280px) 460px, (min-width: 640px) 38vw, 82vw'
                    : '(min-width: 1280px) 540px, (min-width: 640px) 46vw, 90vw'
                }
                className="cms-gallery-image"
                aria-hidden="true"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
