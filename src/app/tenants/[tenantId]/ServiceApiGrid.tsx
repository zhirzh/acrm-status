import Grid from '@/components/Grid'
import RightArrow from '@/components/RightArrow'
import RouterRefresh from '@/components/RouterRefresh'
import { services } from '@/constants'
import { fetchServiceApiStatuses } from '@/helpers'
import { Service, ServiceApi, Tenant } from '@/types'
import { cx } from '@/utils'
import Link from 'next/link'

export default async function ServiceApiGrid({
  tenant,
  authToken,
}: {
  tenant: Tenant
  authToken: string
}) {
  const apiStatuses = await fetchServiceApiStatuses(tenant, authToken)

  return (
    <>
      <RouterRefresh />

      <Grid>
        {services.flatMap((s) =>
          s.apis?.map((a) => (
            <ServiceApiCard
              key={`${s.id}/${a.id}`}
              tenant={tenant}
              service={s}
              api={a}
              status={apiStatuses[s.id]}
            />
          )),
        )}
      </Grid>
    </>
  )
}

export function ServiceApiGridLoading({ tenant }: { tenant: Tenant }) {
  return (
    <Grid>
      {services.flatMap((s) =>
        s.apis?.map((a) => (
          <ServiceApiCard key={`${s.id}/${a.id}`} tenant={tenant} service={s} api={a} />
        )),
      )}
    </Grid>
  )
}

export function ServiceApiGridError({ tenant }: { tenant: Tenant }) {
  return (
    <div className='relative overflow-hidden rounded-md border border-gray-300'>
      <div className='blur-[8px]'>
        <Grid>
          {services.flatMap((s) =>
            s.apis?.map((a) => (
              <ServiceApiCard key={`${s.id}/${a.id}`} tenant={tenant} service={s} api={a} />
            )),
          )}
        </Grid>
      </div>

      <div className='absolute inset-0 bg-gray-100/50 pt-40 text-center'>
        <div>Failed to load service statuses. Please try again later.</div>
        <a href=''>Retry</a>
      </div>
    </div>
  )
}

function ServiceApiCard({
  tenant,
  service,
  api,
  status,
}: {
  tenant: Tenant
  service: Service
  api: ServiceApi
  status?: number
}) {
  const ok = status === 200

  const label = status === 0 ? 'TLE' : status === -1 ? '???' : status

  return (
    <Link
      target='_blank'
      href={{ pathname: `/tenants/${tenant.id}/api/${service.id}/${api.id}` }}
      className='block space-y-[2px] py-3 pl-4 pr-6 hover:bg-gray-100'
    >
      <div className='flex items-baseline justify-between'>
        <div className='text-gray-900'>{api.url}</div>

        {status === undefined ? (
          <div className='h-4 w-8 bg-gray-100' />
        ) : (
          <div className={cx('font-mono text-sm', ok ? 'text-green-600' : 'text-red-500')}>
            {label}
          </div>
        )}
      </div>

      <div className='flex items-center justify-between'>
        <div className='text-mono text-[13px] text-gray-500'>{service.name.toUpperCase()}</div>

        <RightArrow />
      </div>
    </Link>
  )
}
