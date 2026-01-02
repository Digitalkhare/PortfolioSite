import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

function Blob() {
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh scale={2.2}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          distort={0.35}
          speed={1.3}
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-950 to-neutral-900">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Blob />
        {/* Keep controls subtle: no zoom, no pan */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="pointer-events-auto mx-auto w-full max-w-6xl px-6">
          <p className="text-sm uppercase tracking-widest text-neutral-300">
            Full-Stack Java Developer • Spring Boot • React
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-6xl">
            Osomokhare Aliu
          </h1>
          <p className="mt-4 max-w-xl text-neutral-200">
            I build secure, scalable web apps with clean APIs, strong backend
            fundamentals, and polished user experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-900"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white"
            >
              Contact
            </a>
            <a
              href="/Osomokhare_Aliu_Full_Stack_Java_Developer.pdf"
              download
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
