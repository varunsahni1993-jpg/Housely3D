import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ViewerProvider } from '@/viewer/providers';

vi.mock('@/viewer/engine', () => ({
  ViewerCanvas: () => <div data-testid="viewer-canvas" />,
}));

import { ViewerWorkspace } from './ViewerWorkspace';

describe('ViewerWorkspace', () => {
  it('renders the viewer UI shells', () => {
    render(
      <ViewerProvider>
        <ViewerWorkspace />
      </ViewerProvider>,
    );

    expect(screen.getByText('Toolbar')).toBeInTheDocument();
    expect(screen.getByText('Scene tree')).toBeInTheDocument();
    expect(screen.getByText('Inspector')).toBeInTheDocument();
    expect(screen.getByText('Properties panel')).toBeInTheDocument();
    expect(screen.getByText('Status bar')).toBeInTheDocument();
    expect(screen.getByTestId('viewer-canvas')).toBeInTheDocument();
  });
});
