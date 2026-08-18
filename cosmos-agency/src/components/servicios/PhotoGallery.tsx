import PhotoWall from "@/components/ui/PhotoWall";

const wallPhotos = [
  { id: 1, label: "Boda L&R", image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-142.jpg" },
  { id: 2, label: "Concierto Live", image: "/imagenes/Fotografias/MUSICA/DSC02065.jpg" },
  { id: 3, label: "Espacio Arquitectónico", image: "/imagenes/Fotografias/ARQUITECTURA%20Y%20ESPACIOS/DSC05874.jpg" },
  { id: 4, label: "Branding", image: "/imagenes/Fotografias/MARCAS/Copia%20de%20DSC01152.jpg" },
  { id: 5, label: "Retrato", image: "/imagenes/Fotografias/RETRATOS/DSC00019.jpg" },
  { id: 6, label: "Urbano", image: "/imagenes/Fotografias/URBANO/IMG_0167.jpg" },
  { id: 7, label: "Boda L&R II", image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-26.jpg" },
  { id: 8, label: "Sesión DJ", image: "/imagenes/Fotografias/MUSICA/DSC02067.jpg" },
  { id: 9, label: "Interior Minimal", image: "/imagenes/Fotografias/ARQUITECTURA%20Y%20ESPACIOS/IMG_0531.jpg" },
  { id: 10, label: "Producto", image: "/imagenes/Fotografias/MARCAS/Copia%20de%20DSC01185.jpg" },
  { id: 11, label: "Retrato Editorial", image: "/imagenes/Fotografias/RETRATOS/IMG_3479.jpg" },
  { id: 12, label: "Ciudad", image: "/imagenes/Fotografias/URBANO/IMG_1003.jpg" },
];

export default function PhotoGallery() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Fotografía</h1>
      </div>
      <PhotoWall items={wallPhotos} className="pb-16" />
    </div>
  );
}
