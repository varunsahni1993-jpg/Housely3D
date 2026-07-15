/* eslint-disable react/no-unknown-property */
import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { ViewerAxesHelper } from '@/viewer/helpers';
import { ViewerGrid } from '@/viewer/grid';
import { ViewerLighting } from '@/viewer/lighting';
import { VIEWER_FOG } from '@/viewer/utils/viewer-constants';

export const SceneRoot = memo(function SceneRoot({ children }: PropsWithChildren) {
  return (
    <>
      <color attach="background" args={['#0b1020']} />
      <fog attach="fog" args={[VIEWER_FOG, 16, 55]} />
      <ViewerLighting />
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#0f172a" metalness={0.1} roughness={0.92} />
      </mesh>
      <ViewerGrid />
      <ViewerAxesHelper />
      {children}
    </>
  );
});
