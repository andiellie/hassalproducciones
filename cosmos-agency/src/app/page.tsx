'use client';

import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import BrandButton from "@/components/ui/BrandButton";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import AccordionGallery from "@/components/ui/AccordionGallery";
import GalaxyFadeBackdrop from "@/components/ui/GalaxyFadeBackdrop";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";

const eventCategories = [
  {
    image: "/imagenes/Home/Categorias/BODAS%20%26%20EVENTOS%20SOCIALES.jpg",
    label: { es: "Bodas & Eventos Sociales", en: "Weddings & Social Events" },
    link: "/servicios/fotografia",
  },
  {
    image: "/imagenes/Home/Categorias/MUSICA%20%26%20ARTE.jpg",
    label: { es: "Música & Arte", en: "Music & Art" },
    link: "/servicios/fotografia",
  },
  {
    image: "/imagenes/Home/Categorias/ARQUITECTURA%20%26%20ESPACIOS.jpg",
    label: { es: "Arquitectura & Espacios", en: "Architecture & Spaces" },
    link: "/servicios/fotografia",
  },
  {
    image: "/imagenes/Home/Categorias/MARCAS%20%26%20PRODUCTOS.jpg",
    label: { es: "Marcas & Productos", en: "Brands & Products" },
    link: "/servicios/fotografia",
  },
  {
    image: "/imagenes/Home/Categorias/RETRATOS%20IN%20%26%20OUT.jpg",
    label: { es: "Retratos In & Out", en: "Portraits In & Out" },
    link: "/servicios/fotografia",
  },
];

const copy = {
  es: { question: "¿Tienes un evento en mente?", cta: "Cotizar mi Evento" },
  en: { question: "Have an event in mind?", cta: "Quote My Event" },
};

const logos = [
  { src: "4.png", alt: "2 DJ'S" },
  { src: "3.png", alt: "Green Earth", scale: 1.25 },
  { src: "TREATS.png", alt: "TREATS" },
  { src: "1.png", alt: "Ve+" },
  { src: "alineart.png", alt: "Alineart" },
  { src: "artianos.png", alt: "Artianos" },
  { src: "cafe c.png", alt: "Café C" },
  { src: "dg.png", alt: "DG" },
  { src: "ferrioni.png", alt: "Ferrioni" },
  { src: "2.png", alt: "Juan Caballero" },
  { src: "red by kiss.png", alt: "Red by Kiss" },
  { src: "semillero.png", alt: "Semillero" },
  { src: "sinclair.png", alt: "Sinclair" },
];

export default function Home() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = copy[lang];
  const localizedCategories = eventCategories.map((c) => ({ ...c, label: c.label[lang] }));

  return (
    <>
      <Hero />
      <div className="relative">
        {theme === "dark" && <GalaxyFadeBackdrop />}
        <AboutSection />
        <StepsSection />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pt-16 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl font-medium text-white sm:text-3xl"
          >
            {t.question}
          </motion.p>
          <BrandButton
            href="/cotizaciones"
            className="inline-flex items-center justify-center rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)]"
          >
            {t.cta}
          </BrandButton>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <AccordionGallery items={localizedCategories} />
        </div>
        <BrandCarousel logos={logos} />
      </div>
    </>
  );
}
