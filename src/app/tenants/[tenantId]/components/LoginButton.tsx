'use client'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { Tenant } from '@/types'
import { useState } from 'react'
import LoginForm from './LoginForm'

export default function LoginButton({ tenant }: { tenant: Tenant }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Sign in</Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <LoginForm tenant={tenant} onSubmit={() => setModalOpen(false)} />
      </Modal>
    </>
  )
}
