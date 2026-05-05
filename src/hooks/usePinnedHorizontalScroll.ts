'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin a section while translating an inner track horizontally as the user
 * scrolls vertically. The card whose index is closest to the current
 * ScrollTrigger progress receives [data-active="true"].
 *
 * Active-card detection is progress-based — no per-frame DOM layout reads.
 *
 * No-op under prefers-reduced-motion: the chapter falls back to its CSS
 * scroll-snap layout.
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

    // Promote the track only while the hook owns it. The CSS no longer carries
    // a permanent will-change, so memory is only reserved during animation.
    track.style.willChange = 'transform';

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
      if (!cards.length) return;

      const isCoarse = () => window.matchMedia('(pointer: coarse)').matches;

      const setActive = (progress: number) => {
        const last = cards.length - 1;
        const raw  = Math.round(progress * last);
        const idx  = Math.min(last, Math.max(0, raw));
        for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.active = i === idx ? 'true' : 'false';
        }
      };

      // Vertical scroll distance the chapter consumes before unpinning.
      // On touch we stretch beyond the raw horizontal travel so each flick
      // feels longer and more cinematic instead of darting between cards.
      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const distance   = () => horizontal() * (isCoarse() ? 1.6 : 1);

      const useSnap = isCoarse() && cards.length > 1;

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Keep current desktop / touch feel.
          scrub: isCoarse() ? 0.9 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // 'transform' pin is steadier than the default 'fixed' on iOS where
          // the address-bar chrome shifts the layout viewport mid-scroll.
          ...(isCoarse() && { pinType: 'transform' as const }),
          // Touch only: snap each card center-screen with a slow, soft glide.
          // Inertia disabled and short delay so flicks settle cleanly without
          // the snap engine fighting iOS rubberband momentum.
          ...(useSnap && {
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: { min: 0.45, max: 0.9 },
              ease: 'power3.out',
              delay: 0.08,
              inertia: false,
            },
          }),
          onUpdate: (self) => setActive(self.progress),
          onRefresh: (self) => setActive(self.progress),
        },
      });

      // Mark the first card active immediately so the chapter never appears
      // with every card in its dim default state on first paint.
      setActive(0);
    }, section);

    return () => {
      ctx.revert();
      track.style.willChange = '';
    };
  }, [sectionRef, trackRef, cardSelector]);
}
