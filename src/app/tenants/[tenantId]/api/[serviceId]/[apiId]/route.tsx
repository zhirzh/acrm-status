import { services, tenants } from '@/constants'
import { getTenantCookie } from '@/helpers'
import { getServiceApiUrl } from '@/utils'
import { NextRequest } from 'next/server'

type Params = {
  tenantId: string
  serviceId: string
  apiId: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { tenantId, serviceId, apiId } = params

  const tenant = tenants.find((t) => t.id === tenantId)!
  const service = services.find((s) => s.id === serviceId)!
  const serviceApi = service.apis!.find((a) => a.id === apiId)!

  const authToken = getTenantCookie(tenant).authToken!

  const url = getServiceApiUrl(tenant, service, serviceApi, authToken)

  const remoteReq = new Request(url, req)
  remoteReq.headers.set('accept-encoding', 'identity')

  return fetch(remoteReq, { cache: 'no-store' })
}
