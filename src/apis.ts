import { Service, Tenant } from '@/types'
import { Time, isTimeoutError } from '@/utils'

const nextjsTimeout = Time.seconds(10)
const apiTimeout = nextjsTimeout - Time.seconds(1)

export async function fetchServiceStatus(tenant: Tenant, service: Service) {
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

type User = {
  id: number
  email: string
  name: string
  sub_tenant: {
    id: number
    name: string
  }
}

export async function validateAuthToken(tenant: Tenant, authToken: string) {
  const url = `https://employee.${tenant.domain}/api/v0/validate`

  const signal = AbortSignal.timeout(apiTimeout)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      cookie: `auth_token=${authToken}`,
    },
    cache: 'no-store',
    signal,
  })

  if (res.ok) {
    const user: User = await res.json()
    return user
  }
}
