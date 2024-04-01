import Brand, { brandTitle } from '@/components/Brand'
import { tenants } from '@/constants'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import NavCrumbs from './NavCrumbs'
import ServicesGrid, { ServicesGridLoading } from './ServicesGrid'

export const dynamicParams = false

type Params = {
  tenantId: string
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)
  if (!tenant) {
    notFound()
  }

  return {
    title: `${brandTitle} / ${tenant.name}`,
  }
}

export function generateStaticParams() {
  return tenants.map<Params>((tenant) => ({ tenantId: tenant.id }))
}

export default function ServicesPage({ params }: { params: Params }) {
  const { tenantId } = params

  const tenant = tenants.find((t) => t.id === tenantId)
  if (!tenant) {
    notFound()
  }

  return (
    <div className='p-5 pb-24'>
      <div className='mx-auto max-w-[700px]'>
        <div className='mb-3'>
          <Brand />
          <NavCrumbs tenant={tenant} />
        </div>

        <Suspense fallback={<ServicesGridLoading />}>
          <ServicesGrid tenant={tenant} />
        </Suspense>
      </div>
    </div>
  )
}
