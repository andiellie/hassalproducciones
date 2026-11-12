"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useLanguage } from "@/lib/i18n";
import PageTitle from "@/components/ui/PageTitle";
import { fadeInUp } from "@/lib/animations";

const copy = {
  es: {
    title: "Contacto",
    intro: "¿Tienes un proyecto en mente? Escríbenos directamente.",
    whatsappMessage: "Hola, me interesa trabajar con Cosmos Agency.",
  },
  en: {
    title: "Contact",
    intro: "Still have questions about how we work? Get in touch with us directly.",
    whatsappMessage: "Hi, I'm interested in working with Cosmos Agency.",
  },
};

export default function ContactoPage() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        <PageTitle>{t.title}</PageTitle>
        <motion.p
          {...fadeInUp(0.1)}
          className="mt-12 text-white"
        >
          {t.intro}
        </motion.p>
        <motion.div
          {...fadeInUp(0.2)}
          className="mt-8 space-y-2 text-white"
        >
          <p>
            <a
              href="mailto:ahanostyle@gmail.com"
              className="inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:gap-3 hover:text-[#d4ff00]"
            >
              <Mail className="h-4 w-4" />
              ahanostyle@gmail.com
            </a>
          </p>
          <p>
            <a
              href={`https://wa.me/5215640508888?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:gap-3 hover:text-[#d4ff00]"
            >
              <WhatsAppIcon />
              +52 1 56 4050 8888
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
