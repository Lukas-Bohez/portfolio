export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <div className="h-3 w-36 animate-pulse rounded-full bg-primary/10" />
        <div className="mt-4 h-10 w-4/5 animate-pulse rounded-2xl bg-primary/10" />
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-primary/10" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-primary/10" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-primary/10" />
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-28 animate-pulse rounded-2xl border border-surface bg-surface shadow-md" />
        <div className="h-28 animate-pulse rounded-2xl border border-surface bg-surface shadow-md" />
      </section>

      <section className="mt-8 rounded-3xl border border-surface bg-surface p-6 shadow-lg sm:p-8">
        <div className="h-7 w-48 animate-pulse rounded-full bg-primary/10" />
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="h-56 animate-pulse rounded-2xl border border-surface bg-primary/5" />
          <div className="h-56 animate-pulse rounded-2xl border border-surface bg-primary/5" />
        </div>
      </section>
    </main>
  );
}
