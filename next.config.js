/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  
  // TypeScript configuration
  typescript: {
    // Enable strict mode checking during build
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Run ESLint during builds
    ignoreDuringBuilds: false,
  },
  
  // Enable experimental features for better DX
  experimental: {
    typedRoutes: true,
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    COVERAGE_THRESHOLD: process.env.COVERAGE_THRESHOLD || '90',
  },
}

module.exports = nextConfig