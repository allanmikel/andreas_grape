import { IBM_Plex_Mono, Inter } from 'next/font/google';

// =============================================================================
// Type system: two families, three roles.
//   --font-display  Neue Haas Grotesk Display  hero, section titles, card names
//   --font-body     Neue Haas Grotesk Text     descriptions, narrative copy
//   --font-mono     IBM Plex Mono              eyebrows, meta, status, year
//
// Neue Haas Grotesk is a commercial face. Until the licensed .woff2 files
// are dropped into /public/fonts, the cross-platform fallback loaded here
// is Inter — the standard Helvetica/Neue Haas substitute that ships
// consistently on every OS via next/font.
//
// To upgrade: add @font-face declarations in globals.scss pointing to the
// real Neue Haas Grotesk Display / Text files, then the families already
// prepended in src/styles/variables.scss take precedence with zero
// component edits.
// =============================================================================

// Neue Haas Grotesk fallback. Inter is the closest widely-available neutral
// grotesque and the canonical substitute on the web.
export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-body',
  display: 'swap',
});

// Mono is IBM Plex Mono outright — confident, slightly humanist, no
// terminal ornament. Used for eyebrows, status, years, and labels.
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
});
