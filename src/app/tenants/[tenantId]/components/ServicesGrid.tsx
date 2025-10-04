import { fetchServiceStatus } from "@/apis";
import { acpServices, acrmServices } from "@/constants";
import { Service, Tenant } from "@/types";
import { isAcpTenant } from "@/utils";
import { Suspense } from "react";
import { StatusCard } from "./StatusCard";

export default function ServicesGrid({ tenant }: { tenant: Tenant }) {
  const services = isAcpTenant(tenant) ? acpServices : acrmServices;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      {services.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between rounded-xl bg-white py-5 pr-6 pl-5"
        >
          <div>{s.name}</div>

          <Suspense
            fallback={<div className="h-4 w-8 rounded-xs bg-slate-200" />}
          >
            <ServiceCardStatus tenant={tenant} service={s} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}

async function ServiceCardStatus({
  tenant,
  service,
}: {
  tenant: Tenant;
  service: Service;
}) {
  const status = await fetchServiceStatus(tenant, service);
  return <StatusCard status={status} />;
}
