import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import ThreeCanvasFrame from './ThreeCanvasFrame';

function AnimatedSphere() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#d97706"
        attach="material"
        distort={prefersReducedMotion ? 0 : 0.4}
        speed={prefersReducedMotion ? 0 : 1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ThreeCanvasFrame>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <AnimatedSphere />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.5}
      />
    </ThreeCanvasFrame>
  );
}
