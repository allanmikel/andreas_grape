// =============================================================================
// SEO / GEO single source of truth.
//
// Two audiences read this site that never look at pixels:
//   1. Search crawlers (Googlebot, Bingbot) — rank on metadata + structured data.
//   2. LLM/answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews,
//      Gemini) — "GEO" (Generative Engine Optimization). They reward pages
//      that hand them clean, machine-parseable facts via JSON-LD and /llms.txt.
//
// Everything here is derived from `content.ts` so the structured data can never
// drift from the rendered copy.
// =============================================================================

import { content } from './content';

export const SITE_URL = 'https://andreasgrape.com';

// One canonical, fact-dense sentence describing the person. Reused verbatim
// across <meta description>, OpenGraph, and the Person schema so every channel
// tells answer engines the same story.
export const PERSON_SUMMARY =
  'Andreas Grape is a Stockholm-based serial entrepreneur and angel investor, ' +
  'co-founder of Nordic Angels — the operating system for the Nordic private ' +
  'capital market. Over 25 years he built and exited an IT consulting company ' +
  '(2008–2021), backed Academic Work in 2001 (now Scandinavia’s largest ' +
  'staffing company), co-founded Nordic Angels with Ash Pournouri in 2020, and ' +
  'co-owns Angel House, a private members club for angels and creatives in Stockholm.';

// Topical authority signals — what answer engines should associate with him.
export const KNOWS_ABOUT = [
  'Angel investing',
  'Venture capital',
  'Nordic private capital market',
  'Startup ecosystem',
  'Corporate finance',
  'Private market secondaries',
  'Real estate investment',
  'Longevity and biotech investing',
  'IT consulting',
  'Entrepreneurship',
];

// Bilingual keyword set — English for international/answer-engine reach,
// Swedish for the home market where the searches actually originate.
export const KEYWORDS = [
  'Andreas Grape',
  'Nordic Angels',
  'Angel House',
  'Ash Pournouri',
  'angel investor Stockholm',
  'ängelinvesterare',
  'affärsängel',
  'Nordic private capital',
  'serial entrepreneur Sweden',
  'serieentreprenör',
  'venture capital Nordics',
  'Stockholm startup investor',
  'Academic Work investor',
  'Nordic startup ecosystem',
];

type GraphNode = Record<string, unknown>;

const personId = `${SITE_URL}/#andreas-grape`;
const websiteId = `${SITE_URL}/#website`;

// Companies Andreas founded / co-founded, modelled as Organizations whose
// `founder` points back at the Person node. This is the strongest GEO signal:
// it lets an answer engine state "Andreas Grape founded X, Y, Z" with sources.
function foundedOrganizations(): GraphNode[] {
  return content.portfolio.cases
    .filter((c) => c.kind === 'company' && c.href && c.href !== '#')
    .map((c) => ({
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org-${c.slug}`,
      name: c.name,
      url: c.href,
      description: c.description,
      foundingDate: c.year.replace(/[^0-9]/g, '').slice(0, 4) || undefined,
      founder: { '@id': personId },
    }));
}

// Public profiles + entities Andreas is verifiably the same person across.
// `sameAs` is how engines reconcile this site with his identity elsewhere.
function sameAs(): string[] {
  return [
    content.meta.linkedin,
    'https://nordicangels.com/',
    'https://www.angelhouse.se/',
  ];
}

/**
 * Schema.org JSON-LD graph for the site. Emitted once in the root layout.
 * Models a ProfilePage about a Person, the WebSite, and the founded companies.
 */
export function buildJsonLd(): GraphNode {
  const person: GraphNode = {
    '@type': 'Person',
    '@id': personId,
    name: content.meta.name,
    url: SITE_URL,
    image: `${SITE_URL}/og/andreas_grape.jpg`,
    jobTitle: 'Serial Entrepreneur & Angel Investor',
    description: PERSON_SUMMARY,
    knowsAbout: KNOWS_ABOUT,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jakobsbergsgatan 27',
      postalCode: '111 14',
      addressLocality: 'Stockholm',
      addressCountry: 'SE',
    },
    worksFor: { '@id': `${SITE_URL}/#org-nordic-angels` },
    sameAs: sameAs(),
  };

  const website: GraphNode = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_URL,
    name: content.meta.name,
    inLanguage: 'en',
    about: { '@id': personId },
    publisher: { '@id': personId },
  };

  const profilePage: GraphNode = {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${content.meta.name} — ${content.hero.sentence}`,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [website, profilePage, person, ...foundedOrganizations()],
  };
}
