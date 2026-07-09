import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { ErrorState } from '@/components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error', error, errorInfo);
  }

  private readonly handleReset = () => {
    this.setState({ hasError: false });
  };

  public override render() {
    if (this.state.hasError) {
      return <ErrorState title="Something went wrong" message="The shell hit an unexpected issue." onRetry={this.handleReset} />;
    }

    return this.props.children;
  }
}
