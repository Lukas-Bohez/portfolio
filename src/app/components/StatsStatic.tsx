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
      className="mb-10 scroll-mt-24 sm:mb-12 sm:scroll-mt-28 rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-10 shadow-lg text-default transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-2xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50"
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
          What I Do
        </h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted leading-relaxed">
          I keep the work practical, readable, and easy to ship
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 p-5 sm:p-7 shadow-md backdrop-blur transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/70 dark:md:hover:border-blue-300/70 md:hover:-translate-y-0.5"
          >
            <p className="text-sm sm:text-base font-semibold text-default uppercase tracking-[0.12em]">
              {metric.label}
            </p>
            <p className="mt-2.5 sm:mt-3 text-base sm:text-lg text-default leading-relaxed">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
