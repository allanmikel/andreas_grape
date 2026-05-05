'use client';

import { useEffect, RefObject } from 'react';

/**
 * Mobile-only scroll reveal for the vertical editorial card sequence.
 *
 * Each card receives [data-mobile-visible="true"] the moment its top quarter
 * enters the viewport. Driven by IntersectionObserver — there is no
 * per-frame work, no scroll listener, no GSAP. CSS owns the actual
 * transition under [data-mobile-visible='true'].
 *
 * No-op on fine pointers (desktop owns its own active/hover logic).
 * Under prefers-reduced-motion every card is marked visible immediately
 * with no animation gating.
 */
export function useMobileCardReveal(
  trackRef: RefObject<HTMLElement | null>,
  cardSelector = '[data-card]',
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
    if (!cards.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse  = window.matchMedia('(pointer: coarse)').matches;

    if (reduced) {
      cards.forEach((c) => { c.dataset.mobileVisible = 'true'; });
      return;
    }

    if (!coarse) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.mobileVisible = 'true';
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // Trigger as the top quarter of the card enters the viewport, while
        // still within reach above the fold so the reveal lands before the
        // user has to look for it.
        rootMargin: '0px 0px -25% 0px',
        threshold: 0.01,
      },
    );

    for (const c of cards) observer.observe(c);

    return () => observer.disconnect();
  }, [trackRef, cardSelector]);
}
