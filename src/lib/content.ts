// Single source of truth for site copy and links.
// Direction B keeps copy minimal — every word earns its place.

export const content = {
  meta: {
    name: 'Andreas Grape',
    location: 'Stockholm',
    year: '2026',
    email: 'andreas@andreasgrape.com',
    linkedin: 'https://www.linkedin.com/in/grapeandreas/',
  },

  nav: [
    { label: 'Background',     href: '#background' },
    { label: 'Nordic Angels',  href: '#nordic-angels' },
    { label: 'Portfolio',      href: '#portfolio' },
    { label: 'Next',           href: '#next' },
    { label: 'Contact',        href: '#contact' },
  ],

  hero: {
    sentence: 'Building infrastructure for the Nordic private capital market.',
  },

  background: {
    label: 'A short version',
    body: `I started my first company in 2008. Sold it in 2021. Spent 13 years scaling One Agency to 240 MSEK in revenue. Backed Academic Work in 2001 — it became Scandinavia's largest staffing company. Co-founded Nordic Angels with Ash Pournouri in 2020. Opened Angel House in 2025. Currently building what comes next.`,
    place: 'Stockholm, 2026',
  },

  nordicAngels: {
    label: 'The primary initiative',
    name: 'Nordic Angels.',
    tagline: 'The operating system for the Nordic private capital market.',
    rows: [
      { num: '01', name: 'Network',  desc: '2,000+ vouched members across the region.' },
      { num: '02', name: 'Platform', desc: 'Invite-only digital home for the network.' },
      { num: '03', name: 'Events',   desc: 'From luncheons to the Angel Prize.' },
      { num: '04', name: 'Media',    desc: 'Podcasts, newsletter, magazine.' },
      { num: '05', name: 'Research', desc: 'State of European Angels, with BCG.' },
      { num: '06', name: 'Capital',  desc: 'Co-investment vehicles & SPVs.' },
      { num: '07', name: 'Policy',   desc: 'A voice for private capital in Brussels and the Nordics.' },
    ],
    link: { label: 'Visit nordicangels.com', href: 'https://nordicangels.com' },
  },

  portfolio: {
    title: "What I've built.",
    summary: 'Eight companies · four initiatives · two bets',
    companies: [
      { name: 'Nordic Angels',  built: 'Built for the Nordic capital market.',                 year: '2020 →',     status: 'ACTIVE', primary: true },
      { name: 'Angel House',    built: 'Built for the Nordic angel community.',                year: '2025 →',     status: 'ACTIVE' },
      { name: 'Mingla',         built: 'Built for the room that wants to actually meet.',      year: '2023 →',     status: 'ACTIVE' },
      { name: 'Nordisia',       built: 'Built for capital meeting real estate.',               year: '2024 →',     status: 'ACTIVE' },
      { name: 'Secondry',       built: "Built for the secondaries that don't have a market yet.", year: '2025 →',  status: 'ACTIVE' },
      { name: 'Snöboll',        built: 'Built for the angels who invest together.',            year: '2024 →',     status: 'ACTIVE' },
      { name: 'Angel Advisory', built: 'Built for the bridge between angels and corporate finance.', year: '2024 →', status: 'ACTIVE' },
      { name: 'One Agency',     built: 'Built for 13 years. Sold.',                            year: '2008–2021',  status: 'EXIT', muted: true },
    ],
    initiatives: [
      { name: 'Angel Prize',              desc: 'The largest investor gala in Europe.',  year: '2021 →' },
      { name: 'State of European Angels', desc: 'With Boston Consulting Group.',         year: '2024 →' },
      { name: 'Davos Angels',             desc: 'An annual gathering on the world stage.', year: '2024 →' },
      { name: 'Patric blir Ängel',        desc: 'The podcast demystifying angel investing.', year: '2022 →' },
    ],
    bets: [
      { name: 'Academic Work', desc: "Backed in 2001. Now Scandinavia's largest staffing company.", role: 'EARLY INVESTOR' },
      { name: 'Superhuman',    desc: 'Advisor.',                                                    role: 'ADVISOR' },
    ],
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
