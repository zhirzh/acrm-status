import LoginForm from '@/components/LoginForm'
import { tenants } from '@/constants'
import { getTenantCookie, getUser } from '@/helpers'
import { redirect } from 'next/navigation'

type Params = {
  tenantId: string
}

type Props = {
  params: Params
}

export default async function LoginPage({ params }: Props) {
  const { tenantId } = params
  const tenant = tenants.find((t) => t.id === tenantId)!

  const { authToken } = getTenantCookie(tenant)
  const user = await getUser(tenant, authToken)

  if (user) {
    return redirect(`/tenants/${tenant.id}`)
  }

  return (
    <div className='fixed inset-0 bg-slate-100'>
      <div className='mx-auto mt-28 max-w-fit rounded-lg border border-gray-100 bg-white shadow-sm'>
        <LoginForm tenant={tenant} />
      </div>
    </div>
  )
}
