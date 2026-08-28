'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import BrandButton from '@/components/ui/BrandButton';
import ExactColor from '@/components/ui/ExactColor';

const copy = {
  es: {
    title: '¿Qué es diferente en Cosmos?',
    p1: 'Somos una agencia creativa versátil.',
    p2Pre: 'Capturamos ',
    p2Highlight: 'la energía, personas y momentos',
    p2Post: ' que hacen único cada evento, con un equipo audiovisual profesional.',
    cta: 'Ver nuestro trabajo',
  },
  en: {
    title: "What makes Cosmos different?",
    p1: 'We are a versatile creative agency.',
    p2Pre: 'We capture ',
    p2Highlight: 'the energy, people, and moments',
    p2Post: ' that make every event unique, with a professional audiovisual team.',
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
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 text-lg text-white leading-relaxed"
        >
          {t.p2Pre}<ExactColor className="text-[#d4ff00]">{t.p2Highlight}</ExactColor>{t.p2Post}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 flex w-full items-center justify-center sm:w-auto sm:justify-start"
        >
          <BrandButton
            href="/servicios"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4ff00] px-10 py-5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] w-full sm:w-auto"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </BrandButton>
        </motion.div>
      </div>
    </section>
  );
}
