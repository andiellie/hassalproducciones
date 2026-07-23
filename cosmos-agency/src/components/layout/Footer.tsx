export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#030712] px-6 py-10 text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>© {new Date().getFullYear()} Cosmos Agency. Todos los derechos reservados.</span>
        <span>Diseño & Producción fuera de la órbita común.</span>
      </div>
    </footer>
  );
}
