'use client';

import { useEffect, useState } from 'react';

export default function StarfieldFadeOverlay() {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById('stars-fade-trigger');
    if (!trigger) return;

    const checkPosition = () => {
      const top = trigger.getBoundingClientRect().top;
      setFaded(top <= window.innerHeight * 0.6);
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition);

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[5] bg-black pointer-events-none transition-opacity duration-[1200ms] ease-in-out ${
        faded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
