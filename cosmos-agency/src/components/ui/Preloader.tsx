'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HOLD_MS = 2400;
const PETAL_COUNT = 12;

function IrisBloom() {
  const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
    angle: (360 / PETAL_COUNT) * i,
  }));

  return (
    <motion.div
      className="relative h-[95vmin] w-[95vmin]"
      animate={{ rotate: 360, scale: [1, 1.06, 1] }}
      transition={{
        rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {petals.map((petal, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ transform: `rotate(${petal.angle}deg)` }}
        >
          {/* Pétalo tipo llama: ancho en la punta exterior, angosto en el centro */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[46%] w-[34%] -translate-x-1/2 -translate-y-full"
            style={{
              clipPath:
                'polygon(50% 100%, 78% 55%, 62% 8%, 50% 0%, 38% 8%, 22% 55%)',
              background:
                'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(80,160,220,0.35) 18%, rgba(120,230,180,0.55) 45%, rgba(212,255,0,0.85) 78%, rgba(255,255,255,0.95) 100%)',
              filter: 'blur(26px)',
              mixBlendMode: 'screen',
            }}
            animate={{ scaleY: [0.82, 1.08, 0.82], opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* Halo tenue de fondo */}
          <motion.div
            className="absolute h-[50vmin] w-[50vmin] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(80,160,220,0.18) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <IrisBloom />
          {/* Vacío oscuro central */}
          <div
            className="absolute left-1/2 top-1/2 h-[10vmin] w-[10vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
            style={{ filter: 'blur(6px)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
