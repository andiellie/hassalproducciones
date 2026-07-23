import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StepsSection from "@/components/home/StepsSection";
import BrandCarousel from "@/components/ui/BrandCarousel";

const brands = ["Marca Uno", "Marca Dos", "Marca Tres", "Marca Cuatro", "Marca Cinco"];

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCarousel brands={brands} />
      <AboutSection />
      <StepsSection />
    </>
  );
}
