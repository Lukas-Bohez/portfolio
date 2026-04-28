import Image from 'next/image';

import { ThemeToggle } from './ThemeToggle';
import profilePhoto from '../../../WIN_20260329_16_44_00_Pro.jpg';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'What I Do', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'All Projects', href: '/projects/', isExternal: true },
];

const baseLinkClass =
  'inline-flex items-center justify-center rounded-full text-default transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)] md:hover:bg-surface/50 md:hover:text-primary';

const plainLinkClass = `${baseLinkClass} px-1.5 py-1 text-[11px] sm:px-3 sm:py-2 sm:text-sm md:text-base`;

const qtsLinkClass =
  'inline-flex items-center justify-center rounded-full border border-emerald-400/60 px-2 py-1 text-[11px] text-default transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)] md:hover:bg-emerald-400/10 md:hover:text-primary sm:px-3 sm:py-2 sm:text-sm md:text-base';

function BrandLink() {
  return (
    <a
      href="#hero"
      className="flex min-w-0 items-center gap-2 text-base font-black tracking-tight transition duration-200 hover:opacity-85 sm:text-lg md:text-xl"
      title="Back to top"
      aria-label="Back to top"
    >
      <span className="relative h-8 w-8 overflow-hidden rounded-full border border-surface bg-secondary shadow-sm sm:h-9 sm:w-9">
        <Image
          src={profilePhoto}
          alt="Portrait of Lukas Bohez"
          fill
          sizes="36px"
          priority
          className="object-cover object-[50%_18%] scale-[1.35]"
        />
      </span>
      <span className="text-sm font-bold sm:hidden">Lukas B.</span>
      <span className="hidden sm:inline">Lukas Bohez</span>
    </a>
  );
}

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 mb-6 w-full rounded-2xl border border-surface bg-surface/98 p-3.5 text-[11px] font-medium shadow-lg transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-8 sm:rounded-3xl sm:p-5 dark:bg-surface/95 md:hover:border-blue-400/50 md:hover:shadow-xl dark:md:hover:border-blue-300/50">
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <BrandLink />
        <ThemeToggle />
      </div>

      <div className="mt-2 grid min-h-[44px] w-full grid-cols-4 items-center justify-around gap-0.5 sm:hidden">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={plainLinkClass}
            aria-label={item.isExternal ? `Go to ${item.label}` : `Scroll to ${item.label}`}
          >
            {item.label}
          </a>
        ))}
        <a
          href="https://quizthespire.com/"
          className={qtsLinkClass}
          aria-label="Go back to Quiz The Spire"
        >
          <span className="sm:hidden">QTS</span>
          <span className="hidden sm:inline">Quiz The Spire</span>
        </a>
      </div>

      <div className="hidden items-center justify-between gap-4 sm:flex">
        <BrandLink />
        <div className="flex items-center gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${baseLinkClass} min-h-11 px-3 py-2 text-[11px] sm:text-sm md:text-base`}
              aria-label={item.isExternal ? `Go to ${item.label}` : `Scroll to ${item.label}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://quizthespire.com/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-400/60 px-3 py-2 text-base text-default transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)] md:hover:bg-emerald-400/10 md:hover:text-primary"
            aria-label="Go back to Quiz The Spire"
          >
            Quiz The Spire
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
