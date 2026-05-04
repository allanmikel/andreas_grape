'use client';

import Image from 'next/image';
import type { Case } from '@/lib/content';
import styles from './PortfolioCard.module.scss';

type Props = {
  item: Case;
  priority?: boolean;
};

export function PortfolioCard({ item, priority }: Props) {
  const { name, subtitle, description, image, imageAlt, href, year, status, muted } = item;
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      data-card
      data-muted={muted || undefined}
      data-active="false"
      className={styles.card}
      aria-label={`${name}. ${subtitle}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className={styles.frame}>
        <Image
          src={image}
          alt={imageAlt ?? ''}
          fill
          sizes="(min-width: 1280px) 52vw, (min-width: 768px) 70vw, 86vw"
          className={styles.image}
          priority={priority}
        />
        <div className={styles.veil} aria-hidden="true" />

        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.status}>{status}</span>
        </div>

        <div className={styles.body}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  );
}
