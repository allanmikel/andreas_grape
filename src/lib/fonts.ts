import { IBM_Plex_Mono } from 'next/font/google';

// Direction B: one typeface only.
// IBM Plex Mono — slight serif flares, confident without being retro.
// Hierarchy comes from weight + size + case.
//
// Three weights only: 300 hero, 400 body, 500 eyebrow + card title + logo.
// Italic is not used anywhere — dropping it halves the requested font files.
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
});
