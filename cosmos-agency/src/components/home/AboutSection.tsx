'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';

const MotionLink = motion.create(Link);

const copy = {
  es: {
    title: 'NO PRODUCIMOS FORMATOS. PRODUCIMOS IDEAS.',
    p1: 'Cada proyecto comienza con una idea. En Cosmos nos encargamos de encontrar la mejor forma de llevarla a la realidad, combinamos creatividad, producción y cualquier herramienta adecuada para crear algo que conecte con las personas y/o marcas.',
    cta: 'CONOCE COSMOS',
  },
  en: {
    title: "What makes Cosmos different?",
    p1: 'We are a versatile creative agency.',
    cta: 'See our work',
  },
};

export default function AboutSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

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
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-6 text-lg leading-relaxed text-white"
        >
          {t.p1}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 flex w-full items-center justify-center"
        >
          <MotionLink
            href="/servicios"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4ff00] px-10 py-5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] w-full sm:w-auto"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
