import Brand, { brandTitle } from "@/components/Brand";
import RightArrow from "@/components/RightArrow";
import { tenants } from "@/constants";
import { Tenant } from "@/types";
import { cx } from "@/utils";
import Link from "next/link";

export const metadata = {
  title: brandTitle,
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
        "flex items-center justify-between rounded-xl bg-white py-4 pr-7 pl-6",
        "ring-slate-400 outline-none hover:ring focus:ring",
      )}
    >
      <div>
        <div>{tenant.name}</div>
        <div className="text-sm text-gray-600">{tenant.domain}</div>
      </div>

      <RightArrow />
    </Link>
  );
}
