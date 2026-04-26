import { draftMode } from 'next/headers';

import { env } from './env';

type SanityFetchOptions = {
  query: string;
  params?: Record<string, string | number | boolean>;
  tags: string[];
  revalidate?: number;
  useDraftMode?: boolean;
};

function getSanityQueryUrl(
  query: string,
  perspective: 'published' | 'previewDrafts',
  params?: Record<string, string | number | boolean>
): string {
  const url = new URL(
    `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${env.SANITY_API_VERSION}/data/query/${env.SANITY_DATASET}`
  );
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', perspective);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(`$${key}`, String(value));
    });
  }

  return url.toString();
}

export async function sanityFetch<T>({
  query,
  params,
  tags,
  revalidate = 3600,
  useDraftMode = true,
}: SanityFetchOptions): Promise<T> {
  const { isEnabled } = useDraftMode ? await draftMode() : { isEnabled: false };
  const perspective: 'published' | 'previewDrafts' = isEnabled ? 'previewDrafts' : 'published';
  const url = getSanityQueryUrl(query, perspective, params);

  const response = await fetch(url, {
    next: { revalidate, tags },
    headers:
      perspective === 'previewDrafts' && env.SANITY_API_TOKEN
        ? { Authorization: `Bearer ${env.SANITY_API_TOKEN}` }
        : undefined,
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 429) {
      throw new Error('CMS is rate-limiting requests (429). Please try again in a moment.');
    }
    if (status >= 500) {
      throw new Error(`CMS server error (${status}).`);
    }
    throw new Error(`CMS request failed (${status}).`);
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
}
