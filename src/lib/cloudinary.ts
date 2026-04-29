import { env } from './env';

export function withCloudinaryTransform(url: string, transform: string): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  if (url.includes(`/upload/${transform}/`)) {
    return url;
  }

  return url.replace('/upload/', `/upload/${transform}/`);
}

export function cloudinaryOptimized(url: string, width: number): string {
  return withCloudinaryTransform(url, `q_auto,f_avif,w_${width},c_fill,g_auto`);
}

export function cloudinaryHeroBlurDataUrl(publicId: string): string {
  const blurUrl = `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:2000,e_grayscale,q_1,w_20/${publicId}`;
  return blurUrl;
}
