import { IBM_Plex_Mono } from 'next/font/google';

// Direction B: one typeface only.
// IBM Plex Mono — has 300/400/500/600/700, slight serif flares,
// confident without being retro. Hierarchy comes from weight + size + case.
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});
