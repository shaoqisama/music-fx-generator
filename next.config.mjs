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
  // Configure for GitHub Pages - no conditional, always use the prefix
  basePath: '/music-fx-generator',
  assetPrefix: '/music-fx-generator',
}

export default nextConfig
