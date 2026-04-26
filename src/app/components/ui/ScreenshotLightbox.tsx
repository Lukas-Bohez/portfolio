'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type Shot = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: Shot[];
};

export function ScreenshotLightbox({ images }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="screenshot-grid">
        {images.map((img, idx) => (
          <button
            key={img.id}
            className="screenshot-card"
            onClick={() => setOpen(idx)}
            aria-label={`View screenshot: ${img.alt}`}
          >
            <div className="screenshot-img-wrap">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                unoptimized
                loading={idx < 3 ? 'eager' : 'lazy'}
              />
              <span className="screenshot-expand-icon" aria-hidden>
                ⤢
              </span>
            </div>
            {img.caption && <p className="screenshot-caption">{img.caption}</p>}
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox-backdrop"
          onClick={close}
          role="dialog"
          aria-modal
          aria-label="Screenshot viewer"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">
              ✕
            </button>
            <button
              className="lightbox-nav lightbox-nav--prev"
              onClick={prev}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className="lightbox-img-wrap">
              <Image
                src={images[open].src}
                alt={images[open].alt}
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <button className="lightbox-nav lightbox-nav--next" onClick={next} aria-label="Next">
              ›
            </button>
            <p className="lightbox-caption">{images[open].caption || images[open].alt}</p>
            <p className="lightbox-counter">
              {open + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
