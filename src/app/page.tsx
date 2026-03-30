'use client';

import { useEffect, useState } from 'react';
import {
  AboutAndSkills,
  ContactSection,
  FeaturedProjects,
  Hero,
  Navbar,
  Stats,
} from './components/PortfolioComponents';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (savedTheme === 'dark') setIsDark(true);
    else if (savedTheme === 'light') setIsDark(false);
    else if (typeof window !== 'undefined')
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
      document.body.dataset.theme = isDark ? 'dark' : 'light';
      const root = document.documentElement;
      root.style.setProperty('--background', isDark ? '#020617' : '#ffffff');
      root.style.setProperty('--foreground', isDark ? '#e2e8f0' : '#171717');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      const scrolled = (window.scrollY / total) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const elem = document.getElementById('projects');
    if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`${
        isDark
          ? 'min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100'
          : 'min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-100 text-slate-900'
      } transition-colors duration-300`}
    >
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-blue-600 transition-all duration-200"
        />
      </div>
      <main className="mx-auto w-full max-w-6xl p-6 sm:p-10">
        <Navbar
          onThemeToggle={() => setIsDark((prev) => !prev)}
          isDark={isDark}
          onScrollTo={scrollToSection}
        />
        <Hero onScrollToProjects={scrollToProjects} isDark={isDark} />
        <Stats />
        <AboutAndSkills isDark={isDark} />
        <FeaturedProjects isDark={isDark} />
        <ContactSection isDark={isDark} />

        <footer className="mt-8 border-t border-slate-200 pt-4 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
          © {new Date().getFullYear()} Lukas Bohez. Built with Next.js.
        </footer>
      </main>
    </div>
  );
}
