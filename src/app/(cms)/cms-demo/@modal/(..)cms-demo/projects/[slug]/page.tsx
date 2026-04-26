import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { cloudinaryOptimized } from '@/lib/cloudinary';
import { sanityFetch } from '@/lib/sanity';

type ModalProjectDetail = {
  _id: string;
  title: string;
  summary: string;
  imageUrl?: string;
};

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectModalRoute({ params }: Params) {
  const { slug } = await params;

  const row = await sanityFetch<ModalProjectDetail | null>({
    query: `*[_type in ["projectDemo", "project"] && slug.current == $slug][0]{
      _id,
      title,
      "summary": coalesce(summary, description, excerpt, "No summary yet."),
      "imageUrl": coalesce(imageUrl, mainImage.asset->url, image.asset->url)
    }`,
    params: { slug },
    tags: ['projects'],
    revalidate: 3600,
  });

  if (!row) {
    notFound();
  }

  const imageUrl = row.imageUrl
    ? cloudinaryOptimized(row.imageUrl, 1200)
    : 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1200,h_675,c_fill,g_auto/v1693596382/samples/landscapes/girl-urban-view.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-surface bg-surface shadow-2xl">
        <div className="relative aspect-[16/9] w-full bg-secondary">
          <Image
            src={imageUrl}
            alt={`Cover image for ${row.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-primary">{row.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-default">{row.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cms-demo" className="btn-ui btn-ghost-ui">
              Close
            </Link>
            <Link href={`/cms-demo/projects/${slug}`} className="btn-ui btn-primary-ui">
              Open full page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
