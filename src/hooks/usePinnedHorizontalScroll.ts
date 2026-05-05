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
    // Promote to a 3D layer so iOS keeps the track on its compositor thread
    // and avoids re-rasterising on every scroll tick. Seed x: 0 so the very
    // first paint is already on the compositor.
    gsap.set(track, { force3D: true, x: 0 });

    let rafId = 0;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
      if (!cards.length) return;

      // Cache the active index so per-frame ScrollTrigger updates only touch
      // the DOM when the centered card actually changes. Eliminates the
      // per-tick attribute churn that read as flicker on mobile.
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

      // Vertical scroll distance the chapter consumes before unpinning.
      // On touch we stretch the pin so each pixel of finger movement covers
      // less horizontal ground — reads as cinematic motion, not a flick.
      const horizontal = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const distance   = () => horizontal() * (coarse ? 2.6 : 1);

      gsap.to(track, {
        x: () => -horizontal(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Softer scrub on touch trails the finger more, smoothing jitter.
          scrub: coarse ? 1.4 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          // No snap on touch: the longer distance + soft scrub already lands
          // each card cleanly, and snap was the source of perceived jitter.
          onUpdate: (self) => setActiveByProgress(self.progress),
          onRefresh: (self) => setActiveByProgress(self.progress),
        },
      });

      // Force the first card active immediately, bypassing the cache guard.
      activeIndex = -1;
      setActiveByProgress(0);

      // One-shot stability refresh after layout settles. Mobile especially
      // benefits because address-bar collapse can shift the layout viewport
      // between mount and first scroll, and we want pin geometry to match
      // the post-settle viewport rather than the initial one.
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
