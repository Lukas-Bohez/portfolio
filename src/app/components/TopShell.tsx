import Link from 'next/link';
import Image from 'next/image';
import profilePhoto from '../../../WIN_20260329_16_44_00_Pro.jpg';
import { ThemeToggle } from './ThemeToggle';

export function TopNavbar() {
  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'What I Do', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 mb-6 sm:mb-8 flex w-full items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-surface bg-surface/98 dark:bg-surface/95 p-3.5 sm:p-5 text-[11px] sm:text-sm font-medium shadow-lg transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50">
      <a
        href="#hero"
        className="flex min-w-0 items-center gap-2 text-base sm:text-xl font-black tracking-tight transition duration-200 hover:opacity-85"
        title="N = Nexus logo (focused systems engineering identity)"
      >
        <span className="relative h-8 w-8 overflow-hidden rounded-full border border-surface bg-secondary shadow-sm sm:h-9 sm:w-9">
          <Image
            src={profilePhoto}
            alt="Portrait of Lukas Bohez"
            fill
            sizes="36px"
            className="object-cover object-[50%_18%] scale-[1.35]"
          />
        </span>
        <span className="hidden sm:inline">Lukas Bohez</span>
      </a>
      <div className="flex items-center gap-1.5 sm:gap-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-full px-2 sm:px-3 py-1.5 text-default transition duration-200 md:hover:bg-surface/50 md:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
            aria-label={`Scroll to ${item.label}`}
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/cms-demo/"
          className="rounded-full border border-blue-400/60 px-2 sm:px-3 py-1.5 text-default transition duration-200 md:hover:bg-blue-400/10 md:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
          aria-label="Open CMS demo page"
        >
          CMS Demo
        </Link>
        <a
          href="https://quizthespire.com/"
          className="rounded-full border border-emerald-400/60 px-2 sm:px-3 py-1.5 text-default transition duration-200 md:hover:bg-emerald-400/10 md:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
          aria-label="Go back to Quiz The Spire"
        >
          Quiz The Spire
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

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
            <a
              href="#projects"
              className="rounded-full btn-primary px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:shadow-accent/40 md:hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
            >
              View featured work
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-blue-400 dark:border-blue-200 bg-transparent px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-default transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:bg-blue-400/10 md:hover:shadow-md md:hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
            >
              Get in touch
            </a>
            <Link
              href="/cms-demo/"
              className="rounded-full border-2 border-emerald-400/80 bg-transparent px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-default transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:bg-emerald-400/10 md:hover:shadow-md md:hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
            >
              Go to CMS demo
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <div className="relative h-52 w-52 xl:h-64 xl:w-64 shrink-0 overflow-hidden rounded-full border border-surface bg-secondary shadow-xl">
            <Image
              src={profilePhoto}
              alt="Lukas Bohez"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 256px"
              className="object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
