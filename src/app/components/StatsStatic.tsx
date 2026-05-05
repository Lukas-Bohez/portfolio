export function StatsStatic() {
  const metrics = [
    {
      label: 'Built for real use',
      value: 'Live services, not demos',
    },
    {
      label: 'Backend-first habits',
      value: 'Python APIs + durable data flows',
    },
    {
      label: 'Clear communication',
      value: 'Clear docs, articles, and handoff notes',
    },
    {
      label: 'Open delivery',
      value: 'Code, impact, and deployment details that are easy to inspect',
    },
  ];

  return (
    <section
      id="what-i-do"
      className="mb-10 scroll-mt-24 sm:mb-12 sm:scroll-mt-28 overflow-hidden rounded-3xl border border-surface bg-surface/95 p-5 text-default shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:border-blue-400/50 md:hover:shadow-[0_28px_90px_-46px_rgba(15,23,42,0.55)] dark:md:hover:border-blue-300/50"
    >
      <div className="mb-8 border-b border-line pb-5 sm:pb-6">
        <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary/80">
          Portfolio section
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight text-pretty">
          What I Do
        </h2>
        <p className="mt-2 sm:mt-3 max-w-3xl text-base sm:text-lg text-muted leading-relaxed text-pretty">
          I keep the work practical, readable, and easy to ship
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-blue-400/30 dark:border-blue-300/30 bg-gradient-to-br from-blue-400/10 via-transparent to-surface/80 p-5 sm:p-7 shadow-[0_18px_50px_-36px_rgba(37,99,235,0.75)] backdrop-blur transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:-translate-y-0.5 md:hover:border-blue-400/60 md:hover:shadow-[0_22px_60px_-32px_rgba(37,99,235,0.95)] dark:md:hover:border-blue-300/60"
          >
            <p className="text-[0.7rem] sm:text-xs font-bold text-primary uppercase tracking-[0.2em]">
              {metric.label}
            </p>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-default leading-relaxed text-pretty">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
