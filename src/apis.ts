import { services } from '@/constants'
import { Service, Tenant } from '@/types'
import { Time, isTimeoutError } from '@/utils'

const nextjsTimeout = Time.seconds(10)
const apiTimeout = nextjsTimeout - Time.seconds(1)

async function fetchServiceStatus(tenant: Tenant, service: Service) {
  const url = `https://${service.id}.${tenant.domain}/health-check`

  const signal = AbortSignal.timeout(apiTimeout)

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
      signal,
    })
    return res.status
  } catch (err) {
    if (isTimeoutError(err)) {
      return 0
    }

    return -1
  }
}

export async function fetchServiceStatuses(tenant: Tenant) {
  const serviceStatuses: Record<Service['id'], number> = {}

  await Promise.all(
    services.map(async (s) => {
      const status = await fetchServiceStatus(tenant, s)
      serviceStatuses[s.id] = status
    }),
  )

  return serviceStatuses
}
