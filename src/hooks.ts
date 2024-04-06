'use client'

import { Nullable } from '@/utils'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export function useEscapeKey(onEscapeKey: () => void) {
  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') {
        return
      }

      onEscapeKey()
    }

    document.addEventListener('keyup', cb)

    return () => {
      document.removeEventListener('keyup', cb)
    }
  }, [onEscapeKey])
}

export function useFocusTrap(targetRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return
      }

      const target = targetRef.current
      if (!target) {
        return
      }

      const focusableElements = getFocusableElements(target)
      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (document.activeElement === last && !e.shiftKey) {
        e.preventDefault()
        first.focus()
      } else if (document.activeElement === first && e.shiftKey) {
        e.preventDefault()
        last.focus()
      }
    }

    const onFocusIn = (e: FocusEvent) => {
      const target = targetRef.current
      if (!target) {
        return
      }

      if (target.contains(e.target as Nullable<Node>)) {
        return
      }

      const focusableElements = getFocusableElements(target)
      const first = focusableElements[0]
      first.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [targetRef])
}

function getFocusableElements(element: HTMLElement) {
  const formElements = ['input:not([type=hidden])', 'button', 'textarea']
  const query = formElements.map((x) => `${x}:not([disabled])`).join(', ')
  return Array.from(element.querySelectorAll<HTMLElement>(query))
}

// TODO: replace with useActionState hook from react
export function useActionState<State>(
  serverAction: (formData: FormData) => Promise<State>,
  initialState: State,
) {
  const [state, setState] = useState(initialState)
  const [pending, setPending] = useState(false)

  const dispatch = async (formData: FormData) => {
    flushSync(() => {
      setPending(true)
    })

    const nextState = await serverAction(formData)
    setState(nextState)
    setPending(false)
  }

  return [state, dispatch, pending] as const
}
