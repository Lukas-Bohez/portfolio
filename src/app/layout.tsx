import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Lukas Bohez | Portfolio',
  description:
    'Portfolio of Lukas Bohez. Full-stack work in Python/FastAPI, TypeScript, Flutter and cross-platform development. Projects include QuizTheSpire, Convert The Spire Reborn, Vault The Spire, and the Lofi browser extension with direct download links for each.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
