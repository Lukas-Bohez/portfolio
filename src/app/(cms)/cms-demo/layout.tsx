import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS Demo | Lukas Bohez',
  description:
    'Sanity + Cloudinary powered CMS demo route for Lukas Bohez portfolio with draft preview and cache revalidation support.',
  openGraph: {
    title: 'CMS Demo | Lukas Bohez',
    description:
      'Sanity + Cloudinary powered CMS demo route for Lukas Bohez portfolio with draft preview and cache revalidation support.',
    type: 'website',
  },
};

export default function CmsDemoLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
