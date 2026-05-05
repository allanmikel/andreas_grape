'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Desktop / fine pointer:
 *   Pin the section while translating an inner track horizontally as the
 *   user scrolls vertically. Active card detection is progress-based.
 *
 * Coarse pointer (mobile / tablet) and prefers-reduced-motion:
 *   No-op. The chapter renders as a natural vertical editorial sequence
 *   handled entirely in CSS. Every card is treated as readable so the
 *   sequence reads as an unbroken column rather than a single highlight.
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

    if (window.matchMedia('(pointer: coarse)').matches) {
      // Mobile path: every card is "active" from the JS perspective so any
      // CSS still gated on [data-active='true'] (description reveal, etc.)
      // shows by default. The vertical editorial layout in SCSS owns the
      // rest of the visual treatment.
      const cards = track.querySelectorAll<HTMLElement>(cardSelector);
      cards.forEach((c) => { c.dataset.active = 'true'; });
      return;
    }

    track.style.willChange = 'transform';
    gsap.set(track, { force3D: true, x: 0 });

    let rafId = 0;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
      if (!cards.length) return;

      let activeIndex = -1;

      const setActiveByProgress = (progress: number) => {
        const last = cards.length - 1;
        const raw  = Math.round(progress * last);
        const next = Math.min(last, Math.max(0, raw));
        if (next === activeIndex) return;
        activeIndex = next;
        for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.active = i === next ? 'true' : 'false';
        }
      };

      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const distance   = () => horizontal();

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActiveByProgress(self.progress),
          onRefresh: (self) => setActiveByProgress(self.progress),
        },
      });

      activeIndex = -1;
      setActiveByProgress(0);

      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      track.style.willChange = '';
    };
  }, [sectionRef, trackRef, cardSelector]);
}
