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

  hero: {
    sentence: 'Building infrastructure for the Nordic private capital market.',
  },

  background: {
    label: 'A short version',
    body: `I started my first company in 2008. Sold it in 2021. Spent 13 years scaling One Agency to 240 MSEK in revenue. Backed Academic Work in 2001 — it became Scandinavia's largest staffing company. Co-founded Nordic Angels with Ash Pournouri in 2020. Opened Angel House in 2025. Currently building what comes next.`,
    place: 'Stockholm, 2026',
  },

  // All cases (companies + initiatives + bets) flattened into one card grid.
  // Hierarchy carried by `kind` (company | initiative | bet) for grouping.
  // Image URLs use picsum with stable seeds — swap for real photos in
  // public/images/cards/<slug>.jpg later by replacing the `image` field.
  portfolio: {
    title: "What I've built.",
    summary: 'Eight companies · four initiatives · two bets',
    cases: [
      // --- Companies -----------------------------------------------------
      { slug: 'nordic-angels',  kind: 'company', name: 'Nordic Angels',  built: 'Built for the Nordic capital market.',                year: '2020 →',     status: 'ACTIVE',
        image: 'https://picsum.photos/seed/nordicangels/1200/900', primary: true },
      { slug: 'angel-house',    kind: 'company', name: 'Angel House',    built: 'Built for the Nordic angel community.',               year: '2025 →',     status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angelhouse/1200/900' },
      { slug: 'mingla',         kind: 'company', name: 'Mingla',         built: 'Built for the room that wants to actually meet.',     year: '2023 →',     status: 'ACTIVE',
        image: 'https://picsum.photos/seed/mingla/1200/900' },
      { slug: 'nordisia',       kind: 'company', name: 'Nordisia',       built: 'Built for capital meeting real estate.',              year: '2024 →',     status: 'ACTIVE',
        image: 'https://picsum.photos/seed/nordisia/1200/900' },
      { slug: 'secondry',       kind: 'company', name: 'Secondry',       built: "Built for the secondaries that don't have a market yet.", year: '2025 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/secondry/1200/900' },
      { slug: 'snoboll',        kind: 'company', name: 'Snöboll',        built: 'Built for the angels who invest together.',           year: '2024 →',     status: 'ACTIVE',
        image: 'https://picsum.photos/seed/snoboll/1200/900' },
      { slug: 'angel-advisory', kind: 'company', name: 'Angel Advisory', built: 'Built for the bridge between angels and corporate finance.', year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angeladvisory/1200/900' },
      { slug: 'one-agency',     kind: 'company', name: 'One Agency',     built: 'Built for 13 years. Sold.',                           year: '2008–2021',  status: 'EXIT',
        image: 'https://picsum.photos/seed/oneagency/1200/900', muted: true },

      // --- Initiatives ---------------------------------------------------
      { slug: 'angel-prize',     kind: 'initiative', name: 'Angel Prize',              built: 'The largest investor gala in Europe.',         year: '2021 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/angelprize/1200/900' },
      { slug: 'state-of-european-angels', kind: 'initiative', name: 'State of European Angels', built: 'With Boston Consulting Group.',       year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/stateofangels/1200/900' },
      { slug: 'davos-angels',    kind: 'initiative', name: 'Davos Angels',             built: 'An annual gathering on the world stage.',      year: '2024 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/davosangels/1200/900' },
      { slug: 'patric-blir-angel', kind: 'initiative', name: 'Patric blir Ängel',      built: 'The podcast demystifying angel investing.',    year: '2022 →', status: 'ACTIVE',
        image: 'https://picsum.photos/seed/patricblirangel/1200/900' },

      // --- Bets ----------------------------------------------------------
      { slug: 'academic-work', kind: 'bet', name: 'Academic Work', built: "Backed in 2001. Now Scandinavia's largest staffing company.", year: '2001 →', status: 'EARLY INVESTOR',
        image: 'https://picsum.photos/seed/academicwork/1200/900' },
      { slug: 'superhuman',    kind: 'bet', name: 'Superhuman',    built: 'Advisor.',                                                    year: '—',      status: 'ADVISOR',
        image: 'https://picsum.photos/seed/superhuman/1200/900' },
    ] as const,
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
