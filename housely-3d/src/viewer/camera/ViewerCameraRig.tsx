import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useViewerCamera } from '@/viewer/hooks';
import { DEFAULT_CAMERA_PRESET } from '@/viewer/utils/viewer-constants';

export function ViewerCameraRig() {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const { cameraPresets, activeCameraPresetId } = useViewerCamera();

  useEffect(() => {
    const preset = cameraPresets.find((entry) => entry.id === activeCameraPresetId) ?? DEFAULT_CAMERA_PRESET;

    camera.position.set(...preset.position);
    camera.lookAt(...preset.target);
    camera.updateProjectionMatrix();
    invalidate();
  }, [activeCameraPresetId, camera, cameraPresets, invalidate]);

  return null;
}
