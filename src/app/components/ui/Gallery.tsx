'use client';

import { ReactNode, createContext, useContext } from 'react';

export interface GalleryContextType {
  variant?: 'grid' | 'carousel';
  columns?: 2 | 3 | 4;
}

const GalleryContext = createContext<GalleryContextType>({});

export function Gallery({
  children,
  variant = 'grid',
  columns = 2,
}: {
  children: ReactNode;
  variant?: 'grid' | 'carousel';
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 3 ? 'sm:grid-cols-3' : columns === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-2';

  return (
    <GalleryContext.Provider value={{ variant, columns }}>
      <div className={`grid gap-5 ${gridClass}`}>{children}</div>
    </GalleryContext.Provider>
  );
}

export interface GalleryItemProps {
  children: ReactNode;
  caption?: string;
}

export function GalleryItem({ children, caption }: GalleryItemProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-surface bg-surface shadow-md">
      {children}
      {caption && <figcaption className="px-4 py-3 text-sm text-muted">{caption}</figcaption>}
    </article>
  );
}

export function GalleryEmpty({ message = 'No items to display' }: { message?: string }) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-surface bg-surface/50 p-12 text-center">
      <p className="text-muted">{message}</p>
    </div>
  );
}

export function useGalleryContext() {
  return useContext(GalleryContext);
}
