import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";
import OrbitImages from "@/components/ui/OrbitImages";
import { getRandomPhotoRound } from "@/lib/photos";

export const dynamic = "force-dynamic";

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
  const photos = getRandomPhotoRound();

  return (
    <>
      <Hero />
      <BrandCarousel logos={logos} />
      <AboutSection />
      {photos.length > 0 && (
        <div className="mx-auto max-w-4xl px-6 py-16">
          <OrbitImages
            images={photos}
            shape="ellipse"
            radiusX={380}
            radiusY={110}
            rotation={-8}
            duration={30}
            itemSize={120}
            responsive
            direction="normal"
            fill
            showPath
          />
        </div>
      )}
      <StepsSection />
    </>
  );
}
