import Brand, { acpBrandTitle, acrmBrandTitle } from "@/components/Brand";
import RightArrow from "@/components/RightArrow";
import { acpTenants, tenants } from "@/constants";
import { Tenant } from "@/types";
import { cx } from "@/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: acrmBrandTitle,
};

export default function Home() {
  return (
    <div className="p-5 pb-24">
      <div className="mx-auto max-w-[600px]">
        <div className="mb-6">
          <Brand />
        </div>

        <div className="space-y-6">
          {tenants.map((t) => (
            <TenantCard key={t.id} tenant={t} />
          ))}

          <h2 className="mt-10 mb-5 text-xl">{acpBrandTitle}</h2>

          {acpTenants.map((t) => (
            <TenantCard key={t.id} tenant={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TenantCard({ tenant }: { tenant: Tenant }) {
  return (
    <div className="group">
      <Link
        href={`/${tenant.id}`}
        className={cx(
          "flex items-center justify-between rounded-xl bg-surface py-4 pr-7 pl-6 highlight-shadow-sm transition-[translate,box-shadow]",
          "group-hover:-translate-y-0.5 group-hover:highlight-shadow-md",
          "focus:-translate-y-0.5 focus:highlight-shadow-md",
          "outline-offset-4 outline-ring focus-visible:outline",
        )}
      >
        <div>
          <div>{tenant.name}</div>
          <div className="text-sm text-muted">{tenant.domain}</div>
        </div>

        <RightArrow />
      </Link>
    </div>
  );
}
