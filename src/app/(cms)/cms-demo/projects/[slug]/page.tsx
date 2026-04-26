import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { cloudinaryOptimized } from '@/lib/cloudinary';
import { sanityFetch } from '@/lib/sanity';

type ProjectDetail = {
  _id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  slug: string;
  body?: Array<{
    _type: string;
    _key?: string;
    style?: string;
    children?: Array<{ _type: string; text?: string }>;
    markDefs?: Array<{ _type: string; _key: string; href?: string }>;
    url?: string;
    alt?: string;
  }>;
};

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const rows = await sanityFetch<Array<{ slug?: string }>>({
    query: `*[_type in ["projectDemo", "project"] && defined(slug.current)]{ "slug": slug.current }`,
    tags: ['projects'],
    revalidate: 3600,
    useDraftMode: false,
  });

  return rows
    .filter((row): row is { slug: string } => Boolean(row.slug))
    .map((row) => ({ slug: row.slug }));
}

/**
 * Hybrid strategy:
 * - statically generated from CMS slugs
 * - refreshed with cache tags + webhook revalidation
 */
export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;

  const row = await sanityFetch<ProjectDetail | null>({
    query: `*[_type in ["projectDemo", "project"] && slug.current == $slug][0]{
      _id,
      title,
      "summary": coalesce(summary, description, excerpt, "No summary yet."),
      "imageUrl": coalesce(imageUrl, mainImage.asset->url, image.asset->url),
      "slug": slug.current,
      "body": body[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url,
          "alt": coalesce(alt, "")
        }
      }
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

  const portableTextComponents: PortableTextComponents = {
    block: {
      h2: ({ children }) => <h2 className="mt-8 text-2xl font-bold text-primary">{children}</h2>,
      h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold text-primary">{children}</h3>,
      normal: ({ children }) => (
        <p className="mt-4 text-base leading-relaxed text-default">{children}</p>
      ),
    },
    marks: {
      link: ({ value, children }) => {
        const href = typeof value?.href === 'string' ? value.href : '#';
        const rel = href.startsWith('http') ? 'noreferrer noopener' : undefined;

        return (
          <a
            href={href}
            rel={rel}
            className="font-semibold text-blue-500 underline hover:text-blue-600"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const rawUrl = typeof value?.url === 'string' ? value.url : undefined;
        if (!rawUrl) {
          return null;
        }

        const transformed = cloudinaryOptimized(rawUrl, 1200);
        const alt = typeof value?.alt === 'string' ? value.alt : 'Project content image';

        return (
          <figure className="mt-6 overflow-hidden rounded-2xl border border-surface bg-secondary">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={transformed}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </figure>
        );
      },
    },
  };

  return (
    <main id="main-content" className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-3xl border border-surface bg-surface shadow-lg">
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
          <h1 className="text-3xl font-bold text-primary">{row.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-default">{row.summary}</p>
          {row.body && row.body.length > 0 ? (
            <div className="mt-6">
              <PortableText value={row.body} components={portableTextComponents} />
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
