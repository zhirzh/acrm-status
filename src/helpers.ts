import { fetchServiceApiStatus, fetchServiceStatus } from '@/apis'
import { services } from '@/constants'
import { Service, ServiceApi, Tenant } from '@/types'
import { tryCatch } from '@/utils'
import { cookies } from 'next/headers'

export async function fetchServiceStatuses(tenant: Tenant) {
  const serviceStatuses: Record<Service['id'], number> = {}

  const tasks = services.map(async (s) => {
    const status = await fetchServiceStatus(tenant, s)
    serviceStatuses[s.id] = status
  })

  await Promise.all(tasks)

  return serviceStatuses
}

export async function fetchServiceApiStatuses(tenant: Tenant, authToken: string) {
  const apiStatuses: Record<ServiceApi['id'], number> = {}

  const tasks = services.flatMap((s) => {
    if (!s.apis) {
      return []
    }

    return s.apis.map(async (a) => {
      const status = await fetchServiceApiStatus(tenant, s, a, authToken)
      apiStatuses[s.id] = status
    })
  })

  await Promise.all(tasks)

  return apiStatuses
}

type TenantCookie = {
  authToken: string
}

export function getTenantCookie(tenant: Tenant) {
  const cookie = cookies().get(tenant.id)
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
