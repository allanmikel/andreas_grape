// Single source of truth for site copy and links.
// Direction B keeps copy minimal — every word earns its place.

export type CaseKind = 'company' | 'bet' | 'initiative';

export type Case = {
  slug: string;
  kind: CaseKind;
  name: string;
  built: string;
  year: string;
  status: string;
  image: string;
  href: string;
  subtitle: string;
  description: string;
  imageAlt?: string;
  primary?: boolean;
  muted?: boolean;
};

export const content = {
  meta: {
    name: 'Andreas Grape',
    location: 'Stockholm',
    year: '2026',
    email: 'andreas@andreasgrape.com',
    linkedin: 'https://www.linkedin.com/in/grapeandreas/',
  },

  hero: {
    sentence: 'Building infrastructure for the Nordic private capital market.',
  },

  background: {
    label: 'A short version',
    body: `I started my first company in 2008. Sold it in 2021. Spent 13 years scaling One Agency to 240 MSEK in revenue. Backed Academic Work in 2001 — it became Scandinavia's largest staffing company. Co-founded Nordic Angels with Ash Pournouri in 2020. Opened Angel House in 2025. Currently building what comes next.`,
    place: 'Stockholm, 2026',
  },

  // Cases grouped at render-time by `kind`. Order in this array does not
  // determine chapter order — chapters are composed in PortfolioNarrative.
  // Each entry is a full Case with link, subtitle, and longer description so
  // PortfolioCard has reveal copy ready. Replace `href: '#'` placeholders as
  // real URLs land — the data shape stays the same.
  portfolio: {
    title: "What I've built.",
    summary: 'Eight companies · two bets · four initiatives',
    cases: [
      // --- Companies -----------------------------------------------------
      { slug: 'nordic-angels', kind: 'company', name: 'Nordic Angels',
        built: 'Built for the Nordic capital market.',
        subtitle: 'The Nordic angel network.',
        description: 'Co-founded with Ash Pournouri in 2020. The institutional layer connecting Nordic angels to the companies that need them.',
        year: '2020 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/nordicangels/1600/1000',
        href: '#', primary: true },
      { slug: 'angel-house', kind: 'company', name: 'Angel House',
        built: 'Built for the Nordic angel community.',
        subtitle: 'A physical home for Nordic capital.',
        description: 'Opened in Stockholm 2025. The operational base where Nordic angels, founders, and institutions meet in person.',
        year: '2025 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angelhouse/1600/1000',
        href: '#' },
      { slug: 'mingla', kind: 'company', name: 'Mingla',
        built: 'Built for the room that wants to actually meet.',
        subtitle: 'Curated rooms, real introductions.',
        description: 'Software for the events and gatherings where capital and talent are supposed to meet — and usually don’t.',
        year: '2023 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/mingla/1600/1000',
        href: '#' },
      { slug: 'nordisia', kind: 'company', name: 'Nordisia',
        built: 'Built for capital meeting real estate.',
        subtitle: 'Where private capital meets real estate.',
        description: 'A platform for matching Nordic private capital with real estate opportunities at institutional standards.',
        year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/nordisia/1600/1000',
        href: '#' },
      { slug: 'secondry', kind: 'company', name: 'Secondry',
        built: "Built for the secondaries that don't have a market yet.",
        subtitle: 'Liquidity for private positions.',
        description: 'Building the secondary market for Nordic private holdings — the layer that’s been missing for two decades.',
        year: '2025 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/secondry/1600/1000',
        href: '#' },
      { slug: 'snoboll', kind: 'company', name: 'Snöboll',
        built: 'Built for the angels who invest together.',
        subtitle: 'Syndication infrastructure.',
        description: 'The rails Nordic angels use to invest as a group — terms, allocation, follow-on, all in one place.',
        year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/snoboll/1600/1000',
        href: '#' },
      { slug: 'angel-advisory', kind: 'company', name: 'Angel Advisory',
        built: 'Built for the bridge between angels and corporate finance.',
        subtitle: 'Corporate finance for angel-backed companies.',
        description: 'Advisory for the moment angel-backed companies graduate to institutional rounds, M&A, and beyond.',
        year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angeladvisory/1600/1000',
        href: '#' },
      { slug: 'one-agency', kind: 'company', name: 'One Agency',
        built: 'Built for 13 years. Sold.',
        subtitle: 'Founded 2008. Sold 2021.',
        description: 'Scaled to 240 MSEK in revenue over 13 years before exit. The company that taught the playbook.',
        year: '2008–2021', status: 'EXIT',
        image: 'https://picsum.photos/seed/oneagency/1600/1000',
        href: '#', muted: true },

      // --- Bets ----------------------------------------------------------
      { slug: 'academic-work', kind: 'bet', name: 'Academic Work',
        built: "Backed in 2001. Now Scandinavia's largest staffing company.",
        subtitle: 'Backed in 2001.',
        description: "Now Scandinavia's largest staffing company. The bet that defined an asset class and a career.",
        year: '2001 →', status: 'EARLY INVESTOR',
        image: 'https://picsum.photos/seed/academicwork/1600/1000',
        href: '#' },
      { slug: 'superhuman', kind: 'bet', name: 'Superhuman',
        built: 'Advisor.',
        subtitle: 'Advisor.',
        description: 'Long-form bet on the next generation of productivity software and the operators building it.',
        year: '—', status: 'ADVISOR',
        image: 'https://picsum.photos/seed/superhuman/1600/1000',
        href: '#' },

      // --- Initiatives ---------------------------------------------------
      { slug: 'angel-prize', kind: 'initiative', name: 'Angel Prize',
        built: 'The largest investor gala in Europe.',
        subtitle: 'Europe’s largest investor gala.',
        description: 'The annual stage that recognises the angels and operators shaping European private capital.',
        year: '2021 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angelprize/1600/1000',
        href: '#' },
      { slug: 'state-of-european-angels', kind: 'initiative', name: 'State of European Angels',
        built: 'With Boston Consulting Group.',
        subtitle: 'The annual report. With BCG.',
        description: 'The benchmark study on European angel investing, produced with Boston Consulting Group.',
        year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/stateofangels/1600/1000',
        href: '#' },
      { slug: 'davos-angels', kind: 'initiative', name: 'Davos Angels',
        built: 'An annual gathering on the world stage.',
        subtitle: 'Angels at the world stage.',
        description: 'An annual gathering bringing the European angel community to Davos during World Economic Forum week.',
        year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/davosangels/1600/1000',
        href: '#' },
      { slug: 'patric-blir-angel', kind: 'initiative', name: 'Patric blir Ängel',
        built: 'The podcast demystifying angel investing.',
        subtitle: 'The podcast.',
        description: 'A long-running conversation series demystifying angel investing for the next generation of Nordic operators.',
        year: '2022 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/patricblirangel/1600/1000',
        href: '#' },
    ] satisfies readonly Case[],
  },

  next: {
    label: 'What comes next',
    items: [
      { year: '2026.', text: 'Building institutional bridges between angels and the capital that scales them.' },
      { year: '2027.', text: 'Scaling Angel House as the operational base for the Nordic capital community.' },
      { year: '2028.', text: 'Cross-border infrastructure across Stockholm, Oslo, Copenhagen, and Helsinki.' },
    ],
  },

  contact: {
    line: "Let's build something.",
  },

  footer: {
    left:  'Stockholm · 2026',
    right: 'Built in confidence.',
  },
} as const;
