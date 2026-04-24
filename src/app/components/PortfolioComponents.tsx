'use client';

import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import profilePhoto from '../../../WIN_20260329_16_44_00_Pro.jpg';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mb-10 scroll-mt-24 sm:mb-12 sm:scroll-mt-28 rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-10 shadow-lg text-default transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-2xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50"
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function Navbar() {
  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'What I Do', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 mb-6 sm:mb-8 flex w-full items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-surface bg-surface/98 dark:bg-surface/95 p-3.5 sm:p-5 text-[11px] sm:text-sm font-medium shadow-lg backdrop-blur transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50">
      <button
        type="button"
        className="flex min-w-0 items-center gap-2 text-base sm:text-xl font-black tracking-tight transition duration-200 hover:opacity-85"
        title="N = Nexus logo (focused systems engineering identity)"
        onClick={() => {
          const element = document.getElementById('hero');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
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
      </button>
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
        <a
          href="cms-demo/"
          className="rounded-full border border-blue-400/60 px-2 sm:px-3 py-1.5 text-default transition duration-200 md:hover:bg-blue-400/10 md:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
          aria-label="Open CMS demo"
        >
          CMS Demo
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      data-hero=""
      className="relative mb-8 sm:mb-10 overflow-hidden rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-12 shadow-xl backdrop-blur text-default"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
      </div>
      <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
          <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-default leading-relaxed">
            I care about backend architecture, clear UX, and deployments that hold up in the real
            world. This portfolio highlights Quiz The Spire, Convert The Spire Reborn v10.2.3, a CMS
            demo with Sanity + Cloudinary, and the Lofi browser extension.
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
            <a
              href="cms-demo/"
              className="rounded-full border-2 border-emerald-400/80 bg-transparent px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-default transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:bg-emerald-400/10 md:hover:shadow-md md:hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-2)]"
            >
              Go to CMS demo
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          {profilePhoto ? (
            <motion.div
              className="relative h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-surface bg-secondary shadow-xl"
              animate={{ y: [0, -6, 0], rotate: [0, 0.6, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={profilePhoto}
                alt="Portrait of Lukas Bohez"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 18rem, 14rem"
                className="object-cover object-[50%_20%] scale-[1.15]"
              />
            </motion.div>
          ) : (
            <div
              className="mt-8 h-3 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-500 shadow-md shadow-emerald-400/20"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export function RecruiterWowStrip() {
  const skills = [
    'Python',
    'FastAPI',
    'Next.js',
    'TypeScript',
    'Framer Motion',
    'SQL',
    'SQLite',
    'Docker',
    'Linux',
    'CI/CD',
    'API Design',
    'System Reliability',
    'Performance Tuning',
    'Technical Writing',
    'Self-Hosted Deployment',
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const loopWidthRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const syncLoopWidth = () => {
      loopWidthRef.current = group.getBoundingClientRect().width;
    };

    syncLoopWidth();
    const observer = new ResizeObserver(syncLoopWidth);
    observer.observe(group);

    let frameId = 0;

    const tick = () => {
      const loopWidth = loopWidthRef.current;
      if (!isPaused && !isDragging && loopWidth > 0) {
        track.scrollLeft += 0.65;
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft -= loopWidth;
        }
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [isPaused, isDragging]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.active = false;
    setIsDragging(false);
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  const stepBy = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.7, 460);
    const sign = direction === 'next' ? 1 : -1;
    track.scrollBy({ left: sign * amount, behavior: 'smooth' });
  };

  return (
    <section
      className="mb-10 sm:mb-12 overflow-hidden rounded-3xl border border-surface bg-surface p-4 sm:p-6 shadow-lg"
      data-reveal=""
      data-reveal-order={0}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-primary">
          Technical Arsenal
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rail-control-btn"
            onClick={() => stepBy('prev')}
            aria-label="Scroll skills left"
          >
            ◀
          </button>
          <button
            type="button"
            className="rail-control-btn"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume auto scrolling' : 'Pause auto scrolling'}
          >
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <button
            type="button"
            className="rail-control-btn"
            onClick={() => stepBy('next')}
            aria-label="Scroll skills right"
          >
            ▶
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className={`skills-rail ${isDragging ? 'is-dragging' : ''}`}
        aria-label="Draggable skills rail"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div ref={groupRef} className="skills-rail-group">
          {skills.map((line) => (
            <span key={`skills-a-${line}`} className="marquee-chip">
              {line}
            </span>
          ))}
        </div>
        <div className="skills-rail-group" aria-hidden="true">
          {skills.map((line) => (
            <span key={`skills-b-${line}`} className="marquee-chip">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
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
    <Section
      id="what-i-do"
      title="What I Do"
      subtitle="I keep the work practical, readable, and easy to ship"
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            className="rounded-2xl border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 p-5 sm:p-7 shadow-md backdrop-blur transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/70 dark:md:hover:border-blue-300/70 md:hover:-translate-y-0.5 will-change-[transform,opacity]"
            data-reveal=""
            data-reveal-order={index}
            whileHover={{ y: -2, scale: 1.003 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <p className="text-sm sm:text-base font-semibold text-primary uppercase tracking-[0.12em]">
              {metric.label}
            </p>
            <p className="mt-2.5 sm:mt-3 text-base sm:text-lg text-default leading-relaxed">
              {metric.value}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function AboutAndSkills() {
  const principles = [
    {
      title: 'Built for real use',
      copy: 'I build stable live services that people can actually depend on.',
    },
    {
      title: 'Backend-first habits',
      copy: 'I like clean data flows, Python APIs, and release processes that do not fall apart later.',
    },
    {
      title: 'Clear communication',
      copy: 'I write documentation and handoff notes that help other people move faster.',
    },
    {
      title: 'End-to-end ownership',
      copy: 'I stay with a project from planning to deployment, and I try to keep it simple enough to maintain.',
    },
  ];

  return (
    <Section
      id="about"
      title="How I Work"
      subtitle="The habits that keep projects moving without getting messy"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((principle) => (
          <article
            key={principle.title}
            className="rounded-2xl border border-surface bg-surface p-5 sm:p-6 shadow-md transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary">{principle.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-default">{principle.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function FeaturedProjects() {
  const projects = [
    {
      name: 'Quiz The Spire',
      description:
        'Full-stack live multiplayer quiz platform with real-time leaderboards, AI-generated themes via SpireAI, and community-created content. Built with vanilla JS, Apache2, and a Python backend. Serving users across 95+ countries.',
      url: 'https://quizthespire.com',
      tech: ['Python', 'FastAPI', 'Apache', 'Content Management'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Lofi Extension',
      description:
        'Ambient browser extension for lo-fi background music with direct downloads for Chromium browsers and Firefox. Designed to help users stay focused while browsing or working online.',
      url: 'https://quizthespire.com/pages/lofi-download/',
      downloadUrl: 'https://quizthespire.com/pages/lofi-download/',
      downloadLabel: 'Download extension',
      tech: ['JavaScript', 'Browser Extension', 'Audio Player', 'UX'],
      color: 'from-pink-500 to-orange-500',
    },
    {
      name: 'Convert the Spire Reborn',
      description:
        'Open-source Flutter desktop and mobile app for downloading and converting media from 1,800+ sites. Features 4K/8K downloads, 27+ format conversions, built-in media player, torrent management, DLNA casting, and a built-in browser. v10.2.3 improves crash resilience for long-running sessions while keeping BitPlayer integrated. 8 release assets are available for Windows, Linux, macOS, and Android. GPLv3 licensed.',
      url: 'https://github.com/Lukas-Bohez/ConvertTheSpireFlutter/releases/tag/v10.2.3',
      downloadUrl:
        'https://github.com/Lukas-Bohez/ConvertTheSpireFlutter/releases/download/v10.2.3/ConvertTheSpireReborn-windows-x64.zip',
      downloadLabel: 'Download Windows ZIP',
      tech: ['Flutter', 'Dart', 'SQLite', 'FFmpeg', 'yt-dlp', '8 release assets'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      name: 'BitPlayer: Torrent & Media',
      description:
        'BitPlayer: Torrent & Media is now part of Convert The Spire Reborn v10.2.3. It combines torrent management, in-app browsing, fast local library loading, Bluetooth media controls, and reliable background playback in one unified experience.',
      url: 'https://quizthespire.com/pages/vault/',
      tech: ['Integrated into Convert v10.2.3', 'Flutter', 'Dart', 'Torrenting', 'Testing Group'],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'CMS Demo: Sanity + Cloudinary',
      description:
        'Separate Next.js App Router demo that fetches editable CMS content from Sanity in Server Components, uses explicit Next.js 16 fetch revalidation strategies, and renders Cloudinary-hosted generated visuals with transformation URLs.',
      url: 'cms-demo/',
      tech: ['Next.js 16', 'Sanity', 'Cloudinary', 'Server Components', 'revalidate fetch'],
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <Section id="projects" title="Featured Projects" subtitle="Code you can inspect and use today">
      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            className="w-full rounded-2xl border border-surface bg-surface p-4 sm:p-5 shadow-md transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, scale: 1.004 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            data-reveal=""
            data-reveal-order={index}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`h-3 flex-1 rounded-full bg-gradient-to-r ${project.color} opacity-90 transition hover:opacity-100 gradient-sweep`}
              />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface bg-surface text-xs font-black text-primary shadow-sm">
                {project.name.replace(/[^A-Z]/g, '').slice(0, 1) || project.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary">{project.name}</h3>
            <p className="mt-3 text-base sm:text-lg text-default leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={`${project.name}-${item}`}
                  className="rounded-full border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 px-3 py-1.5 text-sm sm:text-base font-medium text-default transition duration-150 md:hover:shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center text-base sm:text-lg font-semibold text-blue-400 dark:text-blue-200 transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:text-blue-500 dark:md:hover:text-blue-100 md:hover:translate-x-0.5"
              >
                Explore ↗
              </a>
              {project.downloadUrl ? (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-200 transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:text-blue-600 dark:md:hover:text-blue-100 md:hover:translate-x-0.5"
                >
                  {project.downloadLabel || 'Download'} ↗
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function MonetizationShowcase() {
  const [adState, setAdState] = useState<'loading' | 'ready' | 'blocked'>('loading');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdState('ready');
        } else {
          setAdState('blocked');
        }
      } catch {
        setAdState('blocked');
      }
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Section
      id="monetization"
      title="Monetization & Ads"
      subtitle="A controlled, non-obtrusive ad integration showcase from Quiz The Spire"
    >
      <Script
        id="portfolio-adsense"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8418485814964449"
        crossOrigin="anonymous"
      />

      <div className="rounded-2xl border border-surface bg-surface p-5 sm:p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Sponsored placement demo
          </p>
          <span className="rounded-full border border-blue-400/40 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-default">
            Non-obtrusive
          </span>
        </div>

        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px' }}
          data-ad-client="ca-pub-8418485814964449"
          data-ad-slot="7822007431"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        <p className="mt-4 text-sm text-muted leading-relaxed">
          {adState === 'ready'
            ? 'Ad integration is active and the layout stays clean.'
            : adState === 'blocked'
              ? 'Ad preview is blocked in this browser, but the integration is wired up.'
              : 'Loading ad preview...'}
        </p>
      </div>
    </Section>
  );
}

export function HumorSection() {
  const stories = [
    {
      title: 'Fast Clarity Rule',
      copy: 'If a feature cannot be explained quickly, it gets refined until the intent is obvious and the implementation stays honest.',
    },
    {
      title: 'Performance Budget Discipline',
      copy: 'I treat runtime budgets like real currency: spend where it improves outcomes and avoid costly visual noise or premature complexity.',
    },
    {
      title: 'No endless loading',
      copy: 'I keep motion purposeful so the page feels alive without turning into a waiting screen.',
    },
  ];

  return (
    <Section
      id="philosophy"
      title="How I Think About Building"
      subtitle="A few rules I actually try to follow"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, index) => (
          <motion.article
            key={story.title}
            className="rounded-2xl border border-surface bg-surface p-5 sm:p-6 shadow-md transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
            data-reveal=""
            data-reveal-order={index}
            whileHover={{ y: -2, scale: 1.003 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary">{story.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-default">{story.copy}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Let’s connect"
      subtitle="I’m actively interviewing and available for full-stack web developer roles"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <motion.a
          href="mailto:lukasbohez@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={0}
          whileHover={{ y: -2, scale: 1.003 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <span className="font-bold text-lg text-primary">Email</span>
          <span className="mt-3 text-base text-default block leading-relaxed">
            Reach out for contract and full-time opportunities.
          </span>
        </motion.a>
        <motion.a
          href="https://github.com/Lukas-Bohez"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={1}
          whileHover={{ y: -2, scale: 1.003 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <span className="font-bold text-lg text-primary">GitHub</span>
          <span className="mt-3 text-base text-default block leading-relaxed">
            Open source work and active contributions.
          </span>
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/lukas-bohez-3ba566271/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={2}
          whileHover={{ y: -2, scale: 1.003 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <span className="font-bold text-lg text-primary">LinkedIn</span>
          <span className="mt-3 text-base text-default block leading-relaxed">
            Full-stack web developer roles,
            <br />
            open to opportunities.
          </span>
        </motion.a>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="my-8 sm:my-10 w-full rounded-3xl border-2 border-blue-400/40 dark:border-blue-300/40 bg-surface/70 p-5 sm:p-8 text-center text-base sm:text-lg text-default transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/70 dark:md:hover:border-blue-300/70">
      <span
        className="relative inline-flex h-9 w-9 overflow-hidden rounded-full border border-surface bg-secondary align-middle shadow-sm"
        title="Portrait of Lukas Bohez"
      >
        <Image
          src={profilePhoto}
          alt="Portrait of Lukas Bohez"
          fill
          sizes="36px"
          className="object-cover object-[50%_18%] scale-[1.35]"
        />
      </span>
      <span className="ml-2 font-bold">Lukas Bohez</span>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <a
          href="mailto:lukasbohez@gmail.com"
          className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline"
        >
          Email
        </a>
        <span className="text-default">·</span>
        <a
          href="https://github.com/Lukas-Bohez"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline"
        >
          GitHub
        </a>
        <span className="text-default">·</span>
        <a
          href="https://www.linkedin.com/in/lukas-bohez-3ba566271/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
