import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Detail | CMS Demo',
  description: 'Project detail page generated from Sanity CMS.',
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
