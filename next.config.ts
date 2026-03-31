import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio', // Added basePath
  assetPrefix: '/portfolio/', // Added assetPrefix
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
