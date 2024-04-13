import { Tenant } from '@/types'
import { Maybe, tryCatch } from '@/utils'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { validateAuthToken } from './apis'

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

export const getUser = cache(async (tenant: Tenant, authToken: Maybe<string>) => {
  if (!authToken) {
    return
  }

  const user = await validateAuthToken(tenant, authToken)

  return user
})
