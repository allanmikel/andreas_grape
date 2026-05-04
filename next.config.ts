import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder card photos — swap for real assets in /public/images/cards/
      // by changing the `image` field in src/lib/content.ts.
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
};

export default nextConfig;
