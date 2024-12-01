/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["placehold.co"], // Add external image domains here
  },
};

export default nextConfig;
