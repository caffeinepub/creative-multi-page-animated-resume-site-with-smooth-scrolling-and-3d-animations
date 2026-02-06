import { Canvas } from '@react-three/fiber';
import { type ReactNode } from 'react';

interface ThreeCanvasFrameProps {
  children: ReactNode;
}

export default function ThreeCanvasFrame({ children }: ThreeCanvasFrameProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </Canvas>
  );
}
