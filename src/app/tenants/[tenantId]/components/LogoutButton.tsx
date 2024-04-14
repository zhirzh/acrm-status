'use client'

import { logoutAction } from '@/actions'
import { Tenant, User } from '@/types'

export default function LogoutButton({ tenant, user }: { tenant: Tenant; user: User }) {
  return (
    <div className='flex rounded-md border border-gray-300'>
      <div className='border-r border-gray-200 px-3 py-2 text-sm text-gray-700'>{user.name}</div>
      <button
        onClick={() => {
          logoutAction(tenant.id)
        }}
        className='rounded-r-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50'
      >
        Sign out
      </button>
    </div>
  )
}
