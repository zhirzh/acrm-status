export type Tenant = {
  id: string
  name: string
  domain: string
}

export type Service = {
  id: string
  name: string
  apis?: ServiceApi[]
}

export type ServiceApi = {
  id: string
  url: string
}

export type User = {
  id: number
  email: string
  name: string
  sub_tenant: {
    id: number
    name: string
  }
}
