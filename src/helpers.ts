import { services } from '@/constants'
import { Service, Tenant } from '@/types'
import { fetchServiceStatus } from '@/apis'
import { cookies } from 'next/headers'
import { tryCatch } from './utils'

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

type TenantCookie = {
  authToken: string
}

export function getTenantCookie(tenantId: string) {
  const cookie = cookies().get(tenantId)
  if (!cookie) {
    return {}
  }

  const [data, error] = tryCatch(() => JSON.parse(cookie.value) as Partial<TenantCookie>)
  if (error) {
    console.error(error)
    return {}
  }

  return data
}
