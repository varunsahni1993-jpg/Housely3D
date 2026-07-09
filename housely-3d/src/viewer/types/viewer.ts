export type ViewerStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ViewerSelectionState {
  readonly selectedIds: string[];
  readonly primaryId: string | null;
}

export interface ViewerToolRegistration {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly enabled: boolean;
}

export interface ViewerCameraPreset {
  readonly id: string;
  readonly label: string;
  readonly position: readonly [number, number, number];
  readonly target: readonly [number, number, number];
}

export interface ViewerState {
  readonly status: ViewerStatus;
  readonly selection: ViewerSelectionState;
  readonly tools: readonly ViewerToolRegistration[];
  readonly cameraPresets: readonly ViewerCameraPreset[];
  readonly activeCameraPresetId: string;
}

export interface ViewerContextValue {
  readonly state: ViewerState;
  setStatus: (status: ViewerStatus) => void;
  setSelection: (selectedIds: readonly string[], primaryId?: string | null) => void;
  clearSelection: () => void;
  registerTool: (tool: ViewerToolRegistration) => void;
  unregisterTool: (toolId: string) => void;
  registerCameraPreset: (preset: ViewerCameraPreset) => void;
  setActiveCameraPreset: (presetId: string) => void;
  resetCamera: () => void;
  fitToScene: () => void;
}
