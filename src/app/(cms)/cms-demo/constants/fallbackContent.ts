// Fallback content shown when Sanity is unreachable or empty.
// This ensures the CMS demo always looks complete to recruiters.

import { withBasePath } from '@/lib/basePath';

export const fallbackProfile = {
  title: 'About Lukas Bohez',
  bio: 'Full-stack developer and indie creator from Belgium. I build SpireAI (live AI-powered quiz platform with real-time leaderboards), Convert The Spire Reborn (cross-platform 4K/8K downloader, 950+ downloads across 95+ countries), SENTLE (daily sentence puzzle), and Industrial Empire (browser idle game). All projects are free and open source under GPLv3.',
};

export const fallbackSettings = {
  siteTitle: 'Lukas Bohez - Portfolio CMS Demo',
  footerText:
    'Built with Next.js 15 App Router - Sanity CMS - Cloudinary - Deployed on Apache via static export.',
};

export const fallbackProjects = [
  {
    _id: 'fallback-spireai',
    title: 'SpireAI',
    slug: 'spireai',
    summary:
      'Real-time multiplayer quiz platform with AI-generated themes and live leaderboards. Teachers host sessions, students join with a room code and compete simultaneously.',
    stack: ['Next.js', 'TypeScript', 'Sanity', 'WebSockets', 'Cloudinary'],
    imageUrl: withBasePath('/cms-demo-images/spireAi.png'),
    demoUrl: 'https://quizthespire.com/pages/spire-ai/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'EdTech' }, { title: 'AI' }, { title: 'Real-time' }],
  },
  {
    _id: 'fallback-convert',
    title: 'Convert The Spire Reborn',
    slug: 'convert-the-spire',
    summary:
      'Cross-platform desktop app for downloading media in 4K/8K from 1800+ sites. Built with Flutter/Dart, integrates yt-dlp, includes a full integrated media player and torrent client. 950+ downloads worldwide.',
    stack: ['Flutter', 'Dart', 'yt-dlp', 'Windows', 'Android', 'Linux'],
    imageUrl: withBasePath('/cms-demo-images/mediaPlayer.png'),
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
    imageUrl: withBasePath('/cms-demo-images/sentle.png'),
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
    imageUrl: withBasePath('/cms-demo-images/industrialEmpire.png'),
    demoUrl: 'https://quizthespire.com/',
    author: { name: 'Lukas Bohez', bio: 'Solo developer' },
    tags: [{ title: 'Browser Game' }, { title: 'Idle' }],
  },
] as const;
