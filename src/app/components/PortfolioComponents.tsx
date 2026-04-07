'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import profilePhoto from '../../../WIN_20260329_16_44_00_Pro.jpg';

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
      className="mb-12 rounded-3xl border border-surface bg-surface p-8 sm:p-10 shadow-lg text-default transition hover:shadow-2xl hover:border-blue-400/50 dark:hover:border-blue-300/50 hover:-translate-y-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={sectionVariants}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-primary">{title}</h2>
        {subtitle && <p className="mt-3 text-lg text-muted leading-relaxed">{subtitle}</p>}
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
    <nav className="sticky top-0 z-40 mb-8 flex w-full items-center justify-between gap-4 rounded-2xl sm:rounded-3xl border border-surface bg-surface/98 dark:bg-surface/95 p-4 sm:p-5 text-xs sm:text-sm font-medium shadow-lg backdrop-blur transition hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-300/50">
      <button
        type="button"
        className="flex items-center gap-2 text-base sm:text-xl font-black tracking-tight transition hover:opacity-80"
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
      <div className="flex items-center gap-2 sm:gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScrollTo(item.id)}
            className="rounded-full px-2 sm:px-3 py-1 text-default transition hover:bg-surface/50 hover:text-primary"
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
      className="relative mb-10 overflow-hidden rounded-3xl border border-surface bg-surface p-8 sm:p-12 shadow-xl backdrop-blur text-default"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
      </div>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="uppercase tracking-widest text-blue-400 dark:text-blue-200 font-semibold text-sm sm:text-base">Modern code with artisan impact</p>
          <h1 className="mt-2 text-5xl sm:text-7xl font-extrabold leading-tight">Lukas Bohez</h1>
          <p className="mt-4 text-lg sm:text-xl text-default leading-relaxed">
            I build production-ready Python and full-stack systems that are fast to ship, reliable to run, and easy to maintain.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-blue-400 dark:border-blue-200 bg-blue-400/15 dark:bg-blue-400/20 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-contrast">
            Actively interviewing for mid-senior roles
          </p>
          <p className="mt-6 max-w-2xl text-lg text-default leading-relaxed">
            I focus on backend architecture, pragmatic UX, and self-hosted delivery from prototype to live product.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onScrollToProjects}
              className="rounded-full btn-primary px-8 py-3 text-base font-semibold transition hover:shadow-lg hover:shadow-accent/50 hover:scale-105 active:scale-95"
            >
              View featured work
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-full border-2 border-blue-400 dark:border-blue-200 bg-transparent px-8 py-3 text-base font-semibold text-default transition hover:bg-blue-400/10 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Get in touch
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          {profilePhoto ? (
            <div className="relative h-56 w-56 overflow-hidden rounded-[2rem] border border-surface bg-secondary shadow-xl sm:h-72 sm:w-72">
              <Image
                src={profilePhoto}
                alt="Portrait of Lukas Bohez"
                fill
                priority
                sizes="(min-width: 1024px) 18rem, 14rem"
                className="object-cover object-[50%_20%] scale-[1.15]"
              />
            </div>
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
      label: 'Recruiter-ready portfolio',
      value: 'Code, impact, and deployment story',
    },
  ];

  return (
    <motion.div
      className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          className="rounded-2xl border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 p-7 text-center shadow-md backdrop-blur transition hover:shadow-lg hover:border-blue-400/70 dark:hover:border-blue-300/70 hover:-translate-y-1 mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={index}
          whileHover={{ y: -8, scale: 1.02, rotateX: 6 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <p className="text-base font-semibold text-default leading-relaxed">{metric.label}</p>
          <p className="mt-3 text-xl font-bold text-blue-400 dark:text-blue-200">{metric.value}</p>
        </motion.article>
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
        <p className="text-base sm:text-lg text-default leading-relaxed">
          I build useful software with a strong backend core. My work combines Python services,
          practical frontend design, and deployment discipline so teams can ship and iterate confidently.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-default leading-relaxed">
          <li>Shipped and maintained live web products with Python backends and stable release workflows.</li>
          <li>Turned product pivots into clear technical changes without losing performance or maintainability.</li>
          <li>Built onboarding content, articles, and product documentation that reduce support overhead.</li>
          <li>Comfortable owning the full loop: architecture, implementation, deployment, and iteration.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-primary">Core skills</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="rounded-lg border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 px-4 py-2 text-sm sm:text-base font-semibold text-default transition hover:border-blue-400 dark:hover:border-blue-300 hover:bg-blue-400/20 dark:hover:bg-blue-300/20 will-change-[transform,opacity]"
              data-reveal=""
              data-reveal-order={index}
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
      name: 'QuizTheSpire',
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            className="rounded-2xl border border-surface bg-surface p-4 shadow-md transition hover:shadow-lg hover:border-blue-400/50 dark:hover:border-blue-300/50 hover:-translate-y-1 mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12, scale: 1.02, rotateX: 6, rotateY: -4 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
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
            <h3 className="text-xl font-bold text-primary">{project.name}</h3>
            <p className="mt-3 text-lg text-default leading-relaxed">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={`${project.name}-${item}`} className="rounded-full border border-blue-400/40 dark:border-blue-300/40 bg-blue-400/10 dark:bg-blue-300/10 px-3 py-1.5 text-base font-medium text-default transition hover:shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center text-lg font-semibold text-blue-400 dark:text-blue-200 transition hover:text-blue-500 dark:hover:text-blue-100 hover:translate-x-2"
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
      <div className="grid gap-5 sm:grid-cols-3">
        <a
          href="mailto:lukasbohez@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-7 text-base text-default shadow-md transition hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-300/50 mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={0}
        >
          <span className="font-bold text-lg text-primary">Email</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Reach out for contract and full-time opportunities.</span>
        </a>
        <a
          href="https://github.com/Lukas-Bohez"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl border border-surface bg-surface p-7 text-base text-default shadow-md transition hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-300/50 mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={1}
        >
          <span className="font-bold text-lg text-primary">GitHub</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Open source work and active contributions.</span>
        </a>
        <a
          href="https://www.linkedin.com/in/lukas-bohez-3ba566271/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-surface bg-surface p-7 text-base text-default shadow-md transition hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-300/50 mb-[clamp(24px,4vh,48px)] will-change-[transform,opacity]"
          data-reveal=""
          data-reveal-order={2}
        >
          <span className="font-bold text-lg text-primary">LinkedIn</span>
          <span className="mt-3 text-base text-default block leading-relaxed">Mid-senior roles,<br />open to opportunities.</span>
        </a>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="my-10 w-full rounded-3xl border-2 border-blue-400/40 dark:border-blue-300/40 bg-surface/70 p-8 text-center text-lg text-default transition hover:shadow-lg hover:border-blue-400/70 dark:hover:border-blue-300/70">
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
