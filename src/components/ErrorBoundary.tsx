'use client'

import { Component } from 'react'

type Props = {
  children: React.ReactNode
  fallback: React.ReactNode
}

export class ErrorBoundary extends Component<Props> {
  state = { error: null }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  componentDidCatch(error: unknown, { digest, componentStack }: React.ErrorInfo) {
    console.error(digest, error)
    console.log(componentStack)
  }

  render() {
    if (this.state.error) {
      return this.props.fallback
    }

    return this.props.children
  }
}
