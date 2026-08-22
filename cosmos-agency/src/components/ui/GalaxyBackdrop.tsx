import Galaxy from '@/components/ui/Galaxy';

export default function GalaxyBackdrop() {
  return (
    <div className="absolute inset-x-0 top-0 h-[110vh]">
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={0.7}
        glowIntensity={0.2}
        saturation={0}
        hueShift={100}
        repulsionStrength={3}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  );
}
