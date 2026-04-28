import type { NextConfig } from 'next';

const configuredBasePath = (process.env.NEXT_BASE_PATH || '').trim();
const hasBasePath = configuredBasePath.length > 0;
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  ...(hasBasePath
    ? {
        basePath: configuredBasePath,
        assetPrefix: `${configuredBasePath}/`,
      }
    : {}),
  ...(isStaticExport ? { output: 'export' } : {}),
  trailingSlash: true,
  ...(!isStaticExport
    ? {
        async redirects() {
          return [
            {
              source: '/cms-demo/:path*',
              destination: '/projects/:path*',
              permanent: true,
            },
          ];
        },
      }
    : {}),
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Cloudinary hosts all CMS and portfolio media assets.
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
