import { ErrorStatus } from "@/apis";
import { cx } from "@/utils";

export function StatusCard({ status }: { status: number | ErrorStatus }) {
  const ok = status === 200;
  const timeout = status === ErrorStatus.Timeout;
  const error = status === ErrorStatus.Error;

  const label =
    timeout ? "Timeout"
    : error ? "Error"
    : ok ? "OK"
    : status;

  return (
    <div
      className={cx(
        "font-mono text-sm font-semibold",
        ok ? "text-green-600"
        : timeout ? "text-yellow-500"
        : error ? "text-red-400"
        : "text-red-500",
      )}
    >
      {label}
    </div>
  );
}
