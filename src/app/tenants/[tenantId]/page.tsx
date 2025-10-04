import Brand, { acpBrandTitle, acrmBrandTitle } from "@/components/Brand";
import { tenants } from "@/constants";
import { isAcpTenant } from "@/utils";
import { Metadata } from "next";
import ServiceApisGrid from "./components/ServiceApisGrid";
import ServicesGrid from "./components/ServicesGrid";

type Params = {
  tenantId: string;
};

type Props = {
  params: Promise<Params>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tenants.map<Params>((tenant) => ({ tenantId: tenant.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenantId } = await params;

  const tenant = tenants.find((t) => t.id === tenantId)!;
  const brandTitle = isAcpTenant(tenant) ? acpBrandTitle : acrmBrandTitle;

  return {
    title: `${tenant.name} | ${brandTitle}`,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { tenantId } = await params;

  const tenant = tenants.find((t) => t.id === tenantId)!;
  const { authToken } = tenant;

  return (
    <div className="p-5 pb-24">
      <div className="mx-auto max-w-[600px]">
        <div>
          <Brand tenant={tenant} />
          <h1 className="mt-4 mb-3 text-xl">{tenant.name}</h1>
        </div>

        <ServicesGrid tenant={tenant} />

        {authToken && (
          <>
            <h2 className="mt-10 mb-3 text-xl">APIs</h2>
            <ServiceApisGrid tenant={tenant} />
          </>
        )}
      </div>
    </div>
  );
}
