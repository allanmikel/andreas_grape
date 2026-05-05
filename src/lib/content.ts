// Single source of truth for site copy and links.
// Direction B keeps copy minimal — every word earns its place.

export type CaseKind = 'company' | 'bet' | 'initiative';

export type Case = {
  slug: string;
  kind: CaseKind;
  name: string;
  built: string;        // Headline shown on card
  year: string;
  status: string;       // Status badge: "Active" / "Exit" etc.
  image: string;
  href: string;
  description: string;  // Reveal copy on active/hover/focus
  imageAlt?: string;
  primary?: boolean;
  muted?: boolean;
};

export const content = {
  meta: {
    name: 'Andreas Grape',
    location: 'Stockholm',
    year: '2026',
    email: 'andreas@nordicangels.com',
    linkedin: 'https://www.linkedin.com/in/grapeandreas/',
  },

  hero: {
    sentence: 'Building infrastructure for the Nordic private capital market.',
    ctas: [
      { label: 'Nordic Angels', href: 'https://nordicangels.com/' },
      { label: 'Angel House',   href: 'https://www.angelhouse.se/' },
    ],
  },

  background: {
    eyebrow: 'Background',
    milestones: [
      'Built an IT consulting company from scratch. Scaled. Exited.',
      'Early investor in Academic Work. Now Scandinavia’s largest staffing company.',
      'Co-founder of Nordic Angels. The investor network that runs the Nordic angel layer.',
      'Co-owner of Angel House. A private members club for angels and creatives.',
      'Now building the operating system for the Nordic private capital market.',
    ],
  },

  nordicAngelsOverview: {
    eyebrow: 'Nordic Angels',
    title: 'Operating system for the Nordic private capital market.',
    body: 'Co-founded with Ash Pournouri in 2020. The institutional layer that connects Nordic angels, founders, and the capital that scales them. Seven business lines run on top of it.',
    lines: [
      'Nordic Angels · the network',
      'Angel House · the home',
      'Mingla · the room',
      'Nordisia · capital meets real estate',
      'Secondry · private market secondaries',
      'Snöboll · angel co-investing',
      'Angel Advisory · corporate finance',
    ],
    link: { label: 'Visit Nordic Angels', href: 'https://nordicangels.com/' },
  },

  // Cases grouped at render-time by `kind`. Order in this array does not
  // determine chapter order — chapters are composed in PortfolioNarrative.
  portfolio: {
    title: "What I've built.",
    summary: 'Eight companies · two bets · four initiatives',
    cases: [
      // --- Companies Founded --------------------------------------------
      { slug: 'nordic-angels', kind: 'company', name: 'Nordic Angels',
        built: 'The investor network that runs the Nordic angel layer.',
        description: 'Co-founded with Ash Pournouri in 2020. The institutional layer connecting Nordic angels to the companies that need them.',
        year: '2020 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/', primary: true },
      { slug: 'angel-house', kind: 'company', name: 'Angel House',
        built: 'A private members club for angels and creatives.',
        description: 'Opened in Stockholm 2025. The operational base where Nordic angels, founders, and creatives gather in person.',
        year: '2025 →', status: 'Active',
        image: '',
        href: 'https://www.angelhouse.se/' },
      { slug: 'mingla', kind: 'company', name: 'Mingla',
        built: 'Gamified networking. Move your guests from passive to active.',
        description: 'Software for the events and gatherings where capital and talent are supposed to meet, and usually don’t.',
        year: '2023 →', status: 'Active',
        image: '',
        href: 'https://mingla.io/' },
      { slug: 'nordisia', kind: 'company', name: 'Nordisia',
        built: 'Connecting capital with high-performing real estate development.',
        description: 'A platform for matching Nordic private capital with real estate opportunities at institutional standards.',
        year: '2024 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/' },
      { slug: 'secondry', kind: 'company', name: 'Secondry',
        built: 'The gateway to private market secondaries.',
        description: 'Building the secondary market for Nordic private holdings. The layer that has been missing for two decades.',
        year: '2025 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/' },
      { slug: 'snoboll', kind: 'company', name: 'Snöboll',
        built: 'Invest together with the angels building the Nordic market.',
        description: 'The rails Nordic angels use to invest as a group. Terms, allocation, follow-on, all in one place.',
        year: '2024 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/' },
      { slug: 'angel-advisory', kind: 'company', name: 'Angel Advisory',
        built: 'Bridging the angel world with corporate finance.',
        description: 'Advisory for the moment angel-backed companies graduate to institutional rounds, M&A, and beyond.',
        year: '2024 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/' },
      { slug: 'it-consulting', kind: 'company', name: 'IT Consulting Company',
        built: 'Built from scratch. Scaled. Exited.',
        description: '13 years building and scaling an IT consulting business in the Nordics. Exited in 2021. The company that taught the playbook.',
        year: '2008–2021', status: 'Exit',
        image: '',
        href: '#', muted: true },

      // --- Initiatives within Nordic Angels -----------------------------
      { slug: 'angel-prize', kind: 'initiative', name: 'Angel Prize',
        built: 'Europe’s annual investor gala.',
        description: 'The yearly stage that recognises the angels and operators shaping European private capital.',
        year: '2021 →', status: 'Active',
        image: '',
        href: 'https://www.angelprize.com/' },
      { slug: 'davos-angels', kind: 'initiative', name: 'Davos Angels',
        built: 'The angels who go to Davos.',
        description: 'An annual gathering bringing leading European angels to Davos during World Economic Forum week.',
        year: '2024 →', status: 'Active',
        image: '',
        href: 'https://nordicangels.com/' },
      { slug: 'state-of-european-angels', kind: 'initiative', name: 'State of European Angels',
        built: 'The annual benchmark on European angel investing. With BCG.',
        description: 'Initiated with Boston Consulting Group. Quantitative market data plus insights from leading angels across the continent.',
        year: '2024 →', status: 'Active',
        image: '',
        href: 'https://www.stateofeuropeanangels.com/' },
      { slug: 'patric-blir-angel', kind: 'initiative', name: 'Patric blir Ängel',
        built: 'The podcast that demystifies angel investing.',
        description: 'Following Patric Edhagen on his journey into the startup world. Conversations with founders and angels across the Nordics.',
        year: '2022 →', status: 'Active',
        image: '',
        href: 'https://www.patricblirangel.se/' },

      // --- Early Bets & Advisory ----------------------------------------
      { slug: 'academic-work', kind: 'bet', name: 'Academic Work',
        built: 'Scandinavia’s largest staffing company.',
        description: 'Backed in 2001. Now Scandinavia’s largest staffing company. The bet that defined an asset class and a career.',
        year: '2001 →', status: 'Active',
        image: '',
        href: 'https://www.academicwork.se/' },
      { slug: 'superhuman', kind: 'bet', name: 'Superhuman.net',
        built: 'A network shaping the future of longevity, science, technology, and human evolution.',
        description: 'Advisory role within Super Human Network. An exclusive gathering of global visionaries exploring longevity science, technology, and the future of human evolution.',
        year: 'Ongoing', status: 'Active',
        image: '',
        href: 'https://superhuman.net/' },
    ] satisfies readonly Case[],
  },

  roadAhead: {
    eyebrow: 'The road ahead',
    items: [
      { year: '2026.', text: 'Building institutional bridges between angels and the capital that scales them.' },
      { year: '2027.', text: 'Scaling Angel House as the operational base for the Nordic capital community.' },
      { year: '2028.', text: 'Cross-border infrastructure across Stockholm, Oslo, Copenhagen, and Helsinki.' },
      { year: '2029.', text: 'Institutional investor relations through Nordic Angels at European scale.' },
    ],
  },

  contact: {
    line: "Let's build something.",
  },

  footer: {
    left:  'Stockholm · 2026',
    right: 'Built with intention.',
  },
} as const;
