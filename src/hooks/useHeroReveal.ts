'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Letter-by-letter reveal — fires once on mount.
 * ~20ms per character, blur 4px → 0px, slight upward drift.
 * Skipped entirely under prefers-reduced-motion.
 *
 * The element's existing text content is preserved server-side for SEO
 * and accessibility; the client effect splits it into spans only after
 * mount, so screen readers still see the full sentence.
 */
export function useHeroReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const original = el.textContent ?? '';
    el.setAttribute('aria-label', original);

    el.innerHTML = original
      .split('')
      .map((ch) =>
        ch === ' '
          ? '<span class="char" aria-hidden="true">&nbsp;</span>'
          : `<span class="char" aria-hidden="true">${ch}</span>`,
      )
      .join('');

    const chars = el.querySelectorAll('.char');

    const tween = gsap.from(chars, {
      opacity: 0,
      filter: 'blur(4px)',
      y: 6,
      duration: 0.7,
      stagger: 0.018,
      ease: 'power3.out',
      delay: 0.15,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}
