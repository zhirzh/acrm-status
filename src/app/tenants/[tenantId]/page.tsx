import { validateAuthToken } from '@/apis'
import Brand, { brandTitle } from '@/components/Brand'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { tenants } from '@/constants'
import { getTenantCookie } from '@/helpers'
import { Metadata } from 'next'
import { Suspense } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import NavCrumbs from './NavCrumbs'
import ServicesGrid, { ServicesGridError, ServicesGridLoading } from './ServicesGrid'
import { Params } from './types'

export const dynamicParams = false

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)!

  return {
    title: `${brandTitle} / ${tenant.name}`,
  }
}

export function generateStaticParams() {
  return tenants.map<Params>((tenant) => ({ tenantId: tenant.id }))
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)!

  const { authToken } = getTenantCookie(tenant)
  const user = authToken ? await validateAuthToken(tenant, authToken) : undefined

  return (
    <div className='p-5 pb-24'>
      <div className='mx-auto max-w-[700px]'>
        <div className='mb-3 flex items-start justify-between'>
          <div>
            <Brand />
            <NavCrumbs tenant={tenant} />
          </div>

          {user ? <LogoutButton tenant={tenant} user={user} /> : <LoginButton tenant={tenant} />}
        </div>

        <Suspense fallback={<ServicesGridLoading />}>
          <ErrorBoundary fallback={<ServicesGridError />}>
            <ServicesGrid tenant={tenant} />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  )
}
