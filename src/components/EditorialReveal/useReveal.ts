'use client';

import { createContext, useContext } from 'react';
import type { InfoCardItem } from '@/lib/content';

export type RevealContextValue = {
  current: InfoCardItem | null;
  open: (item: InfoCardItem) => void;
  close: () => void;
};

export const RevealContext = createContext<RevealContextValue | null>(null);

export function useReveal(): RevealContextValue {
  const ctx = useContext(RevealContext);
  if (!ctx) {
    return { current: null, open: () => {}, close: () => {} };
  }
  return ctx;
}
