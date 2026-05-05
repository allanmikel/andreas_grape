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
 *   Desktop / fine pointer:  vertical page scroll → horizontal track translate.
 *   Mobile / coarse pointer: vertical page scroll → vertical track translate.
 *
 * Same cinematic "one card at a time" feeling on both axes, just oriented to
 * match the device's natural reading direction. Active card detection is
 * progress-based and only mutates the DOM when the centered index changes.
 *
 * No-op under prefers-reduced-motion: CSS hands the chapter a natural flow.
 *
 * The hook name is kept for API stability; behaviour is now bi-axial.
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
    gsap.set(track, { force3D: true, x: 0, y: 0 });

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

      // Axis-aware travel computation. The track is laid out as a row on
      // desktop and a column on mobile (CSS in PortfolioChapter), so its
      // scrollWidth or scrollHeight expresses the available carousel travel.
      const travel = () => {
        if (coarse) return Math.max(0, track.scrollHeight - window.innerHeight);
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      // Vertical scroll distance the chapter consumes before unpinning.
      // Stretch on mobile for a slightly more cinematic settle.
      const distance = () => travel() * (coarse ? 1.4 : 1);

      gsap.to(track, {
        // Translate along the axis CSS lays the cards out on.
        ...(coarse ? { y: () => -travel() } : { x: () => -travel() }),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: coarse ? 1.0 : 0.6,
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
