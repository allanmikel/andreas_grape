import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All card imagery now ships from /public/images/cards/. No remote hosts
  // are needed at runtime — keep the surface area minimal in production.
  images: {
    // Prefer AVIF (~30% smaller than WebP at equivalent quality), fall back
    // to WebP, ship the original format only if neither is supported. Several
    // source assets are large PNGs; this keeps the over-the-wire payload
    // tight without requiring the originals to be re-encoded on disk.
    formats: ['image/avif', 'image/webp'],
    // Cards top out around 1100px on desktop and 86vw on mobile. Trim the
    // upper end of the default ladder so we don't ship 3840px variants of
    // every portfolio image.
    deviceSizes: [640, 750, 828, 1080, 1200, 1500, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
