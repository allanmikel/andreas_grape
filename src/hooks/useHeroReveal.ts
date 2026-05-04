'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Letter-by-letter reveal — fires once on mount.
 * Words stay intact (each char is wrapped inside a `.word` span with
 * `white-space: nowrap`), so wrapping happens between words only.
 * Skipped under prefers-reduced-motion.
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

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const html = original
      .split(' ')
      .map((word) => {
        const chars = word
          .split('')
          .map((ch) => `<span class="char" aria-hidden="true">${escape(ch)}</span>`)
          .join('');
        // The word wrapper keeps characters glued together.
        return `<span class="word" aria-hidden="true">${chars}</span>`;
      })
      // Real space characters between words are the only legal wrap points.
      .join(' ');

    el.innerHTML = html;

    const chars = el.querySelectorAll('.char');

    const tween = gsap.from(chars, {
      opacity: 0,
      filter: 'blur(4px)',
      y: 6,
      duration: 0.7,
      stagger: 0.018,
      ease: 'power3.out',
      delay: 0.2,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}
