import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-rose-400/30 bg-surface p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Not Found</p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
          Project screenshot not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-default">
          The project you&apos;re looking for doesn&apos;t exist or may have been removed. Check the
          slug and try again.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/LukasBohez/projects/"
            className="rounded-full border border-blue-400/60 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
          >
            ← Back to all screenshots
          </Link>
          <Link
            href="/LukasBohez/"
            className="rounded-full border border-surface bg-muted/30 px-4 py-2 text-sm font-semibold text-default transition hover:bg-muted/50"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
