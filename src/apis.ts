import { Service, ServiceApi, Tenant, User } from '@/types'
import { Duration, getServiceApiUrl, isTimeoutError } from '@/utils'

const nextjsTimeout = Duration.second(10)
const apiTimeout = nextjsTimeout - Duration.second()

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

export async function fetchServiceApiStatus(
  tenant: Tenant,
  service: Service,
  serviceApi: ServiceApi,
  authToken: string,
) {
  const url = getServiceApiUrl(tenant, service, serviceApi, authToken)

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
    const user = (await res.json()) as User
    user.auth_token = authToken
    return user
  }
}
