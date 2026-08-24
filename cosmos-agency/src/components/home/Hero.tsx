'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100dvh-4rem)] text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      <div className="relative z-10 mt-[8vh] flex w-full max-w-4xl min-w-0 flex-col items-center text-center sm:mt-[18vh]">

        <div className="flex w-full flex-col items-center mx-auto">
          {/* Logo principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto w-full max-w-[655px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO/cosmos-agency-eclipse-logo.png"
              alt="Cosmos Agency MX"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
