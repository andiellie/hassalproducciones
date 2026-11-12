"use client";

import QuoteForm from "@/features/cotizaciones/QuoteForm";
import { useLanguage } from "@/lib/i18n";
import PageTitle from "@/components/ui/PageTitle";

export default function CotizacionesPage() {
  const { lang } = useLanguage();

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-6 pt-16 text-left">
        <PageTitle>{lang === "es" ? "Cotizaciones" : "Get a Quote"}</PageTitle>
      </div>
      <QuoteForm />
    </div>
  );
}
