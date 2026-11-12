'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/features/home/Hero";
import AboutSection from "@/features/home/AboutSection";
import StepsSection from "@/features/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import AccordionGallery from "@/components/ui/AccordionGallery";
import GalaxyFadeBackdrop from "@/components/effects/GalaxyFadeBackdrop";
import { clientLogos, eventCategories } from "@/features/home/home.data";
import { useLanguage } from "@/lib/i18n";
import { fadeInUp } from "@/lib/animations";

const copy = {
  es: { question: "¿PIENSAS REALIZAR UN EVENTO MEMORABLE?", cta: "Cotizar mi Evento" },
  en: { question: "PLANNING AN UNFORGETTABLE EVENT?", cta: "Get a Quote for My Event" },
};

export default function Home() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const localizedCategories = eventCategories.map((c) => ({ ...c, label: c.label[lang] }));

  return (
    <>
      <Hero />
      <div className="relative">
        <GalaxyFadeBackdrop />
        <AboutSection />
        <StepsSection />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-6 pt-16 pb-16">
          <motion.p
            {...fadeInUp()}
            className="text-center text-2xl font-medium text-white sm:text-3xl"
          >
            {t.question}
          </motion.p>
          <Link
            href="/cotizaciones"
            className="inline-flex items-center justify-center rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)]"
          >
            {t.cta}
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <AccordionGallery items={localizedCategories} />
        </div>
        <BrandCarousel logos={clientLogos} />
      </div>
    </>
  );
}
