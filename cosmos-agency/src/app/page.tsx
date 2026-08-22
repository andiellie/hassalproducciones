'use client';

import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import AccordionGallery from "@/components/ui/AccordionGallery";

const eventCategories = [
  { image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-142.jpg", label: "Bodas", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC05660.jpg", label: "Cumpleaños", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC06055.jpg", label: "Comuniones y Bautizos", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/MUSICA/IMG_3714.jpg", label: "Conciertos y Album Covers", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC05868.jpg", label: "Podcasts", link: "/servicios/fotografia" },
];

const logos = [
  { src: "2 DJ´S #1.png", alt: "2 DJ'S" },
  { src: "Logo Green Earth.png", alt: "Green Earth" },
  { src: "RB SPA.png", alt: "RB SPA" },
  { src: "TREATS.png", alt: "TREATS" },
  { src: "Ve+.png", alt: "Ve+" },
  { src: "alineart.png", alt: "Alineart" },
  { src: "artianos.png", alt: "Artianos" },
  { src: "cafe c.png", alt: "Café C" },
  { src: "dg.png", alt: "DG" },
  { src: "ferrioni.png", alt: "Ferrioni" },
  { src: "red by kiss.png", alt: "Red by Kiss" },
  { src: "semillero.png", alt: "Semillero" },
  { src: "sinclair.png", alt: "Sinclair" },
];

export default function Home() {
  return (
    <>
      <Hero />
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
          ¿Tienes un evento en mente?
        </motion.p>
        <a
          href="/cotizaciones"
          className="inline-flex items-center justify-center rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)]"
        >
          Cotizar mi Evento
        </a>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <AccordionGallery items={eventCategories} />
      </div>
      <BrandCarousel logos={logos} />
    </>
  );
}
