import { z } from 'zod';

const envSchema = z.object({
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_DATASET: z.string().min(1),
  SANITY_API_VERSION: z.string().default('2025-02-19'),
  SANITY_API_TOKEN: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://quizthespire.com/LukasBohez'),
});

export const env = envSchema.parse({
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? '3a5uodlw',
  SANITY_DATASET: process.env.SANITY_DATASET ?? 'production',
  SANITY_API_VERSION: process.env.SANITY_API_VERSION,
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET ?? 'dev-webhook-secret',
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dmefzpaea',
  NEXT_PUBLIC_SANITY_STUDIO_URL:
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'https://quizthespire.sanity.studio',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
