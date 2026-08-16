export default function SaturnIcon({ size = 24 }: { size?: number }) {
  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size * 0.9 }}
    >
      {/* Anillo (mitad trasera, oculta detrás del planeta) */}
      <svg
        viewBox="0 0 100 46"
        className="pointer-events-none absolute left-1/2 top-1/2 text-[#d4ff00]"
        style={{
          width: size * 1.32,
          height: size * 0.6,
          zIndex: -2,
          transform: "translate(-50%, -50%) rotate(-16deg)",
        }}
      >
        <ellipse
          cx="50"
          cy="23"
          rx="48"
          ry="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          opacity="0.95"
        />
      </svg>
      {/* Planeta */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.66,
          height: size * 0.66,
          zIndex: -1,
          background: "radial-gradient(circle at 35% 30%, #ffffff, #d9dee6 55%, #aab0bb 100%)",
        }}
      />
      {/* Anillo (banda frontal, cruza sobre el planeta) */}
      <svg
        viewBox="0 0 100 46"
        className="pointer-events-none absolute left-1/2 top-1/2 text-[#d4ff00]"
        style={{
          width: size * 1.32,
          height: size * 0.6,
          zIndex: -1,
          transform: "translate(-50%, -50%) rotate(-16deg)",
        }}
      >
        <path
          d="M 95.1 28.13 A 48 15 0 0 1 4.9 28.13"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>
    </span>
  );
}
