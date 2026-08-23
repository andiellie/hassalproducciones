import QuoteForm from "@/components/cotizaciones/QuoteForm";

export default function CotizacionesPage() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-6 pt-16 text-left">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Cotizaciones</h1>
      </div>
      <QuoteForm />
    </div>
  );
}
