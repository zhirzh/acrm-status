import { acpTenants } from "@/constants";
import { Service, ServiceApi, Tenant } from "@/types";

type SkipClassName = boolean | null | undefined;
type ClassName = string | SkipClassName | Record<string, SkipClassName>;
export function cx(...classNames: Array<ClassName>) {
  return classNames
    .filter((c): c is Exclude<ClassName, SkipClassName> => !!c)
    .flatMap((c) => {
      if (typeof c === "string") {
        return c;
      }
      return Object.keys(c).filter((k) => !!c[k]);
    })
    .join(" ");
}

export function getServiceApiUrl(
  tenant: Tenant,
  service: Service,
  serviceApi: ServiceApi,
) {
  const url = `https://${service.id}.${tenant.domain}/api/${serviceApi.url}`;

  const { authToken } = tenant;
  if (authToken) return `${url}?auth_token=${authToken}`;

  return url;
}

export function isAcpTenant(tenant: Tenant) {
  return acpTenants.includes(tenant);
}

type TimeoutError = DOMException & { name: "TimeoutError" };
export function isTimeoutError(err: unknown): err is TimeoutError {
  return err instanceof DOMException && err.name === "TimeoutError";
}
