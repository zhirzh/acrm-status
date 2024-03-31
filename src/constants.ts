import { Service, Tenant } from './types'

export const tenants: Tenant[] = [
  { id: 'staging', name: 'Staging', domain: 'beta.staging.anarock.com' },
  { id: 'anarock', name: 'Anarock', domain: 'anarock.com' },
  { id: 'tech', name: 'Tech', domain: 'anarock.tech' },
  { id: 'beta-tech', name: 'Beta Tech', domain: 'beta.anarock.tech' },
  { id: 'kohinoor', name: 'Kohinoor', domain: 'kohinoor-pune.com' },
  { id: 'kw', name: 'KW Group', domain: 'kwgroup.net' },
  { id: 'old-staging', name: 'Old Staging', domain: 'staging.anarock.com' },
]

export const services: Service[] = [
  { id: 'acl', name: 'ACL' },
  { id: 'calling', name: 'Calling' },
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'data', name: 'Data' },
  { id: 'employee', name: 'Employee' },
  { id: 'forms', name: 'Forms' },
  { id: 'lead', name: 'Lead' },
  { id: 'mail', name: 'Mail' },
  { id: 'meta', name: 'Meta' },
  { id: 'plutus', name: 'Plutus' },
  { id: 'registration', name: 'Registration' },
  { id: 'sms', name: 'SMS' },
  { id: 'triton', name: 'Triton' },
]
