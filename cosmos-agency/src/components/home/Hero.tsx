'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      <div className="relative z-10 flex w-full max-w-4xl min-w-0 flex-col items-center text-center">

        <div className="flex w-full max-w-full flex-col items-start mx-auto" style={{ width: "fit-content" }}>
          {/* Logo principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full max-w-[520px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO/cosmos-agency-navbar-wordmark.svg"
              alt="Cosmos Agency MX"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        {/* Botón Estilo SaaS / Nodeflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 flex w-full items-center justify-center sm:w-auto"
        >
          <motion.a
            href="/servicios"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-[#d4ff00] text-black font-medium text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] transition-all duration-300 w-full sm:w-auto"
          >
            Ver nuestro trabajo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
