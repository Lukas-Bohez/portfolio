import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const basePath = (process.env.NEXT_BASE_PATH || '').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Projects | Lukas Bohez',
  description:
    'All projects by Lukas Bohez — SpireAI, Convert The Spire Reborn, SENTLE, and Industrial Empire.',
  icons: {
    icon: `${basePath}/iceball.svg`,
    apple: `${basePath}/iceball.svg`,
  },
  openGraph: {
    title: 'Projects | Lukas Bohez',
    description:
      'All projects by Lukas Bohez — SpireAI, Convert The Spire Reborn, SENTLE, and Industrial Empire.',
    type: 'website',
  },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
