import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8"
    >
      <section className="w-full rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-base text-default">
          The page you requested does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-blue-400/60 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-default transition hover:bg-blue-400/20"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
