'use client';

import { forwardRef } from 'react';
import type { InfoCardItem } from '@/lib/content';
import { useReveal } from './useReveal';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  item: InfoCardItem;
};

export const RevealTrigger = forwardRef<HTMLButtonElement, Props>(
  function RevealTrigger({ item, onClick, children, ...rest }, ref) {
    const { open } = useReveal();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) open(item);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
