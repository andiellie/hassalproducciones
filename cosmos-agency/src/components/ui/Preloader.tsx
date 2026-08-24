'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HOLD_MS = 2400;

function EclipseRing() {
  return (
    <motion.img
      src="/LOGO/cosmos-agency-ring.svg"
      alt=""
      className="mt-[18vh] h-[42vmin] w-[42vmin] object-contain"
      animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    />
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
          <EclipseRing />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
