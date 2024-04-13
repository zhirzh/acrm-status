'use client'

import { Component } from 'react'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode | ((reset: () => void) => React.ReactNode)
}

export default class ErrorBoundary extends Component<Props> {
  state = { error: null }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  componentDidCatch(error: unknown, { digest, componentStack }: React.ErrorInfo) {
    console.error(digest, error)
    console.log(componentStack)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(this.reset)
      }

      return fallback
    }

    return children
  }
}
