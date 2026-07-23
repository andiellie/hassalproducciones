import EquipmentGrid from "@/components/renta/EquipmentGrid";
import { getEquipment } from "@/lib/cms";

export default async function RentaEquipoPage() {
  const equipment = await getEquipment();

  return (
    <div>
      <h1 className="mx-auto max-w-6xl px-6 pt-16 text-4xl font-bold">
        Renta de Equipo
      </h1>
      <EquipmentGrid items={equipment} />
    </div>
  );
}
