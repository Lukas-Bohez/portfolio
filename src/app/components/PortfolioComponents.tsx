'use client';

import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  isDark?: boolean;
};

function Section({ id, title, subtitle, children, isDark = false }: SectionProps) {
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
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="mt-2 text-default">{subtitle}</p>}
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
      <span className="text-xl font-black tracking-tight">Lukas Bohez</span>
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
        <button
          onClick={onThemeToggle}
          className="rounded-full border border-surface px-3 py-1 text-default transition hover:bg-surface"
          aria-label="Toggle light/dark theme"
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </nav>
  );
}

export function Hero({ onScrollToProjects, isDark }: { onScrollToProjects: () => void; isDark: boolean }) {
  return (
    <motion.section
      className="mb-10 rounded-3xl border border-surface bg-surface p-8 shadow-xl backdrop-blur text-default"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <p className="uppercase tracking-widest text-blue-700 dark:text-blue-300">
        Modern code with artisan impact
      </p>
      <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-6xl">Lukas Bohez</h1>
      <p className="mt-4 max-w-3xl text-lg text-default">
        I build tools that scrape, convert, stream, and host on Linux and Raspberry Pi.
        Full-stack systems, secure by default, crafted for smooth, effortless workflow operation.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onScrollToProjects}
          className="rounded-full btn-primary px-5 py-2.5 text-sm font-semibold transition"
        >
          View featured work
        </button>
      </div>
    </motion.section>
  );
}

export function Stats() {
  const metrics = [
    { label: 'Tools deployed in production', value: 'Live on user systems' },
    { label: 'Open-source work', value: 'Available for community use' },
    { label: 'Reliable pipelines', value: 'Designed for high availability' },
    { label: 'Performance focus', value: 'Built for speed and efficiency' },
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
          className="rounded-2xl border border-surface bg-surface p-4 text-center shadow-sm backdrop-blur"
        >
          <p className="text-2xl font-bold text-primary">{metric.value}</p>
          {/* label removed for cleaner stat cards */}
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
          <li>99.9% uptime pipelines, Linux/Raspberry Pi-first infrastructure</li>
          <li>FastAPI/Flask backend, Docker and Apache orchestration for resiliency</li>
          <li>Smooth UX with Next.js App Router, Tailwind, and TypeScript</li>
          <li>Media tooling: yt-dlp, FFmpeg, youtube_explode_dart, SQL workflows</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Core skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-black dark:border-white px-3 py-1 text-xs font-semibold text-default"
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
      name: 'ConvertTheSpireFlutter',
      description:
        '2024 playlist-to-archive media toolkit for seamless local + self-hosted workflows.',
      url: 'https://github.com/Lukas-Bohez/ConvertTheSpireFlutter',
    },
    {
      name: 'Vault The Spire',
      description:
        '2024 encrypted P2P storage + messaging with local-first vault persistence and no cloud dependency.',
      url: 'https://github.com/Lukas-Bohez/vault-the-spire',
    },
    {
      name: 'Astonia3-fan-server',
      description:
        '2023 community revival server with co-op network and live sync for classic game lore.',
      url: 'https://github.com/Lukas-Bohez/Astonia3-fan-server',
    },
  ];

  return (
    <Section id="projects" title="Featured Projects" subtitle="Code you can inspect and use today">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.name}
            className="rounded-2xl border border-surface bg-surface p-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="mt-2 text-sm text-default">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
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
  const links = [
    {
      name: 'Email',
      href: 'mailto:lukasbohez@gmail.com',
      description: 'Reach out for contract and full-time opportunities.',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Lukas-Bohez',
      description: 'Open source work and active contributions.',
    },
  ];

  return (
    <Section
      id="contact"
      title="Let’s connect"
      subtitle="I’m actively interviewing and available for mid-senior roles"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-2xl border border-surface bg-surface p-4 text-sm text-default shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold">{link.name}</h3>
            <p className="mt-1 text-xs text-muted">{link.description}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
