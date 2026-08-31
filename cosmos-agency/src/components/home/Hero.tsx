'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
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
            <Image
              src="/LOGO/cosmos-agency-hero-logo.svg"
              alt="Cosmos Agency MX"
              width={2100}
              height={1080}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
