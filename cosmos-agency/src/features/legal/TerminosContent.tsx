"use client";

import { motion } from "framer-motion";
import { terminosCopy } from "@/features/legal/terminos.data";
import { useLanguage } from "@/lib/i18n";
import PageTitle from "@/components/ui/PageTitle";
import { fadeInUp } from "@/lib/animations";

export default function TerminosContent() {
  const { lang } = useLanguage();
  const t = terminosCopy[lang];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageTitle>{t.title}</PageTitle>
      <p className="mt-4 text-sm text-white/70">{t.lastUpdated}</p>

      <motion.p
        {...fadeInUp(0.1)}
        className="mt-8 text-white"
      >
        {t.introPre}
        <span className="text-[#d4ff00]">{t.introHighlight}</span>
        {t.introPost}
      </motion.p>

      <div className="mt-10 space-y-8">
        {t.sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
          >
            <h2 className="font-heading text-xl font-medium text-white">{section.title}</h2>
            <div className="mt-2 space-y-2 text-white/80">
              {section.body.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
