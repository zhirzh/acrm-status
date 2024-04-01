import Brand, { brandTitle } from '@/components/Brand'
import { tenants } from '@/constants'
import TenantCard from './TenantCard'

export const metadata = {
  title: brandTitle,
}

export default function TenantsPage() {
  return (
    <div className='p-5 pb-24'>
      <div className='mx-auto max-w-[500px]'>
        <div className='mb-5'>
          <Brand />
        </div>

        <div className='divide-y divide-gray-200 rounded-md border border-gray-300'>
          {tenants.map((s) => (
            <TenantCard key={s.id} tenant={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
