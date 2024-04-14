'use server'

import { validateAuthToken } from '@/apis'
import { tenants } from '@/constants'
import { getTenantCookie } from '@/helpers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const tenantId = formData.get('tenantId') as string
  const authToken = formData.get('authToken') as string

  const tenant = tenants.find((t) => t.id === tenantId)!

  const user = await validateAuthToken(tenant, authToken)
  if (!user) {
    return 'Invalid auth token'
  }

  const tenantCookie = getTenantCookie(tenant)

  const nextCookieValue = JSON.stringify({
    ...tenantCookie,
    authToken,
  })

  cookies().set({
    name: tenantId,
    value: nextCookieValue,
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  })

  redirect(`/tenants/${tenantId}`)
}

export async function logoutAction(tenantId: string) {
  const tenant = tenants.find((t) => t.id === tenantId)!

  const tenantCookie = getTenantCookie(tenant)

  delete tenantCookie.authToken

  const nextCookieValue = JSON.stringify(tenantCookie)

  cookies().set({
    name: tenantId,
    value: nextCookieValue,
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  })
}
