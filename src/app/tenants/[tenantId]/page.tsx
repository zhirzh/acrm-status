import Brand, { brandTitle } from '@/components/Brand'
import { tenants } from '@/constants'
import { getTenantCookie, getUser } from '@/helpers'
import { Metadata } from 'next'
import { Suspense } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import NavCrumbs from './NavCrumbs'
import ServiceApiGrid from './ServiceApiGrid'
import ServicesGrid from './ServicesGrid'
import { authTokenCache, tenantCache, userCache } from './cache'

export const dynamicParams = false

type Params = {
  tenantId: string
}

export function generateStaticParams() {
  return tenants.map<Params>((tenant) => ({ tenantId: tenant.id }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)!

  return {
    title: `${brandTitle} / ${tenant.name}`,
  }
}

export default function ServicesPage({ params }: { params: Params }) {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)!
  tenantCache.set(tenant)

  const { authToken } = getTenantCookie(tenant)
  authTokenCache.set(authToken)

  return (
    <div className='p-5 pb-24'>
      <div className='mx-auto max-w-[700px]'>
        <div className='mb-3 flex items-start justify-between'>
          <div>
            <Brand />
            <NavCrumbs />
          </div>

          <Suspense>
            <UserSection />
          </Suspense>
        </div>

        <ServicesGrid />

        <Suspense>
          <ServiceApiGridSection />
        </Suspense>
      </div>
    </div>
  )
}

async function ServiceApiGridSection() {
  const tenant = tenantCache.get()
  const authToken = authTokenCache.get()

  const user = await getUser(tenant, authToken)
  if (!user) {
    return null
  }

  userCache.set(user)

  return (
    <>
      <h2 className='mb-3 mt-10 text-xl'>APIs</h2>
      <ServiceApiGrid />
    </>
  )
}

async function UserSection() {
  const tenant = tenantCache.get()
  const authToken = authTokenCache.get()

  const user = await getUser(tenant, authToken)

  return user ? <LogoutButton tenant={tenant} user={user} /> : <LoginButton tenant={tenant} />
}
