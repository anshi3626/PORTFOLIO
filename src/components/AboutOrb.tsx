import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import type { Mesh } from 'three';

function SpinningTorus() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.5;
  });
  return (
    <Float speed={1.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.6, 0.18, 160, 24]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.85} roughness={0.2} emissive="#6d4cf0" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

/** Decorative floating element for the About section. */
export default function AboutOrb() {
  return (
    <div style={{ height: '100%', width: '100%' }} role="img" aria-label="Decorative floating 3D shape">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 3]} intensity={1.4} color="#38bdf8" />
        <pointLight position={[-2, -1, 2]} intensity={1} color="#8b5cf6" />
        <SpinningTorus />
        <Sparkles count={30} scale={5} size={2} speed={0.25} color="#38bdf8" opacity={0.6} />
      </Canvas>
    </div>
  );
}
