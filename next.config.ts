import type { NextConfig } from 'next';

const configuredBasePath = (process.env.NEXT_BASE_PATH || '').trim();
const hasBasePath = configuredBasePath.length > 0;

const nextConfig: NextConfig = {
  ...(hasBasePath
    ? {
        basePath: configuredBasePath,
        assetPrefix: `${configuredBasePath}/`,
      }
    : {}),
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
