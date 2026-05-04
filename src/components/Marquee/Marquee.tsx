'use client';

import { Children, ReactNode, CSSProperties } from 'react';
import styles from './Marquee.module.scss';

type Props = {
  children: ReactNode;
  /** Seconds per loop. Lower = faster. */
  duration?: number;
  /** Scroll direction. */
  direction?: 'left' | 'right';
  /** Minimum number of items the track should contain — used to compute
   *  how many copies of the children are rendered for seamless looping. */
  minTrackItems?: number;
};

export function Marquee({
  children,
  duration = 50,
  direction = 'left',
  minTrackItems = 12,
}: Props) {
  const items = Children.toArray(children);
  if (items.length === 0) return null;

  // Render enough copies that the track always overflows the viewport.
  const copies = Math.max(2, Math.ceil(minTrackItems / items.length));
  const distance = 100 / copies;

  const trackStyle = {
    '--marquee-duration': `${duration * copies}s`,
    '--marquee-distance': `${distance}%`,
    animationDirection: direction === 'left' ? 'normal' : 'reverse',
  } as CSSProperties;

  return (
    <div className={styles.viewport} aria-roledescription="auto-scrolling carousel">
      <div className={styles.track} style={trackStyle}>
        {Array.from({ length: copies }).map((_, copyIdx) => (
          <div key={copyIdx} className={styles.set} aria-hidden={copyIdx > 0}>
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}
