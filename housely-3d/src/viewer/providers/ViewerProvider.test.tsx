import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { useViewer } from '@/viewer/hooks';
import { ViewerProvider } from './ViewerProvider';

function Probe() {
  const { state, setSelection, clearSelection, registerTool, unregisterTool, setStatus } = useViewer();

  return (
    <div>
      <div data-testid="status">{state.status}</div>
      <div data-testid="selection">{state.selection.selectedIds.join(',')}</div>
      <div data-testid="tool-count">{state.tools.length}</div>
      <button type="button" onClick={() => setStatus('ready')}>
        ready
      </button>
      <button type="button" onClick={() => setSelection(['alpha', 'beta'], 'alpha')}>
        select
      </button>
      <button type="button" onClick={() => clearSelection()}>
        clear
      </button>
      <button
        type="button"
        onClick={() =>
          registerTool({
            id: 'measure',
            label: 'Measure',
            enabled: true,
          })
        }
      >
        add-tool
      </button>
      <button type="button" onClick={() => unregisterTool('measure')}>
        remove-tool
      </button>
    </div>
  );
}

function renderWithProvider(ui: ReactNode) {
  return render(<ViewerProvider>{ui}</ViewerProvider>);
}

describe('ViewerProvider', () => {
  it('exposes viewer state and registry actions', () => {
    renderWithProvider(<Probe />);

    expect(screen.getByTestId('status')).toHaveTextContent('idle');
    expect(screen.getByTestId('selection')).toHaveTextContent('');
    expect(screen.getByTestId('tool-count')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('ready'));
    fireEvent.click(screen.getByText('select'));
    fireEvent.click(screen.getByText('add-tool'));

    expect(screen.getByTestId('status')).toHaveTextContent('ready');
    expect(screen.getByTestId('selection')).toHaveTextContent('alpha,beta');
    expect(screen.getByTestId('tool-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('clear'));
    fireEvent.click(screen.getByText('remove-tool'));

    expect(screen.getByTestId('selection')).toHaveTextContent('');
    expect(screen.getByTestId('tool-count')).toHaveTextContent('0');
  });
});
