import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ViewerProvider } from '@/viewer/providers';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: ReactNode }) => <div data-testid="r3f-canvas">{children}</div>,
  useThree: () => ({
    camera: {
      position: { set: vi.fn() },
      lookAt: vi.fn(),
      updateProjectionMatrix: vi.fn(),
    },
    invalidate: vi.fn(),
  }),
}));

vi.mock('@react-three/drei', () => ({
  AdaptiveDpr: () => null,
  Grid: () => <div data-testid="grid" />,
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

vi.mock('@/viewer/scene', () => ({
  SceneRoot: () => <div data-testid="scene-root" />,
}));

vi.mock('@/viewer/camera', () => ({
  ViewerCameraRig: () => <div data-testid="camera-rig" />,
}));

vi.mock('@/viewer/controls', () => ({
  ViewerOrbitControls: () => <div data-testid="viewer-controls" />,
}));

import { ViewerCanvas } from './ViewerCanvas';

describe('ViewerCanvas', () => {
  it('renders the canvas shell and scene composition', () => {
    render(
      <ViewerProvider>
        <ViewerCanvas />
      </ViewerProvider>,
    );

    expect(screen.getByTestId('r3f-canvas')).toBeInTheDocument();
    expect(screen.getByTestId('scene-root')).toBeInTheDocument();
    expect(screen.getByTestId('camera-rig')).toBeInTheDocument();
    expect(screen.getByTestId('viewer-controls')).toBeInTheDocument();
  });
});
