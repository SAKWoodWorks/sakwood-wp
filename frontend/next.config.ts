import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sak_wp',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8006',
      },
    ],
  },
};

export default nextConfig;
