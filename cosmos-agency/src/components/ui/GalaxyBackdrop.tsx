import Galaxy from '@/components/ui/Galaxy';

export default function GalaxyBackdrop() {
  return (
    <div className="absolute inset-x-0 top-0 h-[110vh]">
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 65%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 65%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              'radial-gradient(circle 450px at 50% 45.4545%, transparent 449px, black 451px)',
            maskImage:
              'radial-gradient(circle 450px at 50% 45.4545%, transparent 449px, black 451px)',
          }}
        >
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={0.7}
            glowIntensity={0.2}
            saturation={0}
            hueShift={100}
            repulsionStrength={3}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  );
}
