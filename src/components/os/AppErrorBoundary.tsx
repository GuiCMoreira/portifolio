"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  restartLabel: string;
  crashedLabel: string;
  /** chance de limpar estado externo (ex.: payload da janela) antes de remontar */
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

// Error boundary por janela: um app que quebra nunca derruba o desktop.
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[GuiOS] app crash:", error, info.componentStack);
  }

  private reset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-4xl" aria-hidden>
            💥
          </p>
          <p className="text-sm text-text-lo">{this.props.crashedLabel}</p>
          <button
            type="button"
            onClick={this.reset}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-text-hi transition-colors hover:bg-white/15"
          >
            <RotateCcw className="h-4 w-4" />
            {this.props.restartLabel}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
