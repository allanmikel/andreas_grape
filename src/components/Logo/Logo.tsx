'use client';

import styles from './Logo.module.scss';

/**
 * Andreas Grape wordmark.
 * Stacked mono caps "ANDREAS / GRAPE." with a small grape-cluster glyph
 * to the left. The cluster is three dots in a downward triangle with a
 * short stem — a literal grape rendered with brutalist economy.
 */
export function Logo() {
  return (
    <a href="#" className={styles.logo} aria-label="Andreas Grape, home">
      <svg
        className={styles.mark}
        viewBox="0 0 32 36"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* stem */}
        <line x1="16" y1="2" x2="16" y2="10" stroke="currentColor" strokeWidth="1.3" />
        {/* three grapes */}
        <circle cx="11" cy="14" r="3.4" fill="currentColor" />
        <circle cx="21" cy="14" r="3.4" fill="currentColor" />
        <circle cx="16" cy="22" r="3.4" fill="currentColor" />
      </svg>

      <span className={styles.text}>
        <span className={styles.line}>ANDREAS</span>
        <span className={styles.line}>
          GRAPE<i className={styles.dot}>.</i>
        </span>
      </span>
    </a>
  );
}
