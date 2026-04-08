'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import profilePhoto from '../../../WIN_20260329_16_44_00_Pro.jpg';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';



const sectionVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="mb-10 sm:mb-12 rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-10 shadow-lg text-default transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-2xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 md:hover:-translate-y-0.5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={sectionVariants}
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">{title}</h2>
        {subtitle && <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  );
}

export function Navbar({
  onThemeToggle,
  isDark,
  onScrollTo,
}: {
  onThemeToggle: () => void;
  isDark: boolean;
  onScrollTo: (id: string) => void;
}) {
  const navItems = [
    { label: 'Projects', id: 'projects' },
    { label: 'What I Do', id: 'what-i-do' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 mb-6 sm:mb-8 flex w-full items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-surface bg-surface/98 dark:bg-surface/95 p-3.5 sm:p-5 text-[11px] sm:text-sm font-medium shadow-lg backdrop-blur transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50">
      <button
        type="button"
        className="flex min-w-0 items-center gap-2 text-base sm:text-xl font-black tracking-tight transition duration-200 hover:opacity-85"
        title="N = Nexus logo (focused systems engineering identity)"
        onClick={() => onScrollTo('hero')}
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
          <motion.button
            key={item.id}
            onClick={() => onScrollTo(item.id)}
            className="rounded-full px-2 sm:px-3 py-1.5 text-default transition duration-200 md:hover:bg-surface/50 md:hover:text-primary"
            aria-label={`Scroll to ${item.label}`}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            {item.label}
          </motion.button>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}

export function Hero({ onScrollToProjects, isDark }: { onScrollToProjects: () => void; isDark: boolean }) {
  return (
    <motion.section
      id="hero"
      data-hero=""
      className="relative mb-8 sm:mb-10 overflow-hidden rounded-3xl border border-surface bg-surface p-5 sm:p-8 lg:p-12 shadow-xl backdrop-blur text-default"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
      </div>
      <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.12em] sm:tracking-widest text-blue-400 dark:text-blue-200 font-semibold text-xs sm:text-base">Pragmatic code with scalable impact</p>
          <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">Lukas Bohez</h1>
          <p className="mt-4 text-base sm:text-xl text-default leading-relaxed">
            I build production-ready Python and full-stack systems that are fast to ship, reliable to run, and easy to maintain.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-blue-400 dark:border-blue-200 bg-blue-400/15 dark:bg-blue-400/20 px-3.5 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-semibold text-contrast">
            Actively interviewing for mid-senior roles
          </p>
          <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-default leading-relaxed">
            I focus on backend architecture, pragmatic UX, and self-hosted delivery from prototype to live product.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onScrollToProjects}
              className="rounded-full btn-primary px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:shadow-accent/40 md:hover:-translate-y-0.5 active:scale-[0.98]"
            >
              View featured work
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-full border-2 border-blue-400 dark:border-blue-200 bg-transparent px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-default transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:bg-blue-400/10 md:hover:shadow-md md:hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Get in touch
            </button>
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
    </motion.section>
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
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;

    const tick = () => {
      if (!isPaused && !isDragging) {
        track.scrollLeft += 0.65;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
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
    <section className="mb-10 sm:mb-12 overflow-hidden rounded-3xl border border-surface bg-surface p-4 sm:p-6 shadow-lg" data-reveal="" data-reveal-order={0}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-primary">Technical Arsenal</p>
        <div className="flex items-center gap-2">
          <button type="button" className="rail-control-btn" onClick={() => stepBy('prev')} aria-label="Scroll skills left">◀</button>
          <button type="button" className="rail-control-btn" onClick={() => setIsPaused((prev) => !prev)} aria-label={isPaused ? 'Resume auto scrolling' : 'Pause auto scrolling'}>
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <button type="button" className="rail-control-btn" onClick={() => stepBy('next')} aria-label="Scroll skills right">▶</button>
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
        {[...skills, ...skills].map((line, index) => (
          <span key={`${line}-${index}`} className="marquee-chip">
            {line}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  const metrics = [
    {
      label: 'Production-focused engineering',
      value: 'Live services, not demos',
    },
    {
      label: 'Backend-first mindset',
      value: 'Python APIs + durable data flows',
    },
    {
      label: 'Product communication',
      value: 'Clear docs, articles, and handoff notes',
    },
    {
      label: 'Transparent delivery',
      value: 'Code, impact, and deployment details that are easy to inspect',
    },
  ];

  return (
    <Section id="what-i-do" title="What I Do" subtitle="Value, scope, and delivery shape how I work">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            className="rounded-2xl border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 p-5 sm:p-7 shadow-md backdrop-blur transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/70 dark:md:hover:border-blue-300/70 md:hover:-translate-y-0.5 will-change-[transform,opacity]"
            data-reveal=""
            data-reveal-order={index}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <p className="text-sm sm:text-base font-semibold text-primary uppercase tracking-[0.12em]">{metric.label}</p>
            <p className="mt-2.5 sm:mt-3 text-base sm:text-lg text-default leading-relaxed">{metric.value}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function AboutAndSkills({ isDark }: { isDark: boolean }) {
  const principles = [
    {
      title: 'Production-Focused Engineering',
      copy: 'I build stable, live services that are designed for real-world reliability instead of demo-only polish.',
    },
    {
      title: 'Backend-First Mindset',
      copy: 'I design durable data flows, Python APIs, and release workflows that support long-term maintainability.',
    },
    {
      title: 'Technical Communication',
      copy: 'I write clear documentation, articles, and handoff notes that reduce support overhead and speed up adoption.',
    },
    {
      title: 'End-to-End Ownership',
      copy: 'I move confidently from architecture to implementation to deployment, without losing performance or clarity.',
    },
  ];

  return (
    <Section id="about" title="Engineering Foundations" subtitle="The habits that keep the work shippable and easy to trust">
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((principle, index) => (
          <motion.article
            key={principle.title}
            className="rounded-2xl border border-surface bg-surface p-5 sm:p-6 shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            data-reveal=""
            data-reveal-order={index}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary">{principle.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-default">{principle.copy}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function FeaturedProjects({ isDark }: { isDark: boolean }) {
  const projects = [
    {
      name: 'Quiz The Spire',
      description:
        'Online quiz platform powered by a Python backend, with article publishing and project showcases. It is the live hub where I present my tools and host my portfolio at quizthespire.com.',
      url: 'https://quizthespire.com',
      tech: ['Python', 'FastAPI', 'Apache', 'Content Management'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Convert the Spire Reborn',
      description:
        'Cross-platform media utility focused on reliability, fast iteration, and practical user workflows across desktop and Android.',
      url: 'https://github.com/Lukas-Bohez/ConvertTheSpireFlutter',
      tech: ['Flutter', 'Dart', 'yt-dlp', 'SQLite'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      name: 'Vault The Spire',
      description:
        'Secure messaging and data tooling project that explores privacy-minded architecture, peer networking, and maintainable systems design.',
      url: 'https://github.com/Lukas-Bohez/vault_the_spire',
      tech: ['Rust', 'Libp2p', 'AES', 'PocketBase'],
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <Section id="projects" title="Featured Projects" subtitle="Code you can inspect and use today">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            className="rounded-2xl border border-surface bg-surface p-4 sm:p-5 shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 md:hover:-translate-y-1 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            data-reveal=""
            data-reveal-order={index}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`h-3 flex-1 rounded-full bg-gradient-to-r ${project.color} opacity-90 transition hover:opacity-100 gradient-sweep`} />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface bg-surface text-xs font-black text-primary shadow-sm">
                {project.name.replace(/[^A-Z]/g, '').slice(0, 1) || project.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary">{project.name}</h3>
            <p className="mt-3 text-base sm:text-lg text-default leading-relaxed">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={`${project.name}-${item}`} className="rounded-full border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 px-3 py-1.5 text-sm sm:text-base font-medium text-default transition duration-200 md:hover:shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center text-base sm:text-lg font-semibold text-blue-400 dark:text-blue-200 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:text-blue-500 dark:md:hover:text-blue-100 md:hover:translate-x-1"
            >
              Explore ↗
            </a>
          </motion.article>
        ))}
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
      title: 'No Endless Loading Theater',
      copy: 'Every animation has intent, timing, and an off-ramp so the experience feels dynamic, controlled, and easy to trust.',
    },
  ];

  return (
    <Section id="philosophy" title="Engineering Philosophy" subtitle="Memorable engineering with playful but professional storytelling">
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, index) => (
          <motion.article
            key={story.title}
            className="rounded-2xl border border-surface bg-surface p-5 sm:p-6 shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            data-reveal=""
            data-reveal-order={index}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary">{story.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-default">{story.copy}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export function ContactSection({ isDark }: { isDark: boolean }) {
  return (
    <Section
      id="contact"
      title="Let’s connect"
      subtitle="I’m actively interviewing and available for mid-senior roles"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <motion.a
          href="mailto:lukasbohez@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:-translate-y-1 md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={0}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          <span className="font-bold text-lg text-primary">Email</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Reach out for contract and full-time opportunities.</span>
        </motion.a>
        <motion.a
          href="https://github.com/Lukas-Bohez"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:-translate-y-1 md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={1}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          <span className="font-bold text-lg text-primary">GitHub</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Open source work and active contributions.</span>
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/lukas-bohez-3ba566271/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-surface bg-surface p-5 sm:p-7 text-base text-default shadow-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:-translate-y-1 md:hover:shadow-xl md:hover:border-blue-400/50 dark:md:hover:border-blue-300/50 mb-[clamp(20px,3vh,44px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={2}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          <span className="font-bold text-lg text-primary">LinkedIn</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Mid-senior roles,<br />open to opportunities.</span>
        </motion.a>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="my-8 sm:my-10 w-full rounded-3xl border-2 border-blue-400/40 dark:border-blue-300/40 bg-surface/70 p-5 sm:p-8 text-center text-base sm:text-lg text-default transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:shadow-lg md:hover:border-blue-400/70 dark:md:hover:border-blue-300/70">
      <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-full border border-surface bg-secondary align-middle shadow-sm" title="Portrait of Lukas Bohez">
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
        <a href="mailto:lukasbohez@gmail.com" className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline">Email</a>
        <span className="text-default">·</span>
        <a href="https://github.com/Lukas-Bohez" target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline">GitHub</a>
        <span className="text-default">·</span>
        <a href="https://www.linkedin.com/in/lukas-bohez-3ba566271/" target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-100 transition font-semibold hover:underline">LinkedIn</a>
      </div>
    </footer>
  );
}
