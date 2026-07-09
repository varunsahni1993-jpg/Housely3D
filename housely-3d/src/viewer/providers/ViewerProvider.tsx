import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { DEFAULT_CAMERA_PRESET } from '@/viewer/utils/viewer-constants';
import type {
  ViewerCameraPreset,
  ViewerContextValue,
  ViewerSelectionState,
  ViewerStatus,
  ViewerToolRegistration,
} from '@/viewer/types';
import { ViewerContext } from './ViewerContext';

const defaultSelection: ViewerSelectionState = {
  selectedIds: [],
  primaryId: null,
};

export function ViewerProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<ViewerStatus>('idle');
  const [selection, setSelectionState] = useState<ViewerSelectionState>(defaultSelection);
  const [tools, setTools] = useState<ViewerToolRegistration[]>([]);
  const [cameraPresets, setCameraPresets] = useState<ViewerCameraPreset[]>([DEFAULT_CAMERA_PRESET]);
  const [activeCameraPresetId, setActiveCameraPresetId] = useState(DEFAULT_CAMERA_PRESET.id);

  const value = useMemo<ViewerContextValue>(() => {
    const setSelection = (selectedIds: readonly string[], primaryId: string | null = selectedIds[0] ?? null) => {
      setSelectionState({
        selectedIds: [...selectedIds],
        primaryId,
      });
    };

    const clearSelection = () => {
      setSelectionState(defaultSelection);
    };

    const registerTool = (tool: ViewerToolRegistration) => {
      setTools((currentTools) => {
        const nextTools = currentTools.filter((entry) => entry.id !== tool.id);
        nextTools.push(tool);
        return nextTools;
      });
    };

    const unregisterTool = (toolId: string) => {
      setTools((currentTools) => currentTools.filter((tool) => tool.id !== toolId));
    };

    const registerCameraPreset = (preset: ViewerCameraPreset) => {
      setCameraPresets((currentPresets) => {
        const nextPresets = currentPresets.filter((entry) => entry.id !== preset.id);
        nextPresets.push(preset);
        return nextPresets;
      });
    };

    const setActiveCameraPreset = (presetId: string) => {
      setActiveCameraPresetId(presetId);
    };

    const resetCamera = () => {
      setActiveCameraPresetId(DEFAULT_CAMERA_PRESET.id);
    };

    const fitToScene = () => {
      // Placeholder for future scene bounds fitting.
    };

    return {
      state: {
        status,
        selection,
        tools,
        cameraPresets,
        activeCameraPresetId,
      },
      setStatus,
      setSelection,
      clearSelection,
      registerTool,
      unregisterTool,
      registerCameraPreset,
      setActiveCameraPreset,
      resetCamera,
      fitToScene,
    };
  }, [activeCameraPresetId, cameraPresets, selection, status, tools]);

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}
