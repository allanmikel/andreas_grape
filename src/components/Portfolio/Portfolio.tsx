import { content } from '@/lib/content';
import { Marquee } from '@/components/Marquee/Marquee';
import { CaseCard } from '@/components/CaseCard/CaseCard';
import styles from './Portfolio.module.scss';

const groups = [
  { kind: 'company',    label: 'Companies',   duration: 70, direction: 'left'  as const },
  { kind: 'initiative', label: 'Initiatives', duration: 55, direction: 'right' as const },
  { kind: 'bet',        label: 'Bets',        duration: 45, direction: 'left'  as const },
];

export function Portfolio() {
  return (
    <section id="portfolio" className={styles.section} aria-labelledby="portfolio-title">
      <header className={styles.header}>
        <span className={styles.eyebrow}>Portfolio</span>
        <h2 id="portfolio-title" className={styles.title}>
          {content.portfolio.title}
        </h2>
        <span className={styles.summary}>{content.portfolio.summary}</span>
      </header>

      {groups.map((group) => {
        const items = content.portfolio.cases.filter((c) => c.kind === group.kind);
        return (
          <div key={group.kind} className={styles.group}>
            <div className={styles.groupHeader}>
              <span className={styles.groupLabel}>{group.label}</span>
              <span className={styles.groupCount}>
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            <Marquee duration={group.duration} direction={group.direction}>
              {items.map((c) => (
                <CaseCard
                  key={c.slug}
                  name={c.name}
                  built={c.built}
                  year={c.year}
                  status={c.status}
                  image={c.image}
                  muted={'muted' in c ? c.muted : undefined}
                />
              ))}
            </Marquee>
          </div>
        );
      })}
    </section>
  );
}
