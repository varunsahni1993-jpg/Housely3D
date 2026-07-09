import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function ViewerOrbitControls() {
  const invalidate = useThree((state) => state.invalidate);

  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan
      enableRotate
      enableZoom
      panSpeed={0.9}
      rotateSpeed={0.6}
      zoomSpeed={0.8}
      minDistance={2}
      maxDistance={40}
      maxPolarAngle={Math.PI / 1.85}
      screenSpacePanning
      onChange={() => invalidate()}
    />
  );
}
