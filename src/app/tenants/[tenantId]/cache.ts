import { Tenant, User } from '@/types'
import { Maybe, createCache } from '@/utils'

export const tenantCache = createCache<Tenant>('tenantCache')
export const authTokenCache = createCache<Maybe<string>>('authTokenCache')
export const userCache = createCache<User>('userCache')
