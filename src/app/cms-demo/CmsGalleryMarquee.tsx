'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [isReady, setIsReady] = useState(false);
  const loadedIdsRef = useRef(new Set<string>());
  const fallbackTimerRef = useRef<number | null>(null);

  const duplicatedImages = useMemo(() => images, [images]);

  useEffect(() => {
    loadedIdsRef.current = new Set();
    setIsReady(false);

    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
    }

    fallbackTimerRef.current = window.setTimeout(() => {
      setIsReady(true);
    }, 2500);

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [images]);

  const onImageLoaded = (imageId: string) => {
    if (loadedIdsRef.current.has(imageId)) {
      return;
    }

    loadedIdsRef.current.add(imageId);
    if (loadedIdsRef.current.size >= images.length) {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      setIsReady(true);
    }
  };

  return (
    <div className={`cms-gallery-marquee ${isReady ? 'is-ready' : 'is-loading'} ${className ?? ''}`.trim()} aria-label={ariaLabel}>
      <div
        className={`cms-gallery-track ${compact ? 'cms-gallery-track--compact' : ''}`}
        style={{
          ['--cms-gallery-delay' as never]: `${-phaseOffsetSeconds}s`,
        }}
      >
        <div className="cms-gallery-group">
        {images.map((image, index) => {
          const isPriority = index < 2;
          return (
            <figure key={`cms-gallery-primary-${image.id}`} className={`cms-gallery-card ${compact ? 'cms-gallery-card--compact' : ''}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={540}
                sizes={compact ? '(min-width: 1280px) 460px, (min-width: 640px) 38vw, 82vw' : '(min-width: 1280px) 540px, (min-width: 640px) 46vw, 90vw'}
                className="cms-gallery-image"
                priority={isPriority}
                loading={isPriority ? 'eager' : 'eager'}
                onLoadingComplete={() => onImageLoaded(image.id)}
              />
            </figure>
          );
        })}
        </div>
        <div className="cms-gallery-group" aria-hidden="true">
          {duplicatedImages.map((image, index) => (
            <figure key={`cms-gallery-duplicate-${image.id}-${index}`} className={`cms-gallery-card ${compact ? 'cms-gallery-card--compact' : ''}`}>
              <Image
                src={image.src}
                alt=""
                width={900}
                height={540}
                sizes={compact ? '(min-width: 1280px) 460px, (min-width: 640px) 38vw, 82vw' : '(min-width: 1280px) 540px, (min-width: 640px) 46vw, 90vw'}
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