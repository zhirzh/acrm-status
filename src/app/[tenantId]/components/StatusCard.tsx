import { ErrorStatus } from "@/apis";
import { cx } from "@/utils";

export default function StatusCard({
  status,
}: {
  status: number | ErrorStatus;
}) {
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
        ok ? "text-primary"
        : timeout ? "text-yellow-500 dark:text-yellow-600"
        : error ? "text-destructive"
        : "text-destructive",
      )}
    >
      {label}
    </div>
  );
}
