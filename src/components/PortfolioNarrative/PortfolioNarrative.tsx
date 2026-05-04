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
  { kind: 'initiative', label: 'Initiatives within Nordic Angels' },
  { kind: 'bet',        label: 'Early Bets & Advisory', tone: 'quiet' },
];

export function PortfolioNarrative() {
  const cases = content.portfolio.cases as readonly Case[];

  return (
    <>
      <PortfolioChapter
        index={1}
        label={CHAPTERS[0].label}
        items={cases.filter((c) => c.kind === CHAPTERS[0].kind)}
      />

      <NordicAngels />

      <PortfolioChapter
        index={2}
        label={CHAPTERS[1].label}
        items={cases.filter((c) => c.kind === CHAPTERS[1].kind)}
      />

      <PortfolioChapter
        index={3}
        label={CHAPTERS[2].label}
        tone={CHAPTERS[2].tone}
        items={cases.filter((c) => c.kind === CHAPTERS[2].kind)}
      />
    </>
  );
}
