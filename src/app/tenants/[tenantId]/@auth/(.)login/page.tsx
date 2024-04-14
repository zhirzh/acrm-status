'use client'

import LoginForm from '@/components/LoginForm'
import Modal from '@/components/Modal'
import { tenants } from '@/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginModal({ params }: { params: { tenantId: string } }) {
  const { tenantId } = params
  const tenant = tenants.find((t) => t.id === tenantId)!

  const [modalOpen, setModalOpen] = useState(true)
  const closeModal = () => {
    setModalOpen(false)
  }

  const router = useRouter()
  const goBack = () => {
    router.back()
  }

  return (
    <Modal open={modalOpen} closeModal={closeModal} onClose={goBack}>
      <LoginForm tenant={tenant} onSubmit={closeModal} />
    </Modal>
  )
}
