'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Curtain-roll-up effect: as the user scrolls through the trigger element,
 * the target's clip-path animates from inset(0) to inset(0 0 100% 0),
 * peeling the image away from the bottom up.
 */
export function useCurtainScroll(
  triggerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const trigger = triggerRef.current;
    const target = targetRef.current;
    if (!trigger || !target) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(target, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.to(target, {
        clipPath: 'inset(0% 0% 100% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, [triggerRef, targetRef]);
}
