import type { ErrorInfo, PropsWithChildren } from 'react';
import { Component } from 'react';
import { ViewerCanvasErrorState } from '@/viewer/components/ViewerCanvasErrorState';

interface ViewerErrorBoundaryProps extends PropsWithChildren {
  onErrorStateChange?: (hasError: boolean, error: Error | null) => void;
}

interface ViewerErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ViewerErrorBoundary extends Component<ViewerErrorBoundaryProps, ViewerErrorBoundaryState> {
  public override state: ViewerErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ViewerErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Viewer failed to initialize', error, errorInfo);
    this.props.onErrorStateChange?.(true, error);
  }

  private readonly handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onErrorStateChange?.(false, null);
  };

  public override render() {
    if (this.state.hasError && this.state.error) {
      return <ViewerCanvasErrorState error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
