'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';

const HOLD_MS = 2400;

function EclipseRing({ isLight }: { isLight: boolean }) {
  return (
    <div className="mt-[5.3vh] scale-[1.32] lg:mt-[8vh] lg:scale-100">
      <motion.img
        src={
          isLight
            ? '/LOGO/SVG/SIN FONDO/POSITIVO/COSMOS AGENCY_LOGO SIN FONDO-04.svg'
            : '/LOGO/cosmos-agency-preloader-logo.svg'
        }
        alt=""
        className="h-[43vmin] w-[43vmin] object-contain"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${isLight ? 'bg-white' : 'bg-black'}`}
        >
          <EclipseRing isLight={isLight} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
