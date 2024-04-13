import { fetchServiceApiStatus } from '@/apis'
import Grid from '@/components/Grid'
import RightArrow from '@/components/RightArrow'
import RouterRefresh from '@/components/RouterRefresh'
import { services } from '@/constants'
import { Service, ServiceApi } from '@/types'
import { cx } from '@/utils'
import Link from 'next/link'
import { Suspense } from 'react'
import { tenantCache, userCache } from './cache'

export default function ServiceApiGrid() {
  return (
    <>
      <RouterRefresh />

      <Grid>
        {services.flatMap((s) =>
          s.apis?.map((a) => <ServiceApiCard key={`${s.id}/${a.id}`} service={s} serviceApi={a} />),
        )}
      </Grid>
    </>
  )
}

function ServiceApiCard({ service, serviceApi }: { service: Service; serviceApi: ServiceApi }) {
  const tenant = tenantCache.get()

  return (
    <Link
      target='_blank'
      href={{ pathname: `/api/${tenant.id}/${service.id}/${serviceApi.id}` }}
      className='block space-y-[2px] py-3 pl-4 pr-6 hover:bg-gray-100'
    >
      <div className='flex items-baseline justify-between'>
        <div className='text-gray-900'>{serviceApi.url}</div>

        <Suspense fallback={<div className='h-4 w-8 bg-gray-100' />}>
          <ServiceApiCardStatus service={service} serviceApi={serviceApi} />
        </Suspense>
      </div>

      <div className='flex items-center justify-between'>
        <div className='text-mono text-[13px] text-gray-500'>{service.name.toUpperCase()}</div>

        <RightArrow />
      </div>
    </Link>
  )
}

async function ServiceApiCardStatus({
  service,
  serviceApi,
}: {
  service: Service
  serviceApi: ServiceApi
}) {
  const tenant = tenantCache.get()
  const user = userCache.get()

  const status = await fetchServiceApiStatus(tenant, service, serviceApi, user.auth_token)

  const ok = status === 200
  const label = status === 0 ? 'TLE' : status === -1 ? '???' : status

  return (
    <div className={cx('font-mono text-sm', ok ? 'text-green-600' : 'text-red-500')}>{label}</div>
  )
}
