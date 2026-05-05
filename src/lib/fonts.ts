import { IBM_Plex_Mono } from 'next/font/google';

// Direction B: one typeface only.
// IBM Plex Mono — slight serif flares, confident without being retro.
// Hierarchy comes from weight + size + case.
//
// Only the four weights actually referenced in the codebase are loaded
// (300 hero / 400 body / 500 eyebrow + card title / 600 logo). Italic is
// not used anywhere — dropping it halves the requested font files.
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
});
