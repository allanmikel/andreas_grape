'use client';

import { useRef } from 'react';
import type { Case } from '@/lib/content';
import { PortfolioCard } from '@/components/PortfolioCard/PortfolioCard';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';
import styles from './PortfolioChapter.module.scss';

type Props = {
  index: number;
  label: string;
  items: readonly Case[];
  tone?: 'primary' | 'quiet';
};

export function PortfolioChapter({ index, label, items, tone = 'primary' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  usePinnedHorizontalScroll(sectionRef, trackRef);

  return (
    <section
      ref={sectionRef}
      className={styles.chapter}
      aria-label={label}
      data-chapter={label.toLowerCase()}
      data-tone={tone}
    >
      <div className={styles.viewport}>
        <header className={styles.header}>
          <span className={styles.label}>{label}</span>
        </header>

        <div ref={trackRef} className={styles.track}>
          <div className={styles.spacerStart} aria-hidden="true" />
          {items.map((item, i) => (
            <PortfolioCard
              key={item.slug}
              item={item}
              priority={index === 1 && i === 0}
              // Eager-load the first three cards of every chapter so the
              // mobile step-machine never lands on a card whose image is
              // still mid-fetch. Subsequent cards stay lazy.
              eager={i < 3}
            />
          ))}
          <div className={styles.spacerEnd} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
