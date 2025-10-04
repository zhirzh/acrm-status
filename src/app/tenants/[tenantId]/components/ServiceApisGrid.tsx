import { fetchServiceApiStatus } from "@/apis";
import Shimmer from "@/components/Shimmer";
import { acrmServices } from "@/constants";
import { Service, ServiceApi, Tenant } from "@/types";
import { Suspense } from "react";
import StatusCard from "./StatusCard";

export default function ServiceApisGrid({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-5">
      {acrmServices.flatMap((s) =>
        s.apis?.map((a) => (
          <div
            key={`${s.id}/${a.id}`}
            className="flex items-center justify-between rounded-xl bg-surface py-5 pr-6 pl-5 highlight-shadow-sm"
          >
            <div>
              <div className="font-mono text-sm">{a.url}</div>
              <div className="text-sm text-muted">{s.name}</div>
            </div>

            <Suspense fallback={<Shimmer />}>
              <ServiceApiCardStatus
                tenant={tenant}
                service={s}
                serviceApi={a}
              />
            </Suspense>
          </div>
        )),
      )}
    </div>
  );
}

async function ServiceApiCardStatus({
  tenant,
  service,
  serviceApi,
}: {
  tenant: Tenant;
  service: Service;
  serviceApi: ServiceApi;
}) {
  const status = await fetchServiceApiStatus(tenant, service, serviceApi);
  return <StatusCard status={status} />;
}
