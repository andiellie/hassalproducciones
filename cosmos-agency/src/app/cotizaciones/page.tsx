import QuoteForm from "@/components/cotizaciones/QuoteForm";
import TextPressure from "@/components/TextPressure";

export default function CotizacionesPage() {
  return (
    <div>
      <div className="relative mx-auto h-40 max-w-3xl px-6 pt-16 sm:h-56">
        <TextPressure
          text="Cotizaciones"
          textColor="#ffffff"
          minFontSize={36}
          flex
          width
          weight
          italic={false}
        />
      </div>
      <QuoteForm />
    </div>
  );
}
