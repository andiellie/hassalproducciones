import Galaxy from '@/components/effects/Galaxy';

export default function GalaxyFadeBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
        }}
      >
        <Galaxy
          mouseInteraction={false}
          density={1.4}
          glowIntensity={0.12}
          saturation={0}
          hueShift={100}
        />
      </div>
    </div>
  );
}
