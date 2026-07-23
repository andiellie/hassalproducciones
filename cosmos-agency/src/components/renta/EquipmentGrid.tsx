import EquipmentCard from "@/components/renta/EquipmentCard";
import type { Equipment } from "@/types";

export default function EquipmentGrid({ items }: { items: Equipment[] }) {
  if (items.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-slate-500">
        Próximamente: catálogo de equipo disponible para renta.
      </p>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto px-6 py-8">
      {items.map((item) => (
        <EquipmentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
