'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin a section while translating an inner track horizontally as the user
 * scrolls vertically. The card whose center is closest to the viewport
 * center receives [data-active="true"].
 *
 * No-op on touch / coarse pointers and on reduced-motion — the chapter falls
 * back to its mobile scroll-snap layout, which is implemented in CSS.
 */
export function usePinnedHorizontalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  cardSelector = '[data-card]',
) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
      if (!cards.length) return;

      const isCoarse = () => window.matchMedia('(pointer: coarse)').matches;

      const setActive = () => {
        const center = window.innerWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        for (let i = 0; i < cards.length; i++) {
          const r = cards[i].getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < closestDist) { closestDist = d; closestIdx = i; }
        }
        for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.active = i === closestIdx ? 'true' : 'false';
        }
      };

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const useSnap = isCoarse() && cards.length > 1;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Snappier scrub on touch so vertical flicks land cleanly between
          // cards instead of feeling rubbery; smoother on desktop.
          scrub: isCoarse() ? 0.25 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Touch only: snap each card center-screen so flick momentum lands
          // cleanly. Desktop keeps free Lenis-driven scroll for smoothness.
          ...(useSnap && {
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: { min: 0.15, max: 0.45 },
              ease: 'power2.out',
              delay: 0,
              inertia: false,
            },
          }),
          onUpdate: setActive,
          onRefresh: setActive,
        },
      });

      setActive();
    }, section);

    return () => ctx.revert();
  }, [sectionRef, trackRef, cardSelector]);
}
