import { Mail } from "lucide-react";
import BrandButton from "@/components/ui/BrandButton";

export default function MailButton() {
  return (
    <BrandButton
      href="mailto:ahanostyle@gmail.com"
      ariaLabel="Escríbenos por correo"
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4ff00] shadow-[0_4px_20px_rgba(212,255,0,0.5)] transition-transform hover:scale-110"
    >
      <Mail className="h-7 w-7 text-black" />
    </BrandButton>
  );
}
