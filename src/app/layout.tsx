import type { Metadata, Viewport } from 'next';
import { fontMono } from '@/lib/fonts';
import { LenisProvider } from '@/components/Lenis/LenisProvider';
import { Logo } from '@/components/Logo/Logo';
import './globals.scss';

const OG_IMAGE = {
  url: '/og/cover.jpg',
  width: 1200,
  height: 630,
  alt: 'Andreas Grape — Building infrastructure for the Nordic private capital market',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://andreasgrape.com'),
  title: { default: 'Andreas Grape', template: '%s — Andreas Grape' },
  description: 'Building infrastructure for the Nordic private capital market.',
  alternates: { canonical: 'https://andreasgrape.com' },
  openGraph: {
    title: 'Andreas Grape',
    description: 'Building infrastructure for the Nordic private capital market.',
    url: 'https://andreasgrape.com',
    siteName: 'Andreas Grape',
    locale: 'en_US',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andreas Grape',
    description: 'Building infrastructure for the Nordic private capital market.',
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
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
    <html lang="en" className={fontMono.variable}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Logo />
        <LenisProvider>
          <main id="main">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
