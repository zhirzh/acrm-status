import RightArrow from '@/components/RightArrow'
import { Tenant } from '@/types'
import Link from 'next/link'

export default function TenantCard({ tenant }: { tenant: Tenant }) {
  return (
    <Link
      href={{ pathname: `/tenants/${tenant.id}` }}
      className='flex items-center justify-between py-3 pl-5 pr-7 first:rounded-t-md last:rounded-b-md hover:bg-gray-100'
    >
      <div>
        <div className='text-gray-900'>{tenant.name}</div>
        <div className='text-sm text-gray-500'>{tenant.domain}</div>
      </div>

      <RightArrow />
    </Link>
  )
}
