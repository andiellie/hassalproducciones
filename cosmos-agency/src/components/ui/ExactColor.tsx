'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ExactColorProps {
  className: string;
  children?: ReactNode;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Non-interactive twin of BrandButton: renders its visible copy through a
 * portal into #cta-portal-root, escaping the light-mode invert(1)
 * hue-rotate(180deg) wrapper so accent text/icons keep the exact brand
 * lime (#d4ff00) instead of the washed-out color that filter produces for
 * such a saturated hue. Use for text, icons, badges — anything non-clickable.
 */
export default function ExactColor({ className, children }: ExactColorProps) {
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById('cta-portal-root'));
  }, []);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <span ref={placeholderRef} className={className} style={{ visibility: 'hidden' }} aria-hidden="true">
        {children}
      </span>
      {portalRoot && rect
        ? createPortal(
            <span
              className={className}
              style={{
                position: 'fixed',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                pointerEvents: 'none',
              }}
            >
              {children}
            </span>,
            portalRoot
          )
        : null}
    </>
  );
}
