'use client'

import { loginAction } from '@/actions'
import Button from '@/components/Button'
import { Tenant } from '@/types'
import { useState } from 'react'

type Props = {
  tenant: Tenant
  onSubmit: () => void
}

export default function LoginForm({ tenant, onSubmit }: Props) {
  const [valid, setValid] = useState(false)

  return (
    <div className='space-y-5 p-5'>
      <h2 className='text-lg font-medium text-gray-900'>Sign in</h2>

      <form
        className='space-y-6'
        action={loginAction}
        onSubmit={onSubmit}
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
            onFocus={(e) => e.currentTarget.select()}
            rows={5}
            cols={40}
            className='block resize-none break-all rounded-md border border-gray-300 p-2 pr-3 font-mono text-sm leading-6 tracking-wider text-gray-900 placeholder:text-gray-400'
          />
        </label>

        <Button fulWidth type='submit' disabled={!valid}>
          Submit
        </Button>
      </form>
    </div>
  )
}
