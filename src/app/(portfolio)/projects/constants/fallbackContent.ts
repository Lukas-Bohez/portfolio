import { z } from 'zod';

import { withBasePath } from '@/lib/basePath';

// Schema definitions for type-safe data
const TagSchema = z.object({
  title: z.string(),
});

const AuthorSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
});

const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  stack: z.array(z.string()),
  imageUrl: z.string(),
  demoUrl: z.string(),
  author: AuthorSchema.optional(),
  tags: z.array(TagSchema).optional(),
});

const ProfileSchema = z.object({
  title: z.string(),
  bio: z.string(),
});

const SettingsSchema = z.object({
  siteTitle: z.string(),
  footerText: z.string(),
  spotlightText: z.string(),
});

// Type exports from schemas
export type Tag = z.infer<typeof TagSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Settings = z.infer<typeof SettingsSchema>;

export const fallbackProfile = ProfileSchema.parse({
  title: 'About Lukas Bohez',
  bio: 'Full-stack developer and indie creator from Belgium. I build SpireAI, Convert The Spire Reborn, SENTLE, Industrial Empire, Import Lottie JSON — Extract All for AI (the only Figma plugin that imports Lottie animations as editable vectors and extracts everything for AI coding tools), and the Rijexamen study guide. All projects are free and open source under GPLv3 or MIT.',
});

export const fallbackSettings = SettingsSchema.parse({
  siteTitle: 'Lukas Bohez — Projects',
  footerText: 'Built with Next.js 16.2 App Router — Deployed on Apache via static export.',
  spotlightText: 'A compact snapshot of the projects featured below.',
});

export const fallbackProjects: Project[] = ProjectSchema.array().parse([
  {
    _id: 'fallback-spireai',
    title: 'SpireAI',
    slug: 'spireai',
    summary:
      'Real-time multiplayer quiz platform with AI-generated themes and live leaderboards. Teachers host sessions, students join with a room code and compete simultaneously.',
    stack: ['Next.js', 'TypeScript', 'WebSockets'],
    imageUrl: withBasePath('/images/projects/quizthespire.png'),
    demoUrl: 'https://quizthespire.com/pages/spire-ai/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'EdTech' }, { title: 'AI' }, { title: 'Real-time' }],
  },
  {
    _id: 'fallback-convert',
    title: 'Convert The Spire Reborn',
    slug: 'convert-the-spire',
    summary:
      'Cross-platform desktop app for downloading media in 4K/8K from 1,800+ sites. Built with Flutter/Dart, integrates yt-dlp, includes a full integrated media player and torrent client. 950+ downloads worldwide.',
    stack: ['Flutter', 'Dart', 'yt-dlp', 'Windows', 'Android', 'Linux'],
    imageUrl: withBasePath('/images/projects/convertthespirereborn.png'),
    demoUrl: 'https://quizthespire.com/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'Desktop App' }, { title: 'Open Source' }, { title: 'GPLv3' }],
  },
  {
    _id: 'fallback-sentle',
    title: 'SENTLE',
    slug: 'sentle',
    summary:
      'Daily Wordle-style puzzle where you guess a full sentence instead of a word. UTC-seeded for global daily sync, with persistent streak tracking and social share.',
    stack: ['Vanilla JS', 'HTML', 'CSS', 'localStorage'],
    imageUrl:
      'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images/sentle.png',
    demoUrl: 'https://quizthespire.com/pages/sentle/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'Word Game' }, { title: 'Daily Puzzle' }],
  },
  {
    _id: 'fallback-idle',
    title: 'Industrial Empire',
    slug: 'industrial-empire',
    summary:
      'Browser-based idle factory game with a full prestige/rebirth system, technology research tree, dynamic market, arcade mini-games, and worker management.',
    stack: ['JavaScript', 'HTML Canvas', 'CSS'],
    imageUrl:
      'https://raw.githubusercontent.com/Lukas-Bohez/project-one/main/frontend/images/industrialEmpire.png',
    demoUrl: 'https://quizthespire.com/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'Browser Game' }, { title: 'Idle' }],
  },
  {
    _id: 'fallback-figma-extract',
    title: 'Import Lottie JSON — Extract All for AI',
    slug: 'figma-extract-all',
    summary:
      'The only Figma plugin that imports Lottie JSON animations as editable native Figma vectors — no re-tracing, no rebuilding from scratch. Every frame lands as real Figma layers your whole team can restyle and reshape. Then Extract All for AI pulls every SVG, Variable, and CSS value into a clean structured export for Cursor, Claude, ChatGPT, v0, and Adobe After Effects. Import a Lottie animation, reshape it in Figma, extract it for code or motion. One plugin, both directions. Now available in the Figma Community.',
    stack: ['TypeScript', 'Figma Plugin API', 'Lottie JSON Import', 'AI Export', 'SVG', 'JSON'],
    imageUrl: withBasePath('/images/projects/figma-extract-all.png'),
    demoUrl:
      'https://www.figma.com/community/plugin/1655550973103544441/import-lottie-json-extract-all-for-ai',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [
      { title: 'Figma Plugin' },
      { title: 'Lottie Import' },
      { title: 'AI Export' },
      { title: 'Import & Export' },
      { title: 'MIT' },
    ],
  },
  {
    _id: 'fallback-rijexamen',
    title: 'Rijexamen Roeselare — Routekaart & Studiegids',
    slug: 'rijexamen-roeselare',
    summary:
      'Interactive study guide for the Belgian practical driving exam Category B in Examencentrum Roeselare. Contains all 20 official exam routes with 60+ checkpoints, pitfalls per location, practical tips, and exam info. Responsive, print-friendly, with route filtering by category.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Leaflet Maps'],
    imageUrl: withBasePath('/images/projects/rijexamen-roeselare.png'),
    demoUrl: 'https://quizthespire.com/rijexamen/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [
      { title: 'Study Guide' },
      { title: 'Interactive Map' },
      { title: 'Driving Exam' },
      { title: 'MIT' },
    ],
  },
]);
