/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  basePath: '/TempNumbers-Website', // Set the base path for GitHub Pages
  images: {
    unoptimized: true, // Disable image optimization as GitHub Pages doesn't support it
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: ['http://localhost:3000']
  }
};

export default nextConfig; 