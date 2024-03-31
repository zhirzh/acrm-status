import { fetchServiceStatuses } from '@/apis'
import Grid from '@/components/Grid'
import RouterRefresh from '@/components/RouterRefresh'
import { services } from '@/constants'
import { Service, Tenant } from '@/types'
import { cx, delay } from '@/utils'

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
        <ServiceCard key={s.id} service={s} status={0} />
      ))}
    </Grid>
  )
}

function ServiceCard({ service, status }: { service: Service; status: number }) {
  return (
    <div className='flex items-baseline justify-between bg-white py-4 pl-4 pr-6'>
      <div>{service.name}</div>

      {status === 0 ? (
        <div className='h-4 w-8 bg-gray-100' />
      ) : status === -1 ? (
        <div className='text-red-500'>!</div>
      ) : (
        <div
          className={cx('font-mono text-sm', status === 200 ? 'text-green-600' : 'text-red-500')}
        >
          {status}
        </div>
      )}
    </div>
  )
}
