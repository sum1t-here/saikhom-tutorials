import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "www.example.com"], // Add your image hostname here
  },
};

export default nextConfig;
