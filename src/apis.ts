import { Service, ServiceApi, Tenant } from "@/types";
import { getServiceApiUrl, isTimeoutError } from "@/utils";

const vercelWorkerTimeoutMs = 10 * 1000;

export enum ErrorStatus {
  Error = "Error",
  Timeout = "Timeout",
}

export async function fetchServiceStatus(tenant: Tenant, service: Service) {
  if (service.id === "test") {
    return fetchTestServiceStatus();
  }

  const { healthCheck = "/health-check" } = service;
  const url = `https://${service.id}.${tenant.domain}${healthCheck}`;

  const signal = AbortSignal.timeout(vercelWorkerTimeoutMs);

  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store", signal });
    return res.status;
  } catch (e) {
    if (isTimeoutError(e)) return ErrorStatus.Timeout;
    return ErrorStatus.Error;
  }
}

export async function fetchServiceApiStatus(
  tenant: Tenant,
  service: Service,
  serviceApi: ServiceApi,
) {
  const url = getServiceApiUrl(tenant, service, serviceApi);

  const signal = AbortSignal.timeout(vercelWorkerTimeoutMs);

  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store", signal });
    return res.status;
  } catch (e) {
    if (isTimeoutError(e)) return ErrorStatus.Timeout;
    return ErrorStatus.Error;
  }
}

async function fetchTestServiceStatus() {
  const url = "https://httpstat.us/random/200,400,500";
  const res = await fetch(url, { cache: "no-store" });
  return res.status;
}
