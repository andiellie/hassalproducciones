import ContentManagement from "@/components/servicios/ContentManagement";
import PhotoGallery from "@/components/servicios/PhotoGallery";
import VideoReel from "@/components/servicios/VideoReel";

export default function ServiciosPage() {
  return (
    <div>
      <h1 className="font-heading mx-auto max-w-4xl px-6 pt-16 text-4xl font-medium">Servicios</h1>
      <ContentManagement />
      <PhotoGallery />
      <VideoReel />
    </div>
  );
}
