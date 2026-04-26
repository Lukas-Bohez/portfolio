'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type CmsGalleryMarqueeProps = {
  images: GalleryImage[];
  direction?: 'left' | 'right';
  speed?: number;
  ariaLabel?: string;
};

export function CmsGalleryMarquee({
  images,
  direction = 'left',
  speed = 32,
  ariaLabel,
}: CmsGalleryMarqueeProps) {
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
            <Image
              src={img.src}
              alt={idx < images.length ? img.alt : ''}
              width={320}
              height={200}
              className="marquee-img"
              loading={idx < 3 ? 'eager' : 'lazy'}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
