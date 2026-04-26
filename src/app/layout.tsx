import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import BackToTop from './components/BackToTop';
import { ThemeProviderBridge } from './components/ThemeProviderBridge';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
  description:
    'Portfolio of Lukas Bohez, full-stack web developer. Full-stack work in Python/FastAPI, TypeScript, Flutter and cross-platform development. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
  openGraph: {
    title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Lukas Bohez, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
    url: 'https://quizthespire.com/LukasBohez/',
    siteName: 'Quiz The Spire',
    type: 'website',
    images: ['https://quizthespire.com/images/spire-light.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lukas Bohez | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Lukas Bohez, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.2.3, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
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
