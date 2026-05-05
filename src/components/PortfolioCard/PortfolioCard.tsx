'use client';

import Image from 'next/image';
import type { Case } from '@/lib/content';
import styles from './PortfolioCard.module.scss';

type Props = {
  item: Case;
  /** LCP candidate: passed to next/image as priority. Use only on the very
   *  first card of the very first chapter. */
  priority?: boolean;
  /** Skip lazy-loading without claiming LCP priority. Used for the next few
   *  cards in a chapter so step-machine transitions never reveal a card whose
   *  image is still mid-fetch. */
  eager?: boolean;
};

export function PortfolioCard({ item, priority, eager }: Props) {
  const { name, subtitle, description, image, imageAlt, href, year, status, role, muted } = item;
  const external = /^https?:\/\//.test(href);

  const ariaLabel = `${name}. ${role ? `Role: ${role}. ` : ''}${subtitle}. Status: ${status}.`;

  return (
    <a
      href={href}
      data-card
      data-muted={muted || undefined}
      data-active="false"
      className={styles.card}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className={styles.frame}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? ''}
            fill
            sizes="(min-width: 1280px) 52vw, (min-width: 768px) 70vw, 86vw"
            className={styles.image}
            priority={priority}
            loading={priority || eager ? 'eager' : 'lazy'}
          />
        ) : null}
        <div className={styles.veil} aria-hidden="true" />

        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.status} data-status={status.toLowerCase()}>{status}</span>
        </div>

        <div className={styles.body}>
          {role && <span className={styles.role}>Role · {role}</span>}
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  );
}
