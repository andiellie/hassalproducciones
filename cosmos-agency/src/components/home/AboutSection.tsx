'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MotionLink = motion.create(Link);

export default function AboutSection() {
  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl sm:p-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-heading mt-2 text-3xl font-medium sm:mt-4 sm:text-4xl"
        >
          ¿Qué es diferente en Cosmos?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-6 text-lg leading-relaxed text-white"
        >
          Somos una agencia creativa versátil.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 text-lg text-white leading-relaxed"
        >
          Capturamos <span className="text-[#d4ff00]">la energía, personas y momentos</span> que hacen único cada evento, con un equipo audiovisual profesional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 flex w-full items-center justify-center sm:w-auto sm:justify-start"
        >
          <MotionLink
            href="/servicios"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4ff00] px-10 py-5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] w-full sm:w-auto"
          >
            Ver nuestro trabajo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
