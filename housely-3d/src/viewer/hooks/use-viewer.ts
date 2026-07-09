import { useContext } from 'react';
import { ViewerContext } from '@/viewer/providers';

export function useViewer() {
  const context = useContext(ViewerContext);

  if (!context) {
    throw new Error('useViewer must be used inside a ViewerProvider.');
  }

  return context;
}

export function useViewerSelection() {
  const { state, setSelection, clearSelection } = useViewer();

  return {
    selection: state.selection,
    setSelection,
    clearSelection,
  };
}

export function useViewerCamera() {
  const { state, setActiveCameraPreset, resetCamera, fitToScene } = useViewer();

  return {
    cameraPresets: state.cameraPresets,
    activeCameraPresetId: state.activeCameraPresetId,
    setActiveCameraPreset,
    resetCamera,
    fitToScene,
  };
}
