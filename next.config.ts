import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '50mb', // Increase the limit to 10 MB (or any size you need)
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  swcMinify: false,
};

export default nextConfig;
