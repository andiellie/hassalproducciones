import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import AccordionGallery from "@/components/ui/AccordionGallery";

const eventCategories = [
  { image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-142.jpg", label: "Bodas", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC05660.jpg", label: "Cumpleaños", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC05772.jpg", label: "Bautizos", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/MUSICA/DSC02065.jpg", label: "DJ", link: "/servicios/fotografia" },
  { image: "/imagenes/Fotografias/EVENTOS/DSC05868.jpg", label: "Corporativos", link: "/servicios/fotografia" },
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
      <div className="mx-auto max-w-6xl px-6 py-16">
        <AccordionGallery items={eventCategories} />
      </div>
      <BrandCarousel logos={logos} />
    </>
  );
}
