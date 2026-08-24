'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import AccordionGallery from "@/components/ui/AccordionGallery";
import GalaxyFadeBackdrop from "@/components/ui/GalaxyFadeBackdrop";

const eventCategories = [
  { image: "/imagenes/Home/Categorias/BODAS%20%26%20EVENTOS%20SOCIALES.jpg", label: "Bodas & Eventos Sociales", link: "/servicios/fotografia" },
  { image: "/imagenes/Home/Categorias/MUSICA%20%26%20ARTE.jpg", label: "Música & Arte", link: "/servicios/fotografia" },
  { image: "/imagenes/Home/Categorias/ARQUITECTURA%20%26%20ESPACIOS.jpg", label: "Arquitectura & Espacios", link: "/servicios/fotografia" },
  { image: "/imagenes/Home/Categorias/MARCAS%20%26%20PRODUCTOS.jpg", label: "Marcas & Productos", link: "/servicios/fotografia" },
  { image: "/imagenes/Home/Categorias/RETRATOS%20IN%20%26%20OUT.jpg", label: "Retratos In & Out", link: "/servicios/fotografia" },
];

const logos = [
  { src: "4.png", alt: "2 DJ'S" },
  { src: "3.png", alt: "Green Earth" },
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
  return (
    <>
      <Hero />
      <div className="relative">
        <GalaxyFadeBackdrop />
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
          <Link
            href="/cotizaciones"
            className="inline-flex items-center justify-center rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,255,0,0.5)]"
          >
            Cotizar mi Evento
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <AccordionGallery items={eventCategories} />
        </div>
        <BrandCarousel logos={logos} />
      </div>
    </>
  );
}
