import { Service, Tenant } from '@/types'
import { services } from './constants'

async function fetchServiceStatus(tenant: Tenant, service: Service) {
  const url = `https://${service.id}.${tenant.domain}/health-check`

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
    })
    return res.status
  } catch (err) {
    console.error(err)
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
