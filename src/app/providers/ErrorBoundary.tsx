import type { ReactNode } from "react"
import { Component } from "react"

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Something went wrong
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Try refreshing the page
          </h2>
          <p className="text-sm text-slate-600">
            The error boundary stopped the UI from crashing completely.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
