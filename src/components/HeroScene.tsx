import { Suspense, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/** Mouse-driven parallax for the whole scene. */
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    const tx = pointer.y * 0.25;
    const ty = pointer.x * 0.35;
    group.current.rotation.x += (tx - group.current.rotation.x) * Math.min(1, delta * 3);
    group.current.rotation.y += (ty - group.current.rotation.y) * Math.min(1, delta * 3);
  });
  return <group ref={group}>{children}</group>;
}

function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 16, 160]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} />
    </mesh>
  );
}

export default function HeroScene() {
  const satellites = useMemo(
    () => [
      { pos: [-1.9, 1.1, -0.4] as [number, number, number], r: 0.22, color: '#c4b5fd' },
      { pos: [2.0, -0.8, 0.2] as [number, number, number], r: 0.16, color: '#38bdf8' },
      { pos: [1.2, 1.6, -0.8] as [number, number, number], r: 0.12, color: '#8b5cf6' },
    ],
    [],
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      aria-label="Decorative 3D scene of a floating glass orb with orbital rings"
      role="img"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={1.6} color="#8b5cf6" />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#38bdf8" />

      <Suspense fallback={null}>
        <Rig>
          <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
            <mesh>
              <sphereGeometry args={[1.25, 64, 64]} />
              <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={0.6}
                chromaticAberration={0.04}
                anisotropy={0.2}
                distortion={0.25}
                distortionScale={0.3}
                temporalDistortion={0.05}
                color="#c4b5fd"
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <icosahedronGeometry args={[0.55, 1]} />
              <MeshDistortMaterial color="#8b5cf6" distort={0.35} speed={2} roughness={0.2} metalness={0.8} />
            </mesh>
          </Float>

          {satellites.map((s, i) => (
            <Float key={i} speed={2 + i} floatIntensity={1.5}>
              <mesh position={s.pos}>
                {i === 1 ? <octahedronGeometry args={[s.r, 0]} /> : <sphereGeometry args={[s.r, 32, 32]} />}
                <meshStandardMaterial color={s.color} metalness={0.9} roughness={0.15} emissive={s.color} emissiveIntensity={0.25} />
              </mesh>
            </Float>
          ))}

          <OrbitRing radius={2.1} speed={0.25} tilt={[Math.PI / 2.6, 0, 0.3]} />
          <OrbitRing radius={2.5} speed={-0.18} tilt={[Math.PI / 3.2, 0.4, 0]} />
        </Rig>

        <Sparkles count={60} scale={6} size={2} speed={0.3} color="#c4b5fd" opacity={0.7} />
      </Suspense>
    </Canvas>
  );
}
