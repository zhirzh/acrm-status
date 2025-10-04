import Brand, { acrmBrandTitle } from "@/components/Brand";
import RightArrow from "@/components/RightArrow";
import { tenants } from "@/constants";
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

        <div className="space-y-5">
          {tenants.map((t) => (
            <TenantCard key={t.id} tenant={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TenantCard({ tenant }: { tenant: Tenant }) {
  return (
    <Link
      href={`/tenants/${tenant.id}`}
      className={cx(
        "flex items-center justify-between rounded-xl bg-surface py-4 pr-7 pl-6",
        "highlight-shadow-sm outline-offset-4 outline-a3 transition-[translate,box-shadow]",
        "hover:-translate-y-0.5 hover:highlight-shadow-md",
        "focus:-translate-y-0.5 focus:highlight-shadow-md focus-visible:outline",
      )}
    >
      <div>
        <div>{tenant.name}</div>
        <div className="text-sm text-muted">{tenant.domain}</div>
      </div>

      <RightArrow />
    </Link>
  );
}
