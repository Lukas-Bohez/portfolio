import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import BackToTop from './components/BackToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Oroka Conner | Full-Stack Developer · Flutter · Python · Next.js',
  description:
    'Portfolio of Oroka Conner, full-stack web developer. Full-stack work in Python/FastAPI, TypeScript, Flutter and cross-platform development. Projects include QuizTheSpire, Convert The Spire Reborn v10.0.6, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
  openGraph: {
    title: 'Oroka Conner | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Oroka Conner, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.0.6, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
    url: 'https://quizthespire.com/portfolio/',
    siteName: 'Quiz The Spire',
    type: 'website',
    images: ['https://quizthespire.com/images/spire-light.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oroka Conner | Full-Stack Developer · Flutter · Python · Next.js',
    description:
      'Portfolio of Oroka Conner, full-stack web developer. Projects include QuizTheSpire, Convert The Spire Reborn v10.0.6, CMS demo research with Sanity + Cloudinary, and the Lofi browser extension.',
    images: ['https://quizthespire.com/images/spire-light.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8418485814964449"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="spire-theme" disableTransitionOnChange>
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
