'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin a desktop section while translating an inner track horizontally as the
 * user scrolls vertically. The card whose progress index is closest to the
 * current ScrollTrigger progress receives [data-active="true"].
 *
 * On coarse pointers we don't pin at all — the chapter falls back to a
 * native CSS scroll-snap carousel (handled in PortfolioChapter SCSS) and an
 * IntersectionObserver tracks the centered card so descriptions still reveal
 * as the user swipes.
 *
 * Under prefers-reduced-motion we do nothing — CSS owns the layout entirely.
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

    const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
    if (!cards.length) return;

    const seedActive = (idx: number) => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].dataset.active = i === idx ? 'true' : 'false';
      }
    };

    // ---- Coarse pointer: native scroll, no GSAP, no pinning. ----
    if (window.matchMedia('(pointer: coarse)').matches) {
      seedActive(0);

      // Track which card is closest to the track's center as the user
      // swipes — feeds the same [data-active] contract the cards already
      // listen to, so description reveal continues to work.
      const observer = new IntersectionObserver(
        (entries) => {
          let bestIdx = -1;
          let bestRatio = 0;
          for (const entry of entries) {
            if (entry.intersectionRatio > bestRatio) {
              bestRatio = entry.intersectionRatio;
              bestIdx = cards.indexOf(entry.target as HTMLElement);
            }
          }
          if (bestIdx >= 0) seedActive(bestIdx);
        },
        {
          root: track,
          // Tighten the detection band to ~the centered third of the track so
          // only the card the user has actually landed on wins.
          rootMargin: '0px -33% 0px -33%',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      for (const c of cards) observer.observe(c);
      return () => observer.disconnect();
    }

    // ---- Fine pointer (desktop): GSAP pinned horizontal scroll. ----
    track.style.willChange = 'transform';

    const ctx = gsap.context(() => {
      const setActive = (progress: number) => {
        const last = cards.length - 1;
        const raw  = Math.round(progress * last);
        const idx  = Math.min(last, Math.max(0, raw));
        seedActive(idx);
      };

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(self.progress),
          onRefresh: (self) => setActive(self.progress),
        },
      });

      seedActive(0);
    }, section);

    return () => {
      ctx.revert();
      track.style.willChange = '';
    };
  }, [sectionRef, trackRef, cardSelector]);
}
