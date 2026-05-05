import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All card imagery now ships from /public/images/cards/. No remote hosts
  // are needed at runtime — keep the surface area minimal in production.
};

export default nextConfig;
