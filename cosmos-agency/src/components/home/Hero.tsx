'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      <div className="relative z-10 mt-[2vh] flex w-full max-w-4xl min-w-0 flex-col items-center text-center sm:mt-[4vh]">

        <div className="flex w-full flex-col items-center mx-auto">
          {/* Logo principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto w-full max-w-[720px] scale-[1.32] lg:scale-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                isLight
                  ? '/LOGO/SVG/SIN FONDO/POSITIVO/COSMOS AGENCY_LOGO SIN FONDO-07.svg'
                  : '/LOGO/cosmos-agency-hero-logo.svg'
              }
              alt="Cosmos Agency MX"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
