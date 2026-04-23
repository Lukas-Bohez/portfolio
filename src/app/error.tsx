'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RouteError({ error, reset }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-rose-400/30 bg-surface p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Application error
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
          Something blocked this page from rendering
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-default">
          {error.message || 'An unexpected error occurred. Try again to reload the current route.'}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full border border-blue-400/60 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-surface bg-muted/30 px-4 py-2 text-sm font-semibold text-default transition hover:bg-muted/50"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
