'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-rose-400/30 bg-surface p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-primary">Project could not load</h1>
        <p className="mt-3 text-sm text-default">
          {error.message || 'Unexpected project loading error.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full border border-blue-400/60 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
