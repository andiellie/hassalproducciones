export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#030712] px-6 py-10 text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>© {new Date().getFullYear()} Cosmos Agency. Todos los derechos reservados.</span>
        <span>Diseño & Producción fuera de la órbita común.</span>
      </div>
      <div className="mx-auto mt-4 max-w-6xl text-center">
        <span>
          Website hecho por{" "}
          <a
            href="https://andiesgn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 underline underline-offset-2 hover:text-slate-300"
          >
            Andiesgn
          </a>
        </span>
      </div>
    </footer>
  );
}
