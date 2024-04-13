'use client'

import { loginAction } from '@/actions'
import Button from '@/components/Button'
import { useActionState } from '@/hooks'
import { Tenant } from '@/types'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
  tenant: Tenant
  onSubmit: () => void
}

export default function LoginForm({ tenant, onSubmit }: Props) {
  const [valid, setValid] = useState(false)

  const [formState, formAction, pending] = useActionState(loginAction, '')

  useEffect(() => {
    if (!formState) {
      return
    }

    if (formState === 'ok') {
      onSubmit()
      return
    }

    alert(formState)
  }, [formState, onSubmit])

  return (
    <div className='space-y-5 p-5'>
      <h2 className='text-lg font-medium text-gray-900'>Sign in</h2>

      <form
        className='space-y-6'
        action={formAction}
        onChange={(e) => {
          const form = e.currentTarget
          setValid(form.checkValidity())
        }}
      >
        <input type='hidden' name='tenantId' value={tenant.id} />

        <label className='block space-y-2'>
          <div className='text-sm font-semibold text-gray-500'>Auth Token</div>

          <textarea
            autoFocus
            required
            name='authToken'
            placeholder='Enter your auth token here'
            disabled={pending}
            onFocus={(e) => e.currentTarget.select()}
            rows={5}
            cols={40}
            className='block resize-none break-all rounded-md border border-gray-300 p-2 pr-3 font-mono text-sm leading-6 tracking-wider text-gray-900 placeholder:text-gray-400'
          />
        </label>

        <SubmitButton disabled={!valid} />
      </form>
    </div>
  )
}
function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button fulWidth type='submit' disabled={disabled || pending}>
      Submit
    </Button>
  )
}
