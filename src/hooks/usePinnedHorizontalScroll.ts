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
 *   Mobile / coarse pointer: one-step state machine. Scroll progress only
 *                            commits to advancing when it has crossed a
 *                            direction-aware threshold and a per-step
 *                            cooldown has elapsed, so a single flick never
 *                            skips two panels. Each commit is one short
 *                            controlled tween; cards hold between transitions.
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
        // --- Mobile: one-step state machine ------------------------------- //
        // Vertical scroll only ever moves the gallery by exactly one card per
        // gesture. A direction-aware threshold + cooldown filter out the
        // micro-jitter and momentum spikes that previously caused a single
        // flick to skip two panels.
        const last = cards.length - 1;
        const stepSize = 1 / Math.max(1, last);
        // Progress fraction of a single step that must accumulate before we
        // commit to advancing. 0.55 keeps small accidental drags inert while
        // still feeling responsive on a deliberate swipe.
        const STEP_THRESHOLD = stepSize * 0.55;
        const COOLDOWN_MS = 450;
        const TRANSITION = { duration: 0.72, ease: 'power3.inOut' as const };

        // Pin a little longer than (n-1) viewports so the user can over-scroll
        // slightly past the last card without the section releasing mid-tween.
        const totalDistance = () =>
          window.innerHeight * Math.max(1, last) * 1.15;

        let currentIndex = 0;
        let isAnimating = false;
        let lastStepProgress = 0;
        let lastTransitionAt = 0;

        const step = (direction: 1 | -1, atProgress: number) => {
          const next = currentIndex + direction;
          if (next < 0 || next > last) return;

          // Update logical state synchronously so any onUpdate ticks that
          // arrive mid-tween see the new currentIndex and bail out of the
          // threshold check against the *previous* card.
          currentIndex = next;
          lastStepProgress = atProgress;
          lastTransitionAt = Date.now();
          isAnimating = true;
          setActive(next);

          gsap.to(track, {
            x: -next * window.innerWidth,
            ...TRANSITION,
            force3D: true,
            overwrite: true,
            onComplete: () => {
              isAnimating = false;
            },
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${totalDistance()}`,
          pin: true,
          // Pin via CSS transforms instead of position:fixed on touch. iOS
          // Safari's address-bar collapse fires layout invalidations that can
          // bump a position:fixed pin off by a frame mid-tween; transform-pin
          // sidesteps that path. Only enabled on coarse so desktop's existing
          // pin behaviour is untouched.
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // fastScrollEnd fires extra onUpdates on flick release which can
          // re-trigger a step the cooldown is supposed to swallow.
          fastScrollEnd: false,
          onUpdate: (self) => {
            if (isAnimating) return;
            if (Date.now() - lastTransitionAt < COOLDOWN_MS) return;

            const delta = self.progress - lastStepProgress;
            if (Math.abs(delta) < STEP_THRESHOLD) return;

            const direction: 1 | -1 = delta > 0 ? 1 : -1;
            if (direction > 0 && currentIndex >= last) return;
            if (direction < 0 && currentIndex <= 0) return;

            step(direction, self.progress);
          },
          onRefresh: (self) => {
            // Layout shift (rotation, address-bar collapse): snap track to
            // the panel matching current scroll progress without animating,
            // and re-baseline the threshold so we don't immediately fire.
            const target = Math.min(last, Math.max(0, Math.round(self.progress * last)));
            currentIndex = target;
            lastStepProgress = self.progress;
            isAnimating = false;
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
