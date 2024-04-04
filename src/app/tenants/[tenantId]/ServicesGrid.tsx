import { fetchServiceStatuses } from '@/apis'
import Grid from '@/components/Grid'
import RouterRefresh from '@/components/RouterRefresh'
import { services } from '@/constants'
import { Service, Tenant } from '@/types'
import { cx } from '@/utils'

export default async function ServicesGrid({ tenant }: { tenant: Tenant }) {
  const serviceStatuses = await fetchServiceStatuses(tenant)

  return (
    <>
      <RouterRefresh />

      <Grid>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} status={serviceStatuses[s.id]} />
        ))}
      </Grid>
    </>
  )
}

export function ServicesGridLoading() {
  return (
    <Grid>
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </Grid>
  )
}

export function ServicesGridError() {
  return (
    <div className='relative overflow-hidden rounded-md border border-gray-300'>
      <div className='blur-[8px]'>
        <Grid>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </Grid>
      </div>

      <div className='absolute inset-0 bg-gray-100/50 pt-40 text-center'>
        <div>Failed to load service statuses. Please try again later.</div>
        <a href=''>Retry</a>
      </div>
    </div>
  )
}

function ServiceCard({ service, status }: { service: Service; status?: number }) {
  const ok = status === 200

  const label = status === 0 ? 'TLE' : status === -1 ? '???' : status

  return (
    <div className='flex items-baseline justify-between bg-white py-4 pl-4 pr-6'>
      <div>{service.name}</div>

      {status === undefined ? (
        <div className='h-4 w-8 bg-gray-100' />
      ) : (
        <div className={cx('font-mono text-sm', ok ? 'text-green-600' : 'text-red-500')}>
          {label}
        </div>
      )}
    </div>
  )
}
