import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import ThreeCanvasFrame from './ThreeCanvasFrame';
import type { Mesh } from 'three';
import type { Group } from 'three';

function FloatingBoxes() {
  const group = useRef<Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((state) => {
    if (!prefersReducedMotion && group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const boxes = [
    { position: [-2, 0, 0], color: '#d97706' },
    { position: [0, 0, 0], color: '#ea580c' },
    { position: [2, 0, 0], color: '#dc2626' },
  ];

  return (
    <group ref={group}>
      {boxes.map((box, i) => (
        <FloatingBox key={i} position={box.position as [number, number, number]} color={box.color} index={i} />
      ))}
    </group>
  );
}

function FloatingBox({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const mesh = useRef<Mesh>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((state) => {
    if (!prefersReducedMotion && mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Box ref={mesh} args={[1, 1, 1]} position={position}>
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </Box>
  );
}

export default function SecondaryScene() {
  return (
    <ThreeCanvasFrame>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <FloatingBoxes />
    </ThreeCanvasFrame>
  );
}
