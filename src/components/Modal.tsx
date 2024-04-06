'use client'

import { useEscapeKey, useFocusTrap } from '@/hooks'
import { draf } from '@/utils'
import { cx } from '@/utils'
import React, { ElementRef, useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal({ children, open, onClose }: Props) {
  const modalRef = useRef<ElementRef<'div'>>(null)

  const [visible, setVisible] = useState(false)

  const mounted = open && !visible
  const entered = open && visible
  const exited = !open && visible
  const unmounted = !open && !visible

  useEffect(() => {
    if (open) {
      draf(() => {
        setVisible(true)
      })
    }
  }, [open])

  useEscapeKey(() => {
    onClose()
  })

  useFocusTrap(modalRef)

  if (unmounted) {
    return null
  }

  return (
    <div
      ref={modalRef}
      className={cx(
        'fixed inset-0 bg-black/50 transition-all duration-500',
        mounted && 'opacity-0',
        entered && 'opacity-100',
        exited && 'opacity-0 duration-200',
      )}
      onClick={(e) => {
        const backdrop = e.currentTarget
        const backdropClicked = e.target === backdrop
        if (backdropClicked) {
          onClose()
        }
      }}
      onTransitionEnd={() => {
        if (exited) {
          setVisible(false)
        }
      }}
    >
      <div
        className={cx(
          'mx-auto mt-28 max-w-fit rounded-lg bg-white shadow-lg transition-all duration-500',
          mounted && 'translate-y-10 opacity-0',
          entered && 'opacity-1 translate-y-0',
          exited && '-translate-y-5 opacity-0 duration-200',
        )}
      >
        {children}
      </div>
    </div>
  )
}
