import { Suspense } from "react";
import PhotoVideoTabs from "@/components/servicios/PhotoVideoTabs";

export default function ServiciosPage() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-16">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Servicios</h1>
      </div>
      <div className="relative">
        <Suspense fallback={null}>
          <PhotoVideoTabs />
        </Suspense>
      </div>
    </div>
  );
}
