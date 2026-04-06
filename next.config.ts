import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
