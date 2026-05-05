'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin a chapter section while the page-scroll drives the inner card track.
 *
 *   Desktop / fine pointer:  scrubbed horizontal translate. The track follows
 *                            the finger continuously across the timeline.
 *   Mobile / coarse pointer: no-op. Cards flow as a static vertical sequence
 *                            via CSS — native scroll, zero JS layer between
 *                            finger and motion. Every card is rendered active
 *                            so descriptions stay readable as the user
 *                            scrolls past.
 *
 * Active card detection is progress-based and only mutates the DOM when the
 * centered index changes. No-op under prefers-reduced-motion.
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

    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
    if (!cards.length) return;

    if (coarse) {
      // Mobile: vertical fullscreen sequence. CSS stacks cards as 100svh
      // panels with no gap; native scroll moves through them. An
      // IntersectionObserver flips data-active on the card most centered in
      // the viewport so only that card reveals its text + slow zoom.
      const io = new IntersectionObserver(
        (entries) => {
          // Pick the most-visible intersecting entry as the active card.
          let best: IntersectionObserverEntry | null = null;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
          if (!best) return;
          const target = best.target as HTMLElement;
          for (const card of cards) {
            card.dataset.active = card === target ? 'true' : 'false';
          }
        },
        {
          // Center band: a card becomes active once it sits inside the
          // middle 30% of the viewport. Tighter than half so on shorter
          // landscape panels the highlight still feels deliberately
          // centered and only one card wins at a time.
          rootMargin: '-35% 0px -35% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      for (const card of cards) io.observe(card);
      // First card active by default until the observer fires.
      cards[0].dataset.active = 'true';

      return () => io.disconnect();
    }

    // Desktop: scrubbed horizontal translate. The track is a row, vertical
    // page scroll drives a GSAP X tween, the section pins for the duration.
    track.style.willChange = 'transform';
    gsap.set(track, { force3D: true, x: 0 });

    let rafId = 0;
    let activeIndex = -1;

    const setActive = (next: number) => {
      const last = cards.length - 1;
      const clamped = Math.min(last, Math.max(0, next));
      if (clamped === activeIndex) return;
      activeIndex = clamped;
      for (let i = 0; i < cards.length; i++) {
        cards[i].dataset.active = i === clamped ? 'true' : 'false';
      }
    };

    const ctx = gsap.context(() => {
      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${horizontal()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (cards.length - 1))),
          onRefresh: (self) => setActive(Math.round(self.progress * (cards.length - 1))),
        },
      });

      setActive(0);

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
