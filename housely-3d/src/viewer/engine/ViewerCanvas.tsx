import Box from '@mui/material/Box';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { PCFSoftShadowMap } from 'three';
import { SceneRoot } from '@/viewer/scene';
import { ViewerCameraRig } from '@/viewer/camera';
import { ViewerOrbitControls } from '@/viewer/controls';
import { useViewer } from '@/viewer/hooks';
import { ViewerErrorBoundary } from './ViewerErrorBoundary';
import { ViewerLoadingState } from '@/viewer/components/ViewerLoadingState';

interface ViewerCanvasProps {
  scene?: ReactNode;
}

export function ViewerCanvas({ scene }: ViewerCanvasProps) {
  const { setStatus } = useViewer();

  useEffect(() => {
    setStatus('loading');

    return () => {
      setStatus('idle');
    };
  }, [setStatus]);

  return (
    <ViewerErrorBoundary onErrorStateChange={(hasError) => setStatus(hasError ? 'error' : 'ready')}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: { xs: 420, md: 600, xl: 720 },
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#0b1020',
        }}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          frameloop="demand"
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          camera={{
            position: [8, 6, 8],
            fov: 50,
            near: 0.1,
            far: 250,
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = PCFSoftShadowMap;
            setStatus('ready');
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <AdaptiveDpr pixelated />
          <Suspense fallback={<ViewerLoadingState />}>
            <ViewerCameraRig />
            <SceneRoot>{scene}</SceneRoot>
            <ViewerOrbitControls />
          </Suspense>
        </Canvas>
      </Box>
    </ViewerErrorBoundary>
  );
}
