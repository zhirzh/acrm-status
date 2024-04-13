import Link from 'next/link'
import { tenantCache } from '../cache'

export default function NavCrumbs() {
  const tenant = tenantCache.get()
  return (
    <div className='space-x-0.5'>
      <Link href={{ pathname: '/tenants' }} className='px-0.5 text-sm'>
        Tenants
      </Link>

      <span className='text-gray-400'>/</span>

      <Link
        replace
        href={{
          pathname: `/tenants/${tenant.id}`,
          query: { t: Date.now() },
        }}
        className='px-0.5 text-sm'
      >
        {tenant.name}
      </Link>
    </div>
  )
}
