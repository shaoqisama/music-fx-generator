/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  // Only apply these in production/GitHub Pages environment
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/music-fx-generator',
    assetPrefix: '/music-fx-generator',
  }),
}

export default nextConfig
