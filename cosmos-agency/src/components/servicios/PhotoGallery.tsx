import ServiceAccordion from "./ServiceAccordion";
import DomeGallery from "@/components/DomeGallery";
import { getPhotoSample } from "@/lib/photos";

// El grid de DomeGallery tiene `segments * 5` casillas; igualamos `segments`
// a la cantidad de fotos disponibles (redondeando a múltiplos de 5) para que
// no se repita ninguna imagen.
export default function PhotoGallery() {
  const photos = getPhotoSample().map((src) => ({ src, alt: "" }));
  const segments = Math.max(4, Math.ceil(photos.length / 5));

  return (
    <ServiceAccordion title="Fotografía" fullscreen>
      {photos.length > 0 && (
        <DomeGallery images={photos} grayscale={false} segments={segments} />
      )}
    </ServiceAccordion>
  );
}
