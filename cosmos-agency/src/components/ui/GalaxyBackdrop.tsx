import Galaxy from '@/components/ui/Galaxy';

export default function GalaxyBackdrop() {
  return (
    <div className="absolute inset-x-0 top-0 h-[110vh] pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={100}
        repulsionStrength={3}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
