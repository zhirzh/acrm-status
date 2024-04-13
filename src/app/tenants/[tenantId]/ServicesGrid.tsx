import Grid from '@/components/Grid'
import RouterRefresh from '@/components/RouterRefresh'
import { services } from '@/constants'
import { Service } from '@/types'
import { Suspense } from 'react'
import { fetchServiceStatus } from '@/apis'
import { cx } from '@/utils'
import { tenantCache } from './cache'

export default function ServicesGrid() {
  return (
    <>
      <RouterRefresh />

      <Grid>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </Grid>
    </>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className='flex items-baseline justify-between py-4 pl-4 pr-6'>
      <div>{service.name}</div>

      <Suspense fallback={<div className='h-4 w-8 bg-gray-100' />}>
        <ServiceCardStatus service={service} />
      </Suspense>
    </div>
  )
}

async function ServiceCardStatus({ service }: { service: Service }) {
  const tenant = tenantCache.get()

  const status = await fetchServiceStatus(tenant, service)

  const ok = status === 200
  const label = status === 0 ? 'TLE' : status === -1 ? '???' : status

  return (
    <div className={cx('font-mono text-sm', ok ? 'text-green-600' : 'text-red-500')}>{label}</div>
  )
}
