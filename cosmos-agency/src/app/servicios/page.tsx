"use client";

import { Suspense } from "react";
import PhotoVideoTabs from "@/features/servicios/PhotoVideoTabs";
import { useLanguage } from "@/lib/i18n";
import PageTitle from "@/components/ui/PageTitle";

export default function ServiciosPage() {
  const { lang } = useLanguage();

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-16">
        <PageTitle>{lang === "es" ? "Servicios" : "Services"}</PageTitle>
      </div>
      <div className="relative">
        <Suspense fallback={null}>
          <PhotoVideoTabs />
        </Suspense>
      </div>
    </div>
  );
}
