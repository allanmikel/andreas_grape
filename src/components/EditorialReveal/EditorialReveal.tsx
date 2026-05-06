'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import type { InfoCardItem } from '@/lib/content';
import { RevealContext } from './useReveal';
import styles from './EditorialReveal.module.scss';

type Props = { children: React.ReactNode };

export function EditorialRevealProvider({ children }: Props) {
  const [current, setCurrent] = useState<InfoCardItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((item: InfoCardItem) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setCurrent(item);
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus?.();
      triggerRef.current = null;
    });
  }, []);

  return (
    <RevealContext.Provider value={{ current, open, close }}>
      {children}
      <RevealPanel current={current} onClose={close} />
    </RevealContext.Provider>
  );
}

function RevealPanel({
  current,
  onClose,
}: {
  current: InfoCardItem | null;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc-to-close + focus trap.
  useEffect(() => {
    if (!current) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, onClose]);

  // Scroll lock. Prefer Lenis stop/start; fall back to body overflow lock so
  // the page never scrolls underneath the panel and ScrollTrigger doesn't
  // re-fire during open.
  useEffect(() => {
    if (!current) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevTouch = body.style.touchAction;

    if (lenis) {
      try { lenis.stop(); } catch {}
    }
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.touchAction = prevTouch;
      if (lenis) {
        try { lenis.start(); } catch {}
      }
    };
  }, [current, lenis]);

  // Move focus into the panel on open.
  useEffect(() => {
    if (!current) return;
    requestAnimationFrame(() => {
      const closeBtn = panelRef.current?.querySelector<HTMLButtonElement>('[data-close]');
      closeBtn?.focus();
    });
  }, [current]);

  if (!mounted) return null;

  const panelTransition = reduced
    ? { duration: 0.12 }
    : { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const };

  const enterX = reduced ? 0 : '-100%';
  const enterY = reduced ? 0 : '100%';

  return createPortal(
    <AnimatePresence>
      {current ? (
        <motion.div
          className={styles.layer}
          aria-hidden={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.3 }}
        >
          <button
            type="button"
            aria-label="Close"
            className={styles.backdrop}
            onClick={onClose}
            tabIndex={-1}
          />

          <motion.aside
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ x: enterX, y: enterY }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: enterX, y: enterY }}
            transition={panelTransition}
          >
            <header className={styles.header}>
              {current.category ? (
                <span className={styles.eyebrow}>{current.category}</span>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className={styles.close}
                aria-label="Close panel"
                data-close
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={styles.body}>
              <h2 className={styles.title}>{current.title}</h2>
              <p className={styles.description}>{current.description}</p>

              {(current.role || current.theme || current.status || current.year) && (
                <dl className={styles.meta}>
                  {current.role && (
                    <div className={styles.metaRow}>
                      <dt>Role</dt><dd>{current.role}</dd>
                    </div>
                  )}
                  {current.theme && (
                    <div className={styles.metaRow}>
                      <dt>Theme</dt><dd>{current.theme}</dd>
                    </div>
                  )}
                  {current.status && (
                    <div className={styles.metaRow}>
                      <dt>Status</dt><dd>{current.status}</dd>
                    </div>
                  )}
                  {current.year && (
                    <div className={styles.metaRow}>
                      <dt>Year</dt><dd>{current.year}</dd>
                    </div>
                  )}
                </dl>
              )}

              {current.href && current.href !== '#' && (
                <a
                  className={styles.link}
                  href={current.href}
                  target={/^https?:\/\//.test(current.href) ? '_blank' : undefined}
                  rel={/^https?:\/\//.test(current.href) ? 'noopener noreferrer' : undefined}
                >
                  <span>Visit</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
