import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Single-page site — one canonical URL. lastModified is static (no build-time
// Date allowed in this harness) and updated when content meaningfully changes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: '2026-06-03',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
