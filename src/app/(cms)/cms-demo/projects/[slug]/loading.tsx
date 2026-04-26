export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <div className="h-56 animate-pulse rounded-2xl bg-primary/10" />
        <div className="mt-6 h-8 w-2/3 animate-pulse rounded-full bg-primary/10" />
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-primary/10" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-primary/10" />
          <div className="h-4 w-4/5 animate-pulse rounded-full bg-primary/10" />
        </div>
      </section>
    </main>
  );
}
