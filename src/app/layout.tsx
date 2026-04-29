import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import BackToTop from './components/BackToTop';
import { ThemeProviderBridge } from './components/ThemeProviderBridge';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
  description:
    'Portfolio of Lukas Bohez, full-stack web developer. Full-stack work in Python/FastAPI, TypeScript, Flutter and cross-platform development. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, and the Lofi browser extension.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/favicon-192x192.png',
  },
  openGraph: {
    title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Lukas Bohez, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, and the Lofi browser extension.',
    url: 'https://quizthespire.com/LukasBohez/',
    siteName: 'Quiz The Spire',
    type: 'website',
    images: ['https://quizthespire.com/images/spire-light.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Lukas Bohez, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, and the Lofi browser extension.',
    images: ['https://quizthespire.com/images/spire-light.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dmefzpaea/image/upload/f_blur:2000,e_grayscale,q_1,w_20/v1776524472/portfolio/profile/lukas-portrait"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-50 rounded-full border border-blue-400/80 bg-surface px-4 py-2 text-sm font-semibold text-default"
        >
          Skip to content
        </a>
        <ThemeProviderBridge>{children}</ThemeProviderBridge>
        <BackToTop />
      </body>
    </html>
  );
}
