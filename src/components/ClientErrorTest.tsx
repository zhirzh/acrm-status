'use client'

import { Time } from '@/utils'
import { useEffect, useState } from 'react'

type Props = {
  delay?: number
}

export default function ClientErrorTest({ delay = Time.seconds(1) }: Props) {
  console.warn(
    'ClientErrorTest should only be used for testing purposes. Do not use in production.',
  )

  const [shouldThrow, setShouldThrow] = useState(false)

  useEffect(() => {
    if (typeof delay === 'undefined') {
      return
    }

    setTimeout(() => {
      setShouldThrow(true)
    }, delay)
  }, [])

  if (shouldThrow) {
    throw new Error('Client Error Test')
  }

  return null
}
