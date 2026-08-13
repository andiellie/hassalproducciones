import ContentManagement from "@/components/servicios/ContentManagement";
import PhotoGallery from "@/components/servicios/PhotoGallery";
import VideoReel from "@/components/servicios/VideoReel";
import TextPressure from "@/components/TextPressure";

export default function ServiciosPage() {
  return (
    <div>
      <div className="relative mx-auto h-40 max-w-3xl px-6 pt-16 sm:h-56">
        <TextPressure
          text="Servicios"
          textColor="#ffffff"
          minFontSize={36}
          flex
          width
          weight
          italic={false}
        />
      </div>
      <ContentManagement />
      <PhotoGallery />
      <VideoReel />
    </div>
  );
}
