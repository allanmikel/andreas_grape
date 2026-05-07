'use client';

import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import styles from './ScrollTop.module.scss';

/**
 * Floating "back to top" affordance.
 * Lives in the bottom-right corner. Hidden until the page is scrolled past
 * one viewport so the hero never has to share the corner with it.
 * Uses Lenis when available for a smooth ride; falls back to native smooth
 * scroll otherwise.
 */
export function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    if (lenis) {
      try {
        lenis.scrollTo(0, { duration: 1.4 });
        return;
      } catch {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Scroll to top"
      className={styles.button}
      data-visible={visible || undefined}
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        className={styles.icon}
      >
        <path
          d="M8 13 V3 M3 8 L8 3 L13 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
}
