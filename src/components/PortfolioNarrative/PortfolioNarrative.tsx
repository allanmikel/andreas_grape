import { content, type Case, type CaseKind } from '@/lib/content';
import { PortfolioChapter } from '@/components/PortfolioChapter/PortfolioChapter';

const CHAPTERS: { kind: CaseKind; label: string; title: string }[] = [
  { kind: 'company',    label: 'Companies',   title: 'The companies.' },
  { kind: 'bet',        label: 'Bets',        title: 'The bets.' },
  { kind: 'initiative', label: 'Initiatives', title: 'The initiatives.' },
];

export function PortfolioNarrative() {
  const cases = content.portfolio.cases as readonly Case[];

  return (
    <>
      {CHAPTERS.map((chapter, i) => (
        <PortfolioChapter
          key={chapter.kind}
          index={i + 1}
          label={chapter.label}
          title={chapter.title}
          items={cases.filter((c) => c.kind === chapter.kind)}
        />
      ))}
    </>
  );
}
