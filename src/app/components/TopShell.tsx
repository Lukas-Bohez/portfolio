import { HeroPortrait } from './TopShell/HeroPortrait';
import { Button } from './ui/Button';

export function TopHero() {
  return (
    <section
      id="hero"
      data-hero=""
      className="relative mb-8 sm:mb-10 rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-12 shadow-lg text-default"
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.12em] sm:tracking-widest text-blue-400 dark:text-blue-200 font-semibold text-xs sm:text-base">
            Built to ship and stay usable
          </p>
          <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Lukas Bohez
          </h1>
          <p className="mt-4 text-base sm:text-xl text-default leading-relaxed">
            I build full-stack Python and TypeScript apps that are straightforward to ship, stable
            to run, and easy to hand off.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-blue-400 dark:border-blue-200 bg-blue-400/15 dark:bg-blue-400/20 px-3.5 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-semibold text-contrast">
            Actively interviewing for full-stack web developer roles
          </p>
          <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg text-default leading-relaxed">
            I care about backend architecture, clear UX, and reliable deployments.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="#projects" variant="primary">
              View featured work
            </Button>
            <Button href="/projects/" variant="secondary">
              View example project pictures →
            </Button>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
