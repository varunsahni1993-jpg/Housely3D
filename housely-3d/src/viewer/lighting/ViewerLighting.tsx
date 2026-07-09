/* eslint-disable react/no-unknown-property */
import { memo } from 'react';

export const ViewerLighting = memo(function ViewerLighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight color="#dbeafe" groundColor="#334155" intensity={0.6} />
      <directionalLight
        castShadow
        position={[10, 12, 8]}
        intensity={1.35}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
    </>
  );
});
