'use client';

import { content } from '@/lib/content';
import { useHeroReveal } from '@/hooks/useHeroReveal';
import styles from './Hero.module.scss';

export function Hero() {
  const ref = useHeroReveal<HTMLHeadingElement>();

  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <h1 id="hero-headline" ref={ref} className={styles.headline}>
        {content.hero.sentence}
      </h1>
    </section>
  );
}
