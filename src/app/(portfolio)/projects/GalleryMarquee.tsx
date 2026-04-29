'use client';

import type { CSSProperties } from 'react';

import ImageLightbox from '@/app/components/ImageLightbox';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type GalleryMarqueeProps = {
  images: GalleryImage[];
  direction?: 'left' | 'right';
  speed?: number;
  ariaLabel?: string;
};

export function GalleryMarquee({
  images,
  direction = 'left',
  speed = 32,
  ariaLabel,
}: GalleryMarqueeProps) {
  const doubled = [...images, ...images];
  const animClass = direction === 'right' ? 'marquee-track--right' : 'marquee-track--left';

  return (
    <div
      className="marquee-outer"
      aria-label={ariaLabel}
      aria-roledescription="scrolling image gallery"
      role="region"
    >
      <div
        className={`marquee-track ${animClass}`}
        style={{ '--marquee-speed': `${speed}s` } as CSSProperties}
      >
        {doubled.map((img, idx) => (
          <div key={`${img.id}-${idx}`} className="marquee-item" aria-hidden={idx >= images.length}>
            <ImageLightbox
              src={img.src}
              alt={idx < images.length ? img.alt : ''}
              imgClassName="marquee-img"
              width={320}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
