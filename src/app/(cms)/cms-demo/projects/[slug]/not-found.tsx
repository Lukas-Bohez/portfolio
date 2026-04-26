import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-primary">Project not found</h1>
        <p className="mt-3 text-base text-default">
          This CMS project slug does not exist or is not published.
        </p>
        <Link
          href="/cms-demo"
          className="mt-5 inline-flex rounded-full border border-blue-400/60 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
        >
          Back to CMS demo
        </Link>
      </section>
    </main>
  );
}
