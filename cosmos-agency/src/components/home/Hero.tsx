'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Poppins, EB_Garamond } from 'next/font/google';

const poppins = Poppins({
  weight: '700',
  subsets: ['latin'],
});

const ebGaramond = EB_Garamond({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
});

export default function Hero() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      {/* Glow Neón de Fondo (Aura Magenta/Cosmos) */}
      <div className="absolute top-1/4 left-1/2 h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#d4ff00]/20 to-purple-600/30 blur-[80px] pointer-events-none sm:h-[300px] sm:w-[500px] sm:blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-4xl min-w-0 flex-col items-center text-center">

        {/* Título Principal con Degradado e Iluminación */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="leading-[1.15] pb-3"
          style={{ fontSize: "clamp(2.25rem, 6vw + 1rem, 90px)", ["--hero-size" as string]: "clamp(2.25rem, 6vw + 1rem, 90px)" }}
        >
          <span className="flex items-center gap-0">
          <span className={`${poppins.className} flex flex-col items-start bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#d4ff00]`}>
          <span className="flex items-baseline">
            c
            <motion.span
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              className="relative inline-block"
              style={{ marginLeft: "0.06em" }}
            >
              <span className="text-transparent">o</span>
              {/* Anillo */}
              <svg
                viewBox="0 0 100 46"
                className="pointer-events-none absolute left-1/2 text-[#d4ff00]"
                style={{
                  top: "0.62em",
                  width: "1.32em",
                  height: "0.6em",
                  zIndex: -1,
                  transform: "translate(-50%, -50%) rotate(-16deg)",
                }}
              >
                <ellipse
                  cx="50"
                  cy="23"
                  rx="48"
                  ry="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  opacity="0.95"
                />
              </svg>
              {/* Planeta (al frente) */}
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  top: "0.62em",
                  width: "0.66em",
                  height: "0.66em",
                  background: "radial-gradient(circle at 35% 30%, #ffffff, #d9dee6 55%, #aab0bb 100%)",
                }}
              />
            </motion.span>
            s
            <span className="inline-block" style={{ marginRight: "-0.16em" }}>
              m
            </span>
            os
          </span>
          <span className={poppins.className} style={{ marginTop: "-0.3em" }}>
            ag
            <span className="inline-block" style={{ marginRight: "-0.16em" }}>
              e
            </span>
            ncy
          </span>
          </span>
          <span
            className="inline-flex items-center justify-center overflow-visible"
            style={{ width: "0.4em", fontSize: "var(--hero-size, 90px)" }}
          >
            <span
              className={`${ebGaramond.className} whitespace-nowrap text-[#d4ff00]`}
              style={{ transform: "rotate(-90deg)" }}
            >
              .mx
            </span>
          </span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 w-full min-w-0 text-xl font-medium text-white md:text-2xl"
        >
          Tu evento termina. <span className="italic">La experiencia no.</span>
        </motion.p>

        {/* Botón Estilo SaaS / Nodeflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex w-full items-center justify-center sm:w-auto"
        >
          <motion.a
            href="/servicios"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4ff00] text-black font-medium text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] transition-all duration-300 w-full sm:w-auto"
          >
            Ver nuestro trabajo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
