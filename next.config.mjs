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
  // Configure for GitHub Pages
  basePath: process.env.GITHUB_ACTIONS && '/music-fx-generator',
  assetPrefix: process.env.GITHUB_ACTIONS && '/music-fx-generator',
}

export default nextConfig
