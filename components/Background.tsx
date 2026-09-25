import Particles from "@/components/reactbits/Particles";

// Fixed layer behind the whole page: soft glow blobs (CSS) + drifting particles (WebGL)
export default function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <Particles
        particleColors={["#4bad78", "#5fd192", "#d1a25c"]}
        particleCount={180}
        particleSpread={10}
        speed={0.08}
        particleBaseSize={400}
        alphaParticles
        disableRotation={false}
      />
    </div>
  );
}
