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
 *   Mobile / coarse pointer: discrete slide switching. Scroll progress maps
 *                            to a target panel index; each switch is its own
 *                            short controlled tween, so cards hold between
 *                            transitions instead of floating.
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

      const setActive = (next: number) => {
        const last = cards.length - 1;
        const clamped = Math.min(last, Math.max(0, next));
        if (clamped === activeIndex) return;
        activeIndex = clamped;
        for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.active = i === clamped ? 'true' : 'false';
        }
      };

      if (coarse) {
        // --- Mobile: discrete slide switching ----------------------------- //
        // Each fullscreen card is 100vw. Vertical scroll progress maps to a
        // target index; the track tweens to that panel in a short controlled
        // animation, then holds. No scrub — between switches the track sits
        // still, so the user reads a deliberate "swipe to next" instead of a
        // continuous floating timeline.
        const last = cards.length - 1;

        // One viewport of vertical scroll per image switch. Times last so the
        // pin lasts exactly long enough to traverse every panel once.
        const totalDistance = () => window.innerHeight * Math.max(1, last);

        const goTo = (index: number) => {
          const clamped = Math.min(last, Math.max(0, index));
          gsap.to(track, {
            x: -clamped * window.innerWidth,
            duration: 0.55,
            ease: 'power3.out',
            force3D: true,
            overwrite: true,
          });
          setActive(clamped);
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${totalDistance()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const target = Math.round(self.progress * last);
            if (target !== activeIndex) goTo(target);
          },
          onRefresh: (self) => {
            const target = Math.round(self.progress * last);
            // Snap track to the correct panel after layout shifts (address-bar
            // collapse, rotation) without animating.
            gsap.set(track, { x: -target * window.innerWidth, force3D: true });
            setActive(target);
          },
        });

        setActive(0);
      } else {
        // --- Desktop: scrubbed horizontal translate ----------------------- //
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
      }

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
