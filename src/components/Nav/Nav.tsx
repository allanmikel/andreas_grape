'use client';

import { useEffect, useState } from 'react';
import { content } from '@/lib/content';
import styles from './Nav.module.scss';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={styles.nav}
      data-scrolled={scrolled || undefined}
      aria-label="Primary"
    >
      <a href="#" className={styles.wordmark} aria-label="Andreas Grape, home">
        andreas grape<span className={styles.dot}>.</span>
      </a>

      <ul className={styles.links}>
        {content.nav.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
