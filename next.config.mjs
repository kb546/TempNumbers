/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for GitHub Pages
  // Vercel handles Next.js apps natively and doesn't need static export
  output: process.env.GITHUB_ACTIONS ? 'export' : undefined,
  
  // Only set basePath for GitHub Pages deployment
  basePath: process.env.GITHUB_ACTIONS ? '/TempNumbers-Website' : '',
  
  // Only disable image optimization for GitHub Pages
  // Vercel supports image optimization
  images: {
    unoptimized: process.env.GITHUB_ACTIONS ? true : false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // Correct format for experimental features
  }
};

export default nextConfig; 