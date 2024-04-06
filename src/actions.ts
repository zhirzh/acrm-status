'use server'

import { validateAuthToken } from '@/apis'
import { tenants } from '@/constants'
import { getTenantCookie } from '@/helpers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const tenantId = formData.get('tenantId') as string
  const authToken = formData.get('authToken') as string

  const tenant = tenants.find((t) => t.id === tenantId)!

  const user = await validateAuthToken(tenant, authToken)
  if (!user) {
    return 'Invalid auth token'
  }

  const tenantCookie = getTenantCookie(tenantId)

  const nextCookieValue = JSON.stringify({
    ...tenantCookie,
    authToken,
  })

  const nextCookie: ResponseCookie = {
    name: tenantId,
    value: nextCookieValue,
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  }

  cookies().set(nextCookie)

  return 'ok'
}
