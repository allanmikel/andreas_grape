'use client';

import { useRef } from 'react';
import type { Case } from '@/lib/content';
import { PortfolioCard } from '@/components/PortfolioCard/PortfolioCard';
import { usePinnedHorizontalScroll } from '@/hooks/usePinnedHorizontalScroll';
import styles from './PortfolioChapter.module.scss';

type Props = {
  index: number;
  label: string;
  title: string;
  items: readonly Case[];
};

export function PortfolioChapter({ index, label, title, items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  usePinnedHorizontalScroll(sectionRef, trackRef);

  const num = String(index).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className={styles.chapter}
      aria-labelledby={`chapter-${label.toLowerCase()}-title`}
      data-chapter={label.toLowerCase()}
    >
      <div className={styles.viewport}>
        <header className={styles.header}>
          <span className={styles.num}>Ch. {num}</span>
          <span className={styles.label}>{label}</span>
          <span className={styles.count}>
            {String(items.length).padStart(2, '0')} entries
          </span>
        </header>

        <h2 id={`chapter-${label.toLowerCase()}-title`} className={styles.title}>
          {title}
        </h2>

        <div ref={trackRef} className={styles.track}>
          <div className={styles.spacerStart} aria-hidden="true" />
          {items.map((item, i) => (
            <PortfolioCard key={item.slug} item={item} priority={index === 1 && i === 0} />
          ))}
          <div className={styles.spacerEnd} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
