'use client';


import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

import type { ReactNode } from 'react';



const sectionVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
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
      className="mb-10 rounded-3xl border border-surface bg-surface p-6 shadow-lg text-default"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={sectionVariants}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
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
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 mx-auto mb-5 flex w-full max-w-6xl items-center justify-between rounded-3xl border border-surface bg-surface/90 p-4 text-sm font-medium shadow-lg backdrop-blur">
      <button
        type="button"
        className="flex items-center gap-2 text-xl font-black tracking-tight"
        title="N = Nexus logo (focused systems engineering identity)"
        onClick={() => onScrollTo('hero')}
      >
        <span className="rounded-full border border-surface bg-primary-2 px-2 py-1 text-xs font-black text-default">N</span>
        Lukas Bohez
      </button>
      <div className="flex items-center gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScrollTo(item.id)}
            className="rounded-full px-3 py-1 text-default transition hover:bg-surface"
            aria-label={`Scroll to ${item.label}`}
          >
            {item.label}
          </button>
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
      className="mb-10 rounded-3xl border border-surface bg-surface p-8 shadow-xl backdrop-blur text-default"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="grid gap-6 lg:grid-cols-1">
        <div>
          <p className="uppercase tracking-widest text-blue-700 dark:text-blue-300">Modern code with artisan impact</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-6xl">Lukas Bohez</h1>
          <p className="mt-3 text-sm text-default sm:text-lg">
            I build secure, maintainable systems for Linux, Raspberry Pi, and self-hosted workflows.
          </p>
          <p className="mt-2 inline-flex rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs font-medium text-primary">
            Actively interviewing for mid-senior roles
          </p>
          <p className="mt-4 max-w-xl text-base text-default">
            Systems, automation, and media pipelines that run reliably in real environments. No vaporware.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onScrollToProjects}
              className="rounded-full btn-primary px-5 py-2.5 text-sm font-semibold transition"
            >
              View featured work
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-full border border-surface bg-black/5 px-5 py-2.5 text-sm font-semibold text-default transition hover:bg-surface"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function Stats() {
  const metrics = [
    {
      label: 'Tools deployed in production',
      value: 'Live on user systems',
    },
    {
      label: 'Open-source work',
      value: 'Available for community use',
    },
    {
      label: 'Reliable pipelines',
      value: 'Designed for high availability',
    },
    {
      label: 'Performance focus',
      value: 'Built for speed and efficiency',
    },
  ];

  return (
    <motion.div
      className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-2xl border border-surface bg-surface p-4 text-center shadow-sm backdrop-blur mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
        >
          <p className="text-sm font-semibold text-default">{metric.label}</p>
          <p className="mt-2 text-base font-bold text-primary">{metric.value}</p>
        </article>
      ))}
    </motion.div>
  );
}

export function AboutAndSkills({ isDark }: { isDark: boolean }) {
  const skills = [
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'React',
    'CSS',
    'Flutter',
    'JavaScript',
    'HTML',
    'Python',
    'SQL',
    'SQLite',
    'FastAPI',
    'Docker',
    'GitHub Actions',
    'Linux',
  ];

  return (
    <Section id="about" title="About Me" subtitle="Who I am, what I ship, and why I care">
      <div>
        <p className="text-default">
          I value tools that are useful rather than trendy. Crafting secure-by-default systems
          for self-hosted pipelines, media ingestion, and engineering-grade operations.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-default">
          <li>Built and maintained long-running self-hosted services with predictable maintenance cycles.</li>
          <li>Designed data ingestion and conversion flows that recover cleanly from network and disk errors.</li>
          <li>Platform-agnostic deployments (Raspberry Pi + ARM, x86 Linux, containerized cloud edge).</li>
          <li>Pragmatic technical docs and handoff-ready README guides for team adoption.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Core skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-black dark:border-white px-3 py-1 text-xs font-semibold text-default will-change-[transform,opacity]"
              data-reveal=""
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FeaturedProjects({ isDark }: { isDark: boolean }) {
  const projects = [
    {
      name: 'AI The Spire',
      description:
        'Personal portfolio and self-hosted lab with dataset automations and local UX.',
      url: 'https://github.com/Lukas-Bohez/aithespire',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'Python'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Convert the Spire Reborn',
      description:
        'Flutter downloader app with multi-site support, conversion pipelines, and local playback.',
      url: 'https://github.com/Lukas-Bohez/ConvertTheSpireFlutter',
      tech: ['Flutter', 'Dart', 'yt-dlp', 'SQLite'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      name: 'Vault The Spire',
      description:
        'Encrypted P2P storage + messaging with local-first persistence and no cloud dependency.',
      url: 'https://github.com/Lukas-Bohez/vault_the_spire',
      tech: ['Rust', 'Libp2p', 'AES', 'PocketBase'],
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <Section id="projects" title="Featured Projects" subtitle="Code you can inspect and use today">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.name}
            className="rounded-2xl border border-surface bg-surface p-5 shadow-sm mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            data-reveal=""
          >
            <div className={`mb-3 h-28 rounded-xl bg-gradient-to-br ${project.color}`}></div>
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="mt-2 text-sm text-default">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={`${project.name}-${item}`} className="rounded-full border border-surface px-2 py-1 text-xs text-default">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-secondary"
            >
              Explore ↗
            </a>
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
      <div className="grid gap-3 sm:grid-cols-3">
        <a
          href="mailto:lukasbohez@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-4 text-sm text-default shadow-sm transition hover:-translate-y-1 hover:shadow-md mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
        >
          <span className="font-semibold">Email</span>
          <span className="mt-1 text-xs text-muted block">Reach out for contract and full-time opportunities.</span>
        </a>
        <a
          href="https://github.com/Lukas-Bohez"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-4 text-sm text-default shadow-sm transition hover:-translate-y-1 hover:shadow-md mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
        >
          <span className="font-semibold">GitHub</span>
          <span className="mt-1 text-xs text-muted block">Open source work and active contributions.</span>
        </a>
        <a
          href="https://www.linkedin.com/in/lukas-bohez-3ba566271/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-surface bg-surface p-4 text-sm text-default shadow-sm transition hover:-translate-y-1 hover:shadow-md mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
        >
          <span className="font-semibold">LinkedIn</span>
          <span className="mt-1 text-xs text-muted block">Mid-senior roles,<br />open to opportunities.</span>
        </a>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto my-8 w-full max-w-6xl rounded-3xl border border-surface bg-surface/60 p-4 text-center text-sm text-muted">
      <span title="N = Nexus brand mark for concise, focused engineering">N</span> Lukas Bohez  ·  
      <a href="mailto:lukasbohez@gmail.com" className="text-primary hover:text-secondary">lukasbohez@gmail.com</a>  ·  
      <a href="https://github.com/Lukas-Bohez" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">GitHub</a>
    </footer>
  );
}
