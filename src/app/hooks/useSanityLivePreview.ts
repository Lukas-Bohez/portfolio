'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook for live Sanity preview in development mode.
 * In production, returns initial data unchanged.
 * In development, polls Sanity draft perspective every 5 seconds.
 */
export function useSanityLivePreview<T>(query: string, initialData: T): T {
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    // Only enable live preview in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
        const token = process.env.SANITY_API_TOKEN;

        if (!projectId || !dataset) {
          return;
        }

        const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${encodeURIComponent(
          query
        )}`;

        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const result = await response.json();
          if (result.result) {
            setData(result.result);
          }
        }
      } catch (error) {
        console.warn('Live preview poll failed:', error);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [query]);

  return data;
}
