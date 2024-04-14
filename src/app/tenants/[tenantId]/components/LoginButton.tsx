import Button from '@/components/Button'
import { Tenant } from '@/types'

export default function LoginButton({ tenant }: { tenant: Tenant }) {
  return <Button.Link href={{ pathname: `/tenants/${tenant.id}/login` }}>Sign in</Button.Link>
}
