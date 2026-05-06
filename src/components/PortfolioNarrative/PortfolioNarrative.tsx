import { content, type Case, type CaseKind } from '@/lib/content';
import { PortfolioChapter } from '@/components/PortfolioChapter/PortfolioChapter';
import { NordicAngels } from '@/components/NordicAngels/NordicAngels';

type ChapterDef = {
  kind: CaseKind;
  label: string;
  tone?: 'primary' | 'quiet';
};

const CHAPTERS: ChapterDef[] = [
  { kind: 'company',    label: 'Companies Founded' },
  { kind: 'portfolio',  label: 'Current Portfolio' },
  { kind: 'initiative', label: 'Initiatives within Nordic Angels' },
  { kind: 'bet',        label: 'Early Bets & Advisory', tone: 'quiet' },
  { kind: 'exit',       label: 'Selected Exits',         tone: 'quiet' },
];

export function PortfolioNarrative() {
  const cases = content.portfolio.cases as readonly Case[];
  const by = (kind: CaseKind) => cases.filter((c) => c.kind === kind);

  return (
    <>
      <PortfolioChapter
        index={1}
        label={CHAPTERS[0].label}
        items={by(CHAPTERS[0].kind)}
      />

      <PortfolioChapter
        index={2}
        label={CHAPTERS[1].label}
        items={by(CHAPTERS[1].kind)}
      />

      <NordicAngels />

      <PortfolioChapter
        index={3}
        label={CHAPTERS[2].label}
        items={by(CHAPTERS[2].kind)}
      />

      <PortfolioChapter
        index={4}
        label={CHAPTERS[3].label}
        tone={CHAPTERS[3].tone}
        items={by(CHAPTERS[3].kind)}
      />

      <PortfolioChapter
        index={5}
        label={CHAPTERS[4].label}
        tone={CHAPTERS[4].tone}
        items={by(CHAPTERS[4].kind)}
      />
    </>
  );
}
