'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin a section while translating an inner track horizontally as the user
 * scrolls vertically. Active card detection is progress-based and only
 * mutates the DOM when the active index actually changes.
 *
 * Both desktop and mobile use this pinned mechanic — mobile gets a longer
 * pin distance and a softer scrub so vertical flicks read as cinematic
 * horizontal motion rather than darting between cards.
 *
 * No-op under prefers-reduced-motion: the chapter falls back to a native
 * scroll-snap carousel handled in CSS.
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

    const isCoarse = () => window.matchMedia('(pointer: coarse)').matches;
    const coarse  = isCoarse();

    track.style.willChange = 'transform';

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
      if (!cards.length) return;

      // Track the last applied index so per-frame ScrollTrigger updates only
      // touch the DOM when the centered card actually changes — eliminates a
      // visible flicker on mobile during fast scroll.
      let lastIdx = -1;

      const setActive = (progress: number) => {
        const last = cards.length - 1;
        const raw  = Math.round(progress * last);
        const idx  = Math.min(last, Math.max(0, raw));
        if (idx === lastIdx) return;
        lastIdx = idx;
        for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.active = i === idx ? 'true' : 'false';
        }
      };

      // Vertical scroll distance the chapter consumes before unpinning.
      // On touch we stretch beyond the raw horizontal travel so each flick
      // covers less horizontal ground per pixel of vertical scroll, reading
      // as smoother cinematic motion rather than a darted carousel.
      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const distance   = () => horizontal() * (coarse ? 1.8 : 1);

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Softer scrub on touch trails the finger more, smoothing jitter.
          scrub: coarse ? 1.0 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          // No snap on touch: the longer distance + soft scrub already lands
          // each card cleanly, and snap was the source of perceived jitter.
          onUpdate: (self) => setActive(self.progress),
          onRefresh: (self) => setActive(self.progress),
        },
      });

      // Force the first card active immediately, bypassing the lastIdx guard.
      lastIdx = -1;
      setActive(0);
    }, section);

    return () => {
      ctx.revert();
      track.style.willChange = '';
    };
  }, [sectionRef, trackRef, cardSelector]);
}
