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
 * Vertical page scroll → horizontal track translate on every device. Mobile
 * uses a longer pin distance and higher scrub so the same interaction reads
 * smoothly under finger inertia and iOS address-bar shifts.
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

      // Track is laid out as a horizontal row on every device, so scrollWidth
      // expresses the available carousel travel.
      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Vertical scroll distance the chapter consumes before unpinning. A
      // longer mobile pin slows the visual cadence per finger movement and
      // dampens the jumpy feel of finger inertia.
      const distance = () => horizontal() * (coarse ? 2.4 : 1);

      // On mobile each card is 100vw, so cards.length - 1 stops are evenly
      // spaced across the timeline. Snap nudges the user onto whichever
      // fullscreen panel is closest after the finger lifts so cards always
      // come to rest centered, not half-way between two images.
      const snapSteps = cards.length > 1 ? 1 / (cards.length - 1) : 0;

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Higher scrub on touch trails the finger more, smoothing the
          // perceived motion against iOS rubberband and address-bar shifts.
          scrub: coarse ? 1.2 : 0.6,
          snap: coarse && snapSteps > 0
            ? {
                snapTo: snapSteps,
                duration: { min: 0.25, max: 0.5 },
                delay: 0.05,
                ease: 'power2.out',
                inertia: false,
              }
            : undefined,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => setActiveByProgress(self.progress),
          onRefresh: (self) => setActiveByProgress(self.progress),
        },
      });

      activeIndex = -1;
      setActiveByProgress(0);

      // Settle pin geometry once after layout (iOS address-bar collapse,
      // late-loading images, etc.).
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
