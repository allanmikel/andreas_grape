import type { Metadata, Viewport } from 'next';
import { fontBody, fontMono } from '@/lib/fonts';
import { LenisProvider } from '@/components/Lenis/LenisProvider';
import { EditorialRevealProvider } from '@/components/EditorialReveal/EditorialReveal';
import { Logo } from '@/components/Logo/Logo';
import { ScrollTop } from '@/components/ScrollTop/ScrollTop';
import { SITE_URL, PERSON_SUMMARY, KEYWORDS, buildJsonLd } from '@/lib/seo';
import './globals.scss';

const TITLE = 'Andreas Grape — Serial Entrepreneur & Angel Investor, Stockholm';
const TAGLINE = 'Building infrastructure for the Nordic private capital market.';

const OG_IMAGE = {
  url: '/og/andreas_grape.jpg',
  width: 1920,
  height: 1279,
  alt: 'Andreas Grape — Building infrastructure for the Nordic private capital market',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s — Andreas Grape' },
  description: PERSON_SUMMARY,
  keywords: KEYWORDS,
  authors: [{ name: 'Andreas Grape', url: SITE_URL }],
  creator: 'Andreas Grape',
  publisher: 'Andreas Grape',
  category: 'Business',
  applicationName: 'Andreas Grape',
  alternates: {
    canonical: SITE_URL,
    // Point AI agents and answer engines at the machine-readable profile and
    // the llms.txt entry point. Renders <link rel="alternate" ...> in <head>.
    types: {
      'text/markdown': [
        { url: '/andreas-grape.md', title: 'Andreas Grape — Full Profile (Markdown)' },
        { url: '/llms.txt', title: 'Andreas Grape — llms.txt' },
      ],
    },
  },
  openGraph: {
    title: TITLE,
    description: PERSON_SUMMARY,
    url: SITE_URL,
    siteName: 'Andreas Grape',
    locale: 'en_US',
    alternateLocale: ['sv_SE'],
    type: 'profile',
    firstName: 'Andreas',
    lastName: 'Grape',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: TAGLINE,
    images: [OG_IMAGE.url],
  },
  // Explicit, generous crawl directives. The large max-* values invite Google
  // (and the AI Overviews that read the same signals) to surface full snippets.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

// Next 14+ moved themeColor / viewport scaling out of `metadata` into a
// dedicated `viewport` export. Using the supported API for Next 16.
export const viewport: Viewport = {
  themeColor: '#0A0E14',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontMono.variable}`}>
      <body>
        {/* Schema.org structured data — the primary fact source crawlers and
            answer engines parse to describe Andreas Grape and his companies. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <Logo />
        <LenisProvider>
          <EditorialRevealProvider>
            <main id="main">{children}</main>
            <ScrollTop />
          </EditorialRevealProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
