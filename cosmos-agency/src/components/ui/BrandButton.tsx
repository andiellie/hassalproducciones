'use client';

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface BrandButtonProps {
  href?: string;
  type?: 'button' | 'submit';
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  className: string;
  children?: ReactNode;
  ariaLabel?: string;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Renders its visible copy through a portal into #cta-portal-root, which
 * sits outside the light-mode invert(1) hue-rotate(180deg) wrapper.
 * That filter can't be cancelled losslessly for highly saturated colors
 * like the brand lime (#d4ff00) — the invert step produces an out-of-gamut
 * channel that gets clamped, so the usual double-filter cancel trick washes
 * it out. Escaping the filtered subtree entirely is the only way to keep
 * the exact brand color in both themes.
 */
export default function BrandButton({
  href,
  type = 'button',
  onClick,
  disabled,
  className,
  children,
  ariaLabel,
}: BrandButtonProps) {
  const placeholderRef = useRef<HTMLDivElement | null>(null);
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

  const overlayButton = href ? (
    href.startsWith('/') ? (
      <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    ) : href.startsWith('mailto:') || href.startsWith('tel:') ? (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  ) : (
    <button type={type} disabled={disabled} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );

  return (
    <>
      <div ref={placeholderRef} className={className} style={{ visibility: 'hidden' }} aria-hidden="true">
        {children}
      </div>
      {portalRoot && rect
        ? createPortal(
            <div
              style={{
                position: 'fixed',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                pointerEvents: 'auto',
              }}
            >
              {overlayButton}
            </div>,
            portalRoot
          )
        : null}
    </>
  );
}
