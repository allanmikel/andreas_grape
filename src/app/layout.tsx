import type { Metadata } from 'next';
import { fontMono } from '@/lib/fonts';
import { LenisProvider } from '@/components/Lenis/LenisProvider';
import { Logo } from '@/components/Logo/Logo';
import './globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://andreasgrape.com'),
  title: { default: 'Andreas Grape', template: '%s — Andreas Grape' },
  description: 'Building infrastructure for the Nordic private capital market.',
  openGraph: {
    title: 'Andreas Grape',
    description: 'Building infrastructure for the Nordic private capital market.',
    url: 'https://andreasgrape.com',
    siteName: 'Andreas Grape',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andreas Grape',
    description: 'Building infrastructure for the Nordic private capital market.',
  },
  robots: { index: true, follow: true },
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
