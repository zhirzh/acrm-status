import { Tenant } from "@/types";
import { isAcpTenant } from "@/utils";

export const acrmBrandTitle = "ACRM Status";
export const acpBrandTitle = "ACP Status";

export default function Brand({ tenant }: { tenant?: Tenant }) {
  const brandTitle =
    !tenant ? acrmBrandTitle
    : isAcpTenant(tenant) ? acpBrandTitle
    : acrmBrandTitle;
  return <h1 className="text-2xl">{brandTitle}</h1>;
}
