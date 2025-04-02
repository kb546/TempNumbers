/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow CORS during development
  allowedDevOrigins: ['http://localhost', 'http://127.0.0.1', 'http://10.220.7.31'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig; 