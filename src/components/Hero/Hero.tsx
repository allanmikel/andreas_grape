'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { content } from '@/lib/content';
import { useHeroReveal } from '@/hooks/useHeroReveal';
import { useCurtainScroll } from '@/hooks/useCurtainScroll';
import styles from './Hero.module.scss';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useHeroReveal<HTMLHeadingElement>();

  useCurtainScroll(sectionRef, portraitRef);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="hero-headline">
      <div ref={portraitRef} className={styles.portrait} aria-hidden="true">
        <Image
          src="/images/andreas_grape.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.portraitImg}
        />
      </div>

      <div className={styles.copy}>
        <span className={styles.role}>{content.hero.role}</span>
        <h1 id="hero-headline" ref={headlineRef} className={styles.headline}>
          {content.hero.sentence}
        </h1>

        <nav className={styles.ctas} aria-label="Primary">
          {content.hero.ctas.map((cta) => (
            <a key={cta.label} href={cta.href} className={styles.cta}>
              <span>{cta.label}</span>
              <span aria-hidden="true" className={styles.ctaArrow}>→</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
