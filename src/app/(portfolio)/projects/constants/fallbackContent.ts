import { withBasePath } from '@/lib/basePath';

export const fallbackProfile = {
  title: 'About Lukas Bohez',
  bio: 'Full-stack developer and indie creator from Belgium. I build SpireAI, Convert The Spire Reborn, SENTLE, and Industrial Empire. All projects are free and open source under GPLv3.',
};

export const fallbackSettings = {
  siteTitle: 'Lukas Bohez — Projects',
  footerText: 'Built with Next.js 15 App Router — Deployed on Apache.',
  spotlightText: 'A compact snapshot of the four projects featured below.',
};

export const fallbackProjects = [
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
] as const;
